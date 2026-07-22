from fastapi import FastAPI
from database import SessionLocal
from model import Company, Recommendation

app = FastAPI()


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

@app.get("/companies/{company_id}/recommendations")
def get_recommendations(company_id: int):

    db = SessionLocal()

    data = (
        db.query(Recommendation)
        .filter(Recommendation.company_id == company_id)
        .all()
    )

    result = []

    for row in data:
        result.append({
            "broker" : row.broker,
            "date" : row.recommendation_date,
            "call" : row.call_type,
            "ltp" : row.ltp,
            "target" : row.target_price,
            "upside" : row.upside,
            "report_url" : row.report_url
        })

    db.close()
    return result