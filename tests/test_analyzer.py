from app.services.analyzer import analyze_query

def test_or_injection_detected():
    result = analyze_query("SELECT * FROM users WHERE username = 'admin' OR 1=1 --")

    assert result["risk_score"] >= 50
    assert "OR_ALWAYS_TRUE" in result["flags"]