"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, User, Phone, Mail } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import toast from "react-hot-toast";

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [tab, setTab] = useState<"customer" | "technician">("customer");
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", email: "", password: "", service: "" });
  const router = useRouter();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const supabase = createClient();
    const email = form.email || `${form.phone.replace(/\D/g, "")}@taskam.ng`;

    const { data, error } = await supabase.auth.signUp({
      email,
      password: form.password,
      options: { data: { name: form.name, phone: form.phone, role: tab } },
    });

    if (error) { toast.error(error.message); setLoading(false); return; }

    if (data.user) {
      if (tab === "customer") {
        await supabase.from("users").insert({ id: data.user.id, name: form.name, email: form.email || null, phone: form.phone });
        toast.success("Account created! Welcome to Taskam.");
        router.push("/customer/dashboard");
      } else {
        await supabase.from("technicians").insert({ id: data.user.id, name: form.name, email: form.email || null, phone: form.phone, status: "pending" });
        toast.success("Application submitted! We'll review it within 24 hours.");
        router.push("/technician/apply?step=done");
      }
    }
    setLoading(false);
  };

  const inputClass = "w-full rounded-xl py-3 pr-4 text-sm text-white focus:outline-none transition-all";
  const inputStyle = { background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" };

  return (
    <div className="min-h-screen flex" style={{ background: "var(--bg-gradient)" }}>
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-[45%] flex-col justify-between p-12 relative overflow-hidden"
        style={{ borderRight: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="orb w-80 h-80 -top-20 -left-20 opacity-15" style={{ background: "radial-gradient(circle, #1B3A6B, transparent)" }} />
        <div className="orb w-64 h-64 bottom-0 right-0 opacity-10" style={{ background: "radial-gradient(circle, #F97316, transparent)" }} />

        <Link href="/" className="relative flex items-center gap-2">
          <span className="text-2xl font-black text-white">TASKAM</span>
          <span className="text-xs font-bold px-1.5 py-0.5 rounded text-white" style={{ background: "linear-gradient(135deg, #F97316, #fb923c)" }}>NG</span>
        </Link>

        <div className="relative">
          <h2 className="text-4xl font-black text-white leading-tight mb-4">
            {tab === "customer" ? "Book trusted home services in minutes." : "Earn more by joining Nigeria's top service platform."}
          </h2>
          <p className="mb-8 text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>
            {tab === "customer" ? "Join thousands of Nigerians who trust Taskam." : "Set your own schedule and get paid reliably."}
          </p>
          <div className="space-y-3">
            {(tab === "customer"
              ? ["Free to sign up", "Pay cash on arrival", "Verified professionals only", "24/7 customer support"]
              : ["Earn ₦50,000+ per month", "Flexible working hours", "Weekly payouts", "Free training & support"]
            ).map((item) => (
              <div key={item} className="flex items-center gap-3">
                <span className="w-5 h-5 rounded-full flex items-center justify-center text-white text-xs shrink-0"
                  style={{ background: "linear-gradient(135deg, #F97316, #ea6c00)" }}>✓</span>
                <span className="text-sm" style={{ color: "rgba(255,255,255,0.7)" }}>{item}</span>
              </div>
            ))}
          </div>
        </div>

        <p className="relative text-sm" style={{ color: "rgba(255,255,255,0.25)" }}>© 2026 Taskam Technologies Ltd.</p>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <Link href="/" className="flex items-center gap-2 mb-8 lg:hidden">
            <span className="text-xl font-black text-white">TASKAM</span>
            <span className="text-xs font-bold px-1.5 py-0.5 rounded text-white" style={{ background: "linear-gradient(135deg, #F97316, #fb923c)" }}>NG</span>
          </Link>

          <h1 className="text-2xl font-black text-white mb-1">Create your account</h1>
          <p className="text-sm mb-6" style={{ color: "rgba(255,255,255,0.45)" }}>
            Already have an account?{" "}
            <Link href="/auth/login" className="font-semibold" style={{ color: "#F97316" }}>Log in</Link>
          </p>

          {/* Tab switcher */}
          <div className="flex rounded-xl p-1 mb-6" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)" }}>
            {(["customer", "technician"] as const).map((r) => (
              <button key={r} onClick={() => setTab(r)}
                className="flex-1 py-2 text-xs font-semibold rounded-lg capitalize transition-all"
                style={tab === r
                  ? { background: "linear-gradient(135deg, #F97316, #ea6c00)", color: "white" }
                  : { color: "rgba(255,255,255,0.45)" }}>
                {r === "customer" ? "I Need A Service" : "I'm A Professional"}
              </button>
            ))}
          </div>

          <form onSubmit={handleSignup} className="space-y-4">
            <div>
              <label className="text-sm font-semibold block mb-1.5" style={{ color: "rgba(255,255,255,0.7)" }}>Full name</label>
              <div className="relative">
                <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "rgba(255,255,255,0.3)" }} />
                <input type="text" placeholder="Amaka Okonkwo" required value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className={`${inputClass} pl-10`} style={inputStyle} />
              </div>
            </div>

            <div>
              <label className="text-sm font-semibold block mb-1.5" style={{ color: "rgba(255,255,255,0.7)" }}>Phone number</label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
                  <span className="text-sm">🇳🇬</span>
                  <span className="text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>+234</span>
                </div>
                <input type="tel" placeholder="800 000 0000" required value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className={`${inputClass} pl-16`} style={inputStyle} />
              </div>
            </div>

            <div>
              <label className="text-sm font-semibold block mb-1.5" style={{ color: "rgba(255,255,255,0.7)" }}>
                Email address <span className="font-normal" style={{ color: "rgba(255,255,255,0.3)" }}>(optional)</span>
              </label>
              <div className="relative">
                <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "rgba(255,255,255,0.3)" }} />
                <input type="email" placeholder="amaka@example.com" value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className={`${inputClass} pl-10`} style={inputStyle} />
              </div>
            </div>

            <div>
              <label className="text-sm font-semibold block mb-1.5" style={{ color: "rgba(255,255,255,0.7)" }}>Password</label>
              <div className="relative">
                <input type={showPassword ? "text" : "password"} placeholder="At least 8 characters" required
                  value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })}
                  className={`${inputClass} pl-4 pr-10`} style={inputStyle} />
                <button type="button" onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2" style={{ color: "rgba(255,255,255,0.3)" }}>
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {tab === "technician" && (
              <div>
                <label className="text-sm font-semibold block mb-1.5" style={{ color: "rgba(255,255,255,0.7)" }}>Primary skill</label>
                <select value={form.service} onChange={(e) => setForm({ ...form, service: e.target.value })}
                  className="w-full rounded-xl py-3 px-4 text-sm focus:outline-none text-white"
                  style={{ ...inputStyle, background: "rgba(255,255,255,0.06)" }}>
                  <option value="" style={{ background: "#0a1020" }}>Select your main service</option>
                  {["Cleaning", "Plumbing", "Electrical", "Appliance Repair", "Painting", "Carpentry", "Moving"].map(s => (
                    <option key={s} value={s} style={{ background: "#0a1020" }}>{s}</option>
                  ))}
                </select>
              </div>
            )}

            <p className="text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>
              By creating an account you agree to our{" "}
              <Link href="/terms" className="underline hover:text-white transition-colors">Terms</Link> and{" "}
              <Link href="/privacy" className="underline hover:text-white transition-colors">Privacy Policy</Link>.
            </p>

            <button type="submit" disabled={loading}
              className="w-full py-3.5 rounded-xl text-white font-bold text-sm transition-all hover:opacity-90 active:scale-95 disabled:opacity-60"
              style={{ background: "linear-gradient(135deg, #F97316, #ea6c00)", boxShadow: "0 0 24px rgba(249,115,22,0.35)" }}>
              {loading ? "Creating account..." : tab === "technician" ? "Apply to Join as a Pro" : "Create My Account"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
