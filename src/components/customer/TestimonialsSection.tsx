const testimonials = [
  {
    name: "Amaka Okonkwo",
    location: "Lagos Island",
    rating: 5,
    text: "I booked a cleaner through Taskam and she arrived exactly on time. My apartment was spotless. I've already booked a second session!",
    service: "Deep House Cleaning",
    avatar: "AO",
  },
  {
    name: "Chukwudi Eze",
    location: "Abuja, Maitama",
    rating: 5,
    text: "My AC stopped working on a Friday evening. I found an appliance technician on Taskam and he fixed it the same night. Excellent service.",
    service: "AC Repair",
    avatar: "CE",
  },
  {
    name: "Fatima Bello",
    location: "Port Harcourt",
    rating: 5,
    text: "The plumber was professional, explained everything he was doing, and charged exactly what was quoted. No hidden fees. Will use again.",
    service: "Plumbing Repair",
    avatar: "FB",
  },
  {
    name: "Tunde Adeyemi",
    location: "Ikeja, Lagos",
    rating: 5,
    text: "Booked an electrician for my new apartment wiring. He was punctual, tidy, and the work was properly done. Taskam is the real deal.",
    service: "Electrical Wiring",
    avatar: "TA",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="py-24 relative overflow-hidden" style={{ background: "linear-gradient(180deg, #0a1020 0%, #070d1a 100%)" }}>
      <div className="orb w-80 h-80 bottom-0 right-0 opacity-10" style={{ background: "radial-gradient(circle, #F97316, transparent)" }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-sm font-bold uppercase tracking-widest gradient-text">Reviews</span>
          <h2 className="text-4xl font-black text-white mt-2">What Nigerians are saying</h2>
          <div className="flex items-center justify-center gap-2 mt-3">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((i) => (
                <span key={i} className="text-yellow-400 text-lg">★</span>
              ))}
            </div>
            <span className="text-sm font-medium" style={{ color: "rgba(255,255,255,0.5)" }}>
              4.9 out of 5 from 2,400+ reviews
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((t) => (
            <div key={t.name} className="glass-card rounded-2xl p-6 hover:scale-[1.01] transition-all duration-300">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-11 h-11 rounded-full flex items-center justify-center text-sm font-bold text-white shrink-0"
                  style={{ background: "linear-gradient(135deg, #1B3A6B, #2a5298)" }}>
                  {t.avatar}
                </div>
                <div>
                  <p className="font-bold text-white text-sm">{t.name}</p>
                  <p className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>{t.location}</p>
                </div>
                <div className="ml-auto flex shrink-0">
                  {[...Array(t.rating)].map((_, i) => (
                    <span key={i} className="text-yellow-400 text-sm">★</span>
                  ))}
                </div>
              </div>
              <p className="text-sm leading-relaxed mb-3" style={{ color: "rgba(255,255,255,0.65)" }}>
                &ldquo;{t.text}&rdquo;
              </p>
              <span className="text-xs font-semibold px-3 py-1 rounded-full"
                style={{ background: "rgba(249,115,22,0.12)", color: "#F97316", border: "1px solid rgba(249,115,22,0.2)" }}>
                {t.service}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
