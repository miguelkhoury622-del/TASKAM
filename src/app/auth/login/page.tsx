"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Phone } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import toast from "react-hot-toast";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [tab, setTab] = useState<"customer" | "technician" | "admin">("customer");
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const supabase = createClient();
    const email = identifier.includes("@")
      ? identifier
      : `${identifier.replace(/\D/g, "")}@taskam.ng`;

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      toast.error(error.message);
      setLoading(false);
      return;
    }

    toast.success("Welcome back!");

    if (tab === "admin") router.push("/admin/dashboard");
    else if (tab === "technician") router.push("/technician/dashboard");
    else router.push("/customer/dashboard");
  };

  return (
    <div className="min-h-screen flex" style={{ backgroundColor: "#f8fafc" }}>
      {/* Left panel */}
      <div
        className="hidden lg:flex lg:w-1/2 flex-col justify-between p-12"
        style={{ background: "linear-gradient(135deg, #1B3A6B 0%, #2a5298 100%)" }}
      >
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl font-black text-white">TASKAM</span>
          <span className="text-xs font-bold px-1.5 py-0.5 rounded bg-[#F97316] text-white">NG</span>
        </Link>
        <div>
          <h2 className="text-4xl font-black text-white leading-tight mb-4">
            Welcome back to Nigeria&apos;s most trusted home services platform.
          </h2>
          <p className="text-blue-200">Book professionals, track jobs, and pay your way — all in one place.</p>
          <div className="mt-10 grid grid-cols-2 gap-4">
            {[
              { number: "10,000+", label: "Jobs Done" },
              { number: "500+", label: "Verified Pros" },
              { number: "4.9★", label: "Avg Rating" },
              { number: "5 Cities", label: "Covered" },
            ].map((s) => (
              <div key={s.label} className="bg-white/10 rounded-xl p-4">
                <p className="text-xl font-black text-white">{s.number}</p>
                <p className="text-sm text-blue-200">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
        <p className="text-sm text-blue-300">© 2026 Taskam Technologies Ltd.</p>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <Link href="/" className="flex items-center gap-2 mb-8 lg:hidden">
            <span className="text-xl font-black" style={{ color: "#1B3A6B" }}>TASKAM</span>
            <span className="text-xs font-bold px-1.5 py-0.5 rounded bg-[#F97316] text-white">NG</span>
          </Link>

          <h1 className="text-2xl font-black text-slate-900 mb-1">Log in to your account</h1>
          <p className="text-sm text-slate-500 mb-6">
            Don&apos;t have an account?{" "}
            <Link href="/auth/signup" className="font-semibold" style={{ color: "#F97316" }}>Sign up free</Link>
          </p>

          {/* Role tabs */}
          <div className="flex rounded-xl border border-slate-200 p-1 mb-6 bg-white">
            {(["customer", "technician", "admin"] as const).map((r) => (
              <button
                key={r}
                onClick={() => setTab(r)}
                className={`flex-1 py-2 text-xs font-semibold rounded-lg capitalize transition-all ${tab === r ? "text-white shadow-sm" : "text-slate-500"}`}
                style={tab === r ? { backgroundColor: "#1B3A6B" } : {}}
              >
                {r}
              </button>
            ))}
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-sm font-semibold text-slate-700 block mb-1.5">
                {tab === "admin" ? "Email address" : "Phone number or email"}
              </label>
              <div className="relative">
                {tab !== "admin" && (
                  <Phone size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                )}
                <input
                  type={tab === "admin" ? "email" : "text"}
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder={tab === "admin" ? "admin@taskam.ng" : "+234 800 000 0000"}
                  required
                  className={`w-full border border-slate-200 rounded-xl py-3 pr-4 text-sm text-slate-800 focus:outline-none focus:ring-2 ${tab !== "admin" ? "pl-10" : "pl-4"}`}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-sm font-semibold text-slate-700">Password</label>
                <Link href="/auth/forgot-password" className="text-xs font-medium" style={{ color: "#1B3A6B" }}>Forgot password?</Link>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  className="w-full border border-slate-200 rounded-xl py-3 pl-4 pr-10 text-sm text-slate-800 focus:outline-none focus:ring-2"
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl text-white font-bold text-sm transition-all hover:opacity-90 active:scale-95 disabled:opacity-60 mt-2"
              style={{ backgroundColor: "#F97316" }}
            >
              {loading ? "Logging in..." : "Log In"}
            </button>
          </form>

          <div className="flex items-center gap-3 my-6">
            <hr className="flex-1 border-slate-200" />
            <span className="text-xs text-slate-400">or continue with</span>
            <hr className="flex-1 border-slate-200" />
          </div>

          <button className="w-full py-3 rounded-xl border border-slate-200 bg-white text-sm font-semibold text-slate-700 flex items-center justify-center gap-2 hover:bg-slate-50 transition-colors">
            🇬 Continue with Google
          </button>
        </div>
      </div>
    </div>
  );
}
