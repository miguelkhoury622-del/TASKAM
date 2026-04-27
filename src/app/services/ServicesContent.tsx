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

export default function ServicesContent() {
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
    <div className="min-h-screen flex flex-col" style={{ background: "var(--bg-gradient)" }}>
      <Navbar />

      {/* Search header */}
      <div className="py-8 relative" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-black text-white mb-5">All Services</h1>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "rgba(255,255,255,0.3)" }} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search services..."
                className="w-full rounded-xl py-2.5 pl-10 pr-4 text-sm text-white focus:outline-none"
                style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}
              />
            </div>
            <div className="flex items-center gap-2">
              <SlidersHorizontal size={16} style={{ color: "rgba(255,255,255,0.3)" }} />
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}
                className="rounded-xl py-2.5 px-3 text-sm focus:outline-none text-white"
                style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}>
                <option value="popular" style={{ background: "#0a1020" }}>Most Popular</option>
                <option value="price-low" style={{ background: "#0a1020" }}>Price: Low to High</option>
                <option value="price-high" style={{ background: "#0a1020" }}>Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Sidebar */}
          <aside className="hidden lg:block w-56 shrink-0">
            <h3 className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "rgba(255,255,255,0.4)" }}>Categories</h3>
            <div className="space-y-1">
              <button
                onClick={() => setActiveCategory("all")}
                className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium transition-all text-left"
                style={activeCategory === "all"
                  ? { background: "linear-gradient(135deg, #F97316, #ea6c00)", color: "white" }
                  : { color: "rgba(255,255,255,0.55)" }}>
                All Services
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.name.toLowerCase())}
                  className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium transition-all text-left hover:bg-white/5"
                  style={activeCategory === cat.name.toLowerCase()
                    ? { background: "linear-gradient(135deg, #F97316, #ea6c00)", color: "white" }
                    : { color: "rgba(255,255,255,0.55)" }}>
                  <span>{cat.emoji}</span>
                  {cat.name}
                </button>
              ))}
            </div>
          </aside>

          {/* Right column: mobile categories + grid stacked */}
          <div className="flex-1 flex flex-col min-w-0">
            {/* Mobile categories */}
            <div className="lg:hidden mb-4">
              <div className="flex gap-2 overflow-x-auto pb-2">
                {[{ name: "All", emoji: "🔍" }, ...categories].map((cat) => {
                  const slug = cat.name === "All" ? "all" : cat.name.toLowerCase();
                  return (
                    <button key={cat.name} onClick={() => setActiveCategory(slug)}
                      className="shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-semibold transition-all"
                      style={activeCategory === slug
                        ? { background: "linear-gradient(135deg, #F97316, #ea6c00)", color: "white" }
                        : { color: "rgba(255,255,255,0.6)", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}>
                      <span>{cat.emoji}</span>{cat.name}
                    </button>
                  );
                })}
              </div>
            </div>

          {/* Grid */}
          <div className="flex-1">
            <p className="text-sm mb-4" style={{ color: "rgba(255,255,255,0.4)" }}>{sorted.length} services found</p>
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="rounded-2xl h-64 animate-pulse" style={{ background: "rgba(255,255,255,0.05)" }} />
                ))}
              </div>
            ) : sorted.length === 0 ? (
              <div className="text-center py-20">
                <span className="text-5xl">🔍</span>
                <p className="mt-4" style={{ color: "rgba(255,255,255,0.4)" }}>No services found</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {sorted.map((service) => (
                  <Link key={service.id} href={`/services/${service.id}`}
                    className="group glass-card rounded-2xl overflow-hidden transition-all duration-300 hover:scale-[1.02]"
                    style={{ textDecoration: "none" }}>
                    <div className="h-40 flex items-center justify-center text-6xl relative overflow-hidden"
                      style={{ background: "linear-gradient(135deg, rgba(249,115,22,0.08), rgba(27,58,107,0.15))" }}>
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        style={{ background: "radial-gradient(circle at center, rgba(249,115,22,0.1), transparent)" }} />
                      <span className="group-hover:scale-110 transition-transform duration-300 relative z-10">
                        {service.emoji || "🔧"}
                      </span>
                    </div>
                    <div className="p-4">
                      <div className="flex items-start justify-between gap-2 mb-1.5">
                        <div>
                          <span className="text-xs capitalize" style={{ color: "rgba(255,255,255,0.4)" }}>{service.categories?.name}</span>
                          <h3 className="text-sm font-bold text-white group-hover:text-orange-400 transition-colors">{service.name}</h3>
                        </div>
                        {service.badge && (
                          <span className="text-xs font-bold px-2 py-0.5 rounded-full text-white whitespace-nowrap shrink-0"
                            style={{ background: "linear-gradient(135deg, #F97316, #ea6c00)" }}>
                            {service.badge}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-1 mb-2">
                        <Star size={11} className="text-yellow-400 fill-yellow-400" />
                        <span className="text-xs font-semibold text-white">4.9</span>
                        <span className="text-xs mx-1" style={{ color: "rgba(255,255,255,0.2)" }}>·</span>
                        <span className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>
                          {service.duration_minutes ? `${Math.floor(service.duration_minutes / 60)}h` : "Varies"}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-black text-white">{formatNaira(service.base_price)}</span>
                        {service.original_price && (
                          <span className="text-xs line-through" style={{ color: "rgba(255,255,255,0.3)" }}>{formatNaira(service.original_price)}</span>
                        )}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
          </div>{/* end right column */}
        </div>
      </div>
      <Footer />
    </div>
  );
}
