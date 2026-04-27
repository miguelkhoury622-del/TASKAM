import Link from "next/link";

export default function Footer() {
  return (
    <footer style={{ background: "#040810", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl font-black tracking-tight text-white">TASKAM</span>
              <span className="text-xs font-bold px-1.5 py-0.5 rounded text-white"
                style={{ background: "linear-gradient(135deg, #F97316, #fb923c)" }}>NG</span>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.4)" }}>
              Nigeria&apos;s most trusted home services platform. Book verified professionals in minutes.
            </p>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold text-sm mb-4" style={{ color: "rgba(255,255,255,0.6)" }}>Services</h4>
            <ul className="space-y-2 text-sm" style={{ color: "rgba(255,255,255,0.35)" }}>
              {["Cleaning", "Repairs", "Plumbing", "Electrical", "Appliances", "Painting"].map((s) => (
                <li key={s}>
                  <Link href="/services" className="transition-colors hover:text-white">{s}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold text-sm mb-4" style={{ color: "rgba(255,255,255,0.6)" }}>Company</h4>
            <ul className="space-y-2 text-sm" style={{ color: "rgba(255,255,255,0.35)" }}>
              {[
                { label: "About Us", href: "/about" },
                { label: "How It Works", href: "/how-it-works" },
                { label: "Become a Pro", href: "/technician/apply" },
                { label: "Blog", href: "/blog" },
              ].map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="transition-colors hover:text-white">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold text-sm mb-4" style={{ color: "rgba(255,255,255,0.6)" }}>Support</h4>
            <ul className="space-y-2 text-sm" style={{ color: "rgba(255,255,255,0.35)" }}>
              {[
                { label: "Help Center", href: "/help" },
                { label: "Contact Us", href: "/contact" },
                { label: "Privacy Policy", href: "/privacy" },
                { label: "Terms of Service", href: "/terms" },
              ].map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="transition-colors hover:text-white">{l.label}</Link>
                </li>
              ))}
            </ul>
            <div className="mt-4 text-sm space-y-1" style={{ color: "rgba(255,255,255,0.35)" }}>
              <p>📞 +234 800 TASKAM</p>
              <p>✉️ hello@taskam.ng</p>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          <div className="flex flex-col md:flex-row items-center justify-between gap-3 text-sm" style={{ color: "rgba(255,255,255,0.25)" }}>
            <p>© 2026 Taskam Technologies Ltd. All rights reserved.</p>
            <p>Made with ❤️ in Nigeria 🇳🇬</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
