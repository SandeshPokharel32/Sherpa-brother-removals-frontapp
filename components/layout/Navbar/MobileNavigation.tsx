import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Menu } from "lucide-react";
import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

// Define the Item type directly in this file to avoid import issues
export type Item = {
  title: string;
  href?: string;
  description?: string;
  subcategories?: Item[];
};

// Define the Props type using the Item type
type Props = {
  menuItems: {
    title: string;
    href?: string;
    description?: string;
    subcategories?: Item[];
  }[];
};

// Recursive component to handle nested navigation
const NestedAccordionItem = ({
  title,
  href,
  description,
  subcategories,
  level = 1,
}: {
  title: string;
  href?: string;
  description?: string;
  subcategories?: Item[];
  level?: number;
}) => {
  // If item has subcategories, render a nested accordion
  if (subcategories && subcategories.length > 0) {
    return (
      <AccordionItem value={title}>
        <AccordionTrigger
          className={cn("text-left text-xs", {
            "text-base": level === 1,
            "text-sm": level === 2,
          })}
        >
          {title}
        </AccordionTrigger>
        <AccordionContent>
          <div className=" border-muted pl-4">
            <Accordion type="single" collapsible className="w-full">
              {subcategories.map((subItem) => (
                <NestedAccordionItem
                  key={subItem.title}
                  title={subItem.title}
                  href={subItem.href}
                  description={subItem.description}
                  subcategories={subItem.subcategories}
                />
              ))}
            </Accordion>
          </div>
        </AccordionContent>
      </AccordionItem>
    );
  }

  // If item has no subcategories, render as a link
  return (
    <div className="py-1">
      {href ? (
        <Link
          href={href}
          className="block py-2 text-sm transition-colors hover:text-primary"
        >
          {title}
          {description && (
            <span className="block text-xs text-muted-foreground">
              {description}
            </span>
          )}
        </Link>
      ) : (
        <span className="block py-2 text-sm">
          {title}
          {description && (
            <span className="block text-xs text-muted-foreground">
              {description}
            </span>
          )}
        </span>
      )}
    </div>
  );
};

const MobileNavigation = ({ menuItems }: Props) => {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Open menu">
          <Menu className="h-5 w-5" />
        </Button>
      </DrawerTrigger>

      <DrawerContent className="rounded-none max-h-[80vh]">
        <DrawerHeader>
          <DrawerTitle>Explore Adventures</DrawerTitle>
        </DrawerHeader>
        <div className="px-4 pb-4 overflow-y-auto">
          <Accordion type="single" collapsible className="w-full">
            {menuItems.map((item) => (
              <NestedAccordionItem
                key={item.title}
                title={item.title}
                href={item.href}
                description={item.description}
                subcategories={item.subcategories}
              />
            ))}
          </Accordion>
        </div>
        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default MobileNavigation;
