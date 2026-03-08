RULES = [
    {"name": "OR_ALWAYS_TRUE", "pattern": "or 1=1", "weight": 40},
    {"name": "UNION_SELECT", "pattern": "union select", "weight": 35},
    {"name": "COMMENT_INJECTION", "pattern": "--", "weight": 20},
    {"name": "DROP_TABLE_ATTEMPT", "pattern": "drop table", "weight": 50},
    {"name": "SCHEMA_ENUMERATION", "pattern": "information_schema", "weight": 20},
    {"name": "COMMAND_EXECUTION_PATTERN", "pattern": "xp_cmdshell", "weight": 50},
    {"name": "TIME_DELAY_SLEEP", "pattern": "sleep(", "weight": 25},
    {"name": "TIME_DELAY_BENCHMARK", "pattern": "benchmark(", "weight": 25},
    {"name": "QUOTE_ESCAPE_SINGLE", "pattern": "' or '", "weight": 20},
    {"name": "QUOTE_ESCAPE_DOUBLE", "pattern": '" or "', "weight": 20},
]


def evaluate_query(query_text: str) -> tuple[int, list[str]]:
    normalized = query_text.lower().strip()

    matched_flags = []
    risk_score = 0

    for rule in RULES:
        if rule["pattern"] in normalized:
            matched_flags.append(rule["name"])
            risk_score += rule["weight"]

    risk_score = min(risk_score, 100)

    return risk_score, matched_flags