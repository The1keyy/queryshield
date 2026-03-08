from datetime import datetime

from sqlalchemy import DateTime, ForeignKey, Integer, String, Text
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import Base


class QueryAnalysis(Base):
    __tablename__ = "queries"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    query_text: Mapped[str] = mapped_column(Text, nullable=False)
    risk_score: Mapped[int] = mapped_column(Integer, nullable=False)
    severity: Mapped[str] = mapped_column(String, nullable=False)
    flags: Mapped[str] = mapped_column(Text, nullable=False)
    analysis_summary: Mapped[str] = mapped_column(Text, nullable=False)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"), nullable=False)

    user = relationship("User", back_populates="queries")