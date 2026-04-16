import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TrustBar from "@/components/TrustBar";
import OurDifference from "@/components/OurDifference";
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
      <main className="pt-24">
      <Hero />
      <TrustBar />
      <OurDifference />
      <Categories />
      <WhyParadise />
      <DeliveryAreas />
      <Reviews />
      <CTA />
      </main>
      <Footer />
    </div>
  );
}
