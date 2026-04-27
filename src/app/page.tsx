import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/customer/HeroSection";
import CategoriesSection from "@/components/customer/CategoriesSection";
import HowItWorks from "@/components/customer/HowItWorks";
import FeaturedServices from "@/components/customer/FeaturedServices";
import TrustSection from "@/components/customer/TrustSection";
import TestimonialsSection from "@/components/customer/TestimonialsSection";
import CTASection from "@/components/customer/CTASection";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <CategoriesSection />
        <HowItWorks />
        <FeaturedServices />
        <TrustSection />
        <TestimonialsSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
