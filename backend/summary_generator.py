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
            accumulate_count = sum(1 for r in recommendations if r.call_type == "Accumulate")
            total = len(recommendations)

            buy_percent = (buy_count / total) * 100 if total else 0
            hold_percent = (hold_count / total) * 100 if total else 0
            sell_percent = (sell_count / total) * 100 if total else 0
            accumulate_percent = (accumulate_count / total) * 100 if total else 0


            targets = [r.target_price for r in recommendations if r.target_price is not None]

            avg_target = sum(targets) / len(targets) if targets else None

            total_buy = [r.upside for r in recommendations if r.call_type == "Buy" and r.upside is not None]
            total_hold = [r.upside for r in recommendations if r.call_type == "Hold" and r.upside is not None]
            total_sell = [r.upside for r in recommendations if r.call_type == "Sell" and r.upside is not None]
            total_accumulate = [r.upside for r in recommendations if r.call_type == "Accumulate" and r.upside is not None]

            avg_buy_upside = sum(total_buy) / len(total_buy) if total_buy else None
            avg_hold_upside = sum(total_hold) / len(total_hold) if total_hold else None
            avg_sell_downside = sum(total_sell) / len(total_sell) if total_sell else None
            avg_accumulate_upside = sum(total_accumulate) / len(total_accumulate) if total_accumulate else None

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
            summary.accumulate_count = accumulate_count
            summary.buy_percent = buy_percent
            summary.hold_percent = hold_percent
            summary.sell_percent = sell_percent
            summary.accumulate_percent = accumulate_percent
            summary.avg_target = round(avg_target) if avg_target else None
            summary.avg_buy_upside = round(avg_buy_upside,2) if avg_buy_upside else None
            summary.avg_hold_upside = round(avg_hold_upside,2) if avg_hold_upside else None
            summary.avg_sell_downside = round(avg_sell_downside,2) if avg_sell_downside else None
            summary.avg_accumulate_upside = round(avg_accumulate_upside,2) if avg_accumulate_upside else None

        db.commit()

    except Exception:
        db.rollback()
        raise
    finally:
        db.close()

    return("Summary updated successfully.")