"use client";

import { useState } from "react";
import Link from "next/link";
import { Briefcase, DollarSign, Star, Clock, CheckCircle, XCircle, ChevronRight, MapPin } from "lucide-react";

const jobs = [
  { id: "JOB-001", service: "Deep House Cleaning", emoji: "🧹", customer: "Amaka O.", location: "Lekki Phase 1, Lagos", date: "Apr 26, 2026", time: "10:00 AM", amount: 15000, status: "pending" },
  { id: "JOB-002", service: "Bathroom Cleaning", emoji: "🚿", customer: "Tunde A.", location: "Ikeja GRA, Lagos", date: "Apr 26, 2026", time: "02:00 PM", amount: 8000, status: "confirmed" },
  { id: "JOB-003", service: "Office Cleaning", emoji: "🏢", customer: "Chioma N.", location: "VI, Lagos", date: "Apr 24, 2026", time: "09:00 AM", amount: 20000, status: "completed" },
];

const statusConfig = {
  pending: { label: "Pending", color: "#F97316", bg: "#FFF7ED" },
  confirmed: { label: "Confirmed", color: "#1B3A6B", bg: "#EFF6FF" },
  in_progress: { label: "In Progress", color: "#0284c7", bg: "#E0F2FE" },
  completed: { label: "Completed", color: "#16a34a", bg: "#F0FDF4" },
  cancelled: { label: "Cancelled", color: "#dc2626", bg: "#FEF2F2" },
};

function formatNaira(n: number) { return "₦" + n.toLocaleString("en-NG"); }

export default function TechnicianDashboard() {
  const [activeTab, setActiveTab] = useState<"jobs" | "earnings" | "profile">("jobs");

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: "#f8fafc" }}>
      {/* Technician Navbar */}
      <nav className="bg-[#1B3A6B] text-white px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between sticky top-0 z-50">
        <span className="text-xl font-black">TASKAM <span className="text-xs font-semibold bg-[#F97316] px-1.5 py-0.5 rounded ml-1">PRO</span></span>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-sm font-bold">EO</div>
        </div>
      </nav>

      <main className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 py-8">
        {/* Welcome + availability */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-black text-slate-900">Pro Dashboard</h1>
            <p className="text-sm text-slate-500 mt-0.5">Welcome, Emeka 👋</p>
          </div>
          <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-xl px-4 py-2">
            <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
            <span className="text-sm font-semibold text-slate-700">Available</span>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Today's Jobs", value: "2", icon: <Briefcase size={16} />, color: "#1B3A6B" },
            { label: "This Week", value: "₦55,000", icon: <DollarSign size={16} />, color: "#16a34a" },
            { label: "Rating", value: "4.9★", icon: <Star size={16} />, color: "#F97316" },
            { label: "Total Jobs", value: "148", icon: <CheckCircle size={16} />, color: "#7C3AED" },
          ].map((stat) => (
            <div key={stat.label} className="bg-white rounded-2xl border border-slate-100 p-4">
              <span style={{ color: stat.color }}>{stat.icon}</span>
              <p className="text-xl font-black text-slate-900 mt-1">{stat.value}</p>
              <p className="text-xs text-slate-400 mt-0.5">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex border-b border-slate-200 mb-6">
          {(["jobs", "earnings", "profile"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-3 text-sm font-semibold capitalize border-b-2 transition-all ${
                activeTab === tab ? "border-[#1B3A6B] text-[#1B3A6B]" : "border-transparent text-slate-400"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Jobs tab */}
        {activeTab === "jobs" && (
          <div className="space-y-3">
            {jobs.map((job) => {
              const s = statusConfig[job.status as keyof typeof statusConfig];
              return (
                <div key={job.id} className="bg-white border border-slate-100 rounded-2xl p-5">
                  <div className="flex items-start gap-3 mb-4">
                    <div className="w-11 h-11 rounded-xl flex items-center justify-center text-2xl shrink-0" style={{ backgroundColor: "#f8fafc" }}>
                      {job.emoji}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className="text-sm font-bold text-slate-900">{job.service}</p>
                          <p className="text-xs text-slate-400 mt-0.5">{job.customer}</p>
                        </div>
                        <span
                          className="text-xs font-semibold px-2 py-0.5 rounded-full shrink-0"
                          style={{ color: s.color, backgroundColor: s.bg }}
                        >
                          {s.label}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 mt-2 text-xs text-slate-500">
                        <span className="flex items-center gap-1"><MapPin size={11} /> {job.location}</span>
                        <span className="flex items-center gap-1"><Clock size={11} /> {job.date} · {job.time}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-base font-black text-slate-900">{formatNaira(job.amount)}</span>
                    {job.status === "pending" && (
                      <div className="flex gap-2">
                        <button className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold text-white bg-red-500 hover:bg-red-600 transition-colors">
                          <XCircle size={14} /> Decline
                        </button>
                        <button className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold text-white transition-colors hover:opacity-90" style={{ backgroundColor: "#1B3A6B" }}>
                          <CheckCircle size={14} /> Accept
                        </button>
                      </div>
                    )}
                    {job.status === "confirmed" && (
                      <button className="px-3 py-2 rounded-lg text-xs font-semibold text-white transition-colors hover:opacity-90" style={{ backgroundColor: "#F97316" }}>
                        Mark On The Way
                      </button>
                    )}
                    {job.status === "completed" && (
                      <span className="text-xs text-green-600 font-semibold flex items-center gap-1">
                        <CheckCircle size={13} /> Completed
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Earnings tab */}
        {activeTab === "earnings" && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white border border-slate-100 rounded-2xl p-5">
                <p className="text-xs text-slate-400 mb-1">This Week</p>
                <p className="text-2xl font-black text-slate-900">₦55,000</p>
                <p className="text-xs text-green-600 mt-1">↑ 12% vs last week</p>
              </div>
              <div className="bg-white border border-slate-100 rounded-2xl p-5">
                <p className="text-xs text-slate-400 mb-1">This Month</p>
                <p className="text-2xl font-black text-slate-900">₦210,000</p>
                <p className="text-xs text-green-600 mt-1">↑ 8% vs last month</p>
              </div>
            </div>
            <div className="bg-white border border-slate-100 rounded-2xl p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-slate-900">Available Balance</h3>
                <span className="text-2xl font-black" style={{ color: "#1B3A6B" }}>₦43,500</span>
              </div>
              <button className="w-full py-3 rounded-xl text-white font-semibold text-sm" style={{ backgroundColor: "#F97316" }}>
                Request Payout
              </button>
            </div>
          </div>
        )}

        {/* Profile tab */}
        {activeTab === "profile" && (
          <div className="bg-white border border-slate-100 rounded-2xl p-6">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold text-white" style={{ backgroundColor: "#1B3A6B" }}>EO</div>
              <div>
                <p className="font-bold text-slate-900">Emeka Okafor</p>
                <p className="text-sm text-slate-500">Cleaning · Lagos</p>
                <div className="flex items-center gap-1 mt-1">
                  <Star size={12} className="text-yellow-400 fill-yellow-400" />
                  <span className="text-xs font-semibold text-slate-700">4.9</span>
                  <span className="text-xs text-slate-400">(148 jobs)</span>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              {["Edit Profile", "My Services", "Availability Schedule", "Bank Details", "Support"].map((item) => (
                <button key={item} className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition-colors text-sm text-slate-700">
                  {item}
                  <ChevronRight size={14} className="text-slate-300" />
                </button>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
