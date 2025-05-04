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

type Item = {
  title: string;
  href?: string;
  description?: string;
  subcategories?: { title: string; href?: string };
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
      { title: "All Expeditions", href: "/all-expeds" },
      {
        title: "Everest",
        href: "/everest", // Link for the category landing page
      },
      {
        title: "Kilimanjaro",
        href: "/kilimanjaro-packages-with-eliteexped", // Link for the category landing page
      },
      {
        title: "Combo Packages",
        href: "/combo-packages", // Link for the category landing page
      },
      {
        title: "Fast-Track",
        href: "/fast-track", // Link for the category landing page
      },
      {
        title: "8000m peaks",
        href: "/8000m", // Link for the category landing page
      },
      {
        title: "Seven Summits",
        href: "/seven-summits", // Link for the category landing page
      },
      {
        title: "6000m peaks",
        href: "/6000m-peaks", // Link for the category landing page
      },
      {
        title: "Uk Exped",
        href: "/uk-exped-master-the-basics-with-elite-exped", // Link for the category landing page
      },
      // Featured items (can be placed at the top level of expeditions subcategories for prominence)
      { title: "Featured: K2", href: "/k2" },
      { title: "Featured: Kilimanjaro", href: "/kilimanjaro" },
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
  { title: "Workshops", href: "/workshops" },
  { title: "Adventure", href: "/adventure" },
  {
    title: "Rentals & Shop",
    subcategories: [
      { title: "Rent", href: "/rentals/rent", description: "" },
      { title: "Buy", href: "/rentals/buy", description: "" },
    ],
  },
  { title: "News & Events", href: "/news-events" },
  { title: "About", href: "/about" },
  { title: "Contact", href: "/contact" },
];

export default function AdventureNavbar() {
  return (
    <nav className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
      <div className="flex-shrink-0">
        <Link href="/" legacyBehavior passHref>
          <a className="text-xl font-bold select-none">Xtreme</a>
        </Link>
      </div>

      {/* Center: Navigation Menu */}
      <div className="flex-1 flex justify-center">
        <NavigationMenu>
          <NavigationMenuList className="flex space-x-6">
            {menuItems.map(({ title, href, subcategories }) => (
              <NavigationMenuItem key={title}>
                {subcategories && subcategories.length > 0 ? (
                  <>
                    <NavigationMenuTrigger>{title}</NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid gap-3 p-4 w-[300px] md:w-[400px]">
                        {subcategories.map((sub) => (
                          <ListItem
                            key={sub.title}
                            href={sub.href}
                            title={sub.title}
                          >
                            <p className="text-sm leading-tight text-muted-foreground"></p>
                          </ListItem>
                        ))}
                      </ul>
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
      <div className="flex-shrink-0" />
    </nav>
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
            "block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
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
