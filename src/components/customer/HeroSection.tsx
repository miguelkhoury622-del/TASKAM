"use client";

import { useState } from "react";
import { Search, MapPin } from "lucide-react";
import { useRouter } from "next/navigation";

// Floating service scene cards shown in the hero background
const floatingCards = [
  {
    emoji: "🧹",
    label: "Deep Cleaning",
    sub: "House & Office",
    position: "top-[12%] left-[4%]",
    animation: "animate-float-1",
    delay: "0s",
    accent: "#F97316",
  },
  {
    emoji: "🔧",
    label: "Plumbing",
    sub: "Pipes & Fixtures",
    position: "top-[8%] right-[5%]",
    animation: "animate-float-2",
    delay: "1.2s",
    accent: "#3B82F6",
  },
  {
    emoji: "⚡",
    label: "Electrical",
    sub: "Wiring & Repairs",
    position: "bottom-[28%] left-[3%]",
    animation: "animate-float-3",
    delay: "0.6s",
    accent: "#FBBF24",
  },
  {
    emoji: "❄️",
    label: "AC Repair",
    sub: "Install & Service",
    position: "bottom-[20%] right-[4%]",
    animation: "animate-float-4",
    delay: "1.8s",
    accent: "#06B6D4",
  },
  {
    emoji: "🎨",
    label: "Painting",
    sub: "Interior & Exterior",
    position: "top-[42%] right-[2%]",
    animation: "animate-float-5",
    delay: "0.3s",
    accent: "#A855F7",
  },
  {
    emoji: "🛠️",
    label: "Home Repairs",
    sub: "Fix Anything",
    position: "top-[45%] left-[2%]",
    animation: "animate-float-2",
    delay: "2.1s",
    accent: "#10B981",
  },
];

export default function HeroSection() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) router.push(`/services?q=${encodeURIComponent(query)}`);
  };

  const popular = ["House Cleaning", "Plumbing", "Electrician", "AC Repair", "Painting"];

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden" style={{ background: "var(--bg-gradient)" }}>
      {/* Orbs */}
      <div className="orb w-96 h-96 -top-20 -right-20 opacity-20" style={{ background: "radial-gradient(circle, #F97316, transparent)" }} />
      <div className="orb w-80 h-80 bottom-0 -left-20 opacity-15" style={{ background: "radial-gradient(circle, #1B3A6B, transparent)" }} />
      <div className="orb w-64 h-64 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-10" style={{ background: "radial-gradient(circle, #7C3AED, transparent)" }} />

      {/* Grid overlay */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
        backgroundSize: "60px 60px"
      }} />

      {/* Floating service cards — hidden on mobile to keep it clean */}
      <div className="absolute inset-0 pointer-events-none hidden lg:block">
        {floatingCards.map((card) => (
          <div
            key={card.label}
            className={`absolute ${card.position} ${card.animation}`}
            style={{ animationDelay: card.delay }}
          >
            <div
              className="flex items-center gap-3 px-4 py-3 rounded-2xl"
              style={{
                background: "rgba(255,255,255,0.04)",
                backdropFilter: "blur(16px)",
                WebkitBackdropFilter: "blur(16px)",
                border: `1px solid ${card.accent}30`,
                boxShadow: `0 8px 32px rgba(0,0,0,0.3), 0 0 20px ${card.accent}15`,
              }}
            >
              {/* Emoji in a glowing circle */}
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center text-2xl shrink-0"
                style={{ background: `${card.accent}18`, border: `1px solid ${card.accent}35` }}
              >
                {card.emoji}
              </div>
              <div>
                <p className="text-sm font-bold text-white leading-tight">{card.label}</p>
                <p className="text-xs leading-tight" style={{ color: "rgba(255,255,255,0.45)" }}>{card.sub}</p>
              </div>
              {/* Live indicator dot */}
              <div className="ml-1 w-2 h-2 rounded-full animate-pulse shrink-0" style={{ background: card.accent }} />
            </div>
          </div>
        ))}
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 w-full">
        <div className="max-w-3xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-8 glass"
            style={{ border: "1px solid rgba(249,115,22,0.3)" }}>
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-sm font-medium" style={{ color: "rgba(255,255,255,0.8)" }}>
              500+ verified pros across Nigeria
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-5xl md:text-7xl font-black text-white leading-tight mb-4">
            Home Services,{" "}
            <span className="gradient-text text-glow">Done Right.</span>
          </h1>

          <p className="text-lg md:text-xl mb-10 max-w-xl mx-auto leading-relaxed" style={{ color: "rgba(255,255,255,0.6)" }}>
            Book trusted professionals for cleaning, repairs, plumbing, electrical work
            and more — across Lagos, Abuja, Port Harcourt & beyond.
          </p>

          {/* Search bar */}
          <form onSubmit={handleSearch} className="relative max-w-2xl mx-auto mb-6">
            <div className="flex items-center rounded-2xl overflow-hidden glass"
              style={{ border: "1px solid rgba(255,255,255,0.15)", boxShadow: "0 8px 40px rgba(0,0,0,0.4)" }}>
              <div className="flex items-center gap-2 px-4 py-1" style={{ borderRight: "1px solid rgba(255,255,255,0.1)" }}>
                <MapPin size={16} style={{ color: "rgba(255,255,255,0.4)" }} />
                <span className="text-sm whitespace-nowrap" style={{ color: "rgba(255,255,255,0.5)" }}>Lagos</span>
              </div>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="What service do you need?"
                className="flex-1 px-4 py-4 text-sm bg-transparent text-white placeholder-white/30 focus:outline-none"
              />
              <button type="submit"
                className="flex items-center gap-2 m-2 px-6 py-3 rounded-xl text-white font-semibold text-sm transition-all hover:opacity-90"
                style={{ background: "linear-gradient(135deg, #F97316, #ea6c00)", boxShadow: "0 0 20px rgba(249,115,22,0.4)" }}>
                <Search size={16} /> Search
              </button>
            </div>
          </form>

          {/* Popular searches */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            <span className="text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>Popular:</span>
            {popular.map((term) => (
              <button key={term}
                onClick={() => router.push(`/services?q=${encodeURIComponent(term)}`)}
                className="text-sm rounded-full px-3 py-1 transition-all hover:border-orange-400/50"
                style={{ color: "rgba(255,255,255,0.6)", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}>
                {term}
              </button>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
          {[
            { number: "10,000+", label: "Jobs Completed" },
            { number: "500+", label: "Verified Pros" },
            { number: "4.8★", label: "Average Rating" },
            { number: "5 Cities", label: "Across Nigeria" },
          ].map((stat) => (
            <div key={stat.label} className="glass-card rounded-2xl p-5 text-center">
              <p className="text-2xl md:text-3xl font-black text-white">{stat.number}</p>
              <p className="text-xs mt-1" style={{ color: "rgba(255,255,255,0.5)" }}>{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
