import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AppLayout from "../components/AppLayout";
import { api, loadTokenFromStorage, type QueryAnalysis } from "../lib/api";
import SeverityBadge from "../components/SeverityBadge";

export default function HistoryPage() {
  const [items, setItems] = useState<QueryAnalysis[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    loadTokenFromStorage();
    api
      .get<QueryAnalysis[]>("/query")
      .then((res) => setItems(res.data))
      .catch((err) => {
        if (err?.response?.status === 401) {
          navigate("/login");
        } else {
          setError("Unable to load history.");
        }
      })
      .finally(() => setLoading(false));
  }, [navigate]);

  return (
    <AppLayout>
      <div className="space-y-4">
        <header className="space-y-1">
          <h1 className="text-xl font-semibold tracking-tight">
            Analysis history
          </h1>
          <p className="text-xs text-slate-400 max-w-xl">
            All saved query analyses for your account, newest first.
          </p>
        </header>

        {loading ? (
          <p className="text-xs text-slate-400">Loading…</p>
        ) : error ? (
          <p className="text-xs text-red-400">{error}</p>
        ) : items.length === 0 ? (
          <p className="text-xs text-slate-500">
            No analyses yet. Run your first one from the Live Analyzer.
          </p>
        ) : (
          <div className="overflow-hidden rounded-xl border border-slate-800 bg-slate-900/60">
            <table className="w-full text-xs">
              <thead className="bg-slate-950/40 text-slate-400">
                <tr>
                  <th className="px-3 py-2 text-left font-medium">Time</th>
                  <th className="px-3 py-2 text-left font-medium">Severity</th>
                  <th className="px-3 py-2 text-left font-medium">Score</th>
                  <th className="px-3 py-2 text-left font-medium">Query</th>
                  <th className="px-3 py-2 text-left font-medium">Flags</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => {
                  const flags = item.flags
                    ? item.flags
                        .split(",")
                        .map((f) => f.trim())
                        .filter(Boolean)
                    : [];
                  return (
                    <tr
                      key={item.id}
                      className="border-t border-slate-800/70 text-slate-200 align-top"
                    >
                      <td className="px-3 py-2 whitespace-nowrap">
                        {new Date(item.created_at).toLocaleString()}
                      </td>
                      <td className="px-3 py-2">
                        <SeverityBadge severity={item.severity} />
                      </td>
                      <td className="px-3 py-2">{item.risk_score}</td>
                      <td className="px-3 py-2 max-w-xs truncate">
                        {item.query_text}
                      </td>
                      <td className="px-3 py-2 max-w-xs">
                        <div className="flex flex-wrap gap-1">
                          {flags.map((flag) => (
                            <span
                              key={flag}
                              className="rounded-full bg-slate-800 px-2.5 py-0.5 text-[11px] text-slate-200"
                            >
                              {flag}
                            </span>
                          ))}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </AppLayout>
  );
}

