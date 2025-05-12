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
      const tl = gsap
        .timeline({
          scrollTrigger: {
            trigger: mainRef.current,
            start: "top top",
            end: "100% 100%",
            scrub: 2,
            // pin: true,
            // markers: true,
          },
        })
        .fromTo(".sky", { y: 0 }, { y: -200 }, 0)
        .fromTo(".cloud1", { y: 100 }, { y: -800 }, 0)
        .fromTo(".cloud2", { y: -150 }, { y: -500 }, 0)
        .fromTo(".cloud3", { y: -50 }, { y: -650 }, 0)
        .fromTo(".mountBg", { y: -10 }, { y: -100 }, 0)
        .fromTo(".mountMg", { y: -30 }, { y: -250 }, 0)
        .fromTo(".mountFg", { y: -50 }, { y: -600 }, 0);
    },
    { scope: mainRef }
  );

  return (
    <main
      ref={mainRef}
      className=" relative"
      style={{ fontSize: "99px", fontWeight: 900 }}
    >
      <svg
        viewBox="0 0 1200 800"
        preserveAspectRatio="xMidYMid meet"
        className="sticky top-0"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: "100%", height: "auto" }}
      >
        <mask id="m">
          <g className="cloud1">
            <rect fill="#fff" width="100%" height="801" y="799" />
            <image
              xlinkHref="https://assets.codepen.io/721952/cloud1Mask.jpg"
              width="1200"
              height="800"
            />
          </g>
        </mask>

        <image
          className="sky"
          xlinkHref="https://assets.codepen.io/721952/sky.jpg"
          width="1200"
          height="590"
          style={{ filter: "brightness(0.5)" }}
        />
        <image
          className="mountBg"
          xlinkHref="https://assets.codepen.io/721952/mountBg.png"
          width="1200"
          height="800"
        />
        <image
          className="mountMg"
          xlinkHref="https://assets.codepen.io/721952/mountMg.png"
          width="1200"
          height="800"
        />
        <image
          className="cloud2"
          xlinkHref="https://assets.codepen.io/721952/cloud2.png"
          width="1200"
          height="800"
        />
        <image
          className="mountFg"
          xlinkHref="https://assets.codepen.io/721952/mountFg.png"
          width="1200"
          height="800"
        />
        <image
          className="cloud1"
          xlinkHref="https://assets.codepen.io/721952/cloud1.png"
          width="1200"
          height="800"
        />
        <image
          className="cloud3"
          xlinkHref="https://assets.codepen.io/721952/cloud3.png"
          width="1200"
          height="800"
        />
        <text fill="#fff" x="350" y="200">
          EXPLORE
        </text>
        <polyline
          className="arrow"
          fill="#fff"
          points="599,250 599,289 590,279 590,282 600,292 610,282 610,279 601,289 601,250"
        />

        <g mask="url(#m)">
          <rect fill="#fff" width="100%" height="100%" />
          <text x="350" y="200" fill="#162a43">
            FURTHER
          </text>
          <text x="300" y="350" fill="#162a43" fontSize="80">
            Get Quote Now
          </text>
          <text x="3500" y="400" fill="#162a43" fontSize={80}>
            Go beyound
          </text>
          <clipPath id="text-overlay" width="100%" height="100%">
            <text x="280" y="500" fill="#003658" fontSize={120}>
              Go Xtreme
            </text>
          </clipPath>

          <defs>
            <linearGradient id="grad1" x1="0%" x2="100%" y1="0%" y2="0%">
              <stop offset="0%" stopColor="yellow" />
              <stop offset="100%" stopColor="red" />
            </linearGradient>
          </defs>
          <rect
            width={650}
            height={100}
            x={280}
            y={400}
            fill="url(#grad1)"
            clipPath="url(#text-overlay)"
          ></rect>
        </g>

        <rect
          id="arrow-btn"
          width="100"
          height="100"
          opacity="0"
          x="550"
          y="220"
        />
      </svg>
      {/* <svg
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
      </svg> */}
    </main>
  );
};

export default ExpeditionCloud;
