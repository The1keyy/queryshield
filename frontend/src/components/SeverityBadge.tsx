export default function SeverityBadge({ severity }: { severity: string }) {
  const s = severity.toLowerCase();
  const map: Record<string, string> = {
    low: "bg-emerald-500/15 text-emerald-300 border-emerald-500/40",
    medium: "bg-amber-500/15 text-amber-300 border-amber-500/40",
    high: "bg-orange-500/15 text-orange-300 border-orange-500/40",
    critical: "bg-red-500/15 text-red-300 border-red-500/40"
  };
  const cls = map[s] ?? "bg-slate-500/15 text-slate-200 border-slate-500/40";

  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${cls}`}
    >
      {severity}
    </span>
  );
}

