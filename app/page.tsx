import HeroSlider from "@/components/home/HeroSlider";
import ExpeditionTypes from "@/components/home/ExpeditionTypes";
import FeaturedExpeditions from "@/components/home/FeaturedExpeditions";
import RegionsSection from "@/components/home/RegionsSection";
import ServicesSection from "@/components/home/ServicesSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import CtaSection from "@/components/home/CtaSection";
import ExpeditionCloud from "@/components/home/expeditions-cloud";
import { fetchExpeditionTypes } from "@/graphql/api/fetchExpeditionTypes";
import { fetchHeroSlider } from "@/graphql/api/fetchHeroSlider";
import { fetchFooterDetails } from "@/graphql/api/fetchFooterDetails";

export default async function Home() {
  const data = await fetchExpeditionTypes();
  const heroSliderData = await fetchHeroSlider();

  return (
    <div className="relative">
      {/* <HeroSlider data={heroSliderData} /> */}
      {/* <div className="relative">
        <ExpeditionCloud />
      </div> */}
      <ExpeditionTypes data={data} />
      <FeaturedExpeditions data={data} />
      <RegionsSection data={data} />
      <ServicesSection />
      <TestimonialsSection />
      <CtaSection />
    </div>
  );
}
