"use client";

import React, { useRef, useState, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import { Button } from "../ui/button";
import { Typewriter } from "react-simple-typewriter";
import Script from "next/script";
import { cn } from "@/lib/utils";
import { HeroSliderData } from "@/graphql/types";
import Player from "@vimeo/player";

gsap.registerPlugin(ScrollTrigger);

interface HorizontalVideoSliderProps {
  data: HeroSliderData;
}

export default function HorizontalVideoSlider({
  data,
}: HorizontalVideoSliderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const horizontalRef = useRef<HTMLDivElement>(null);
  const videos = data?.videoContentCollection?.items ?? [];

  // Track which slides should load videos
  const [loadedSlides, setLoadedSlides] = useState<Set<number>>(new Set([0]));

  // Store Vimeo Player instances by slide index
  const playersRef = useRef<Map<number, Player>>(new Map());

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
          onUpdate: (self) => {
            const progress = self.progress;
            const slideIndex = Math.round(progress * (totalVideos - 1));

            // Load current slide and neighbors
            setLoadedSlides((prev) => {
              const newSet = new Set(prev);
              newSet.add(slideIndex);
              if (slideIndex > 0) newSet.add(slideIndex - 1);
              if (slideIndex < totalVideos - 1) newSet.add(slideIndex + 1);
              return newSet;
            });

            // Play current slide video, pause others
            playersRef.current.forEach((player, index) => {
              if (index === slideIndex) {
                player.play().catch(() => {});
              } else {
                // player.pause().catch(() => {});
              }
            });
          },
        },
      });
    },
    { scope: containerRef }
  );

  // Register player instances from VideoItem
  const registerPlayer = (index: number, player: Player | null) => {
    if (player) {
      playersRef.current.set(index, player);
    } else {
      playersRef.current.delete(index);
    }
  };

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
            shouldLoad={loadedSlides.has(index)}
            onPlayerReady={(player) => registerPlayer(index, player)}
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
  shouldLoad: boolean;
  onPlayerReady: (player: Player | null) => void;
}

const buildVimeoSrc = (url: string) => {
  const [base, queryString] = url.split("?");
  const params = new URLSearchParams(queryString || "");
  params.set("autoplay", "1");
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
  shouldLoad,
  onPlayerReady,
}: VideoItemProps) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [hasLoadedOnce, setHasLoadedOnce] = useState(false);

  // Once shouldLoad is true, mark as loaded once to keep iframe mounted
  useEffect(() => {
    if (shouldLoad && !hasLoadedOnce) {
      setHasLoadedOnce(true);
    }
  }, [shouldLoad, hasLoadedOnce]);

  // Initialize Vimeo Player only once iframe is mounted
  useEffect(() => {
    if (!hasLoadedOnce) {
      onPlayerReady(null);
      return;
    }
    if (!iframeRef.current) return;

    const player = new Player(iframeRef.current);

    player.setVolume(0).catch(() => {});

    onPlayerReady(player);

    return () => {
      player.unload().catch(() => {});
      onPlayerReady(null);
    };
  }, [hasLoadedOnce, onPlayerReady]);

  const mutedSrc = buildVimeoSrc(src);
  const mutedMobileSrc = mobileSrc ? buildVimeoSrc(mobileSrc) : undefined;

  return (
    <div key={code} className="flex relative w-screen h-screen shrink-0">
      <div className="relative h-full w-full overflow-hidden bg-[#3691e0] bg-gradient-to-b from-[#00224e] to-[#025074]">
        {hasLoadedOnce ? (
          <>
            {shouldLoad && (
              <iframe
                ref={iframeRef}
                src={mutedSrc}
                allow="autoplay; clipboard-write; encrypted-media"
                allowFullScreen
                loading="lazy"
                className={cn("vimeo-iframe z-20")}
                title="Help Center Video"
              />
            )}
            {mobileSrc && (
              <iframe
                src={mutedMobileSrc}
                allow="autoplay; clipboard-write; encrypted-media"
                allowFullScreen
                loading="lazy"
                className={cn(
                  "vimeo-iframe block md:hidden",
                  shouldLoad ? "block" : "hidden"
                )}
                title="Help Center Video"
              />
            )}
          </>
        ) : (
          <div className="w-full h-full bg-black" />
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
