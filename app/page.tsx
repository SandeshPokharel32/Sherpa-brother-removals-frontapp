import HeroSlider from "@/components/home/HeroSlider";
import ExpeditionTypes from "@/components/home/ExpeditionTypes";
import FeaturedExpeditions from "@/components/home/FeaturedExpeditions";
import RegionsSection from "@/components/home/RegionsSection";
import ServicesSection from "@/components/home/ServicesSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import CtaSection from "@/components/home/CtaSection";
import ExpeditionCloud from "@/components/home/expeditions-cloud";
import { fetchExpeditionCategories } from "@/lib/contentful";

export default async function Home() {
  const data = await fetchExpeditionCategories();
  console.log({ data });
  return (
    <div className="relative">
      <HeroSlider />
      <div className="relative hidden sm:block">
        <ExpeditionCloud />
      </div>
      <ExpeditionTypes />
      <FeaturedExpeditions />
      <RegionsSection />
      <ServicesSection />
      <TestimonialsSection />
      <CtaSection />
    </div>
  );
}
