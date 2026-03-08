from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.config import settings
from app.core.security import get_current_user
from app.db.models.query_analysis import QueryAnalysis
from app.db.models.user import User
from app.db.session import get_db
from app.schemas.query import QueryAnalyzeRequest, QueryAnalysisResponse
from app.services.analyzer import analyze_query

router = APIRouter(prefix="/query", tags=["queries"])


@router.post("/analyze", response_model=QueryAnalysisResponse)
def analyze_and_store_query(
    payload: QueryAnalyzeRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    result = analyze_query(payload.query_text)

    db_record = QueryAnalysis(
        query_text=result["query_text"],
        risk_score=result["risk_score"],
        severity=result["severity"],
        flags=",".join(result["flags"]),
        analysis_summary=result["analysis_summary"],
        user_id=current_user.id,
    )

    db.add(db_record)
    db.commit()
    db.refresh(db_record)

    return db_record


@router.get("/", response_model=list[QueryAnalysisResponse])
def get_queries(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return (
        db.query(QueryAnalysis)
        .filter(QueryAnalysis.user_id == current_user.id)
        .order_by(QueryAnalysis.created_at.desc())
        .all()
    )


@router.get("/high-risk", response_model=list[QueryAnalysisResponse])
def get_high_risk_queries(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return (
        db.query(QueryAnalysis)
        .filter(QueryAnalysis.user_id == current_user.id)
        .filter(QueryAnalysis.risk_score >= settings.high_risk_threshold)
        .order_by(QueryAnalysis.created_at.desc())
        .all()
    )