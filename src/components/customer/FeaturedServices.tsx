"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Star } from "lucide-react";
import { getServices } from "@/lib/data/services";

function formatNaira(n: number) {
  return "₦" + n.toLocaleString("en-NG");
}

export default function FeaturedServices() {
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getServices({ featured: true })
      .then(setServices)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-slate-100 rounded-2xl h-64 animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-10">
          <div>
            <span className="text-sm font-semibold uppercase tracking-wider" style={{ color: "#F97316" }}>
              Top Picks
            </span>
            <h2 className="text-3xl font-black text-slate-900 mt-1">Featured Services</h2>
          </div>
          <Link href="/services" className="hidden md:inline-flex text-sm font-semibold hover:opacity-80" style={{ color: "#1B3A6B" }}>
            View all →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <Link
              key={service.id}
              href={`/services/${service.id}`}
              className="group bg-white border border-slate-100 rounded-2xl overflow-hidden hover:shadow-lg hover:border-slate-200 transition-all"
            >
              <div className="h-44 flex items-center justify-center text-7xl" style={{ backgroundColor: "#f8fafc" }}>
                {service.emoji || "🔧"}
              </div>
              <div className="p-5">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div>
                    <span className="text-xs text-slate-400 font-medium">{service.categories?.name}</span>
                    <h3 className="text-sm font-bold text-slate-900 mt-0.5 group-hover:text-[#1B3A6B] transition-colors">
                      {service.name}
                    </h3>
                  </div>
                  {service.badge && (
                    <span className="text-xs font-bold px-2 py-0.5 rounded-full text-white whitespace-nowrap shrink-0 bg-[#F97316]">
                      {service.badge}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-1 mb-3">
                  <Star size={11} className="text-yellow-400 fill-yellow-400" />
                  <span className="text-xs font-semibold text-slate-700">4.9</span>
                  <span className="text-xs text-slate-400">(100+ reviews)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-base font-black text-slate-900">{formatNaira(service.base_price)}</span>
                  {service.original_price && (
                    <span className="text-sm text-slate-400 line-through">{formatNaira(service.original_price)}</span>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
