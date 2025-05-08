"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const regions = [
  {
    id: 1,
    name: "Himalayas",
    description:
      "Home to the world's highest peaks including Mount Everest, K2, and Annapurna.",
    expeditionCount: 15,
    image: "https://images.pexels.com/photos/1659438/pexels-photo-1659438.jpeg",
    link: "/regions/himalayas",
  },
  {
    id: 2,
    name: "European Alps",
    description:
      "Stunning mountain range stretching across France, Switzerland, Italy, and Austria.",
    expeditionCount: 12,
    image: "https://images.pexels.com/photos/1366909/pexels-photo-1366909.jpeg",
    link: "/regions/alps",
  },
  {
    id: 3,
    name: "Andes",
    description:
      "The world's longest mountain range, running through seven South American countries.",
    expeditionCount: 8,
    image: "https://images.pexels.com/photos/97906/pexels-photo-97906.jpeg",
    link: "/regions/andes",
  },
  {
    id: 4,
    name: "Alaska Range",
    description:
      "Magnificent wilderness featuring Denali, the highest peak in North America.",
    expeditionCount: 6,
    image: "https://images.pexels.com/photos/2098428/pexels-photo-2098428.jpeg",
    link: "/regions/alaska",
  },
  {
    id: 5,
    name: "Rocky Mountains",
    description:
      "Spectacular mountain system of western North America known for diverse landscapes.",
    expeditionCount: 9,
    image: "https://images.pexels.com/photos/618833/pexels-photo-618833.jpeg",
    link: "/regions/rockies",
  },
  {
    id: 6,
    name: "Caucasus",
    description:
      "Mountain system at the intersection of Europe and Asia featuring diverse cultures.",
    expeditionCount: 5,
    image: "https://images.pexels.com/photos/4496593/pexels-photo-4496593.jpeg",
    link: "/regions/caucasus",
  },
];

export default function RegionsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  return (
    <section ref={sectionRef} className=" pt-10 md:py-20 bg-white">
      <div className="container-custom">
        <h2
          ref={headingRef}
          className="text-5xl sm:text-7xl font-bold text-center mb-16 text-raisinBlack"
        >
          Explore by Region
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {regions.map((region, index) => (
            <div
              key={region.id}
              ref={(el) => (cardsRef.current[index] = el)}
              className="region-card group cursor-pointer"
            >
              <Link href={region.link}>
                <div className="relative h-72 overflow-hidden rounded-lg">
                  <Image
                    src={region.image}
                    alt={region.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-2xl font-bold text-white mb-2">
                      {region.name}
                    </h3>
                    <p className="text-gray-200 text-sm mb-3 line-clamp-2">
                      {region.description}
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="text-white text-sm">
                        {region.expeditionCount} expeditions
                      </span>
                      <div className="bg-blueLagoon rounded-full p-1 transform transition-transform duration-300 group-hover:translate-x-1">
                        <ArrowRight className="h-4 w-4 text-white" />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
