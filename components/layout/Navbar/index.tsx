"use client";
import * as React from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

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

import MobileNavigation from "./MobileNavigation";
import {
  Expedition,
  ExpeditionCategory,
  ExpeditionTypesQuery,
} from "@/graphql/types";
import BrandLogo from "../BrandLogo";

const Headroom = dynamic(() => import("react-headroom"));

export type Item = {
  title: string;
  href?: string;
  description?: string;
  slug?: string;
  subcategories?: { title: string; href?: string; description?: string }[];
};

export default function AdventureNavbar({
  data,
}: {
  data: ExpeditionTypesQuery | null;
}) {
  const [activeCategory, setActiveCategory] =
    React.useState<ExpeditionCategory | null>(null);

  return (
    <Headroom
      wrapperStyle={{
        position: "absolute",
        top: "0",
        right: "0",
        left: "0",
        zIndex: "100000",
      }}
    >
      <nav className="flex items-center justify-between px-6 py-4  w-full">
        <div className="flex justify-center items-center flex-shrink-0 w-40 relative">
          <Link href="/" passHref>
            <BrandLogo />
          </Link>
        </div>

        {/* Mobile Navigation */}
        <div className="block md:hidden">
          <MobileNavigation menuItems={data} />
        </div>

        {/* Desktop Navigation */}
        <div className="flex-1 hidden justify-center md:flex">
          <NavigationMenu
            className="z-100000"
            onValueChange={() => setActiveCategory(null)}
          >
            <NavigationMenuList className="flex space-x-6">
              {data?.types?.items.map(({ name, slug, categories }) => (
                <NavigationMenuItem key={slug}>
                  {categories?.items && categories?.items.length > 0 ? (
                    <>
                      <NavigationMenuTrigger>{name}</NavigationMenuTrigger>
                      <NavigationMenuContent>
                        {activeCategory ? (
                          <motion.div
                            key="category-list"
                            initial={{ x: "100%", opacity: 1 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: "100%", opacity: 0 }}
                            transition={{ duration: 0.5 }}
                            className="w-full"
                          >
                            <div className="flex items-center w-full p-4 pb-0">
                              <Button
                                variant="outline"
                                className="rounded-full mr-10"
                                size="icon"
                                onClick={() => setActiveCategory(null)}
                              >
                                <ArrowLeft />
                              </Button>

                              <h2 className="text-2xl">
                                {activeCategory?.name || ""}
                              </h2>
                            </div>
                            <ul className="relative grid grid-cols-3 gap-3 p-4 md:min-w-[300px] lg:min-w-[600px]">
                              {activeCategory?.expeditions?.items.map(
                                (expedition: Expedition) => (
                                  <ListItem
                                    title={expedition?.title || ""}
                                    key={expedition?.slug || ""}
                                    href={`/expedition/${
                                      expedition?.slug || ""
                                    }`}
                                  >
                                    {expedition?.subtitle}
                                  </ListItem>
                                )
                              )}
                            </ul>
                          </motion.div>
                        ) : (
                          <motion.ul
                            initial={{ x: "0", opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.2 }}
                            className="relative grid grid-cols-2 lg:grid-cols-3 gap-3 p-4 w-full  min-w-[300px] lg:min-w-[600px]"
                          >
                            {categories.items.map(
                              (category: ExpeditionCategory) => (
                                <ListItem
                                  title={category?.name || ""}
                                  key={category.slug}
                                  onClick={() => setActiveCategory(category)}
                                />
                              )
                            )}
                          </motion.ul>
                        )}
                      </NavigationMenuContent>
                    </>
                  ) : (
                    <Link href={`/region/${slug || ""}`} passHref>
                      <NavigationMenuLink
                        className={navigationMenuTriggerStyle()}
                      >
                        {name}
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
            <p className="line-clamp-2 text-sm leading-tight text-muted-foreground">
              {children}
            </p>
          )}
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
