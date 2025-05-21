"use client";

import { useRef } from "react";
import Link from "next/link";
import { Button } from "../ui/button";
import Image from "next/image";

export default function CtaSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  return (
    <section ref={sectionRef} className="py-20 bg-cover bg-center relative">
      <Image
        alt="get some adventures"
        src="/images/cta-image.jpeg"
        fill
        objectFit="cover"
      />
      <div className="absolute inset-0 bg-raisin-black/70"></div>
      <div className="container-custom relative z-10">
        <div
          ref={contentRef}
          className="max-w-3xl mx-auto text-center text-white"
        >
          <h2 className="animate-item text-4xl md:text-7xl font-bold mb-6">
            Ready for Your Next Adventure?
          </h2>
          <p className="animate-item text-lg mb-8 text-gray-200">
            Whether you&apos;re dreaming of standing on a remote summit or
            skiing untouched powder, our team of professional guides is ready to
            make your mountain dreams a reality. Start planning your next
            expedition today.
          </p>
          <div className="animate-item flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/expeditions" className="btn-primary">
              <Button size="lg" className="cursor-pointer w-full md:w-auto">
                Explore Expeditions
              </Button>
            </Link>
            <Link href="/contact" className="btn-outline">
              <Button
                variant="secondary"
                size="lg"
                className="cursor-pointer w-full md:w-auto"
              >
                {" "}
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
