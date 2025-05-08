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

type Item = {
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
    <Headroom className="  w-full bg-white z-[9999]">
      <nav className="flex items-center justify-between px-6 py-4 bg-transparent">
        <div className="flex-shrink-0 h-20 w-52 relative">
          <Link href="/" legacyBehavior passHref>
            <Image
              alt="extreme adventure"
              src="/logo/logo.svg"
              fill
              objectFit="contain"
            />
          </Link>
        </div>

        {/* Center: Navigation Menu */}
        <div className="flex-1 flex justify-center">
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

        {/* Right: Empty or add other items here */}
        <div className="flex-shrink-0">
          <Button className="rounded-full">Get an adventure</Button>
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
