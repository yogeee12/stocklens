from fastapi import FastAPI, HTTPException
from database import SessionLocal
from model import Company, Recommendation, Brokers, Summary
from fastapi.middleware.cors import CORSMiddleware
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins = [
        "http://localhost:5173",
        ],
    allow_credentials=True,
    allow_headers = ["*"],
    allow_methods = ["*"],
)

@app.get("/")
def home():
    return {
        "status": "StockLens API running"
    }

@app.get("/companies")
def get_company():

    db = SessionLocal()
    companies = db.query(Company).all()

    result = []

    for company in companies:
        result.append({
            "id" : company.id,
            "symbol" : company.symbol,
            "name" : company.company_name
        })

    db.close()
    return result

@app.get("/companies/{symbol}/recommendations")
def get_recommendations(symbol:str):

    db = SessionLocal()
    try:
        company = (
            db.query(Company)
            .filter(Company.symbol == symbol.upper())
            .first()
        )

        if company is None:
            raise HTTPException(status_code=404, detail="Company Not found")
        
        recommendation = (
            db.query(Recommendation)
            .filter(Recommendation.company_id == company.id)
            .order_by(Recommendation.recommendation_date.desc())
            .limit(5)
            .all()
        )

        result = []

        for row in recommendation:
            broker = (
                db.query(Brokers)
                .filter(Brokers.id == row.broker_id)
                .first()
            )

            result.append({
                "broker" : broker.name if broker else "Unknown",
                "date" : row.recommendation_date,
                "call" : row.call_type,
                "current_price" : row.current_price,
                "target" : row.target_price,
                "upside" : row.upside,
                "price_at_reco" : row.price_at_reco,
                "change_at_reco" : row.change_at_reco
            })

        return result
    finally:
        db.close()

@app.get("/companies/{symbol}/summary")
def get_summary(symbol : str):

    db = SessionLocal()
    try:
        company = (
            db.query(Company)
            .filter(Company.symbol == symbol.upper())
            .first()
        )
        if company is None:
            raise HTTPException( status_code=404,detail="Company not found")
        
        summary = (
            db.query(Summary)
            .filter(Summary.company_id == company.id)
            .first())
        
        if summary is None:
            raise HTTPException(status_code=404,detail="Company not found")

        company_name = company.company_name.replace("-"," ").title()

        result = {
            "company_name" : company_name, 
            "symbol" : company.symbol,
            "buy_percent" : summary.buy_percent,
            "hold_percent" : summary.hold_percent,
            "sell_percent" : summary.sell_percent,
            "avg_target" : summary.avg_target,
            "avg_buy_upside" : summary.avg_buy_upside,
            "avg_hold_upside" : summary.avg_hold_upside,
            "avg_sell_downside" : summary.avg_sell_downside
        }
        return result
    
    finally:
        db.close()


@app.get("/summary")
def get_all_summary():

    db = SessionLocal()

    try:
            summaries = (
                db.query(Summary)
                .all()
            )

            result = []

            for summary in summaries:
                company = (
                    db.query(Company)
                    .filter(Company.id == summary.company_id)
                    .first())
                        
                
                if summary is None:
                    raise HTTPException(status_code=404,detail="Company not found")
        
                result.append({
                    "company_name" : company.company_name.replace("-"," ").title(), 
                    "symbol" : company.symbol,
                    "buy_percent" : summary.buy_percent,
                    "hold_percent" : summary.hold_percent,
                    "sell_percent" : summary.sell_percent,
                    "avg_target" : summary.avg_target,
                    "avg_buy_upside" : summary.avg_buy_upside,
                    "avg_hold_upside" : summary.avg_hold_upside,
                    "avg_sell_downside" : summary.avg_sell_downside
                })
            
            return result
        
    finally:
        db.close()

@app.get("/cards")
def get_company_cards():
    db = SessionLocal()
    companies = db.query(Company).all()

    result = []

    for company in companies:

        summary = (
            db.query(Summary)
            .filter(Summary.company_id == company.id)
            .first()
        )

        latest_reco = (
            db.query(Recommendation)
            .filter(Recommendation.company_id == company.id)
            .order_by(Recommendation.recommendation_date.desc())
            .first()
        )

        broker_name = None

        if latest_reco:
            broker = (
                db.query(Brokers)
                .filter(Brokers.id == latest_reco.broker_id)
                .first()
            )

            broker_name = broker.name if broker else None


        result.append({

            "company_id": company.id,
            "company_name": company.company_name,

            "buy_percent": summary.buy_percent if summary else 0,
            "hold_percent": summary.hold_percent if summary else 0,
            "sell_percent": summary.sell_percent if summary else 0,
            "avg_target": summary.avg_target if summary else 0,

            "latest_recommendation": {

                "date": latest_reco.recommendation_date
                if latest_reco else None,

                "broker": broker_name,

                "target": latest_reco.target_price
                if latest_reco else None,

                "price_at_reco": latest_reco.price_at_reco
                if latest_reco else None,

                "current_price": latest_reco.current_price
                if latest_reco else None,

                "call": latest_reco.call_type
                if latest_reco else None,

                "upside": latest_reco.upside
                if latest_reco else None,

                "change_at_reco": latest_reco.change_at_reco
                if latest_reco else None
            }
        })

    return result