from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from bs4 import BeautifulSoup
from database import SessionLocal
from model import Company, Recommendation
import time
import random


# dwonload the page html
def scrape_stock_reports(driver ,symbol_url):

    driver.get(symbol_url)
    WebDriverWait(driver, 15).until(
        EC.presence_of_element_located((By.ID, "brokerTable"))
    )


    soup = BeautifulSoup(driver.page_source, "html.parser")

    return soup

#Extract data from html and create data
def parse_broker_rows(soup):
    rows = soup.select("table#brokerTable tbody tr")
    results = []

    for row in rows:
        broker_tag = row.select_one("td.mW120 a.broker-link")
        if not broker_tag:
            continue  # skips the "Consensus Share Price Target" summary row

        broker = broker_tag.get_text(strip=True)

        tds = row.find_all("td")
        # tds[0] is hidden, so real data starts at tds[1]
        date = tds[1].get_text(strip=True)
        stock = tds[2].find("a").get_text(strip=True) if tds[2].find("a") else None
        ltp = tds[4].get_text(strip=True)
        target = tds[5].get_text(strip=True)
        price_at_reco_raw = tds[6].get_text(" ", strip=True) 
        upside = tds[7].get_text(strip=True)
        call_type = tds[8].get_text(strip=True)

        post_link_tag = row.select_one("a.pills:not(.pdf-pill)")
        report_url = ("https://trendlyne.com" + post_link_tag["href"] if post_link_tag else None)

        results.append({
            "date": date,
            "stock": stock,
            "broker": broker,
            "ltp": ltp,
            "target": target,
            "price_at_reco": price_at_reco_raw,
            "upside": upside,
            "call_type": call_type,
            "report_url": report_url,
        })

    return results

def save_to_psql(db, company, data):
    try:
        for row in data:
            exists = db.query(Recommendation).filter_by(
                    company_id=company.id,
                    broker=row["broker"],
                    recommendation_date=row["date"]
                ).first()

            if exists:
                continue

            recommendation = Recommendation(
            company_id = company.id,
            broker = row["broker"],
            recommendation_date = row["date"],
            ltp = row["ltp"],
            target_price = row["target"],
            price_at_reco = row["price_at_reco"],
            upside = row["upside"],
            call_type = row["call_type"],
            report_url = row["report_url"]
            )
            db.add(recommendation)

        db.commit()
    except Exception:
        db.rollback()
        raise
    return True

if __name__ == "__main__":

    db = SessionLocal()
    companies = db.query(Company).limit(50).all()

    options = Options()
    # options.add_argument("--headless")
    options.add_argument("--disable-gpu")

    driver = webdriver.Chrome(
            service=Service(ChromeDriverManager().install()), options=options
        )
    try:
        for company in companies:
            if not company.stock_id or not company.symbol:
                continue
            try:
                url = (
                    f"https://trendlyne.com/research-reports/stock/"
                    f"{company.stock_id}/"
                    f"{company.symbol}/"
                    f"{company.company_name}"
                )
                print(f"Scraping {company.symbol}...")
                soup = scrape_stock_reports(driver,url)
                data = parse_broker_rows(soup)
                save_to_psql(db, company, data)

                time.sleep(random.uniform(5,8))
                print(f"{company.symbol} : {len(data)} recommendation saved")

            except Exception as e:
                print(f"Failed {company.symbol}: {e}")
                continue

    finally:
        driver.quit()
        db.close()