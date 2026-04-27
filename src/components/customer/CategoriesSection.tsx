"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getCategories } from "@/lib/data/services";

export default function CategoriesSection() {
  const [categories, setCategories] = useState<any[]>([]);

  useEffect(() => {
    getCategories().then(setCategories).catch(console.error);
  }, []);

  return (
    <section className="py-24 relative overflow-hidden" style={{ background: "var(--bg-gradient)" }}>
      <div className="orb w-96 h-96 top-0 right-0 opacity-10" style={{ background: "radial-gradient(circle, #F97316, transparent)" }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="text-sm font-bold uppercase tracking-widest gradient-text">Browse</span>
          <h2 className="text-4xl font-black text-white mt-2">What do you need help with?</h2>
          <p className="mt-3 text-base" style={{ color: "rgba(255,255,255,0.5)" }}>
            Choose from our most popular service categories
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {categories.map((cat) => (
            <Link key={cat.id} href={`/services?category=${cat.name.toLowerCase()}`}
              className="group glass-card rounded-2xl p-5 flex flex-col items-center gap-3 cursor-pointer transition-all duration-300 hover:scale-105"
              style={{ textDecoration: "none" }}>
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl transition-transform group-hover:scale-110"
                style={{ background: "rgba(249,115,22,0.1)", border: "1px solid rgba(249,115,22,0.2)" }}>
                {cat.emoji || "🔧"}
              </div>
              <span className="text-sm font-semibold text-white text-center">{cat.name}</span>
            </Link>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link href="/services"
            className="inline-flex items-center gap-2 text-sm font-semibold transition-all hover:opacity-80"
            style={{ color: "#F97316" }}>
            View all services →
          </Link>
        </div>
      </div>
    </section>
  );
}
