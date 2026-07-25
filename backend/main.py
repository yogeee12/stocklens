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
    