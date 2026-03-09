import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api, setAuthToken, loadTokenFromStorage } from "../lib/api";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  loadTokenFromStorage();

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const res = await api.post("/auth/login", { email, password });
      const token = res.data.access_token as string;
      setAuthToken(token);
      navigate("/app");
    } catch (err: any) {
      setError(
        err?.response?.data?.detail ??
          "We couldn't sign you in. Please check your email and password."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 text-slate-50 px-4">
      <div className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900/80 p-6 shadow-xl">
        <div className="mb-6">
          <div className="text-sm font-semibold text-brand-500 mb-1">
            QueryShield
          </div>
          <h1 className="text-xl font-semibold tracking-tight">
            Sign in to your account
          </h1>
          <p className="mt-1 text-xs text-slate-400">
            Use the same credentials you created via the API or UI.
          </p>
        </div>
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="space-y-1 text-sm">
            <label className="block text-slate-200">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-md border border-slate-700 bg-slate-950/60 px-3 py-2 text-sm outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
            />
          </div>
          <div className="space-y-1 text-sm">
            <label className="block text-slate-200">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-md border border-slate-700 bg-slate-950/60 px-3 py-2 text-sm outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
            />
          </div>
          {error && (
            <p className="text-xs text-red-400 bg-red-500/10 border border-red-500/40 rounded-md px-3 py-2">
              {error}
            </p>
          )}
          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-md bg-brand-500 py-2 text-sm font-medium text-slate-950 hover:bg-brand-600 disabled:opacity-60 disabled:cursor-not-allowed transition"
          >
            {submitting ? "Signing in..." : "Sign in"}
          </button>
        </form>
        <p className="mt-4 text-xs text-slate-400">
          New here?{" "}
          <Link
            to="/register"
            className="text-brand-400 hover:text-brand-300 underline-offset-2 hover:underline"
          >
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
}

