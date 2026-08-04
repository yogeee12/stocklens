from fastapi import FastAPI, HTTPException
from database import SessionLocal
from model import Company, Recommendation, Brokers, Summary, Brokers_summary
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import func , distinct

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
            "name" : company.company_name.replace("-", " ").title()
        })

    db.close()
    return result

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
                    "avg_sell_downside" : summary.avg_sell_downside,
                })
            
            return result
        
    finally:
        db.close()

@app.get("/cards")
def get_company_cards():
    db = SessionLocal()
    companies = (
                db.query(Company)
                .join(Summary, Company.id == Summary.company_id)
                .all())

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
            .limit(5)
            .all()
        )
        recommendation_list = []
        for reco in latest_reco:

            if reco:
                broker = (
                    db.query(Brokers)
                    .filter(Brokers.id == reco.broker_id)
                    .first()
                )
            broker_name = broker.name if broker else None
            
            if not reco.upside:
                continue
                
            recommendation_list.append({
                    "date": reco.recommendation_date if reco.recommendation_date else None,
                    "broker": broker_name,
                    "target": reco.target_price if reco else None,
                    "price_at_reco": reco.price_at_reco if reco else None,
                    "current_price": reco.current_price if reco else None,
                    "call": reco.call_type if reco else None,
                    "upside": reco.upside if reco.upside or reco.upside_status == "Pre-Bonus/Split" else None,
                    "change_at_reco": reco.change_at_reco if reco else None
            })


        lower_changes = [reco.change_at_reco for reco in latest_reco if reco.change_at_reco is None or reco.change_at_reco < -30]
        if lower_changes:
            continue

        upside_dic = {
            "avg_buy_upside" : summary.avg_buy_upside,
            "avg_hold_upside" : summary.avg_hold_upside,
            "avg_sell_downside" : summary.avg_sell_downside,
            "avg_accumulate_upside" : summary.avg_accumulate_upside }

        valid_upside = {
            key: value
            for key, value in upside_dic.items()
            if value is not None
        }

        if valid_upside:
            max_upside = max(valid_upside, key=valid_upside.get)
        else:
            max_upside = None

        category = None
        if max_upside == "avg_buy_upside":
            category = "BUY"
        elif max_upside == "avg_hold_upside":
            category = "HOLD"
        elif max_upside == "avg_sell_downside":
            category = "SELL"
        elif max_upside == "avg_accumulate_upside":
            category = "ACCUMULATE"
        
        result.append({
            "company_id": company.id,
            "symbol" : company.symbol,
            "company_name": company.company_name.replace("-"," ").title(), 
            "category" : category,
            "buy_percent": round(summary.buy_percent,2) if summary else 0,
            "hold_percent": round(summary.hold_percent,2) if summary else 0,
            "sell_percent": round(summary.sell_percent,2) if summary else 0,
            "accumulate_percent": round(summary.accumulate_percent,) if summary else 0,
            "avg_target": summary.avg_target if summary else 0,
            "avg_buy_upside" : summary.avg_buy_upside,
            "avg_hold_upside" : summary.avg_hold_upside,
            "avg_sell_downside" : summary.avg_sell_downside,
            "avg_accumulate_upside" : summary.avg_accumulate_upside,
            "recommendations" : recommendation_list,
        })

    return result

@app.get('/brokers_summary')
def get_broker_summary():
    db = SessionLocal()

    try:
        brokers = (
            db.query(Brokers)
            .all()
        )

        result = []

        for broker in brokers:
            broker_summary = (
                db.query(Brokers_summary)
                .filter(Brokers_summary.broker_id == broker.id)
                .order_by(Brokers_summary.last_recommendation_date.desc())
                .first()
            )

            recommendations = (
                db.query(Recommendation, Company)
                .join(Company, Recommendation.company_id == Company.id)
                .filter(
                    Recommendation.broker_id == broker.id,
                    )
                .order_by(Recommendation.recommendation_date.desc())
                .all()
            )

            company_list = []
            for reco, company in recommendations:
                
                company_list.append({
                    "company_name" : company.company_name.replace("-"," ").title(),
                    "call_type" : reco.call_type,
                    "current_price" : reco.current_price,
                    "target_price" : reco.target_price,
                    "upside" : reco.upside,
                    "change_at_reco" : reco.change_at_reco,
                    "recommendation_date" : reco.recommendation_date,
                    "upside_status" : reco.upside_status,
                })
                
            result.append({
                "broker_id" : broker.id,
                "broker_name" : broker.name,
                "total_recommendations" : broker_summary.total_recommendation,
                "target_met" : broker_summary.target_met,
                "company_in_positive" : broker_summary.company_in_positive,
                "company_in_negative" : broker_summary.company_in_negative,
                "active_recommendations" : broker_summary.active_recommendations,
                "success_ratio" : broker_summary.success_ratio,
                "positive_ratio" : broker_summary.positive_ratio,
                "bonus_split" : broker_summary.bonus_split,
                "expired" : broker_summary.expired,
                "last_recommendation_date" : broker_summary.last_recommendation_date,
                "company_list": company_list
            })

        return result
    
    finally:
        db.close()

# @app.get('/broker/common/{broker_ids}')
# def get_broker_ids(broker_ids: str):

#     db = SessionLocal()
#     try:
#         broker_ids = [int(i) for i in broker_ids.split(",")]
#         subquery = (
#             db.query(Recommendation.company_id)
#             .filter(
#                 Recommendation.broker_id.in_(broker_ids),
#                 Recommendation.upside.isnot(None)
#             )
#             .group_by(Recommendation.company_id)
#             .having(func.count(distinct(Recommendation.broker_id)) == len(broker_ids))
#             .subquery()
#         )
#         query = (db.query(
#             Company.company_name,
#             Recommendation.broker_id,
#             Recommendation.call_type,
#             Recommendation.upside,
#             Recommendation.change_at_reco,
#             Recommendation.recommendation_date,
#         )
#         .join(Company, Company.id == Recommendation.company_id)
#         .filter(
#             Recommendation.company_id.in_(db.query(subquery.c.company_id)),
#             Recommendation.broker_id.in_(broker_ids)
#         )
#         .order_by(
#             Company.company_name,
#             Brokers.name
#         )
#         .all()
#         )

#         companies = query
#         result = []

#         for row in companies:
#             result.append({
#                 "company_name" : row.company_name.replace("-"," ").title(),
#                 "call_type" : row.call_type,
#                 "upside" : row.upside,
#                 "change_at_reco" : row.change_at_reco,
#                 "recommendation_date" : row.recommendation_date,
#             })

#         return result
    
#     finally:
#         db.close()