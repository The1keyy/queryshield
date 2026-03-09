import { FormEvent, useEffect, useState } from "react";
import AppLayout from "../components/AppLayout";
import QueryResultCard from "../components/QueryResultCard";
import { api, loadTokenFromStorage, type QueryAnalysis } from "../lib/api";
import { useNavigate } from "react-router-dom";

export default function AnalyzerPage() {
  const [queryText, setQueryText] = useState(
    "SELECT * FROM users WHERE username = 'admin' OR 1=1 --"
  );
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<QueryAnalysis | null>(null);
  const [recent, setRecent] = useState<QueryAnalysis[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadTokenFromStorage();
    api
      .get<QueryAnalysis[]>("/query")
      .then((res) => setRecent(res.data.slice(0, 5)))
      .catch((err) => {
        if (err?.response?.status === 401) {
          navigate("/login");
        }
      });
  }, [navigate]);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const res = await api.post<QueryAnalysis>("/query/analyze", {
        query_text: queryText
      });
      setResult(res.data);
      setRecent((prev) => [res.data, ...prev].slice(0, 5));
    } catch (err: any) {
      if (err?.response?.status === 401) {
        navigate("/login");
      } else {
        setError("We couldn't analyze this query. Please try again.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        <header className="space-y-1">
          <h1 className="text-xl font-semibold tracking-tight">
            Live SQL analyzer
          </h1>
          <p className="text-xs text-slate-400 max-w-xl">
            Paste a SQL query string. QueryShield inspects it for suspicious
            injection patterns and assigns a risk score before execution.
          </p>
        </header>

        <section className="grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] items-start">
          <form onSubmit={onSubmit} className="space-y-3">
            <div className="space-y-2 text-sm">
              <label className="block text-slate-200">SQL query</label>
              <textarea
                rows={8}
                value={queryText}
                onChange={(e) => setQueryText(e.target.value)}
                className="w-full rounded-lg border border-slate-800 bg-slate-950/60 px-3 py-2 text-xs text-slate-100 outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 font-mono"
              />
              <p className="text-[11px] text-slate-500">
                We never execute your query; we only analyze the string.
              </p>
            </div>
            {error && (
              <p className="text-xs text-red-400 bg-red-500/10 border border-red-500/40 rounded-md px-3 py-2">
                {error}
              </p>
            )}
            <button
              type="submit"
              disabled={submitting || !queryText.trim()}
              className="inline-flex items-center justify-center rounded-md bg-brand-500 px-4 py-2 text-sm font-medium text-slate-950 hover:bg-brand-600 disabled:opacity-60 disabled:cursor-not-allowed transition"
            >
              {submitting ? "Analyzing…" : "Analyze query"}
            </button>
          </form>

          <QueryResultCard result={result} />
        </section>

        <section className="space-y-3">
          <h2 className="text-sm font-medium text-slate-200">
            Recent analyses
          </h2>
          {recent.length === 0 ? (
            <p className="text-xs text-slate-500">
              You don&apos;t have any saved analyses yet.
            </p>
          ) : (
            <div className="overflow-hidden rounded-xl border border-slate-800 bg-slate-900/60">
              <table className="w-full text-xs">
                <thead className="bg-slate-950/40 text-slate-400">
                  <tr>
                    <th className="px-3 py-2 text-left font-medium">Time</th>
                    <th className="px-3 py-2 text-left font-medium">
                      Severity
                    </th>
                    <th className="px-3 py-2 text-left font-medium">Score</th>
                    <th className="px-3 py-2 text-left font-medium">
                      Query
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {recent.map((item) => (
                    <tr
                      key={item.id}
                      className="border-t border-slate-800/70 text-slate-200"
                    >
                      <td className="px-3 py-2">
                        {new Date(item.created_at).toLocaleString()}
                      </td>
                      <td className="px-3 py-2 capitalize">
                        {item.severity}
                      </td>
                      <td className="px-3 py-2">{item.risk_score}</td>
                      <td className="px-3 py-2 max-w-xs truncate">
                        {item.query_text}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>
    </AppLayout>
  );
}

