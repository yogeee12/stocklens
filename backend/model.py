from sqlalchemy import Column, Integer, String, ForeignKey, Float
from database import Base

class Company(Base):
    __tablename__ = "companies"

    id = Column(Integer, primary_key=True, index=True)
    symbol = Column(String, unique=True, nullable=False)
    company_name = Column(String, nullable=False)
    stock_id = Column(String, nullable=False)
    company_url = Column(String)

class Brokers(Base):
    __tablename__ = "brokers"

    id = Column(Integer, primary_key=True)
    name = Column(String, unique=True, nullable=False)

class Recommendation(Base):
    __tablename__ = "recommendations"

    id = Column(Integer, primary_key=True, index=True)
    company_id = Column(Integer, 
                        ForeignKey("companies.id"), 
                        nullable=True)
    
    broker_id = Column(Integer, ForeignKey("brokers.id") ,nullable=False)
    recommendation_date = Column(String)
    ltp = Column(String)

    target_price = Column(String)
    price_at_reco = Column(String)

    upside = Column(String)
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
    avg_target = Column(Float, nullable=False)
    highest_target = Column(Float)
    lowest_target = Column(Float)
