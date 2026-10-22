"use client";

import Image from "next/image";
import { useState } from "react";
import type { Photo } from "@/data/site-content";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";

export function PhotoLightboxGallery({ photos }: { photos: Photo[] }) {
  const [index, setIndex] = useState<number | null>(null);
  const photo = index === null ? null : photos[index];

  return (
    <>
      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {photos.map((item, itemIndex) => (
          <li key={item.src}>
            <button
              type="button"
              onClick={() => setIndex(itemIndex)}
              className="group block w-full text-left transition-transform duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.985] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              <span className="relative block aspect-[4/3] overflow-hidden bg-secondary">
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="(min-width: 1024px) 28vw, (min-width: 640px) 33vw, 50vw"
                  className={`object-cover transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] [@media(hover:hover)_and_(pointer:fine)]:group-hover:scale-[1.03] ${
                    item.height > item.width ? "object-[center_18%]" : "object-center"
                  }`}
                />
              </span>
              <span className="mt-2 block text-sm text-muted-foreground">{item.caption}</span>
            </button>
          </li>
        ))}
      </ul>

      <Dialog open={photo !== null} onOpenChange={(open) => !open && setIndex(null)}>
        <DialogContent
          className="max-h-[92vh] overflow-y-auto rounded-none bg-background p-3 sm:max-w-5xl sm:p-6"
          showCloseButton
        >
          {index !== null ? (
            <>
              <DialogTitle className="sr-only">Photographs</DialogTitle>
              <DialogDescription className="sr-only">
                {photos[index]?.caption}
              </DialogDescription>
              <Carousel
                key={index}
                opts={{ startIndex: index, loop: true }}
                className="w-full"
              >
                <CarouselContent>
                  {photos.map((item) => (
                    <CarouselItem key={item.src}>
                      <Image
                        src={item.src}
                        alt={item.alt}
                        width={item.width}
                        height={item.height}
                        className="mx-auto h-auto max-h-[72vh] w-auto max-w-full"
                      />
                      <p className="mt-3">{item.caption}</p>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </>
          ) : null}
        </DialogContent>
      </Dialog>
    </>
  );
}
