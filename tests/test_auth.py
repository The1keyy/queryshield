from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_register_endpoint_exists():
    response = client.post("/auth/register", json={
        "email": "test@example.com",
        "password": "password123"
    })

    assert response.status_code in [200, 201, 400, 409, 422]