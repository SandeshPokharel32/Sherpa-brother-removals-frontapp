"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

// Register ScrollTrigger
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const expeditionTypes = [
  {
    id: 1,
    title: "Luxury Expeditions",
    description:
      "Premium guided experiences with top-tier accommodations, gourmet meals, and helicopter transfers.",
    image: "https://images.pexels.com/photos/3214958/pexels-photo-3214958.jpeg",
    link: "/expeditions/luxury",
  },
  {
    id: 2,
    title: "Standard Adventures",
    description:
      "Well-balanced expeditions with comfortable lodging, quality meals, and professional guides.",
    image: "https://images.pexels.com/photos/2365457/pexels-photo-2365457.jpeg",
    link: "/expeditions/standard",
  },
  {
    id: 3,
    title: "Basic Treks",
    description:
      "Essential guided experiences focusing on the adventure with simple accommodations and meals.",
    image: "https://images.pexels.com/photos/1687845/pexels-photo-1687845.jpeg",
    link: "/expeditions/basic",
  },
];

export default function ExpeditionTypes() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(
    () => {
      const section = sectionRef.current;

      if (section) {
        // Heading animation
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

      // Cards animation
      cards.forEach((card, index) => {
        if (card) {
          gsap.fromTo(
            card,
            { y: 50, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
              delay: 0.2 * index,
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

  return (
    <section ref={sectionRef} className="py-20 relative bg-white">
      <div className="container-custom">
        <h2 className="text-4xl font-bold text-center mb-16 text-raisinBlack">
          Expedition Types for Every Adventurer
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {expeditionTypes.map((type, index) => (
            <div
              key={type.id}
              ref={(el) => (cardsRef.current[index] = el)}
              className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="relative h-64">
                <Image
                  src={type.image}
                  alt={type.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-3 text-prussianBlue">
                  {type.title}
                </h3>
                <p className="text-gray-600 mb-4">{type.description}</p>
                <Link
                  href={type.link}
                  className="inline-flex items-center text-blueLagoon hover:text-prussianBlue font-medium"
                >
                  Explore Options
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
