from datetime import datetime

from pydantic import BaseModel


class QueryAnalyzeRequest(BaseModel):
    query_text: str


class QueryAnalysisResponse(BaseModel):
    id: int
    query_text: str
    risk_score: int
    severity: str
    flags: str
    analysis_summary: str
    created_at: datetime
    user_id: int

    model_config = {"from_attributes": True}