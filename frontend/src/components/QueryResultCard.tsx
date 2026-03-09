import SeverityBadge from "./SeverityBadge";
import type { QueryAnalysis } from "../lib/api";

type Props = {
  result: QueryAnalysis | null;
};

export default function QueryResultCard({ result }: Props) {
  if (!result) {
    return (
      <div className="border border-dashed border-slate-700 rounded-xl p-6 text-sm text-slate-400">
        No analysis yet. Paste a SQL query and click “Analyze query”.
      </div>
    );
  }

  const flags = result.flags
    ? result.flags.split(",").map((f) => f.trim()).filter(Boolean)
    : [];

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6 space-y-4">
      <div className="flex items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <SeverityBadge severity={result.severity} />
            <span className="text-xs text-slate-400">
              Score {result.risk_score}/100
            </span>
          </div>
          <p className="mt-2 text-sm text-slate-300">
            {result.analysis_summary}
          </p>
        </div>
        <div className="text-right text-xs text-slate-500">
          {new Date(result.created_at).toLocaleString()}
        </div>
      </div>

      {flags.length > 0 && (
        <div className="space-y-1">
          <p className="text-xs font-medium text-slate-400">Matched flags</p>
          <div className="flex flex-wrap gap-1.5">
            {flags.map((flag) => (
              <span
                key={flag}
                className="inline-flex items-center rounded-full bg-slate-800 px-2.5 py-0.5 text-[11px] text-slate-200"
              >
                {flag}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="space-y-1">
        <p className="text-xs font-medium text-slate-400">Query inspected</p>
        <pre className="mt-1 max-h-40 overflow-auto rounded-md bg-slate-950/70 p-3 text-xs text-slate-200">
          <code>{result.query_text}</code>
        </pre>
      </div>
    </div>
  );
}

