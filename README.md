# QueryShield 🛡️

> **SQL Injection Risk Analysis API** — A backend security service that analyzes SQL query strings, detects suspicious injection patterns, assigns a risk score, and stores results for review through authenticated API endpoints.

[![Python](https://img.shields.io/badge/Python-3.11-blue?logo=python)](https://www.python.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.110-green?logo=fastapi)](https://fastapi.tiangolo.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-blue?logo=postgresql)](https://www.postgresql.org/)
[![Docker](https://img.shields.io/badge/Docker-Compose-2496ED?logo=docker)](https://www.docker.com/)
[![AWS](https://img.shields.io/badge/Deployed-AWS%20EC2-FF9900?logo=amazonaws)](https://aws.amazon.com/)
[![JWT](https://img.shields.io/badge/Auth-JWT-000000?logo=jsonwebtokens)](https://jwt.io/)

---

## What It Does

SQL injection is one of the most common and dangerous vulnerabilities in web applications. QueryShield acts as a **pre-execution inspection layer** — analyzing SQL query strings before they are executed and returning a structured security risk report.

The system inspects queries for suspicious constructs, assigns weighted scores, and classifies severity levels.

**Example attack query caught by QueryShield:**
```sql
SELECT * FROM users WHERE username = 'admin' OR 1=1 --
```

**QueryShield response:**
```json
{
  "id": 1,
  "query_text": "SELECT * FROM users WHERE username = 'admin' OR 1=1 --",
  "risk_score": 60,
  "severity": "high",
  "flags": "OR_ALWAYS_TRUE,COMMENT_INJECTION",
  "analysis_summary": "Multiple indicators consistent with injection behavior",
  "created_at": "2026-03-09T03:39:11.208111",
  "user_id": 1
}
```

---

## Tech Stack

| Layer | Technology |
|---|---|
| **Backend** | Python, FastAPI |
| **Database** | PostgreSQL, SQLAlchemy ORM |
| **Auth** | JWT (python-jose), Passlib (bcrypt) |
| **Infrastructure** | Docker, Docker Compose |
| **Cloud** | AWS EC2 |
| **API Tooling** | Uvicorn, Pydantic |

---

## Key Features

- **JWT Authentication** — Secure user registration and login with token-based access control
- **SQL Risk Analysis Engine** — Detects injection indicators such as always-true conditions, comment truncation, UNION-based attacks, and suspicious schema enumeration
- **Risk Scoring System** — Assigns numeric scores and severity levels (`low`, `medium`, `high`, `critical`) based on matched detection rules
- **Query Logging** — Stores every analyzed query in PostgreSQL, tied to the authenticated user
- **Protected Endpoints** — History retrieval and high-risk filtering behind auth middleware
- **Containerized Deployment** — Full Docker Compose stack with persistent PostgreSQL volume
- **Cloud Hosted** — Live on AWS EC2, accessible via public IP

---

## API Endpoints

### Authentication
| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/auth/register` | Create a new user account |
| `POST` | `/auth/login` | Authenticate and receive a JWT |
| `POST` | `/auth/token` | OAuth2 token endpoint used by Swagger UI |

### Query Analysis
| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/query/analyze` | Analyze a SQL query and store the result |
| `GET` | `/query` | Retrieve all stored analyses |
| `GET` | `/query/high-risk` | Retrieve only high-risk queries |

---

## System Architecture

```
Client Request
      │
      ▼
JWT Authentication Middleware
      │
      ▼
POST /query/analyze
      │
      ▼
SQL Risk Analysis Engine
   ├── Pattern Detection
   ├── Risk Score Calculation
   └── Severity Classification
      │
      ▼
Store Result → PostgreSQL
      │
      ▼
Structured JSON Response → Client
```

---

## Local Setup

```bash
# Clone the repo
git clone https://github.com/The1keyy/queryshield.git
cd queryshield

# Set up virtual environment
python3 -m venv venv
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Run the API
uvicorn app.main:app --reload
```

Visit the interactive docs at: [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)

---

## Docker Deployment

```bash
# Build and start full stack (API + PostgreSQL)
docker compose up -d
```

This spins up:
- **API container** running FastAPI on port `8000`
- **PostgreSQL container** with a persistent volume

---

## AWS Deployment

QueryShield is live on an **AWS EC2** instance:

1. Launch EC2 instance (Ubuntu)
2. Install Docker & Docker Compose
3. Clone repository and build image
4. Run stack with `docker compose up -d`
5. Open port `8000` via EC2 security group

Access live API docs: `http://EC2_PUBLIC_IP:8000/docs`
---

## About

Built by **Keyshawn Jeannot** — Computer Science student at UMass Boston, focused on backend engineering, cloud infrastructure, and defensive security systems.

[GitHub](https://github.com/The1keyy) · [LinkedIn](https://www.linkedin.com/in/keyshawnjeannot)

---

*QueryShield demonstrates backend API architecture, secure authentication design, database modeling and persistence, containerized deployment, and cloud infrastructure workflows — applied to a real-world security problem.*
