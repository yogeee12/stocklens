from model import Brokers_summary, Recommendation, Brokers
from database import SessionLocal

def broker_summary_genrater():
    db = SessionLocal()
    try:

        brokers = db.query(Brokers).all()

        for broker in brokers:

            recommendation = (
                db.query(Recommendation)
                .filter(Recommendation.broker_id == broker.id)
                .all()
            )

            target_met = sum(1 for r in recommendation if r.upside_status == "Target met")
            total_recommendations = len(recommendation)
            in_positive = sum(1 for r in recommendation if (r.change_at_reco is not None and r.upside is not None) and  r.change_at_reco > 0)
            in_negative = sum(1 for r in recommendation if (r.change_at_reco is not None and r.upside is not None ) and r.change_at_reco < 0)
            active_recommendations = sum((1 for r in recommendation if r.upside is not None))

            broker_summary = (
                db.query(Brokers_summary)
                .filter(Brokers_summary.broker_id == broker.id)
                .first()
            )

            if broker_summary is None:
                broker_summary = Brokers_summary(broker_id = broker.id)
                db.add(broker_summary)

            broker_summary.target_met = target_met
            broker_summary.active_recommendations = active_recommendations
            broker_summary.total_recommendation = total_recommendations
            broker_summary.company_in_positive = in_positive
            broker_summary.company_in_negative = in_negative

        db.commit()

    except Exception:
        db.rollback()
        raise

    finally:
        db.close()
        print("Brokers Summary Genrated Successfully....")
        return "Brokers Summary Genrated Successfully...."

broker_summary_genrater()