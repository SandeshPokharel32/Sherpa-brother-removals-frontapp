"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { Star } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    location: "United States",
    quote:
      "The Everest Base Camp trek was the adventure of a lifetime. Our guide was extremely knowledgeable and prioritized our safety while making sure we had an amazing experience.",
    rating: 5,
    image: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg",
    expedition: "Everest Base Camp Trek",
  },
  {
    id: 2,
    name: "James Wilson",
    location: "United Kingdom",
    quote:
      "As an intermediate skier, I was looking to improve my skills in the backcountry. The guide was patient and tailored the instruction to my level. I left feeling much more confident!",
    rating: 5,
    image: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg",
    expedition: "Alps Backcountry Skiing",
  },
  {
    id: 3,
    name: "Maria Lopez",
    location: "Spain",
    quote:
      "The Mont Blanc summit expedition exceeded all my expectations. The guides were professional, encouraging, and made sure everyone in our group reached the summit safely.",
    rating: 5,
    image: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg",
    expedition: "Mont Blanc Summit",
  },
];

export default function TestimonialsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const testimonialsRef = useRef<(HTMLDivElement | null)[]>([]);

  return (
    <section ref={sectionRef} className="py-20 bg-prussianBlue">
      <div className="container-custom">
        <h2
          ref={headingRef}
          className="text-5xl sm:text-7xl font-bold text-center mb-16 text-white"
        >
          What Our Adventurers Say
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              ref={(el) => (testimonialsRef.current[index] = el)}
              className="bg-white rounded-lg p-6 shadow-lg"
            >
              <div className="flex items-center mb-4">
                <div className="relative w-14 h-14 rounded-full overflow-hidden mr-4">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    fill
                    sizes="56px"
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-bold text-prussianBlue">
                    {testimonial.name}
                  </h4>
                  <p className="text-gray-600 text-sm">
                    {testimonial.location}
                  </p>
                </div>
              </div>

              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-5 w-5 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>

              <p className="text-gray-700 mb-4 italic">
                &apos;{testimonial.quote}&apos;
              </p>

              <div className="pt-4 border-t border-gray-200">
                <span className="text-blueLagoon font-medium text-sm">
                  {testimonial.expedition}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
