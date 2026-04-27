"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50" style={{
      background: "rgba(7, 13, 26, 0.7)",
      backdropFilter: "blur(20px)",
      WebkitBackdropFilter: "blur(20px)",
      borderBottom: "1px solid rgba(255,255,255,0.08)"
    }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl font-black tracking-tight text-white">TASKAM</span>
            <span className="text-xs font-bold px-1.5 py-0.5 rounded" style={{ background: "linear-gradient(135deg, #F97316, #fb923c)", color: "white" }}>NG</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {["Services", "How It Works", "Become a Pro"].map((item) => (
              <Link key={item}
                href={item === "Services" ? "/services" : item === "How It Works" ? "/how-it-works" : "/technician/apply"}
                className="text-sm font-medium transition-colors"
                style={{ color: "rgba(255,255,255,0.6)" }}
                onMouseEnter={e => (e.currentTarget.style.color = "white")}
                onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.6)")}
              >
                {item}
              </Link>
            ))}
          </div>

          {/* Desktop Auth */}
          <div className="hidden md:flex items-center gap-3">
            <Link href="/auth/login" className="text-sm font-medium px-4 py-2 rounded-xl transition-all"
              style={{ color: "rgba(255,255,255,0.7)", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}>
              Log in
            </Link>
            <Link href="/auth/signup"
              className="text-sm font-bold px-5 py-2 rounded-xl text-white transition-all hover:opacity-90"
              style={{ background: "linear-gradient(135deg, #F97316, #ea6c00)", boxShadow: "0 0 20px rgba(249,115,22,0.3)" }}>
              Get Started
            </Link>
          </div>

          <button className="md:hidden p-2 rounded-xl" style={{ color: "rgba(255,255,255,0.7)", background: "rgba(255,255,255,0.06)" }}
            onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden px-4 py-4 flex flex-col gap-3" style={{ background: "rgba(7,13,26,0.95)", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
          {["Services", "How It Works", "Become a Pro"].map((item) => (
            <Link key={item}
              href={item === "Services" ? "/services" : item === "How It Works" ? "/how-it-works" : "/technician/apply"}
              className="text-sm font-medium py-2" style={{ color: "rgba(255,255,255,0.7)" }}>
              {item}
            </Link>
          ))}
          <hr style={{ borderColor: "rgba(255,255,255,0.08)" }} />
          <Link href="/auth/login" className="text-sm font-medium py-2" style={{ color: "rgba(255,255,255,0.7)" }}>Log in</Link>
          <Link href="/auth/signup" className="text-sm font-bold px-5 py-3 rounded-xl text-white text-center"
            style={{ background: "linear-gradient(135deg, #F97316, #ea6c00)" }}>
            Get Started
          </Link>
        </div>
      )}
    </nav>
  );
}
