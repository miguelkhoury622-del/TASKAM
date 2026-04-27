const trustPoints = [
  {
    icon: "🛡️",
    title: "Verified Professionals",
    description: "Every technician on Taskam is background-checked, ID-verified, and skill-tested before they can take jobs.",
  },
  {
    icon: "⭐",
    title: "Rated & Reviewed",
    description: "Real reviews from real customers. You can see ratings, completed jobs, and feedback before you book.",
  },
  {
    icon: "💵",
    title: "Pay Your Way",
    description: "Pay by card, bank transfer, or cash when the technician arrives. No upfront payment required.",
  },
  {
    icon: "📞",
    title: "24/7 Support",
    description: "Our support team is always available via WhatsApp, phone, or live chat to resolve any issues.",
  },
  {
    icon: "🔁",
    title: "Satisfaction Guarantee",
    description: "Not happy with the job? We'll send another pro or give you a full refund. No questions asked.",
  },
  {
    icon: "⚡",
    title: "Fast Booking",
    description: "Book in under 2 minutes. Same-day service available for urgent requests across major cities.",
  },
];

export default function TrustSection() {
  return (
    <section className="py-24 relative overflow-hidden" style={{ background: "linear-gradient(180deg, #070d1a 0%, #0a1020 100%)" }}>
      <div className="orb w-[500px] h-[500px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-5"
        style={{ background: "radial-gradient(circle, #1B3A6B, transparent)" }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="text-sm font-bold uppercase tracking-widest gradient-text">Why Taskam</span>
          <h2 className="text-4xl font-black text-white mt-2">Your safety is our priority</h2>
          <p className="mt-3 text-base max-w-xl mx-auto" style={{ color: "rgba(255,255,255,0.5)" }}>
            We built Taskam around trust — so you can let a professional into your home with complete confidence.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {trustPoints.map((point) => (
            <div key={point.title}
              className="glass-card rounded-2xl p-6 group hover:scale-[1.02] transition-all duration-300">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-4"
                style={{ background: "rgba(249,115,22,0.1)", border: "1px solid rgba(249,115,22,0.2)" }}>
                {point.icon}
              </div>
              <h3 className="text-base font-bold text-white mb-2">{point.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>
                {point.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
