from app.services.risk_engine import evaluate_query


def determine_severity(risk_score: int) -> str:
    if risk_score <= 20:
        return "low"
    if risk_score <= 50:
        return "medium"
    if risk_score <= 80:
        return "high"
    return "critical"


def generate_summary(risk_score: int, flags: list[str]) -> str:
    if risk_score == 0:
        return "No major suspicious indicators detected"

    if risk_score <= 50:
        return "Some suspicious SQL behavior detected"

    if risk_score <= 80:
        return "Multiple indicators consistent with injection behavior"

    return "Strong indicators of likely SQL injection attempt"


def analyze_query(query_text: str) -> dict:
    risk_score, flags = evaluate_query(query_text)
    severity = determine_severity(risk_score)
    analysis_summary = generate_summary(risk_score, flags)

    return {
        "query_text": query_text,
        "risk_score": risk_score,
        "severity": severity,
        "flags": flags,
        "analysis_summary": analysis_summary,
    }
from app.services.analyzer import analyze_query

result = analyze_query("SELECT * FROM users WHERE username = 'admin' OR 1=1 --")
print(result)
