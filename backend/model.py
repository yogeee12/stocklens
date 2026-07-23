from sqlalchemy import Column, Integer, String, ForeignKey, Date
from database import Base
from pathlib import Path
import pandas as pd

class Company(Base):
    __tablename__ = "companies"

    id = Column(Integer, primary_key=True, index=True)
    symbol = Column(String, unique=True, nullable=False)
    company_name = Column(String, nullable=False)
    stock_id = Column(String, nullable=False)
    company_url = Column(String)


class Recommendation(Base):
    __tablename__ = "recommendation"

    id = Column(Integer, primary_key=True, index=True)
    company_id = Column(Integer, 
                        ForeignKey("companies.id"), 
                        nullable=True)
    
    broker = Column(String, nullable=False)
    recommendation_date = Column(String)
    ltp = Column(String)

    target_price = Column(String)
    price_at_reco = Column(String)

    upside = Column(String)
    call_type = Column(String)

    report_url = Column(String)