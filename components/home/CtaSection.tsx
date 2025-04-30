"use client";

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function CtaSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;

    if (section && content) {
      gsap.fromTo(
        content.querySelectorAll('.animate-item'),
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.2,
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
          },
        }
      );
    }
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-20 bg-cover bg-center relative"
      style={{
        backgroundImage: 'url(https://images.pexels.com/photos/2356059/pexels-photo-2356059.jpeg)',
      }}
    >
      <div className="absolute inset-0 bg-raisinBlack/70"></div>
      <div className="container-custom relative z-10">
        <div
          ref={contentRef}
          className="max-w-3xl mx-auto text-center text-white"
        >
          <h2 className="animate-item text-4xl md:text-5xl font-bold mb-6">
            Ready for Your Next Adventure?
          </h2>
          <p className="animate-item text-lg mb-8 text-gray-200">
            Whether you're dreaming of standing on a remote summit or skiing untouched powder,
            our team of professional guides is ready to make your mountain dreams a reality.
            Start planning your next expedition today.
          </p>
          <div className="animate-item flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/expeditions" className="btn-primary">
              Explore Expeditions
            </Link>
            <Link href="/contact" className="btn-outline">
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}