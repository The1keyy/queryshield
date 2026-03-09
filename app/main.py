from fastapi import FastAPI

from app.api.routes.auth import router as auth_router
from app.api.routes.queries import router as queries_router
from app.db.base import Base
from app.db.session import engine

app = FastAPI(title="QueryShield")


@app.on_event("startup")
def on_startup():
    Base.metadata.create_all(bind=engine)


app.include_router(auth_router)
app.include_router(queries_router)


@app.get("/")
def root():
    return {"message": "QueryShield API running"}


@app.get("/health")
def health():
    return {"status": "ok"}