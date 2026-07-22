from database import SessionLocal, engine
from model import Company, Base
import pandas as pd

Base.metadata.create_all(bind=engine)
print("Table Created Successfully!")

print("Start Inserting data into table!")
df = pd.read_csv(r"C:\Users\Om\Desktop\stock_research_platform\stocklens\backend\scraper\data\nifty500_companies.csv")

db  = SessionLocal()

for _, row in df.iterrows():
    company = Company(
        symbol = row["symbol"],
        company_name = row["company_name"],
        stock_id = row["stock_id"],
        company_url = row["detail_url"]
    )

    db.add(company)

db.commit()
db.close()

print("Import completed!")