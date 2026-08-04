import yfinance as yf 
from model import Company, Recommendation, Summary
from database import SessionLocal
import time
from summary_generator import generate_summary

def data_gen():
    start = time.perf_counter()
    db = SessionLocal()

    companies = db.query(Company).all()
    summary = db.query(Summary).all()

    for company in companies:
        recommendation = (
            db.query(Recommendation)
            .filter(Recommendation.company_id == company.id)
            .all()
        )

        # symbol = [company.symbol+".NS" for company in companies]
        ticker = yf.Ticker(company.symbol+".NS")
        latest_price = ticker.fast_info["lastPrice"]

        print("Updating Data of", company.symbol ,company.id)
        for reco in recommendation:

            if reco.upside:
                target_price =  reco.target_price if reco.target_price else None
                price_at_reco = reco.price_at_reco if reco.price_at_reco else None

                reco.current_price =  round(latest_price,2)
                if target_price:
                    reco.upside = round(((target_price - latest_price) / latest_price)*100,2)
                if price_at_reco:
                    reco.change_at_reco = round(((latest_price - price_at_reco) / price_at_reco)*100,2)

    db.commit()
    end = time.perf_counter()
    execution_time = end - start
    print(f"Execution Time : {execution_time:.6f}")
    db.close()
    generate_summary()
    return "Price Changed"

data_gen()