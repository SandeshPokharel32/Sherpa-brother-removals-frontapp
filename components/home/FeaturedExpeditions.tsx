"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Calendar, MapPin, Users } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function FeaturedExpeditions({
  data,
  dataSlug = "summit-expedition",
  title = "Featured Summit Expeditions",
  subtitle = "Embark on a life-changing journey with our most popular mountain expeditions. Led by certified guides with years of experienceensuring your safety and success.",
  buttonText = "View Summit Expeditions",
}: any) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  // Find the summit-expedition type
  const summitType = data?.types?.items?.find(
    (type: any) => type.slug === dataSlug
  );

  if (!summitType) return null;

  // Collect expeditions from all categories under summitType
  const expeditions =
    summitType.categories?.items?.flatMap(
      (category: any) => category.expeditions?.items || []
    ) || [];

  if (expeditions.length === 0) return null;

  return (
    <section ref={sectionRef} className="pt-10 md:py-20 bg-gray-50">
      <div className="container-custom">
        <div className="text-center mb-16">
          {!!title && (
            <h2 className="section-heading text-5xl sm:text-7xl font-bold mb-4 text-raisinBlack">
              {title}
            </h2>
          )}
          {!!subtitle && (
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
              {subtitle}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {expeditions.map((expedition: any, index: number) => (
            <div
              key={index}
              ref={(el) => {
                cardsRef.current[index] = el;
              }}
              className="expedition-card bg-white rounded-lg overflow-hidden"
            >
              <div className="relative h-56">
                <Image
                  src={expedition.image || "/images/fallback-image.jpeg"}
                  alt={expedition.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center mb-2">
                  <MapPin className="h-4 w-4 text-blueLagoon mr-1" />
                  <span className="text-gray-600 text-sm">
                    {expedition.altitude || "Unknown altitude"}
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-2 text-prussianBlue">
                  {expedition.title}
                </h3>

                <div className="flex flex-wrap gap-4 mb-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="h-4 w-4 mr-1 text-blueLagoon" />
                    {expedition.duration || "N/A"}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Users className="h-4 w-4 mr-1 text-blueLagoon" />
                    {expedition.groupSize || "N/A"}
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <Link
                    href={`/expedition/${expedition.slug}`}
                    className="bg-primary text-white rounded-md py-2 px-4 text-sm"
                  >
                    View Exped.
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href={`/expeditions/${dataSlug}`} className="btn-secondary">
            {buttonText}
          </Link>
        </div>
      </div>
    </section>
  );
}
