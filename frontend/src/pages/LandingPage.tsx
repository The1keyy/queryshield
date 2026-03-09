import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <header className="max-w-6xl mx-auto flex items-center justify-between px-6 py-5">
        <div className="font-semibold tracking-tight">
          <span className="text-brand-500">Query</span>Shield
        </div>
        <div className="flex items-center gap-3 text-sm">
          <Link
            to="/login"
            className="text-slate-300 hover:text-slate-50 transition"
          >
            Sign in
          </Link>
          <Link
            to="/register"
            className="rounded-full bg-brand-500 px-4 py-1.5 text-sm font-medium text-slate-950 hover:bg-brand-600 transition"
          >
            Get started
          </Link>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 pt-10 pb-20">
        <section className="grid gap-10 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] items-center">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl font-semibold tracking-tight">
              Catch SQL injection{" "}
              <span className="text-brand-500">before</span> it hits your
              database.
            </h1>
            <p className="text-slate-300 text-sm md:text-base max-w-xl">
              QueryShield inspects SQL query strings, detects suspicious
              injection patterns, and assigns a risk score with clear severity
              labels—built with FastAPI, PostgreSQL, and JWT auth.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/app"
                className="rounded-full bg-brand-500 px-5 py-2 text-sm font-medium text-slate-950 hover:bg-brand-600 transition"
              >
                Try live analyzer
              </Link>
              <a
                href="http://127.0.0.1:8000/docs"
                className="rounded-full border border-slate-700 px-5 py-2 text-sm font-medium text-slate-200 hover:border-slate-500 hover:bg-slate-900/60 transition"
              >
                View API docs
              </a>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 shadow-xl shadow-emerald-500/10">
            <div className="flex items-center justify-between mb-4 text-xs text-slate-400">
              <span>Example analysis</span>
              <span>high risk</span>
            </div>
            <pre className="rounded-md bg-slate-950/70 p-3 text-xs text-slate-200 mb-4 overflow-x-auto">
              <code>
                SELECT * FROM users WHERE username = &apos;admin&apos; OR 1=1
                --
              </code>
            </pre>
            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Risk score</span>
                <span className="font-semibold text-slate-50">60 / 100</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Severity</span>
                <span className="inline-flex items-center rounded-full bg-orange-500/20 px-2.5 py-0.5 text-[11px] font-medium text-orange-300">
                  high
                </span>
              </div>
              <div>
                <p className="text-slate-400">Flags</p>
                <div className="mt-1 flex flex-wrap gap-1.5">
                  <span className="rounded-full bg-slate-800 px-2.5 py-0.5 text-[11px] text-slate-200">
                    OR_ALWAYS_TRUE
                  </span>
                  <span className="rounded-full bg-slate-800 px-2.5 py-0.5 text-[11px] text-slate-200">
                    COMMENT_INJECTION
                  </span>
                </div>
              </div>
              <p className="mt-2 text-slate-300">
                Multiple indicators consistent with injection behavior.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

