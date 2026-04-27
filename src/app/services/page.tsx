"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Search, SlidersHorizontal, Star } from "lucide-react";
import { getCategories, getServices } from "@/lib/data/services";

function formatNaira(n: number) {
  return "₦" + n.toLocaleString("en-NG");
}

export default function ServicesPage() {
  const searchParams = useSearchParams();
  const [activeCategory, setActiveCategory] = useState(searchParams.get("category") || "all");
  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");
  const [sortBy, setSortBy] = useState("popular");
  const [categories, setCategories] = useState<any[]>([]);
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCategories().then(setCategories).catch(console.error);
  }, []);

  useEffect(() => {
    setLoading(true);
    getServices({ search: searchQuery })
      .then(setServices)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [searchQuery]);

  const filtered = services.filter((s) => {
    if (activeCategory === "all") return true;
    return s.categories?.name?.toLowerCase() === activeCategory.toLowerCase();
  });

  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === "price-low") return a.base_price - b.base_price;
    if (sortBy === "price-high") return b.base_price - a.base_price;
    return (b.is_featured ? 1 : 0) - (a.is_featured ? 1 : 0);
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="bg-white border-b border-slate-100 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-black text-slate-900 mb-4">All Services</h1>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search services..."
                className="w-full border border-slate-200 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-2"
              />
            </div>
            <div className="flex items-center gap-2">
              <SlidersHorizontal size={16} className="text-slate-400" />
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}
                className="border border-slate-200 rounded-xl py-2.5 px-3 text-sm focus:outline-none bg-white">
                <option value="popular">Most Popular</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Sidebar */}
          <aside className="hidden lg:block w-56 shrink-0">
            <h3 className="text-sm font-bold text-slate-900 mb-3">Categories</h3>
            <div className="space-y-1">
              <button
                onClick={() => setActiveCategory("all")}
                className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium transition-all text-left ${activeCategory === "all" ? "text-white" : "text-slate-600 hover:bg-slate-100"}`}
                style={activeCategory === "all" ? { backgroundColor: "#1B3A6B" } : {}}
              >
                All Services
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.name.toLowerCase())}
                  className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium transition-all text-left ${activeCategory === cat.name.toLowerCase() ? "text-white" : "text-slate-600 hover:bg-slate-100"}`}
                  style={activeCategory === cat.name.toLowerCase() ? { backgroundColor: "#1B3A6B" } : {}}
                >
                  <span>{cat.emoji}</span>
                  {cat.name}
                </button>
              ))}
            </div>
          </aside>

          {/* Mobile categories */}
          <div className="lg:hidden w-full mb-4">
            <div className="flex gap-2 overflow-x-auto pb-2">
              {[{ name: "All", emoji: "🔍" }, ...categories].map((cat) => {
                const slug = cat.name === "All" ? "all" : cat.name.toLowerCase();
                return (
                  <button key={cat.name} onClick={() => setActiveCategory(slug)}
                    className={`shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-semibold transition-all ${activeCategory === slug ? "text-white" : "text-slate-600 bg-white border border-slate-200"}`}
                    style={activeCategory === slug ? { backgroundColor: "#1B3A6B" } : {}}>
                    <span>{cat.emoji}</span>{cat.name}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Grid */}
          <div className="flex-1">
            <p className="text-sm text-slate-500 mb-4">{sorted.length} services found</p>
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="bg-slate-100 rounded-2xl h-64 animate-pulse" />
                ))}
              </div>
            ) : sorted.length === 0 ? (
              <div className="text-center py-20">
                <span className="text-5xl">🔍</span>
                <p className="text-slate-500 mt-4">No services found</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {sorted.map((service) => (
                  <Link key={service.id} href={`/services/${service.id}`}
                    className="group bg-white border border-slate-100 rounded-2xl overflow-hidden hover:shadow-lg hover:border-slate-200 transition-all">
                    <div className="h-40 flex items-center justify-center text-6xl" style={{ backgroundColor: "#f8fafc" }}>
                      {service.emoji || "🔧"}
                    </div>
                    <div className="p-4">
                      <div className="flex items-start justify-between gap-2 mb-1.5">
                        <div>
                          <span className="text-xs text-slate-400 capitalize">{service.categories?.name}</span>
                          <h3 className="text-sm font-bold text-slate-900 group-hover:text-[#1B3A6B] transition-colors">{service.name}</h3>
                        </div>
                        {service.badge && (
                          <span className="text-xs font-bold px-2 py-0.5 rounded-full text-white whitespace-nowrap shrink-0 bg-[#F97316]">
                            {service.badge}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-1 mb-2">
                        <Star size={11} className="text-yellow-400 fill-yellow-400" />
                        <span className="text-xs font-semibold text-slate-700">4.9</span>
                        <span className="text-xs text-slate-300 mx-1">·</span>
                        <span className="text-xs text-slate-400">
                          {service.duration_minutes ? `${Math.floor(service.duration_minutes / 60)}h` : "Varies"}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-black text-slate-900">{formatNaira(service.base_price)}</span>
                        {service.original_price && (
                          <span className="text-xs text-slate-400 line-through">{formatNaira(service.original_price)}</span>
                        )}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
