"use client";
import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const ExpeditionCloud = () => {
  const mainRef = useRef<HTMLDivElement>(null);
  const arrowBtnRef = useRef<SVGRectElement>(null);
  const refs = {
    sky: useRef<SVGImageElement>(null),
    cloud1: useRef<SVGImageElement>(null),
    cloud2: useRef<SVGImageElement>(null),
    cloud3: useRef<SVGImageElement>(null),
    mountBg: useRef<SVGImageElement>(null),
    mountMg: useRef<SVGImageElement>(null),
    mountFg: useRef<SVGImageElement>(null),
    arrow: useRef<SVGPolylineElement>(null),
  };

  useGSAP(
    () => {
      gsap.to(refs.cloud2.current, {
        y: "-=20", // moves up by 30px
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
      gsap.to(refs.cloud3.current, {
        y: "-=20", // moves up by 30px
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: mainRef.current,
          start: "top top",
          end: "bottom center",
          scrub: 1,
        },
      });

      tl.fromTo(refs.sky.current, { y: 0 }, { y: -200 }, 0)
        .fromTo(refs.cloud1.current, { y: 100 }, { y: -800 }, 0)
        .fromTo(refs.cloud2.current, { y: -150 }, { y: -1200 }, 0)
        .fromTo(refs.cloud3.current, { y: -50 }, { y: -650 }, 0)
        .fromTo(refs.mountBg.current, { y: -10 }, { y: -100 }, 0)
        .fromTo(refs.mountMg.current, { y: -30 }, { y: -250 }, 0)
        .fromTo(refs.mountFg.current, { y: -50 }, { y: -200 }, 0);

      const arrowBtn = arrowBtnRef.current;
      const arrow = refs.arrow.current;

      if (arrowBtn && arrow) {
        const enter = () =>
          gsap.to(arrow, {
            y: 10,
            duration: 0.8,
            ease: "back.inOut(3)",
            overwrite: "auto",
          });

        const leave = () =>
          gsap.to(arrow, {
            y: 0,
            duration: 0.5,
            ease: "power3.out",
            overwrite: "auto",
          });

        const click = () =>
          gsap.to(window, {
            scrollTo: window.innerHeight,
            duration: 1.5,
            ease: "power1.inOut",
          });

        arrowBtn.addEventListener("mouseenter", enter);
        arrowBtn.addEventListener("mouseleave", leave);
        arrowBtn.addEventListener("click", click);

        return () => {
          arrowBtn.removeEventListener("mouseenter", enter);
          arrowBtn.removeEventListener("mouseleave", leave);
          arrowBtn.removeEventListener("click", click);
        };
      }
    },
    { scope: mainRef }
  );

  return (
    <main ref={mainRef}>
      <svg
        className="bg-white"
        viewBox="0 0 1200 800"
        xmlns="http://www.w3.org/2000/svg"
      >
        <mask id="m">
          <g>
            <rect fill="#fff" width="100%" height="800" y="799" />
            <image
              xlinkHref="https://assets.codepen.io/721952/cloud1Mask.jpg"
              width="100%"
              height="800"
            />
          </g>
        </mask>

        <image
          ref={refs.sky}
          xlinkHref="https://assets.codepen.io/721952/sky.jpg"
          width="100%"
          height="590"
        />
        <image
          ref={refs.mountBg}
          xlinkHref="https://assets.codepen.io/721952/mountBg.png"
          width="100%"
          height="800"
        />
        <image
          ref={refs.mountMg}
          xlinkHref="https://assets.codepen.io/721952/mountMg.png"
          width="100%"
          height="800"
        />
        <image
          ref={refs.cloud2}
          xlinkHref="https://assets.codepen.io/721952/cloud2.png"
          width="100%"
          height="800"
        />
        <image
          ref={refs.mountFg}
          xlinkHref="https://assets.codepen.io/721952/mountFg.png"
          width="100%"
          height="800"
        />
        <image
          ref={refs.cloud1}
          xlinkHref="https://assets.codepen.io/721952/cloud1.png"
          width="100%"
          height="800"
        />
        <image
          ref={refs.cloud3}
          xlinkHref="https://assets.codepen.io/721952/cloud3.png"
          width="100%"
          height="800"
        />
        <text fill="#fff" x="45%" y="200">
          EXPLORE
        </text>
        <polyline
          ref={refs.arrow}
          fill="#fff"
          points="599,250 599,289 590,279 590,282 600,292 610,282 610,279 601,289 601,250"
        />
        <g mask="url(#m)">
          <rect fill="#fff" width="100%" height="100%" />
          <text x="350" y="200" fill="#162a43">
            FURTHER
          </text>
        </g>
        <rect
          ref={arrowBtnRef}
          className="cursor-pointer"
          width="100"
          height="100"
          opacity="0"
          x="550"
          y="220"
        />
      </svg>
    </main>
  );
};

export default ExpeditionCloud;
