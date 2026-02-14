"use client";

import React, { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { Button } from "../ui/button";
import { Typewriter } from "react-simple-typewriter";
import Script from "next/script";
import { cn } from "@/lib/utils";
import { HeroSliderData } from "@/graphql/types";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

interface HorizontalVideoSliderProps {
  data: HeroSliderData | null;
}

export default function HorizontalVideoSlider({
  data,
}: HorizontalVideoSliderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const horizontalRef = useRef<HTMLDivElement>(null);
  const videos = data?.videoContentCollection?.items ?? [];

  useGSAP(
    () => {
      const container = containerRef.current;
      const horizontal = horizontalRef.current;

      if (!container || !horizontal) return;

      const totalVideos = videos.length;
      if (totalVideos === 0) return;

      const viewportWidth = window.innerWidth;
      const scrollDistance = viewportWidth * (totalVideos - 1);

      gsap.to(horizontal, {
        x: -scrollDistance,
        ease: "none",
        immediateRender: true,
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
        },
      });

      return () => {
        // Clean up GSAP animation
        ScrollTrigger.getById("horizontalScroll")?.kill();
      };
    },
    { scope: containerRef, dependencies: [videos.length] }
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

const buildVimeoSrc = (url: string) => {
  const [base, queryString] = url.split("?");
  const params = new URLSearchParams(queryString || "");
  params.set("autoplay", "1"); // Disable autoplay; control manually
  params.set("muted", "1");
  params.set("background", "1");
  params.set("playsinline", "1");
  return `${base}?${params.toString()}`;
};

const VideoItem = ({
  code,
  src,
  mobileSrc,
  heading,
  body,
  cta,
}: VideoItemProps) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const iframeMobileRef = useRef<HTMLIFrameElement>(null);

  const mutedSrc = buildVimeoSrc(src);
  const mutedMobileSrc = mobileSrc ? buildVimeoSrc(mobileSrc) : undefined;

  return (
    <div key={code} className="flex relative w-screen h-full shrink-0">
      <div className="relative h-full w-full overflow-hidden bg-[#3691e0] bg-gradient-to-b from-[#00224e] to-[#025074]">
        <>
          <iframe
            ref={iframeRef}
            src={mutedSrc}
            allow="autoplay; clipboard-write; encrypted-media"
            allowFullScreen
            loading="lazy"
            className={cn("vimeo-iframe z-20 hidden md:block")}
            title="Help Center Video"
          />
          {mobileSrc && (
            <iframe
              ref={iframeMobileRef}
              src={mutedMobileSrc}
              allow="autoplay; clipboard-write; encrypted-media"
              allowFullScreen
              loading="lazy"
              className={cn("vimeo-iframe z-20 block md:hidden")}
              title="Help Center Video"
            />
          )}
        </>
      </div>

      <div className="absolute w-full inset-0 z-30 flex flex-col md:flex-row items-start md:items-end justify-end gap-10 md:justify-between px-8 py-20 md:px-20">
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
            {cta} <span className="ml-2">→</span>
          </Button>
        </Link>
      </div>
    </div>
  );
};
