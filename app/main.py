from fastapi import FastAPI

from app.db.base import Base
from app.db.models import QueryAnalysis, User
from app.db.session import engine

Base.metadata.create_all(bind=engine)

app = FastAPI(title="QueryShield")


@app.get("/")
def root():
    return {"message": "QueryShield API running"}