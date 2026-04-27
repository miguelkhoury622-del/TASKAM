"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import { Package, Star, Clock, ChevronRight, Plus, Bell, User } from "lucide-react";
import { getCustomerBookings } from "@/lib/data/bookings";
import { createClient } from "@/lib/supabase/client";
import { signOut } from "@/lib/auth/actions";

const statusConfig: Record<string, { label: string; color: string; bg: string }> = {
  pending: { label: "Pending", color: "#F97316", bg: "#FFF7ED" },
  confirmed: { label: "Confirmed", color: "#1B3A6B", bg: "#EFF6FF" },
  on_the_way: { label: "On the way", color: "#7C3AED", bg: "#F5F3FF" },
  in_progress: { label: "In Progress", color: "#0284c7", bg: "#E0F2FE" },
  completed: { label: "Completed", color: "#16a34a", bg: "#F0FDF4" },
  cancelled: { label: "Cancelled", color: "#dc2626", bg: "#FEF2F2" },
};

function formatNaira(n: number) { return "₦" + n.toLocaleString("en-NG"); }

export default function CustomerDashboard() {
  const [activeTab, setActiveTab] = useState<"orders" | "profile">("orders");
  const [bookings, setBookings] = useState<any[]>([]);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data }) => setUser(data.user));
    getCustomerBookings()
      .then(setBookings)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const completed = bookings.filter((b) => b.status === "completed").length;
  const upcoming = bookings.filter((b) => ["pending", "confirmed", "on_the_way", "in_progress"].includes(b.status)).length;

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: "#f8fafc" }}>
      <Navbar />
      <main className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-black text-slate-900">My Dashboard</h1>
            <p className="text-slate-500 text-sm mt-1">
              Welcome back, {user?.user_metadata?.name?.split(" ")[0] || "there"} 👋
            </p>
          </div>
          <Link href="/services"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-white text-sm font-semibold hover:opacity-90 transition-all"
            style={{ backgroundColor: "#F97316" }}>
            <Plus size={16} /> Book Service
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { label: "Total Bookings", value: bookings.length, icon: <Package size={18} />, color: "#1B3A6B" },
            { label: "Completed", value: completed, icon: <Star size={18} />, color: "#16a34a" },
            { label: "Upcoming", value: upcoming, icon: <Clock size={18} />, color: "#F97316" },
          ].map((stat) => (
            <div key={stat.label} className="bg-white rounded-2xl border border-slate-100 p-4 text-center">
              <span style={{ color: stat.color }}>{stat.icon}</span>
              <p className="text-2xl font-black text-slate-900 mt-1">{stat.value}</p>
              <p className="text-xs text-slate-500 mt-0.5">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex border-b border-slate-200 mb-6">
          {(["orders", "profile"] as const).map((tab) => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className={`px-4 py-3 text-sm font-semibold capitalize border-b-2 transition-all ${activeTab === tab ? "border-[#1B3A6B] text-[#1B3A6B]" : "border-transparent text-slate-400"}`}>
              {tab}
            </button>
          ))}
        </div>

        {/* Orders */}
        {activeTab === "orders" && (
          <div className="space-y-3">
            {loading ? (
              [...Array(3)].map((_, i) => <div key={i} className="bg-white rounded-2xl h-24 animate-pulse border border-slate-100" />)
            ) : bookings.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-2xl border border-slate-100">
                <span className="text-5xl">📋</span>
                <p className="text-slate-500 mt-4 mb-4">No bookings yet</p>
                <Link href="/services" className="inline-block px-6 py-3 rounded-xl text-white text-sm font-semibold" style={{ backgroundColor: "#F97316" }}>
                  Book your first service
                </Link>
              </div>
            ) : bookings.map((booking) => {
              const s = statusConfig[booking.status] || statusConfig.pending;
              return (
                <div key={booking.id} className="bg-white border border-slate-100 rounded-2xl p-5 hover:shadow-sm transition-shadow">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0" style={{ backgroundColor: "#f8fafc" }}>
                      {booking.services?.emoji || "🔧"}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className="text-sm font-bold text-slate-900">{booking.services?.name}</p>
                          <p className="text-xs text-slate-400 mt-0.5">
                            {booking.scheduled_date} · {booking.scheduled_time?.slice(0, 5)}
                          </p>
                          <p className="text-xs text-slate-500 mt-1">
                            Pro: {booking.technicians?.name || "Being assigned..."}
                          </p>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          <span className="text-xs font-semibold px-2.5 py-1 rounded-full"
                            style={{ color: s.color, backgroundColor: s.bg }}>
                            {s.label}
                          </span>
                          <span className="text-sm font-black text-slate-900">
                            {formatNaira(booking.total_amount)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Profile */}
        {activeTab === "profile" && (
          <div className="bg-white border border-slate-100 rounded-2xl p-6">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold text-white" style={{ backgroundColor: "#1B3A6B" }}>
                {user?.user_metadata?.name?.[0] || "U"}
              </div>
              <div>
                <p className="font-bold text-slate-900">{user?.user_metadata?.name || "User"}</p>
                <p className="text-sm text-slate-500">{user?.user_metadata?.phone}</p>
                <p className="text-sm text-slate-500">{user?.email}</p>
              </div>
            </div>
            <div className="space-y-2">
              {[
                { label: "Edit Profile", icon: <User size={16} /> },
                { label: "Saved Addresses", icon: <Package size={16} /> },
                { label: "Notifications", icon: <Bell size={16} /> },
              ].map((item) => (
                <button key={item.label} className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition-colors text-sm text-slate-700">
                  <span className="flex items-center gap-3">
                    <span className="text-slate-400">{item.icon}</span>
                    {item.label}
                  </span>
                  <ChevronRight size={14} className="text-slate-300" />
                </button>
              ))}
              <button onClick={() => signOut()}
                className="w-full flex items-center p-3 rounded-xl hover:bg-red-50 transition-colors text-sm text-red-500 mt-2">
                Log Out
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
