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
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-1 text-xs text-slate-400 mb-6">
          <Link href="/" className="hover:text-slate-600">Home</Link>
          <ChevronRight size={12} />
          <Link href="/services" className="hover:text-slate-600">Services</Link>
          <ChevronRight size={12} />
          <span className="text-slate-600">{serviceData.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Hero */}
            <div className="bg-white rounded-2xl overflow-hidden border border-slate-100">
              <div className="h-64 flex items-center justify-center text-9xl" style={{ backgroundColor: "#f8fafc" }}>
                {serviceData.emoji}
              </div>
              <div className="p-6">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: "#F97316" }}>
                      {serviceData.category}
                    </span>
                    <h1 className="text-2xl font-black text-slate-900 mt-1">{serviceData.name}</h1>
                  </div>
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full text-white bg-[#F97316] shrink-0">
                    Best Seller
                  </span>
                </div>

                <div className="flex items-center gap-4 text-sm text-slate-500 mb-4">
                  <span className="flex items-center gap-1">
                    <Star size={14} className="text-yellow-400 fill-yellow-400" />
                    <strong className="text-slate-800">{serviceData.rating}</strong>
                    ({serviceData.reviews} reviews)
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock size={14} />
                    {serviceData.duration}
                  </span>
                </div>

                <p className="text-slate-600 text-sm leading-relaxed">{serviceData.description}</p>
              </div>
            </div>

            {/* What's included */}
            <div className="bg-white rounded-2xl border border-slate-100 p-6">
              <h2 className="text-lg font-bold text-slate-900 mb-4">What&apos;s included</h2>
              <div className="space-y-2.5 mb-6">
                {serviceData.includes.map((item) => (
                  <div key={item} className="flex items-start gap-2.5">
                    <CheckCircle size={16} className="text-green-500 mt-0.5 shrink-0" />
                    <span className="text-sm text-slate-600">{item}</span>
                  </div>
                ))}
              </div>
              <h3 className="text-sm font-semibold text-slate-700 mb-2">Not included</h3>
              <div className="space-y-1.5">
                {serviceData.notIncluded.map((item) => (
                  <div key={item} className="flex items-center gap-2">
                    <span className="text-slate-300 text-sm">✗</span>
                    <span className="text-sm text-slate-400">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Reviews */}
            <div className="bg-white rounded-2xl border border-slate-100 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-slate-900">Customer Reviews</h2>
                <div className="flex items-center gap-1">
                  <Star size={16} className="text-yellow-400 fill-yellow-400" />
                  <span className="font-bold text-slate-900">{serviceData.rating}</span>
                  <span className="text-sm text-slate-400">({serviceData.reviews})</span>
                </div>
              </div>
              <div className="space-y-4">
                {serviceData.reviewList.map((r) => (
                  <div key={r.name} className="border-b border-slate-50 pb-4 last:border-0">
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white" style={{ backgroundColor: "#1B3A6B" }}>
                          {r.name[0]}
                        </div>
                        <span className="text-sm font-semibold text-slate-800">{r.name}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        {[...Array(r.rating)].map((_, i) => (
                          <Star key={i} size={11} className="text-yellow-400 fill-yellow-400" />
                        ))}
                        <span className="text-xs text-slate-400 ml-1">{r.date}</span>
                      </div>
                    </div>
                    <p className="text-sm text-slate-600 pl-10">{r.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: booking card */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
              <div className="mb-4">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-black text-slate-900">{formatNaira(serviceData.price)}</span>
                  {serviceData.originalPrice && (
                    <span className="text-base text-slate-400 line-through">{formatNaira(serviceData.originalPrice)}</span>
                  )}
                </div>
                {serviceData.originalPrice && (
                  <span className="text-sm font-semibold text-green-600">
                    You save {formatNaira(serviceData.originalPrice - serviceData.price)}
                  </span>
                )}
              </div>

              <Link
                href={`/booking/${serviceData.id}`}
                className="block w-full py-4 rounded-xl text-white font-bold text-sm text-center transition-all hover:opacity-90 active:scale-95 mb-3"
                style={{ backgroundColor: "#F97316" }}
              >
                Book Now
              </Link>

              <div className="flex items-center gap-2 p-3 rounded-xl mb-4" style={{ backgroundColor: "#EFF6FF" }}>
                <span className="text-xl">💵</span>
                <p className="text-xs text-slate-600">
                  <strong>Pay on arrival</strong> — cash accepted when your pro arrives
                </p>
              </div>

              <div className="space-y-2.5">
                {[
                  { icon: <Shield size={14} />, text: "100% verified professional" },
                  { icon: <Star size={14} />, text: "Satisfaction guaranteed" },
                  { icon: <Clock size={14} />, text: "Same-day availability" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-slate-500">
                    <span style={{ color: "#1B3A6B" }}>{item.icon}</span>
                    {item.text}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
