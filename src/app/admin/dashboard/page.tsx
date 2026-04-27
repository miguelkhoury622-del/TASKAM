"use client";

import { useState } from "react";
import { Users, Briefcase, DollarSign, Star, TrendingUp, CheckCircle, XCircle, Clock, ChevronRight, Shield, Package, Tag, BarChart3, LogOut } from "lucide-react";

const tabs = ["Overview", "Orders", "Technicians", "Users", "Services", "Payouts", "Promos"];

const recentOrders = [
  { id: "ORD-001", customer: "Amaka O.", service: "House Cleaning", technician: "Blessing A.", amount: 15000, status: "completed", date: "Apr 26" },
  { id: "ORD-002", customer: "Tunde A.", service: "Plumbing Repair", technician: "Emeka O.", amount: 12000, status: "in_progress", date: "Apr 26" },
  { id: "ORD-003", customer: "Fatima B.", service: "AC Service", technician: "Unassigned", amount: 20000, status: "pending", date: "Apr 27" },
  { id: "ORD-004", customer: "Chukwudi E.", service: "Electrical", technician: "Kola A.", amount: 18000, status: "confirmed", date: "Apr 27" },
];

const pendingTechnicians = [
  { name: "Akin Balogun", service: "Electrical", city: "Lagos", applied: "2 days ago", phone: "+234 802 xxx xxxx" },
  { name: "Ngozi Eze", service: "Cleaning", city: "Abuja", applied: "1 day ago", phone: "+234 803 xxx xxxx" },
  { name: "Yusuf Musa", service: "Plumbing", city: "Kano", applied: "3 hours ago", phone: "+234 805 xxx xxxx" },
];

const statusConfig: Record<string, { label: string; color: string; bg: string }> = {
  pending: { label: "Pending", color: "#F97316", bg: "#FFF7ED" },
  confirmed: { label: "Confirmed", color: "#1B3A6B", bg: "#EFF6FF" },
  in_progress: { label: "In Progress", color: "#0284c7", bg: "#E0F2FE" },
  completed: { label: "Completed", color: "#16a34a", bg: "#F0FDF4" },
  cancelled: { label: "Cancelled", color: "#dc2626", bg: "#FEF2F2" },
};

function formatNaira(n: number) { return "₦" + n.toLocaleString("en-NG"); }

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("Overview");

  return (
    <div className="min-h-screen flex" style={{ backgroundColor: "#f8fafc" }}>
      {/* Sidebar */}
      <aside className="hidden lg:flex flex-col w-56 bg-[#1B3A6B] text-white min-h-screen fixed top-0 left-0">
        <div className="p-6 border-b border-white/10">
          <span className="text-xl font-black">TASKAM</span>
          <span className="text-xs font-semibold bg-[#F97316] px-1.5 py-0.5 rounded ml-2">ADMIN</span>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {[
            { label: "Overview", icon: <BarChart3 size={16} /> },
            { label: "Orders", icon: <Package size={16} /> },
            { label: "Technicians", icon: <Briefcase size={16} /> },
            { label: "Users", icon: <Users size={16} /> },
            { label: "Services", icon: <Star size={16} /> },
            { label: "Payouts", icon: <DollarSign size={16} /> },
            { label: "Promos", icon: <Tag size={16} /> },
          ].map((item) => (
            <button
              key={item.label}
              onClick={() => setActiveTab(item.label)}
              className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium transition-all text-left ${
                activeTab === item.label ? "bg-white/20 text-white" : "text-blue-200 hover:bg-white/10"
              }`}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-white/10">
          <button className="flex items-center gap-2 text-sm text-blue-200 hover:text-white transition-colors">
            <LogOut size={16} /> Log Out
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 lg:ml-56">
        {/* Top bar */}
        <div className="bg-white border-b border-slate-200 h-14 flex items-center justify-between px-6 sticky top-0 z-10">
          <h1 className="font-bold text-slate-900">{activeTab}</h1>
          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-400">Super Admin</span>
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white" style={{ backgroundColor: "#1B3A6B" }}>A</div>
          </div>
        </div>

        <div className="p-6">
          {/* Overview */}
          {activeTab === "Overview" && (
            <div className="space-y-6">
              {/* KPIs */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { label: "Total Revenue", value: "₦4.2M", change: "+18%", icon: <DollarSign size={20} />, color: "#16a34a" },
                  { label: "Total Orders", value: "1,248", change: "+12%", icon: <Package size={20} />, color: "#1B3A6B" },
                  { label: "Active Pros", value: "512", change: "+5%", icon: <Briefcase size={20} />, color: "#F97316" },
                  { label: "Customers", value: "3,847", change: "+22%", icon: <Users size={20} />, color: "#7C3AED" },
                ].map((kpi) => (
                  <div key={kpi.label} className="bg-white border border-slate-100 rounded-2xl p-5">
                    <div className="flex items-center justify-between mb-3">
                      <span style={{ color: kpi.color }}>{kpi.icon}</span>
                      <span className="text-xs font-semibold text-green-600">{kpi.change} ↑</span>
                    </div>
                    <p className="text-2xl font-black text-slate-900">{kpi.value}</p>
                    <p className="text-xs text-slate-400 mt-0.5">{kpi.label}</p>
                  </div>
                ))}
              </div>

              {/* Recent orders */}
              <div className="bg-white border border-slate-100 rounded-2xl overflow-hidden">
                <div className="flex items-center justify-between p-5 border-b border-slate-50">
                  <h3 className="font-bold text-slate-900">Recent Orders</h3>
                  <button onClick={() => setActiveTab("Orders")} className="text-xs font-semibold flex items-center gap-1" style={{ color: "#1B3A6B" }}>
                    View all <ChevronRight size={12} />
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-slate-50">
                        {["Order ID", "Customer", "Service", "Technician", "Amount", "Status", "Date"].map((h) => (
                          <th key={h} className="text-left text-xs font-semibold text-slate-400 px-5 py-3">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {recentOrders.map((order) => {
                        const s = statusConfig[order.status];
                        return (
                          <tr key={order.id} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                            <td className="px-5 py-3 text-xs font-mono text-slate-500">{order.id}</td>
                            <td className="px-5 py-3 text-sm font-medium text-slate-800">{order.customer}</td>
                            <td className="px-5 py-3 text-sm text-slate-600">{order.service}</td>
                            <td className="px-5 py-3 text-sm text-slate-600">{order.technician}</td>
                            <td className="px-5 py-3 text-sm font-bold text-slate-900">{formatNaira(order.amount)}</td>
                            <td className="px-5 py-3">
                              <span className="text-xs font-semibold px-2 py-0.5 rounded-full" style={{ color: s.color, backgroundColor: s.bg }}>
                                {s.label}
                              </span>
                            </td>
                            <td className="px-5 py-3 text-xs text-slate-400">{order.date}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Pending technician approvals */}
              <div className="bg-white border border-slate-100 rounded-2xl overflow-hidden">
                <div className="flex items-center justify-between p-5 border-b border-slate-50">
                  <h3 className="font-bold text-slate-900">Pending Technician Approvals</h3>
                  <span className="text-xs font-bold px-2 py-0.5 rounded-full text-white bg-[#F97316]">{pendingTechnicians.length}</span>
                </div>
                <div className="divide-y divide-slate-50">
                  {pendingTechnicians.map((tech) => (
                    <div key={tech.name} className="flex items-center justify-between p-5">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm text-white" style={{ backgroundColor: "#1B3A6B" }}>
                          {tech.name[0]}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-slate-900">{tech.name}</p>
                          <p className="text-xs text-slate-400">{tech.service} · {tech.city} · {tech.applied}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold text-white bg-red-500 hover:bg-red-600 transition-colors">
                          <XCircle size={12} /> Reject
                        </button>
                        <button className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold text-white transition-colors hover:opacity-90" style={{ backgroundColor: "#16a34a" }}>
                          <CheckCircle size={12} /> Approve
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Orders tab */}
          {activeTab === "Orders" && (
            <div className="bg-white border border-slate-100 rounded-2xl overflow-hidden">
              <div className="p-5 border-b border-slate-50">
                <input type="text" placeholder="Search orders..." className="border border-slate-200 rounded-xl py-2 px-4 text-sm w-64 focus:outline-none focus:ring-2" />
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-100">
                      {["Order ID", "Customer", "Service", "Technician", "Amount", "Status", "Date"].map((h) => (
                        <th key={h} className="text-left text-xs font-semibold text-slate-400 px-5 py-3">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {recentOrders.map((order) => {
                      const s = statusConfig[order.status];
                      return (
                        <tr key={order.id} className="border-b border-slate-50 hover:bg-slate-50">
                          <td className="px-5 py-3 text-xs font-mono text-slate-500">{order.id}</td>
                          <td className="px-5 py-3 text-sm font-medium">{order.customer}</td>
                          <td className="px-5 py-3 text-sm text-slate-600">{order.service}</td>
                          <td className="px-5 py-3 text-sm text-slate-600">{order.technician}</td>
                          <td className="px-5 py-3 text-sm font-bold">{formatNaira(order.amount)}</td>
                          <td className="px-5 py-3">
                            <span className="text-xs font-semibold px-2 py-0.5 rounded-full" style={{ color: s.color, backgroundColor: s.bg }}>
                              {s.label}
                            </span>
                          </td>
                          <td className="px-5 py-3 text-xs text-slate-400">{order.date}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Technicians tab */}
          {activeTab === "Technicians" && (
            <div className="bg-white border border-slate-100 rounded-2xl overflow-hidden">
              <div className="p-5 border-b border-slate-50 flex items-center justify-between">
                <input type="text" placeholder="Search technicians..." className="border border-slate-200 rounded-xl py-2 px-4 text-sm w-64 focus:outline-none" />
                <select className="border border-slate-200 rounded-xl py-2 px-3 text-sm focus:outline-none bg-white">
                  <option>All Status</option>
                  <option>Approved</option>
                  <option>Pending</option>
                  <option>Suspended</option>
                </select>
              </div>
              <div className="divide-y divide-slate-50">
                {[
                  { name: "Emeka Okafor", service: "Cleaning", city: "Lagos", jobs: 148, rating: 4.9, status: "approved" },
                  { name: "Blessing Adamu", service: "Cleaning", city: "Lagos", jobs: 95, rating: 4.8, status: "approved" },
                  { name: "Kola Adesanya", service: "Electrical", city: "Lagos", jobs: 67, rating: 4.7, status: "approved" },
                  ...pendingTechnicians.map(t => ({ name: t.name, service: t.service, city: t.city, jobs: 0, rating: 0, status: "pending" })),
                ].map((tech) => (
                  <div key={tech.name} className="flex items-center justify-between p-5">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm text-white" style={{ backgroundColor: "#1B3A6B" }}>
                        {tech.name[0]}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-slate-900">{tech.name}</p>
                        <p className="text-xs text-slate-400">{tech.service} · {tech.city} · {tech.jobs} jobs {tech.rating > 0 && `· ★${tech.rating}`}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${tech.status === "approved" ? "text-green-700 bg-green-50" : "text-orange-700 bg-orange-50"}`}>
                        {tech.status}
                      </span>
                      {tech.status === "pending" && (
                        <>
                          <button className="text-xs font-semibold px-3 py-1.5 rounded-lg text-white bg-red-500">Reject</button>
                          <button className="text-xs font-semibold px-3 py-1.5 rounded-lg text-white" style={{ backgroundColor: "#16a34a" }}>Approve</button>
                        </>
                      )}
                      {tech.status === "approved" && (
                        <button className="text-xs font-semibold px-3 py-1.5 rounded-lg text-white bg-red-400">Suspend</button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Other tabs placeholder */}
          {!["Overview", "Orders", "Technicians"].includes(activeTab) && (
            <div className="bg-white border border-slate-100 rounded-2xl p-12 text-center">
              <span className="text-5xl">🔧</span>
              <p className="text-slate-500 mt-4 text-sm">{activeTab} management — coming soon</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
