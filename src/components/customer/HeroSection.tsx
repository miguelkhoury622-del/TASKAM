"use client";

import { useState } from "react";
import { Search, MapPin } from "lucide-react";
import { useRouter } from "next/navigation";

export default function HeroSection() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) router.push(`/services?q=${encodeURIComponent(query)}`);
  };

  const popularSearches = ["House Cleaning", "Plumbing", "Electrician", "AC Repair", "Painting"];

  return (
    <section
      className="relative overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #1B3A6B 0%, #2a5298 60%, #1e4080 100%)",
      }}
    >
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute -top-32 -right-32 w-96 h-96 rounded-full opacity-10"
          style={{ backgroundColor: "#F97316" }}
        />
        <div
          className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full opacity-10"
          style={{ backgroundColor: "#F97316" }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
        <div className="max-w-3xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 mb-6">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-sm text-white font-medium">
              500+ verified pros across Nigeria
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl md:text-6xl font-black text-white leading-tight mb-4">
            Home Services,{" "}
            <span style={{ color: "#F97316" }}>Done Right.</span>
          </h1>
          <p className="text-lg md:text-xl text-blue-100 mb-10 max-w-xl mx-auto leading-relaxed">
            Book trusted professionals for cleaning, repairs, plumbing,
            electrical work and more — across Lagos, Abuja, Port Harcourt & beyond.
          </p>

          {/* Search bar */}
          <form onSubmit={handleSearch} className="relative max-w-2xl mx-auto mb-6">
            <div className="flex items-center bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="flex items-center gap-2 px-4 border-r border-slate-200">
                <MapPin size={18} className="text-slate-400" />
                <span className="text-sm text-slate-500 whitespace-nowrap">Lagos</span>
              </div>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="What service do you need?"
                className="flex-1 px-4 py-4 text-slate-800 text-sm focus:outline-none"
              />
              <button
                type="submit"
                className="flex items-center gap-2 m-2 px-6 py-3 rounded-xl text-white font-semibold text-sm transition-all hover:opacity-90 active:scale-95"
                style={{ backgroundColor: "#F97316" }}
              >
                <Search size={16} />
                Search
              </button>
            </div>
          </form>

          {/* Popular searches */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            <span className="text-sm text-blue-200">Popular:</span>
            {popularSearches.map((term) => (
              <button
                key={term}
                onClick={() => router.push(`/services?q=${encodeURIComponent(term)}`)}
                className="text-sm text-white bg-white/10 hover:bg-white/20 border border-white/20 rounded-full px-3 py-1 transition-colors"
              >
                {term}
              </button>
            ))}
          </div>
        </div>

        {/* Stats row */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
          {[
            { number: "10,000+", label: "Jobs Completed" },
            { number: "500+", label: "Verified Pros" },
            { number: "4.8★", label: "Average Rating" },
            { number: "5 Cities", label: "Across Nigeria" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-2xl md:text-3xl font-black text-white">{stat.number}</p>
              <p className="text-sm text-blue-200 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
