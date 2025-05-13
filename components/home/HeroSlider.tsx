"use client";
import React, { useRef, useState } from "react"; // Removed useState for ctx as useGSAP handles context
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import { Button } from "../ui/button";
import { Typewriter } from "react-simple-typewriter";
import Script from "next/script";
import { cn } from "@/lib/utils";
import Image from "next/image";

// Register ScrollTrigger and useGSAP outside of the component
gsap.registerPlugin(ScrollTrigger);

const videos = [
  {
    src: "https://player.vimeo.com/video/1082858873?h=35a8a9370f&autoplay=1&loop=1&title=0&byline=0&portrait=0&background=1&badge=0&autopause=0&app_id=58479",
    mobileSrc:
      "https://player.vimeo.com/video/1083843060?h=f1cfca93c2&autoplay=1&loop=1&title=0&byline=0&portrait=0&background=1&badge=0&autopause=0&app_id=58479",
    heading: ["MT.K2.", "EXPED AT"],
    body: "Challenge yourself on the second highest mountain, known for its difficulty.",
    cta: "Discover More",
    className: "bottom",
    code: "3",
  },

  {
    src: "https://player.vimeo.com/video/1082858993?h=aa655ae605&autoplay=1&loop=1&title=0&byline=0&portrait=0&background=1&badge=0&autopause=0&app_id=58479",
    heading: ["MT.LHOTSE.", "EXPED AT"],
    body: "Expedition to the fourth highest mountain in the world, scheduled for April - May (Spring) 2025",
    cta: "Learn More",
    code: "1",
    className: "bottom",
  },
  {
    src: "https://player.vimeo.com/video/1082858929?h=7029cbd455&autoplay=1&loop=1&title=0&byline=0&portrait=0&background=1&badge=0&autopause=0&app_id=58479",
    heading: ["MT.EVEREST.", "EXPED AT"],
    body: "Conquer the highest peak on Earth with expert guides and support.",
    cta: "Join Now",
    className: "top",
    code: "2",
  },
  {
    src: "https://player.vimeo.com/video/1082859023?h=2d53c06647&autoplay=1&loop=1&controls=0&title=0&portrait=1&background=1&badge=0&autopause=0&app_id=58479",
    heading: ["MT.DENALI", "EXPED AT"],
    body: "Expedition of Nepal's highest peak with a thrilling adventure.",
    cta: "Get Details",
    className: "top",
    code: "4",
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
        className="flex h-screen! w-screen relative"
        style={{
          width: `${100 * videos.length}vw`,
        }}
      >
        {videos.map(({ src, mobileSrc, heading, body, cta, code }) => (
          <VideoItem
            mobileSrc={mobileSrc}
            key={code}
            code={code}
            src={src}
            heading={heading}
            body={body}
            cta={cta}
          />
        ))}
      </div>
      <Script src="https://player.vimeo.com/api/player.js"></Script>
    </div>
  );
}

// Define the props type for VideoItem
interface VideoItemProps {
  code: string;
  src: string;
  heading: string[];
  body: string;
  cta: string;
  mobileSrc?: string;
}

const VideoItem = ({
  code,
  src,
  mobileSrc,
  heading,
  body,
  cta,
}: VideoItemProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  return (
    <div key={code} className="flex relative w-screen h-screen shrink-0">
      <div className="relative h-full w-full overflow-hidden bg-[#c3c3c3]">
        <Image
          alt="mountain"
          src={`/images/video-fallback.png`}
          fill
          className="z-5"
          objectFit="cover"
          priority
        />
        <iframe
          onLoad={() => setIsLoaded(true)}
          src={src}
          allow="autoplay; clipboard-write; encrypted-media"
          className={cn("vimeo-iframe z-10 hidden md:block", {
            "z-0": !isLoaded,
          })}
          title="Help Center Video"
        ></iframe>
        <iframe
          onLoad={() => setIsLoaded(true)}
          src={mobileSrc}
          allow="autoplay; clipboard-write; encrypted-media"
          className={cn("vimeo-iframe z-10  block md:hidden", {
            "z-0": !isLoaded,
          })}
          title="Help Center Video"
        ></iframe>
      </div>
      <div className="absolute w-full inset-0 z-30 flex flex-col md:flex-row items-start  md:items-end justify-end gap-10 md:justify-between md:justify-between px-8 py-10 md:px-20">
        <div className="text-left">
          <h1 className="text-white font-bold text-6xl sm:text-[5rem] md:text-[8.75rem] lg:text-[10.75rem] xl:text-[12.75rem] leading-tight font-sans uppercase">
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
          <p className="mt-4 text-white leading-tight md:leading-snug text-xl sm:text-3xl md:text-[3rem] font-light ">
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
  );
};
