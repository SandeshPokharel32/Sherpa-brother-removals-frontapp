"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { Compass, Award, Shield, Users, BookOpen, Star } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const services = [
  {
    id: 1,
    title: "Expert Guiding",
    description:
      "Our certified guides have decades of combined experience on the world's most challenging mountains.",
    icon: <Compass className="h-12 w-12 text-blueLagoon" />,
  },
  {
    id: 2,
    title: "Ski Instruction",
    description:
      "From beginners to advanced, our ski instructors provide personalized lessons in stunning backcountry terrain.",
    icon: <Award className="h-12 w-12 text-blueLagoon" />,
  },
  {
    id: 3,
    title: "Safety Training",
    description:
      "Learn essential safety skills including avalanche awareness, rescue techniques, and wilderness first aid.",
    icon: <Shield className="h-12 w-12 text-blueLagoon" />,
  },
  {
    id: 4,
    title: "Group Expeditions",
    description:
      "Join like-minded adventurers on scheduled group expeditions to popular destinations worldwide.",
    icon: <Users className="h-12 w-12 text-blueLagoon" />,
  },
  {
    id: 5,
    title: "Custom Itineraries",
    description:
      "We design bespoke adventures tailored to your skill level, time constraints, and dream destinations.",
    icon: <BookOpen className="h-12 w-12 text-blueLagoon" />,
  },
  {
    id: 6,
    title: "Equipment Rental",
    description:
      "Access high-quality mountaineering and skiing equipment without the hassle and expense of ownership.",
    icon: <Star className="h-12 w-12 text-blueLagoon" />,
  },
];

export default function ServicesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<(HTMLDivElement | null)[]>([]);

  return (
    <section ref={sectionRef} className="py-20 bg-gray-50">
      <div className="container-custom">
        <h2
          ref={titleRef}
          className="text-5xl sm:text-7xl font-bold text-center mb-16 text-raisinBlack"
        >
          Services We Offer
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div
            ref={imageRef}
            className="relative rounded-lg overflow-hidden h-[600px]"
          >
            <Image
              src="https://images.pexels.com/photos/414277/pexels-photo-414277.jpeg"
              alt="Mountain expedition services"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-prussianBlue/30"></div>
            <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black to-transparent">
              <span className="text-white text-lg font-medium">
                World-class expedition services
              </span>
              <h3 className="text-white text-3xl font-bold">
                Expertise You Can Trust
              </h3>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {services.map((service, index) => (
              <div
                key={service.id}
                ref={(el) => (servicesRef.current[index] = el)}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
              >
                <div className="mb-4">{service.icon}</div>
                <h3 className="text-xl font-bold mb-2 text-prussianBlue">
                  {service.title}
                </h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
