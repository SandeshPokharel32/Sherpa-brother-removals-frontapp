import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
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
import {
  Expedition,
  ExpeditionCategory,
  ExpeditionType,
  ExpeditionTypesQuery,
} from "@/graphql/types";

// Define the Props type using the Item type
type Props = {
  menuItems: ExpeditionTypesQuery | null;
};

// Recursive component to handle nested navigation
const NestedAccordionItem = ({
  title,
  slug,
  description,
  items,
  level = 1,
}: {
  title: string;
  slug: string;
  description?: string;
  items?: (Expedition | ExpeditionCategory)[];
  level?: number;
}) => {
  // If item has subcategories, render a nested accordion
  if (items && items.length > 0) {
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
          <div className=" pl-4 border-l border-solid border-muted">
            <Accordion type="single" collapsible className="w-full">
              {items?.map((item) => {
                return (
                  <NestedAccordionItem
                    key={item.slug}
                    title={
                      (item?.__typename === "Expedition"
                        ? item?.title
                        : item?.name) || ""
                    }
                    slug={item?.slug || ""}
                    description={
                      (item?.__typename === "Expedition"
                        ? item?.subtitle
                        : "") || ""
                    }
                    items={
                      item?.__typename === "Expedition"
                        ? []
                        : item?.expeditions?.items
                    }
                    level={level + 1}
                  />
                );
              })}
            </Accordion>
          </div>
        </AccordionContent>
      </AccordionItem>
    );
  }

  const href =
    level == 1
      ? `/region/${slug}`
      : level == 2
      ? `/region/${slug}`
      : `/expedition/${slug}`;

  return (
    <div className="py-1">
      {slug ? (
        <DrawerClose asChild>
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
        </DrawerClose>
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
            {menuItems?.types?.items.map((type: ExpeditionType) => (
              <NestedAccordionItem
                key={type.slug}
                title={type?.name || ""}
                slug={type?.slug || ""}
                items={type?.categories?.items || []}
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
