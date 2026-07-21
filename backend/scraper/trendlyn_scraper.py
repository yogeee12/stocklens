from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.chrome.options import Options
from bs4 import BeautifulSoup
import time 

def scrape_stock_reports(symbol_url):

    options = Options()
    # options.add_argument("--headless")
    # options.add_argument("--disable-gpu")

    driver = webdriver.Chrome(
        service=Service(ChromeDriverManager().install()),
        options=options
    )

    driver.get(symbol_url)

    time.sleep(5)

    soup = BeautifulSoup(driver.page_source, "html.parser")

    driver.quit()

    return soup

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
        price_at_reco_raw = tds[6].get_text(" ", strip=True)  # e.g. "2049.50 (8.57%)"
        upside = tds[7].get_text(strip=True)
        call_type = tds[8].get_text(strip=True)

        post_link_tag = row.select_one("a.pills:not(.pdf-pill)")
        report_url = post_link_tag["href"] if post_link_tag else None

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

if __name__ == "__main__":

    url = "https://trendlyne.com/research-reports/stock/1127/RELIANCE/reliance-industries-ltd/"

    soup = scrape_stock_reports(url)
    data = parse_broker_rows(soup)

    for row in data:
        print(row)