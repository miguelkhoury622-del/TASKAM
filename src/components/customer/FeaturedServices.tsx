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
    getServices({ featured: true }).then(setServices).catch(console.error).finally(() => setLoading(false));
  }, []);

  return (
    <section className="py-24 relative overflow-hidden" style={{ background: "linear-gradient(180deg, #070d1a 0%, #0a1020 100%)" }}>
      <div className="orb w-80 h-80 bottom-0 left-0 opacity-10" style={{ background: "radial-gradient(circle, #1B3A6B, transparent)" }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-12">
          <div>
            <span className="text-sm font-bold uppercase tracking-widest gradient-text">Top Picks</span>
            <h2 className="text-4xl font-black text-white mt-2">Featured Services</h2>
          </div>
          <Link href="/services" className="hidden md:inline-flex text-sm font-semibold transition-all hover:opacity-80" style={{ color: "#F97316" }}>
            View all →
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="rounded-2xl h-72 animate-pulse" style={{ background: "rgba(255,255,255,0.05)" }} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <Link key={service.id} href={`/services/${service.id}`}
                className="group glass-card rounded-2xl overflow-hidden transition-all duration-300 hover:scale-[1.02]"
                style={{ textDecoration: "none" }}>
                {/* Image area */}
                <div className="h-44 flex items-center justify-center text-7xl relative overflow-hidden"
                  style={{ background: "linear-gradient(135deg, rgba(249,115,22,0.08), rgba(27,58,107,0.15))" }}>
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: "radial-gradient(circle at center, rgba(249,115,22,0.1), transparent)" }} />
                  <span className="group-hover:scale-110 transition-transform duration-300 relative z-10">
                    {service.emoji || "🔧"}
                  </span>
                </div>

                <div className="p-5">
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <div>
                      <span className="text-xs font-medium" style={{ color: "rgba(255,255,255,0.4)" }}>
                        {service.categories?.name}
                      </span>
                      <h3 className="text-sm font-bold text-white mt-0.5 group-hover:text-orange-400 transition-colors">
                        {service.name}
                      </h3>
                    </div>
                    {service.badge && (
                      <span className="text-xs font-bold px-2 py-0.5 rounded-full text-white whitespace-nowrap shrink-0"
                        style={{ background: "linear-gradient(135deg, #F97316, #ea6c00)" }}>
                        {service.badge}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-1 mb-3">
                    <Star size={11} className="text-yellow-400 fill-yellow-400" />
                    <span className="text-xs font-semibold text-white">4.9</span>
                    <span className="text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>(100+ reviews)</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-base font-black text-white">{formatNaira(service.base_price)}</span>
                      {service.original_price && (
                        <span className="text-sm line-through" style={{ color: "rgba(255,255,255,0.3)" }}>
                          {formatNaira(service.original_price)}
                        </span>
                      )}
                    </div>
                    <span className="text-xs font-semibold px-3 py-1 rounded-full transition-all opacity-0 group-hover:opacity-100"
                      style={{ background: "rgba(249,115,22,0.15)", color: "#F97316", border: "1px solid rgba(249,115,22,0.3)" }}>
                      Book →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
