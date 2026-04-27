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
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span
            className="text-sm font-semibold uppercase tracking-wider"
            style={{ color: "#F97316" }}
          >
            Reviews
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 mt-2">
            What Nigerians are saying
          </h2>
          <div className="flex items-center justify-center gap-2 mt-3">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((i) => (
                <span key={i} className="text-yellow-400 text-lg">★</span>
              ))}
            </div>
            <span className="text-slate-600 text-sm font-medium">
              4.9 out of 5 from 2,400+ reviews
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="p-6 rounded-2xl border border-slate-100 hover:shadow-md transition-shadow"
              style={{ backgroundColor: "#f8fafc" }}
            >
              <div className="flex items-center gap-3 mb-4">
                {/* Avatar */}
                <div
                  className="w-11 h-11 rounded-full flex items-center justify-center text-sm font-bold text-white shrink-0"
                  style={{ backgroundColor: "#1B3A6B" }}
                >
                  {t.avatar}
                </div>
                <div>
                  <p className="font-bold text-slate-900 text-sm">{t.name}</p>
                  <p className="text-xs text-slate-400">{t.location}</p>
                </div>
                <div className="ml-auto flex shrink-0">
                  {[...Array(t.rating)].map((_, i) => (
                    <span key={i} className="text-yellow-400 text-sm">★</span>
                  ))}
                </div>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed mb-3">
                &ldquo;{t.text}&rdquo;
              </p>
              <span
                className="text-xs font-semibold px-3 py-1 rounded-full"
                style={{ backgroundColor: "#EFF6FF", color: "#1B3A6B" }}
              >
                {t.service}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
