import Link from "next/link";

export default function CTASection() {
  return (
    <section className="py-24 relative overflow-hidden" style={{ background: "linear-gradient(180deg, #070d1a 0%, #0a1020 100%)" }}>
      <div className="orb w-96 h-96 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-10"
        style={{ background: "radial-gradient(circle, #F97316, transparent)" }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Customer CTA */}
          <div className="relative rounded-3xl p-10 flex flex-col justify-between min-h-64 overflow-hidden"
            style={{ background: "linear-gradient(135deg, rgba(249,115,22,0.15), rgba(234,108,0,0.08))", border: "1px solid rgba(249,115,22,0.3)" }}>
            <div className="absolute inset-0 opacity-20" style={{ background: "radial-gradient(circle at top right, #F97316, transparent 60%)" }} />
            <div className="relative">
              <span className="text-4xl">🏠</span>
              <h3 className="text-2xl font-black text-white mt-4 mb-2">Need a service done?</h3>
              <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.6)" }}>
                Book a verified professional in under 2 minutes. Same-day availability across Lagos, Abuja, and Port Harcourt.
              </p>
            </div>
            <Link href="/services"
              className="relative inline-flex items-center justify-center mt-8 font-bold text-sm px-6 py-3 rounded-xl transition-all hover:opacity-90 w-fit text-white"
              style={{ background: "linear-gradient(135deg, #F97316, #ea6c00)", boxShadow: "0 0 24px rgba(249,115,22,0.4)" }}>
              Book a Service →
            </Link>
          </div>

          {/* Pro CTA */}
          <div className="relative rounded-3xl p-10 flex flex-col justify-between min-h-64 overflow-hidden"
            style={{ background: "linear-gradient(135deg, rgba(27,58,107,0.3), rgba(42,82,152,0.15))", border: "1px solid rgba(27,58,107,0.5)" }}>
            <div className="absolute inset-0 opacity-20" style={{ background: "radial-gradient(circle at top right, #1B3A6B, transparent 60%)" }} />
            <div className="relative">
              <span className="text-4xl">🔧</span>
              <h3 className="text-2xl font-black text-white mt-4 mb-2">Are you a professional?</h3>
              <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.6)" }}>
                Join Taskam as a verified pro and start earning from jobs in your area. Set your own schedule and grow your business.
              </p>
            </div>
            <Link href="/technician/apply"
              className="relative inline-flex items-center justify-center mt-8 font-bold text-sm px-6 py-3 rounded-xl transition-all hover:opacity-90 w-fit"
              style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)", color: "white", backdropFilter: "blur(10px)" }}>
              Apply to Join →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
