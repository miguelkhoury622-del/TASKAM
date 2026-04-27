"use client";

import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Star, Clock, Shield, ChevronRight, CheckCircle } from "lucide-react";

const serviceData = {
  id: "1",
  name: "Deep House Cleaning",
  category: "Cleaning",
  emoji: "🧹",
  price: 15000,
  originalPrice: 25000,
  rating: 4.9,
  reviews: 312,
  duration: "3-5 hours",
  description:
    "Our professional deep house cleaning service covers every corner of your home. Trained cleaners use eco-friendly products to leave your space spotless — from kitchen to bathrooms, bedrooms to living areas.",
  includes: [
    "Full kitchen cleaning (countertops, sink, stovetop, cabinets exterior)",
    "Bathroom scrubbing and sanitization",
    "Bedroom dusting and vacuuming",
    "Living room cleaning and mopping",
    "Window sills and door handles",
    "Trash removal",
  ],
  notIncluded: ["Laundry", "Exterior windows above ground floor", "Carpet deep cleaning"],
  reviewList: [
    { name: "Amaka O.", rating: 5, comment: "Absolutely spotless! She arrived on time and worked really hard. My apartment looks brand new.", date: "2 days ago" },
    { name: "Tunde A.", rating: 5, comment: "Very professional. Will definitely book again next month.", date: "1 week ago" },
    { name: "Chioma N.", rating: 4, comment: "Great job overall, just missed one spot in the bathroom but it was minor.", date: "2 weeks ago" },
  ],
};

function formatNaira(n: number) {
  return "₦" + n.toLocaleString("en-NG");
}

export default function ServiceDetailPage() {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: "var(--bg-gradient)" }}>
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-1 text-xs mb-6" style={{ color: "rgba(255,255,255,0.4)" }}>
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <ChevronRight size={12} />
          <Link href="/services" className="hover:text-white transition-colors">Services</Link>
          <ChevronRight size={12} />
          <span style={{ color: "rgba(255,255,255,0.7)" }}>{serviceData.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: details */}
          <div className="lg:col-span-2 space-y-5">
            {/* Hero card */}
            <div className="glass-card rounded-2xl overflow-hidden">
              <div className="h-56 sm:h-64 flex items-center justify-center text-9xl relative overflow-hidden"
                style={{ background: "linear-gradient(135deg, rgba(249,115,22,0.08), rgba(27,58,107,0.15))" }}>
                <div className="absolute inset-0" style={{ background: "radial-gradient(circle at center, rgba(249,115,22,0.06), transparent 70%)" }} />
                <span className="relative z-10">{serviceData.emoji}</span>
              </div>
              <div className="p-5 sm:p-6">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-widest gradient-text">{serviceData.category}</span>
                    <h1 className="text-xl sm:text-2xl font-black text-white mt-1">{serviceData.name}</h1>
                  </div>
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full text-white shrink-0"
                    style={{ background: "linear-gradient(135deg, #F97316, #ea6c00)" }}>
                    Best Seller
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-4 text-sm mb-4" style={{ color: "rgba(255,255,255,0.5)" }}>
                  <span className="flex items-center gap-1">
                    <Star size={14} className="text-yellow-400 fill-yellow-400" />
                    <strong className="text-white">{serviceData.rating}</strong>
                    <span>({serviceData.reviews} reviews)</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock size={14} />
                    {serviceData.duration}
                  </span>
                </div>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.6)" }}>{serviceData.description}</p>
              </div>
            </div>

            {/* What's included */}
            <div className="glass-card rounded-2xl p-5 sm:p-6">
              <h2 className="text-base font-bold text-white mb-4">What&apos;s included</h2>
              <div className="space-y-2.5 mb-6">
                {serviceData.includes.map((item) => (
                  <div key={item} className="flex items-start gap-2.5">
                    <CheckCircle size={16} className="text-green-400 mt-0.5 shrink-0" />
                    <span className="text-sm" style={{ color: "rgba(255,255,255,0.7)" }}>{item}</span>
                  </div>
                ))}
              </div>
              <h3 className="text-sm font-semibold mb-2" style={{ color: "rgba(255,255,255,0.5)" }}>Not included</h3>
              <div className="space-y-1.5">
                {serviceData.notIncluded.map((item) => (
                  <div key={item} className="flex items-center gap-2">
                    <span style={{ color: "rgba(255,255,255,0.2)" }}>✗</span>
                    <span className="text-sm" style={{ color: "rgba(255,255,255,0.35)" }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Reviews */}
            <div className="glass-card rounded-2xl p-5 sm:p-6">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-base font-bold text-white">Customer Reviews</h2>
                <div className="flex items-center gap-1">
                  <Star size={14} className="text-yellow-400 fill-yellow-400" />
                  <span className="font-bold text-white text-sm">{serviceData.rating}</span>
                  <span className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>({serviceData.reviews})</span>
                </div>
              </div>
              <div className="space-y-4">
                {serviceData.reviewList.map((r) => (
                  <div key={r.name} className="pb-4 last:pb-0" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0"
                          style={{ background: "linear-gradient(135deg, #1B3A6B, #2a5298)" }}>
                          {r.name[0]}
                        </div>
                        <span className="text-sm font-semibold text-white">{r.name}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        {[...Array(r.rating)].map((_, i) => (
                          <Star key={i} size={11} className="text-yellow-400 fill-yellow-400" />
                        ))}
                        <span className="text-xs ml-1" style={{ color: "rgba(255,255,255,0.35)" }}>{r.date}</span>
                      </div>
                    </div>
                    <p className="text-sm pl-10" style={{ color: "rgba(255,255,255,0.6)" }}>{r.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: booking card — sticky on desktop, fixed bottom bar on mobile */}
          {/* Mobile bottom CTA */}
          <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 p-4"
            style={{ background: "rgba(7,13,26,0.95)", backdropFilter: "blur(20px)", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
            <div className="flex items-center justify-between gap-4 max-w-lg mx-auto">
              <div>
                <div className="flex items-baseline gap-2">
                  <span className="text-xl font-black text-white">{formatNaira(serviceData.price)}</span>
                  <span className="text-sm line-through" style={{ color: "rgba(255,255,255,0.3)" }}>{formatNaira(serviceData.originalPrice)}</span>
                </div>
                <span className="text-xs text-green-400">Save {formatNaira(serviceData.originalPrice - serviceData.price)}</span>
              </div>
              <Link href={`/booking/${serviceData.id}`}
                className="px-8 py-3.5 rounded-xl text-white font-bold text-sm transition-all hover:opacity-90 shrink-0"
                style={{ background: "linear-gradient(135deg, #F97316, #ea6c00)", boxShadow: "0 0 20px rgba(249,115,22,0.4)" }}>
                Book Now
              </Link>
            </div>
          </div>

          {/* Desktop sticky sidebar */}
          <div className="hidden lg:block lg:col-span-1">
            <div className="sticky top-24 glass-card rounded-2xl p-6">
              <div className="mb-5">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-black text-white">{formatNaira(serviceData.price)}</span>
                  <span className="text-base line-through" style={{ color: "rgba(255,255,255,0.3)" }}>{formatNaira(serviceData.originalPrice)}</span>
                </div>
                <span className="text-sm font-semibold text-green-400">
                  You save {formatNaira(serviceData.originalPrice - serviceData.price)}
                </span>
              </div>

              <Link href={`/booking/${serviceData.id}`}
                className="block w-full py-4 rounded-xl text-white font-bold text-sm text-center transition-all hover:opacity-90 mb-3"
                style={{ background: "linear-gradient(135deg, #F97316, #ea6c00)", boxShadow: "0 0 20px rgba(249,115,22,0.3)" }}>
                Book Now
              </Link>

              <div className="flex items-center gap-3 p-3 rounded-xl mb-4"
                style={{ background: "rgba(249,115,22,0.08)", border: "1px solid rgba(249,115,22,0.2)" }}>
                <span className="text-xl">💵</span>
                <p className="text-xs" style={{ color: "rgba(255,255,255,0.7)" }}>
                  <strong className="text-white">Pay on arrival</strong> — cash accepted when your pro arrives
                </p>
              </div>

              <div className="space-y-2.5">
                {[
                  { icon: <Shield size={14} />, text: "100% verified professional" },
                  { icon: <Star size={14} />, text: "Satisfaction guaranteed" },
                  { icon: <Clock size={14} />, text: "Same-day availability" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>
                    <span style={{ color: "#F97316" }}>{item.icon}</span>
                    {item.text}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom spacing for mobile fixed bar */}
        <div className="h-24 lg:hidden" />
      </main>

      <Footer />
    </div>
  );
}
