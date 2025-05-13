"use client";

import React, { useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import { Button } from "../ui/button";
import { Typewriter } from "react-simple-typewriter";
import Script from "next/script";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { HeroSliderData, VideoContentItem } from "@/graphql/types";

gsap.registerPlugin(ScrollTrigger);

interface HorizontalVideoSliderProps {
  data: HeroSliderData;
}

export default function HorizontalVideoSlider({
  data,
}: HorizontalVideoSliderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const horizontalRef = useRef<HTMLDivElement>(null);
  // Use the items from data or fallback to empty array
  const videos = data?.videoContentCollection?.items ?? [];

  useGSAP(
    () => {
      const container = containerRef.current;
      const horizontal = horizontalRef.current;

      if (!container || !horizontal) {
        console.error("Refs not assigned:", { container, horizontal });
        return;
      }

      const totalVideos = videos.length;
      if (totalVideos === 0) return;

      const viewportWidth = window.innerWidth;
      const scrollDistance = viewportWidth * (totalVideos - 1);

      gsap.to(horizontal, {
        x: -scrollDistance,
        ease: "none",
        immediateRender: false,
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: () => `+=${container.offsetHeight}`,
          scrub: 0.5,
          snap: {
            snapTo: 1 / (totalVideos - 1),
            duration: { min: 0.2, max: 0.3 },
            delay: 0.1,
            ease: "power1.inOut",
          },
          pin: true,
          id: "horizontalScroll",
          // markers: true, // Uncomment for debugging
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
        className="flex h-screen w-screen relative"
        style={{
          width: `${100 * videos.length}vw`,
        }}
      >
        {videos.map(({ heading, cta, src, mobileSrc, description }, index) => (
          <VideoItem
            key={index}
            code={String(index)}
            src={src}
            mobileSrc={mobileSrc}
            heading={Array.isArray(heading) ? heading : [heading]}
            body={description}
            cta={cta}
          />
        ))}
      </div>
      <Script src="https://player.vimeo.com/api/player.js" />
    </div>
  );
}

interface VideoItemProps {
  code: string;
  src: string;
  mobileSrc?: string;
  heading: string[];
  body: string;
  cta: string;
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
          src="/images/video-fallback.png"
          fill
          className="z-5"
          style={{ objectFit: "cover" }}
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
        />
        {mobileSrc && (
          <iframe
            onLoad={() => setIsLoaded(true)}
            src={mobileSrc}
            allow="autoplay; clipboard-write; encrypted-media"
            className={cn("vimeo-iframe z-10 block md:hidden", {
              "z-0": !isLoaded,
            })}
            title="Help Center Video"
          />
        )}
      </div>
      <div className="absolute w-full inset-0 z-30 flex flex-col md:flex-row items-start md:items-end justify-end gap-10 md:justify-between px-8 py-10 md:px-20">
        <div className="text-left">
          <h1 className="text-white font-bold text-6xl sm:text-[5rem] md:text-[8.75rem] lg:text-[10.75rem] xl:text-[12.75rem] leading-tight font-sans uppercase">
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
          <p className="mt-4 text-white leading-tight md:leading-snug text-xl sm:text-3xl md:text-[3rem] font-light">
            {body}
          </p>
        </div>
        <Link href="/book-a-trip" passHref>
          <Button variant="outline" className="rounded-full">
            {cta} <span className="ml-2">»</span>
          </Button>
        </Link>
      </div>
    </div>
  );
};
