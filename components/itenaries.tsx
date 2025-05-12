"use client";

import { CalendarDays } from "lucide-react";
import { Timeline, TimelineItem } from "./timeline/timeline";
import { Button } from "./ui/button";
import React from "react";
import { cn } from "@/lib/utils";

const Itenaries = ({ expedition }: any) => {
  const [showAll, setShowAll] = React.useState(false);
  return (
    <div>
      <h2 className="text-3xl font-bold mb-3 text-prussianBlue">Itinerary</h2>
      <div
        className={cn(
          {
            "max-h-[320px]": !showAll,
          },
          "relative max-h-[320px] overflow-hidden mb-16 flex flex-col items-start"
        )}
      >
        <Timeline>
          {expedition?.itenariesCollection?.items.map(
            (day: any, index: number) => (
              <TimelineItem
                key={index}
                date={`Day ${day.day}`}
                title={day.title}
                description={day.description}
                icon={<CalendarDays />}
              />
            )
          )}
        </Timeline>
        {!showAll ? (
          <div>
            <div className="absolute bottom-0 left-0 w-full h-32 pointer-events-none z-10">
              <div
                className="w-full h-full bg-white/5 backdrop-filter backdrop-blur-md "
                style={{
                  clipPath:
                    "polygon(31% 19%, 58% 6%, 88% 11%, 100% 100%, 80% 100%, 20% 100%, 0 100%, 0 0)",
                }}
              ></div>
            </div>
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20">
              <Button
                size="lg"
                color="secondary"
                onClick={() => {
                  setShowAll(true);
                }}
                className="flex gap-4 bg-blue-lagoon hover:bg-blue-lagoon/95 hover:text-white cursor-pointer   rounded-lg px-4 py-2 shadow text-sm font-medium"
              >
                <CalendarDays /> See all Itenaries
              </Button>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Itenaries;
