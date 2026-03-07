from fastapi import FastAPI

app = FastAPI(title="QueryShield")

@app.get("/")
def root():
    return {"message": "QueryShield API running"}