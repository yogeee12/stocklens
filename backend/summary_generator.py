from model import Recommendation, Company, Summary
from database import SessionLocal

def generate_summary():
    db = SessionLocal()

    try: 
        companies = db.query(Company).all()
        for company in companies:
            recommendations = (
                db.query(Recommendation)
                .filter(Recommendation.company_id == company.id)
                .order_by(Recommendation.recommendation_date.desc())
                .limit(5)
                .all())

            if not recommendations:
                continue

            buy_count = sum(1 for r in recommendations if r.call_type == "Buy")
            hold_count = sum(1 for r in recommendations if r.call_type == "Hold")
            sell_count = sum(1 for r in recommendations if r.call_type == "Sell")

            total = len(recommendations)

            buy_percent = (buy_count / total) * 100 if total else 0
            hold_percent = (hold_count / total) * 100 if total else 0
            sell_percent = (sell_count / total) * 100 if total else 0

            targets = [r.target_price for r in recommendations if r.target_price is not None]

            avg_target = sum(targets) / len(targets) if targets else None
            highest_target = max(targets) if targets else None
            lowest_target = min(targets) if targets else None

            summary = (
                db.query(Summary)
                .filter(Summary.company_id == company.id)
                .first()
            )
            if summary is None:
                summary = Summary(company_id = company.id)
                db.add(summary)

            summary.buy_count = buy_count
            summary.hold_count = hold_count
            summary.sell_count = sell_count
            summary.buy_percent = buy_percent
            summary.hold_percent = hold_percent
            summary.sell_percent = sell_percent
            summary.avg_target = avg_target
            summary.highest_target = highest_target
            summary.lowest_target = lowest_target

        db.commit()

    except Exception:
        db.rollback()
        raise
    finally:
        db.close()

    return("Summary Added.")

if __name__ == "__main__":
    summary = generate_summary()
    print(summary)