import { Suspense } from "react";
import ServicesContent from "./ServicesContent";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

function LoadingFallback() {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: "var(--bg-gradient)" }}>
      <Navbar />
      <div className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="rounded-2xl h-64 animate-pulse" style={{ background: "rgba(255,255,255,0.05)" }} />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default function ServicesPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <ServicesContent />
    </Suspense>
  );
}
