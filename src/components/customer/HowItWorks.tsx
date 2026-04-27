const steps = [
  {
    step: "01",
    title: "Choose a Service",
    description: "Browse our categories and pick the service you need — from cleaning to electrical repairs.",
    icon: "🔍",
  },
  {
    step: "02",
    title: "Book a Pro",
    description: "Select your preferred date, time and location. We'll match you with a verified professional near you.",
    icon: "📅",
  },
  {
    step: "03",
    title: "Get it Done",
    description: "Your pro arrives, completes the job, and you pay — by card, transfer, or cash on arrival.",
    icon: "✅",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-24 relative overflow-hidden" style={{ background: "linear-gradient(180deg, #0a1020 0%, #070d1a 100%)" }}>
      <div className="orb w-96 h-96 top-0 left-1/2 -translate-x-1/2 opacity-10" style={{ background: "radial-gradient(circle, #7C3AED, transparent)" }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-sm font-bold uppercase tracking-widest gradient-text">Simple Process</span>
          <h2 className="text-4xl font-black text-white mt-2">How Taskam Works</h2>
          <p className="mt-3 text-base max-w-xl mx-auto" style={{ color: "rgba(255,255,255,0.5)" }}>
            Getting help at home has never been easier. Book in under 2 minutes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Connector line */}
          <div className="hidden md:block absolute top-12 left-[calc(33%+3rem)] right-[calc(33%+3rem)] h-px z-0"
            style={{ background: "linear-gradient(90deg, transparent, rgba(249,115,22,0.4), transparent)" }} />

          {steps.map((step, i) => (
            <div key={i} className="relative z-10 flex flex-col items-center text-center group">
              <div className="w-24 h-24 rounded-2xl flex items-center justify-center text-4xl mb-6 glass-card transition-all duration-300 group-hover:scale-110"
                style={{ border: "1px solid rgba(249,115,22,0.2)" }}>
                {step.icon}
              </div>
              <span className="text-xs font-black uppercase tracking-widest mb-2 gradient-text">
                Step {step.step}
              </span>
              <h3 className="text-lg font-bold text-white mb-2">{step.title}</h3>
              <p className="text-sm leading-relaxed max-w-xs" style={{ color: "rgba(255,255,255,0.5)" }}>
                {step.description}
              </p>
            </div>
          ))}
        </div>

        {/* Pay on arrival banner */}
        <div className="mt-14 glass-card rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-4"
          style={{ border: "1px solid rgba(249,115,22,0.2)" }}>
          <div className="flex items-center gap-4">
            <span className="text-4xl">💵</span>
            <div>
              <p className="font-bold text-white">No stress about payment</p>
              <p className="text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>
                You can pay in cash when the technician arrives — no upfront payment required.
              </p>
            </div>
          </div>
          <span className="text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-full text-white whitespace-nowrap"
            style={{ background: "linear-gradient(135deg, #F97316, #ea6c00)", boxShadow: "0 0 20px rgba(249,115,22,0.3)" }}>
            Cash Accepted
          </span>
        </div>
      </div>
    </section>
  );
}
