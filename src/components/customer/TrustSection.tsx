const trustPoints = [
  {
    icon: "🛡️",
    title: "Verified Professionals",
    description:
      "Every technician on Taskam is background-checked, ID-verified, and skill-tested before they can take jobs.",
  },
  {
    icon: "⭐",
    title: "Rated & Reviewed",
    description:
      "Real reviews from real customers. You can see ratings, completed jobs, and feedback before you book.",
  },
  {
    icon: "💵",
    title: "Pay Your Way",
    description:
      "Pay by card, bank transfer, or cash when the technician arrives. No upfront payment required.",
  },
  {
    icon: "📞",
    title: "24/7 Support",
    description:
      "Our support team is always available via WhatsApp, phone, or live chat to resolve any issues.",
  },
  {
    icon: "🔁",
    title: "Satisfaction Guarantee",
    description:
      "Not happy with the job? We'll send another pro or give you a full refund. No questions asked.",
  },
  {
    icon: "⚡",
    title: "Fast Booking",
    description:
      "Book in under 2 minutes. Same-day service available for urgent requests across major cities.",
  },
];

export default function TrustSection() {
  return (
    <section
      className="py-20"
      style={{ background: "linear-gradient(135deg, #1B3A6B 0%, #2a5298 100%)" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span
            className="text-sm font-semibold uppercase tracking-wider"
            style={{ color: "#F97316" }}
          >
            Why Taskam
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-white mt-2">
            Your safety is our priority
          </h2>
          <p className="text-blue-200 mt-3 max-w-xl mx-auto">
            We built Taskam around trust — so you can let a professional into your
            home with complete confidence.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {trustPoints.map((point) => (
            <div
              key={point.title}
              className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/15 transition-colors"
            >
              <span className="text-3xl mb-4 block">{point.icon}</span>
              <h3 className="text-base font-bold text-white mb-2">{point.title}</h3>
              <p className="text-sm text-blue-200 leading-relaxed">{point.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
