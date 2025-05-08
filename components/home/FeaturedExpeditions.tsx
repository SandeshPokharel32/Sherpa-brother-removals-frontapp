"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Calendar, MapPin, Users, Star } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const expeditions = [
  {
    id: 1,
    title: "Mount Everest Base Camp",
    location: "Nepal, Himalayas",
    duration: "14 days",
    difficulty: "Moderate",
    groupSize: "8-12",
    rating: 4.9,
    reviews: 124,
    price: "$3,499",
    image: "https://images.pexels.com/photos/1054218/pexels-photo-1054218.jpeg",
    link: "/expeditions/everest-base-camp",
  },
  {
    id: 2,
    title: "Mont Blanc Summit",
    location: "France, Alps",
    duration: "7 days",
    difficulty: "Challenging",
    groupSize: "4-6",
    rating: 4.8,
    reviews: 98,
    price: "$2,799",
    image: "https://images.pexels.com/photos/848612/pexels-photo-848612.jpeg",
    link: "/expeditions/mont-blanc",
  },
  {
    id: 3,
    title: "Aconcagua Expedition",
    location: "Argentina, Andes",
    duration: "21 days",
    difficulty: "Difficult",
    groupSize: "6-10",
    rating: 4.7,
    reviews: 75,
    price: "$4,999",
    image: "https://images.pexels.com/photos/1365425/pexels-photo-1365425.jpeg",
    link: "/expeditions/aconcagua",
  },
  {
    id: 4,
    title: "Kilimanjaro Trek",
    location: "Tanzania, Africa",
    duration: "10 days",
    difficulty: "Moderate",
    groupSize: "8-14",
    rating: 4.9,
    reviews: 142,
    price: "$2,999",
    image: "https://images.pexels.com/photos/371633/pexels-photo-371633.jpeg",
    link: "/expeditions/kilimanjaro",
  },
];

export default function FeaturedExpeditions() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  return (
    <section ref={sectionRef} className="py-20 bg-gray-50">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="section-heading text-5xl sm:text-7xl font-bold mb-4 text-raisinBlack">
            Featured Summit Expeditions
          </h2>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            Embark on a life-changing journey with our most popular mountain
            expeditions. Led by certified guides with years of experience
            ensuring your safety and success.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {expeditions.map((expedition, index) => (
            <div
              key={expedition.id}
              ref={(el) => (cardsRef.current[index] = el)}
              className="expedition-card bg-white rounded-lg overflow-hidden"
            >
              <div className="relative h-56">
                <Image
                  src={expedition.image}
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
                    {expedition.location}
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-2 text-prussianBlue">
                  {expedition.title}
                </h3>

                <div className="flex flex-wrap gap-4 mb-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="h-4 w-4 mr-1 text-blueLagoon" />
                    {expedition.duration}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Users className="h-4 w-4 mr-1 text-blueLagoon" />
                    {expedition.groupSize}
                  </div>
                </div>

                {/* <div className="flex items-center mb-4">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="ml-1 text-gray-700 font-medium">
                    {expedition.rating}
                  </span>
                  <span className="ml-1 text-gray-500 text-sm">
                    ({expedition.reviews} reviews)
                  </span>
                </div> */}

                <div className="flex justify-between items-center">
                  {/* <span className="text-lg font-bold text-prussianBlue">{expedition.price}</span> */}
                  <Link
                    href={expedition.link}
                    className="btn-primary py-2 px-4 text-sm"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/expeditions" className="btn-secondary">
            View All Expeditions
          </Link>
        </div>
      </div>
    </section>
  );
}
