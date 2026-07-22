from sqlalchemy import Column, Integer, String
from database import Base
from pathlib import Path
import pandas as pd

DATA_PATH = Path(__file__).parent / "scraper/data" / "nifty500_companies.csv"
df = pd.read_csv(DATA_PATH)

class Company(Base):
    __tablename__ = "companies"

    id = Column(Integer, primary_key=True, index=True)
    symbol = Column(String, unique=True, nullable=False)
    company_name = Column(String, nullable=False)
    stock_id = Column(String, nullable=False)
    company_url = Column(String)

