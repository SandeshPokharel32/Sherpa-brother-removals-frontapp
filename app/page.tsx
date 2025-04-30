import HeroSlider from "@/components/home/HeroSlider";
import ExpeditionTypes from "@/components/home/ExpeditionTypes";
import FeaturedExpeditions from "@/components/home/FeaturedExpeditions";
import RegionsSection from "@/components/home/RegionsSection";
import ServicesSection from "@/components/home/ServicesSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import CtaSection from "@/components/home/CtaSection";
import ExpeditionCloud from "@/components/home/expeditions-cloud";

export default function Home() {
  return (
    <div className="relative">
      <HeroSlider />
      {/* <ExpeditionCloud /> */}
      <ExpeditionTypes />
      <FeaturedExpeditions />
      <RegionsSection />
      <ServicesSection />
      <TestimonialsSection />
      <CtaSection />
    </div>
  );
}
