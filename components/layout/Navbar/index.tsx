"use client";

import * as React from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Headroom from "react-headroom";
import MobileNavigation from "./MobileNavigation";

export type Item = {
  title: string;
  href?: string;
  description?: string;
  subcategories?: { title: string; href?: string; description?: string };
};
const menuItems: {
  title: string;
  href?: string;
  description?: string;
  subcategories?: Item[];
}[] = [
  {
    title: "Ski/Board",
    subcategories: [
      { title: "Backcountry", href: "/ski-board/backcountry", description: "" },
      { title: "Heli", href: "/ski-board/heli", description: "" },
    ],
  },
  {
    title: "Expeditions",
    subcategories: [
      // Top-level categories and links
      {
        title: "Everest",
        href: "/everest", // Link for the category landing page
        description: "Everest expedition",
        subcategories: [
          {
            title: "Everest camp",
            href: "/everest", // Link for the category landing page
            description: "Everest expedition",
          },
          {
            title: "Kilimanjaro camp 2",
            href: "/kilimanjaro-packages-with-eliteexped", // Link for the category landing page
            description: "Kilimanjaro expedition",
          },
        ],
      },
      {
        title: "Kilimanjaro",
        href: "/kilimanjaro-packages-with-eliteexped", // Link for the category landing page
        description: "Kilimanjaro expedition",
      },
      {
        title: "Combo Packages",
        href: "/combo-packages", // Link for the category landing page
        description: "Combo Package expedition",
      },
      {
        title: "Fast-Track",
        href: "/fast-track", // Link for the category landing page
        description: "Fast track expedition",
      },
      {
        title: "8000m peaks",
        href: "/8000m", // Link for the category landing page
        description: "8000ers expedition",
      },
      {
        title: "Seven Summits",
        href: "/seven-summits", // Link for the category landing page
        description: "Seven summits expedition",
      },
      {
        title: "6000m peaks",
        href: "/6000m-peaks", // Link for the category landing page
        description: "6000metere above expeditions",
      },
      {
        title: "Uk Exped",
        href: "/uk-exped-master-the-basics-with-elite-exped", // Link for the category landing page
        description: "UK expeditions",
      },
      // Featured items (can be placed at the top level of expeditions subcategories for prominence)
      {
        title: "Featured: K2",
        href: "/k2",

        description: "k2 expeditions",
      },
      {
        title: "Featured: Kilimanjaro",
        href: "/kilimanjaro",

        description: "Featured Kilimanjaro expeditions",
      },
    ],
  },
  {
    title: "Trekking",
    subcategories: [
      { title: "Example Sub 1", href: "/trekking/sub1", description: "" },
      { title: "Example Sub 2", href: "/trekking/sub2", description: "" },
    ],
  },
  {
    title: "Bike Tours",
    subcategories: [
      {
        title: "Weekend Exclusives",
        href: "/bike-tours/weekend",
        description: "",
      },
    ],
  },
];

export default function AdventureNavbar() {
  const [activeCategory, setActiveCategory] = React.useState<
    { title: string; slug: string; description: string }[] | null
  >(null);
  return (
    <Headroom className="z-10 w-full bg-prussianBlue  bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-20">
      <nav className="flex items-center justify-between px-6 py-4">
        <div className="flex-shrink-0 h-20 w-40 relative">
          <Link href="/" legacyBehavior passHref>
            {/* <Image
              alt="extreme adventure"
              src="/logo/logo.svg"
              fill
              objectFit="contain"
            /> */}
            <svg
              width="140"
              height="71"
              viewBox="0 0 228 71"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M179.345 71H48V38H179.345V71ZM67.0945 42.1003H62.0423L58.5232 66.8237H61.6978L62.2922 62.3354H66.5339L67.1283 66.8237H70.6135L67.0945 42.1003ZM64.3657 46.482H64.4266L66.0611 58.9883H62.7312L64.3657 46.482ZM72.2143 66.8237H77.6786C81.13 66.8237 82.8254 64.6708 82.8254 60.7151V48.2088C82.8254 44.2531 81.13 42.1003 77.6786 42.1003H72.2143V66.8237ZM77.611 45.6376C78.712 45.6376 79.3671 46.2766 79.3671 48.0415V60.8976C79.3671 62.6625 78.7052 63.3015 77.611 63.3015H75.6657V45.6452H77.611V45.6376ZM87.5669 42.1003H84.0817L87.4724 66.8237H92.6192L96.0098 42.1003H92.8353L90.2281 62.267H90.1673L87.5602 42.1003H87.5669ZM101.069 45.6376H107.033V42.1079H97.6106V66.8313H107.033V63.3015H101.069V56.0595H105.81V52.5297H101.069V45.6452V45.6376ZM116.55 66.8237H120.096V42.1003H117.016V56.8963H116.955L113.47 42.1003H109.134V66.8237H112.24V48.9163H112.301L116.543 66.8237H116.55ZM121.575 45.6376H125.189V66.8313H128.64V45.6376H132.254V42.1079H121.575V45.6376ZM133.598 42.1003V60.9281C133.598 64.8838 135.354 67.1432 138.745 67.1432C142.135 67.1432 143.891 64.8838 143.891 60.9281V42.1003H140.629V61.1715C140.629 62.9364 139.94 63.5754 138.839 63.5754C137.738 63.5754 137.049 62.9364 137.049 61.1715V42.1003H133.598ZM156.995 66.8237C156.65 65.9032 156.617 65.0208 156.617 63.8188V60.0076C156.617 57.4288 156.049 55.5954 154.327 54.7815V54.713C155.867 53.899 156.589 52.2787 156.589 49.7303V47.7905C156.589 43.9793 155.049 42.1079 151.47 42.1079H146.255V66.8313H149.707V56.7669H150.902C152.469 56.7669 153.165 57.6113 153.165 59.9087V63.796C153.165 65.8119 153.293 66.1999 153.476 66.8313H156.995V66.8237ZM151.375 45.6376C152.598 45.6376 153.131 46.4135 153.131 48.1784V50.6127C153.131 52.5906 152.348 53.2296 151.058 53.2296H149.707V45.6376H151.368H151.375ZM162.331 45.6376H168.295V42.1079H158.872V66.8313H168.295V63.3015H162.331V56.0595H167.072V52.5297H162.331V45.6452V45.6376Z"
                fill="#003658"
              />
              <path
                d="M112.489 33.8001H108.585V0H112.489V14.4826H116.925V0H120.895V33.8001H116.925V19.3101H112.489V33.8001Z"
                fill="#006E7F"
              />
              <path d="M127.64 0H123.736V33.8001H127.64V0Z" fill="#006E7F" />
              <path
                d="M138.705 23.9956H138.777L141.403 0H146.832V33.8001H143.141V9.5579H143.07L140.443 33.8001H136.753L133.918 9.89418H133.847V33.8001H130.442V0H135.87L138.705 23.9956Z"
                fill="#006E7F"
              />
              <path
                d="M162.3 33.8001H158.363L157.689 27.6649H152.902L152.227 33.8001H148.647L152.622 0H158.336L162.311 33.8001H162.3ZM153.395 23.0765H157.157L155.314 5.98583H155.243L153.401 23.0765H153.395Z"
                fill="#006E7F"
              />
              <path
                d="M164.11 0H168.009V28.9726H174.435V33.8001H164.11V0Z"
                fill="#006E7F"
              />
              <path
                d="M188.764 33.8001H184.826L184.152 27.6649H179.365L178.69 33.8001H175.11L179.085 0H184.799L188.774 33.8001H188.764ZM179.858 23.0765H183.62L181.778 5.98583H181.706L179.864 23.0765H179.858Z"
                fill="#006E7F"
              />
              <path
                d="M192.492 22.5982L187.557 0H191.642L194.587 15.4017H194.658L197.597 0H201.326L196.396 22.5982V33.8001H192.492V22.5982Z"
                fill="#006E7F"
              />
              <path
                d="M213.779 33.8001H209.842L209.167 27.6649H204.38L203.706 33.8001H200.125L204.101 0H209.814L213.79 33.8001H213.779ZM204.874 23.0765H208.635L206.793 5.98583H206.722L204.879 23.0765H204.874Z"
                fill="#006E7F"
              />
              <path
                d="M219.136 9.31877H219.065V33.8001H215.555V0H220.447L224.384 20.2293H224.455V0H227.932V33.8001H223.923L219.136 9.31877Z"
                fill="#006E7F"
              />
              <path
                d="M4.00838 14.6171H9.50279V19.5716H4.00838V29.7274H10.923V34.682H0V0H10.923V4.95456H4.00838V14.6171Z"
                fill="#003658"
              />
              <path
                d="M26.7536 0L22.5697 16.844L27.0442 34.682H22.822L19.5868 20.9541H19.51L16.2364 34.682H12.4857L16.9657 16.844L12.7764 0H16.9273L19.9103 12.7787H19.9871L23.0413 0H26.7536Z"
                fill="#003658"
              />
              <path
                d="M27.8832 0H40.2593V4.95456H36.0754V34.682H32.067V4.95456H27.8832V0Z"
                fill="#003658"
              />
              <path
                d="M50.3762 34.682C50.1569 33.7927 50.0143 33.2472 50.0143 30.4224V24.9746C50.0143 21.7538 49.2137 20.5656 47.3932 20.5656H46.0114V34.682H42.0085V0.00747681H48.0513C52.2022 0.00747681 53.9843 2.63048 53.9843 7.98111V10.7087C53.9843 14.2733 53.1454 16.5526 51.3632 17.6959V17.7931C53.3647 18.929 54.0172 21.5072 54.0172 25.1241V30.4747C54.0172 32.1561 54.0556 33.3966 54.4559 34.6894H50.3817L50.3762 34.682ZM46.0114 4.95457V15.6035H47.5742C49.0657 15.6035 49.9759 14.7142 49.9759 11.9343V8.51917C49.9759 6.04562 49.3563 4.95457 47.9361 4.95457H46.006H46.0114Z"
                fill="#003658"
              />
              <path
                d="M60.6412 14.6171H66.1411V19.5716H60.6412V29.7274H67.5613V34.682H56.6383V0H67.5613V4.95456H60.6412V14.6171Z"
                fill="#003658"
              />
              <path
                d="M78.4788 24.6234H78.55L81.2424 0H86.8136V34.682H83.03V9.81198H82.9532L80.2609 34.682H76.4773L73.5656 10.1557H73.4943V34.682H69.9959V0H75.5671L78.4788 24.6234Z"
                fill="#003658"
              />
              <path
                d="M93.7282 14.6171H99.2281V19.5716H93.7282V29.7274H100.643V34.682H89.7253V0H100.643V4.95456H93.7282V14.6171Z"
                fill="#003658"
              />
            </svg>
          </Link>
        </div>

        {/* Center: Navigation Menu */}
        <div className="block md:hidden">
          <MobileNavigation menuItems={menuItems} />
        </div>
        <div className="flex-1 hidden justify-center md:flex">
          <NavigationMenu
            className="z-[100000]"
            onValueChange={() => setActiveCategory(null)}
          >
            <NavigationMenuList className="flex space-x-6">
              {menuItems.map(({ title, href, subcategories }) => (
                <NavigationMenuItem key={title}>
                  {subcategories && subcategories.length > 0 ? (
                    <>
                      <NavigationMenuTrigger>{title}</NavigationMenuTrigger>
                      <NavigationMenuContent>
                        {activeCategory ? (
                          <motion.div
                            key="category-list"
                            initial={{ x: "100%", opacity: 1 }}
                            animate={{
                              x: 0,
                              opacity: 1,
                            }}
                            exit={{ x: "100%", opacity: 0 }}
                            transition={{ duration: 0.5 }}
                            className="w-full"
                          >
                            <div className="flex items-center w-full p-4 pb-0">
                              <Button
                                variant="outline"
                                className="rounded-full mr-10"
                                size="icon"
                                onClick={() => {
                                  setActiveCategory(null);
                                }}
                              >
                                <ArrowLeft />
                              </Button>

                              <h2 className="text-2xl">Everest Region</h2>
                              <span></span>
                            </div>
                            <ul className="relative grid grid-cols-3 gap-3 p-4 w-full min-w-[600px]">
                              {subcategories.map((sub) => (
                                <ListItem
                                  title={sub.title}
                                  key={sub.title}
                                  href={sub.href}
                                >
                                  <p className="text-sm leading-tight text-muted-foreground">
                                    {sub?.description}
                                  </p>
                                </ListItem>
                              ))}
                            </ul>
                          </motion.div>
                        ) : (
                          <motion.ul
                            initial={{ x: "0", opacity: 0 }}
                            animate={{
                              x: 0,
                              opacity: 1,
                            }}
                            transition={{ duration: 0.2 }}
                            className="relative grid grid-cols-3 gap-3 p-4 w-full min-w-[600px]"
                          >
                            {subcategories.map((sub) => (
                              <ListItem
                                title={sub.title}
                                key={sub.title}
                                onClick={() => {
                                  setActiveCategory([
                                    {
                                      title: "test",
                                      slug: "test",
                                      description: "test",
                                    },
                                  ]);
                                }}
                              >
                                <p className="text-xs leading-tight text-muted-foreground">
                                  {sub?.description}
                                </p>
                              </ListItem>
                            ))}
                          </motion.ul>
                        )}
                      </NavigationMenuContent>
                    </>
                  ) : (
                    <Link href={href || "#"} legacyBehavior passHref>
                      <NavigationMenuLink
                        className={navigationMenuTriggerStyle()}
                      >
                        {title}
                      </NavigationMenuLink>
                    </Link>
                  )}
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </nav>
    </Headroom>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "select-none flex flex-col gap-2 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          {children && (
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
              {children}
            </p>
          )}
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
