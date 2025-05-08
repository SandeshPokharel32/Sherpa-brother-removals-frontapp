"use client";
import React, { useRef } from "react"; // Removed useState for ctx as useGSAP handles context
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import { Button } from "../ui/button";
import { Typewriter } from "react-simple-typewriter";

// Register ScrollTrigger and useGSAP outside of the component
gsap.registerPlugin(ScrollTrigger);

const videos = [
  {
    src: "/videos/4.mp4",
    heading: ["MT.DENALI", "EXPED AT"],
    body: "Expedition of Nepal's highest peak with a thrilling adventure.",
    cta: "Get Details",
    className: "top",
    code: "4",
  },
  {
    src: "/videos/1.mp4",
    heading: ["MT.LHOTSE.", "EXPED AT"],
    body: "Expedition to the fourth highest mountain in the world, scheduled for April - May (Spring) 2025",
    cta: "Learn More",
    code: "1",
    className: "bottom",
  },
  {
    src: "/videos/2.mp4",
    heading: ["MT.EVEREST.", "EXPED AT"],
    body: "Conquer the highest peak on Earth with expert guides and support.",
    cta: "Join Now",
    className: "top",
    code: "2",
  },
  {
    src: "/videos/3.mp4",
    heading: ["MT.K2.", "EXPED AT"],
    body: "Challenge yourself on the second highest mountain, known for its difficulty.",
    cta: "Discover More",
    className: "bottom",
    code: "3",
  },
];

export default function HorizontalVideoSlider() {
  const containerRef = useRef<HTMLDivElement>(null);
  const horizontalRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const container = containerRef.current;
      const horizontal = horizontalRef.current;

      if (!container || !horizontal) {
        console.error("Refs not assigned:", { container, horizontal });
        return;
      }

      const totalVideos = videos.length;
      const viewportWidth = window.innerWidth;
      const scrollDistance = viewportWidth * (totalVideos - 1);

      console.log("Initializing GSAP:", {
        totalVideos,
        viewportWidth,
        scrollDistance,
      });

      // Directly apply ScrollTrigger to the gsap.to animation
      gsap.to(horizontal, {
        x: -scrollDistance,
        ease: "none",
        immediateRender: false,
        scrollTrigger: {
          trigger: container,
          start: "top top", // Pin starts when the top of the container hits the top of the viewport
          end: () => `+=${container.offsetHeight}`, // Pin ends after scrolling the height of the container
          scrub: 0.5, // Scrub the animation based on scroll
          snap: {
            snapTo: 1 / (totalVideos - 1),
            duration: { min: 0.2, max: 0.3 },
            delay: 0.1,
            ease: "power1.inOut",
          },
          pin: true,
          id: "horizontalScroll",
          // markers: true, // Uncomment for debugging ScrollTrigger
        },
      });
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden bg-background"
    >
      <div
        ref={horizontalRef}
        className="flex !h-screen w-screen relative"
        style={{
          width: `${100 * videos.length}vw`,
        }}
      >
        {videos.map(({ src, heading, body, cta, code }) => (
          <div
            key={code}
            className="flex relative w-screen h-screen flex-shrink-0"
          >
            <div className="relative h-full w-fulloverflow-hidden">
              <video
                src={src}
                className="w-full h-full object-cover opacity-90"
                autoPlay
                muted
                loop
                playsInline
              />
              {/* <div className="absolute top-0 z-10 bottom-0 left-0 right-0 bg-black/25"></div> */}
            </div>
            <div className="absolute w-full inset-0 z-30 flex flex-wrap items-end justify-between px-8 py-20 md:px-20">
              <div className="text-left">
                <h1 className="text-white font-bold text-6xl sm:text-[5rem] md:text-[8.75rem] lg:text-[10.75rem]  xl:text-[12.75rem]  leading-tight font-sans uppercase">
                  {" "}
                  <Typewriter
                    words={heading}
                    loop={Infinity}
                    cursor
                    cursorStyle="_"
                    typeSpeed={90}
                    deleteSpeed={40}
                    delaySpeed={1200}
                  />
                </h1>
                <p className="mt-4 text-white leading-loose md:leading-snug text-2xl sm:text-3xl md:text-[3rem] font-light ">
                  {body}
                </p>
              </div>
              <Link href="/book-a-trip">
                <Button variant="outline" className="rounded-full">
                  {cta} <span className="ml-2">»</span>
                </Button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
