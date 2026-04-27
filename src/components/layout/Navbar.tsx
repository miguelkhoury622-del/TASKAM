"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, Bell, User, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span
              className="text-2xl font-black tracking-tight"
              style={{ color: "#1B3A6B" }}
            >
              TASKAM
            </span>
            <span
              className="text-xs font-semibold px-1.5 py-0.5 rounded"
              style={{ backgroundColor: "#F97316", color: "white" }}
            >
              NG
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/services"
              className="text-sm font-medium text-slate-600 hover:text-[#1B3A6B] transition-colors"
            >
              Services
            </Link>
            <Link
              href="/how-it-works"
              className="text-sm font-medium text-slate-600 hover:text-[#1B3A6B] transition-colors"
            >
              How It Works
            </Link>
            <Link
              href="/technician/apply"
              className="text-sm font-medium text-slate-600 hover:text-[#1B3A6B] transition-colors"
            >
              Become a Pro
            </Link>
          </div>

          {/* Desktop Auth */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/auth/login"
              className="text-sm font-medium text-slate-700 hover:text-[#1B3A6B] transition-colors px-4 py-2"
            >
              Log in
            </Link>
            <Link
              href="/auth/signup"
              className="text-sm font-semibold px-5 py-2 rounded-lg text-white transition-all hover:opacity-90"
              style={{ backgroundColor: "#F97316" }}
            >
              Get Started
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-slate-100 px-4 py-4 flex flex-col gap-3">
          <Link href="/services" className="text-sm font-medium text-slate-700 py-2">
            Services
          </Link>
          <Link href="/how-it-works" className="text-sm font-medium text-slate-700 py-2">
            How It Works
          </Link>
          <Link href="/technician/apply" className="text-sm font-medium text-slate-700 py-2">
            Become a Pro
          </Link>
          <hr className="border-slate-100" />
          <Link
            href="/auth/login"
            className="text-sm font-medium text-slate-700 py-2"
          >
            Log in
          </Link>
          <Link
            href="/auth/signup"
            className="text-sm font-semibold px-5 py-3 rounded-lg text-white text-center"
            style={{ backgroundColor: "#F97316" }}
          >
            Get Started
          </Link>
        </div>
      )}
    </nav>
  );
}
