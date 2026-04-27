"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getCategories } from "@/lib/data/services";

export default function CategoriesSection() {
  const [categories, setCategories] = useState<any[]>([]);

  useEffect(() => {
    getCategories().then(setCategories).catch(console.error);
  }, []);

  const bgColors = [
    "#EFF6FF", "#F0FDF4", "#FFFBEB", "#FFF7ED", "#FDF4FF",
    "#FEF2F2", "#F0FDFA", "#F0FDF4", "#EFF6FF", "#FFF7ED",
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-black text-slate-900">What do you need help with?</h2>
          <p className="text-slate-500 mt-2">Browse our most popular service categories</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {categories.map((cat, i) => (
            <Link
              key={cat.id}
              href={`/services?category=${cat.name.toLowerCase()}`}
              className="group flex flex-col items-center gap-3 p-5 rounded-2xl border border-slate-100 hover:border-[#1B3A6B] hover:shadow-md transition-all cursor-pointer"
              style={{ backgroundColor: bgColors[i % bgColors.length] }}
            >
              <span className="text-4xl group-hover:scale-110 transition-transform">
                {cat.emoji || "🔧"}
              </span>
              <span className="text-sm font-semibold text-slate-700 text-center">{cat.name}</span>
            </Link>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link href="/services" className="inline-flex items-center gap-2 text-sm font-semibold hover:opacity-80 transition-opacity" style={{ color: "#1B3A6B" }}>
            View all services →
          </Link>
        </div>
      </div>
    </section>
  );
}
