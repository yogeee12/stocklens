from sqlalchemy import Column, Integer, String, ForeignKey, Float, Date
from database import Base
from sqlalchemy import UniqueConstraint

class Company(Base):
    __tablename__ = "companies"

    id = Column(Integer, primary_key=True, index=True)
    symbol = Column(String, unique=True, nullable=False)
    company_name = Column(String, nullable=False)
    stock_id = Column(String)
    company_url = Column(String)

class Brokers(Base):
    __tablename__ = "brokers"

    id = Column(Integer, primary_key=True)
    name = Column(String, unique=True, nullable=False)

class Recommendation(Base):
    __tablename__ = "recommendations"

    __table_args__ = (
        UniqueConstraint(
            "company_id",
            "broker_id",
            "recommendation_date",
            name="unique_company_broker_date"
        ),
        )


    id = Column(Integer, primary_key=True, index=True)
    company_id = Column(Integer, 
                        ForeignKey("companies.id"),
                        nullable=False,
                        index=True)
    
    broker_id = Column(Integer, 
                       ForeignKey("brokers.id"),
                       nullable=False,
                       index=True)
    recommendation_date = Column(Date , nullable=False)
    current_price = Column(Float)

    target_price = Column(Float)
    price_at_reco = Column(Float)
    change_at_reco = Column(Float)

    upside = Column(Float)
    call_type = Column(String)

class Summary(Base):
    __tablename__ = "summary"

    company_id = Column(Integer, ForeignKey("companies.id"), primary_key=True, nullable=False)
    buy_count = Column(Integer)
    hold_count = Column(Integer)
    sell_count = Column(Integer)
    buy_percent = Column(Float)
    hold_percent = Column(Float)
    sell_percent = Column(Float)
    avg_target = Column(Float)
    highest_target = Column(Float)
    lowest_target = Column(Float)
