import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TrustBar from "@/components/TrustBar";
import Categories from "@/components/Categories";
import WhyParadise from "@/components/WhyParadise";
import DeliveryAreas from "@/components/DeliveryAreas";
import Reviews from "@/components/Reviews";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-surface">
      <Navbar />
      <Hero />
      <TrustBar />
      <Categories />
      <WhyParadise />
      <DeliveryAreas />
      <Reviews />
      <CTA />
      <Footer />
    </div>
  );
}
