import { ReactNode } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { setAuthToken } from "../lib/api";

const navItems = [
  { to: "/app", label: "Live Analyzer" },
  { to: "/history", label: "History" },
  { to: "/high-risk", label: "High-Risk Only" }
];

export default function AppLayout({ children }: { children: ReactNode }) {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    setAuthToken(null);
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex bg-slate-950 text-slate-100">
      <aside className="w-64 border-r border-slate-800 bg-slate-950/80 backdrop-blur">
        <div className="h-16 flex items-center px-6 border-b border-slate-800">
          <Link to="/" className="font-semibold tracking-tight">
            <span className="text-brand-500">Query</span>Shield
          </Link>
        </div>
        <nav className="px-4 py-4 space-y-1 text-sm">
          {navItems.map((item) => {
            const active = location.pathname === item.to;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`flex items-center px-3 py-2 rounded-md transition ${
                  active
                    ? "bg-slate-800 text-slate-50"
                    : "text-slate-300 hover:bg-slate-800/80 hover:text-slate-50"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="mt-auto px-4 pb-4">
          <button
            onClick={handleLogout}
            className="w-full text-left px-3 py-2 text-sm rounded-md text-slate-400 hover:bg-slate-800 hover:text-slate-50 transition"
          >
            Log out
          </button>
        </div>
      </aside>
      <main className="flex-1 min-w-0">
        <div className="max-w-6xl mx-auto px-6 py-6">{children}</div>
      </main>
    </div>
  );
}

