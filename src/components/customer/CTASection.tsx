import Link from "next/link";

export default function CTASection() {
  return (
    <section className="py-20" style={{ backgroundColor: "#f8fafc" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Customer CTA */}
          <div
            className="rounded-3xl p-10 flex flex-col justify-between min-h-64"
            style={{
              background: "linear-gradient(135deg, #F97316 0%, #ea6c00 100%)",
            }}
          >
            <div>
              <span className="text-4xl">🏠</span>
              <h3 className="text-2xl font-black text-white mt-4 mb-2">
                Need a service done?
              </h3>
              <p className="text-orange-100 text-sm leading-relaxed">
                Book a verified professional in under 2 minutes. Same-day
                availability across Lagos, Abuja, and Port Harcourt.
              </p>
            </div>
            <Link
              href="/services"
              className="inline-flex items-center justify-center mt-8 bg-white text-[#F97316] font-bold text-sm px-6 py-3 rounded-xl hover:bg-orange-50 transition-colors w-fit"
            >
              Book a Service →
            </Link>
          </div>

          {/* Pro CTA */}
          <div
            className="rounded-3xl p-10 flex flex-col justify-between min-h-64"
            style={{
              background: "linear-gradient(135deg, #1B3A6B 0%, #2a5298 100%)",
            }}
          >
            <div>
              <span className="text-4xl">🔧</span>
              <h3 className="text-2xl font-black text-white mt-4 mb-2">
                Are you a professional?
              </h3>
              <p className="text-blue-200 text-sm leading-relaxed">
                Join Taskam as a verified pro and start earning from jobs in
                your area. Set your own schedule and grow your business.
              </p>
            </div>
            <Link
              href="/technician/apply"
              className="inline-flex items-center justify-center mt-8 bg-white text-[#1B3A6B] font-bold text-sm px-6 py-3 rounded-xl hover:bg-blue-50 transition-colors w-fit"
            >
              Apply to Join →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
