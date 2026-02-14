"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ExpeditionTypes({ data }: any) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(
    () => {
      const section = sectionRef.current;

      if (section) {
        gsap.fromTo(
          section.querySelector("h2"),
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            scrollTrigger: {
              trigger: section,
              start: "top 80%",
            },
          }
        );
      }
    },
    { scope: sectionRef }
  );

  useGSAP(
    () => {
      const cards = cardsRef.current;

      if (!cards.length) return;

      cards.forEach((card) => {
        if (card) {
          gsap.fromTo(
            card,
            { y: 50, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              scrollTrigger: {
                trigger: card,
                start: "top 85%",
              },
            }
          );
        }
      });
    },
    { scope: cardsRef }
  );

  const expeditionTypes = data?.types?.items || [];

  return (
    <section ref={sectionRef} className="py-5 md:py-20 relative bg-white">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {expeditionTypes.map((type: any, index: number) => {
            // You might want to provide fallback images or descriptions
            const image = type.image || "/images/fallback-image.jpeg"; // fallback image
            const description =
              type.description ||
              "Explore our exciting expeditions tailored for every adventurer.";
            const link = `/expeditions/${type.slug}`;

            return (
              <div
                key={type.slug || index}
                ref={(el) => {
                  cardsRef.current[index] = el;
                }}
                className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="relative h-64">
                  <Image
                    src={image}
                    alt={type.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-3 text-prussianBlue">
                    {type.name}
                  </h3>
                  <p className="text-gray-600 mb-4">{description}</p>
                  <Link
                    href={link}
                    className="inline-flex items-center text-blueLagoon hover:text-prussianBlue font-medium"
                  >
                    Explore Options
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
