const steps = [
  {
    step: "01",
    title: "Choose a Service",
    description:
      "Browse our categories and pick the service you need — from cleaning to electrical repairs.",
    icon: "🔍",
  },
  {
    step: "02",
    title: "Book a Pro",
    description:
      "Select your preferred date, time and location. We'll match you with a verified professional near you.",
    icon: "📅",
  },
  {
    step: "03",
    title: "Get it Done",
    description:
      "Your pro arrives, completes the job, and you pay — by card, transfer, or cash on arrival.",
    icon: "✅",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-20" style={{ backgroundColor: "#f8fafc" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span
            className="text-sm font-semibold uppercase tracking-wider"
            style={{ color: "#F97316" }}
          >
            Simple Process
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 mt-2">
            How Taskam Works
          </h2>
          <p className="text-slate-500 mt-3 max-w-xl mx-auto">
            Getting help at home has never been easier. Book in under 2 minutes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Connector line */}
          <div className="hidden md:block absolute top-12 left-1/3 right-1/3 h-0.5 bg-slate-200 z-0" />

          {steps.map((step, i) => (
            <div key={i} className="relative z-10 flex flex-col items-center text-center">
              {/* Icon circle */}
              <div
                className="w-24 h-24 rounded-2xl flex items-center justify-center text-4xl mb-6 shadow-sm"
                style={{ backgroundColor: "white", border: "2px solid #e2e8f0" }}
              >
                {step.icon}
              </div>

              {/* Step number */}
              <span
                className="text-xs font-black uppercase tracking-widest mb-2"
                style={{ color: "#F97316" }}
              >
                Step {step.step}
              </span>

              <h3 className="text-lg font-bold text-slate-900 mb-2">{step.title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed max-w-xs">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        {/* Pay on arrival banner */}
        <div
          className="mt-14 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-4"
          style={{ backgroundColor: "#EFF6FF", border: "1px solid #BFDBFE" }}
        >
          <div className="flex items-center gap-4">
            <span className="text-4xl">💵</span>
            <div>
              <p className="font-bold text-slate-900">No stress about payment</p>
              <p className="text-sm text-slate-600">
                You can pay in cash when the technician arrives — no upfront payment required.
              </p>
            </div>
          </div>
          <span
            className="text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-full"
            style={{ backgroundColor: "#1B3A6B", color: "white" }}
          >
            Cash Accepted
          </span>
        </div>
      </div>
    </section>
  );
}
