import * as React from "react";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import TopPerfCard from "./TopPerfCard";

export function TopPerformances() {
  return (
    <Carousel className="flex w-full">
      <CarouselContent>
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem className="" key={index}>
            <div className="p-1">
              <CardContent className="flex aspect-rectangle items-center justify-center p-2">
                <TopPerfCard />
              </CardContent>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white rounded-full p-2 z-10 cursor-pointer" />
      <CarouselNext className="absolute right-1 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white rounded-full p-2 z-10 cursor-pointer" />
    </Carousel>
  );
}
