"use client";

import Image from "next/image";
import { useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

interface PropertyGalleryProps {
  images: string[];
  name: string;
}

export default function PropertyGallery({ images, name }: PropertyGalleryProps) {
  const [selected, setSelected] = useState(0);
  const [lightbox, setLightbox] = useState(false);

  if (images.length === 0) return null;

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
        {/* Main image */}
        <div
          className="md:col-span-3 relative h-72 md:h-[450px] rounded-xl overflow-hidden cursor-pointer"
          onClick={() => setLightbox(true)}
        >
          <Image
            src={images[selected]}
            alt={`${name} - Bild ${selected + 1}`}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 768px) 100vw, 75vw"
          />
        </div>

        {/* Thumbnails */}
        <div className="flex md:flex-col gap-2 overflow-x-auto md:overflow-y-auto">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setSelected(i)}
              className={`relative shrink-0 w-20 h-20 md:w-full md:h-24 rounded-lg overflow-hidden border-2 transition-colors ${
                i === selected ? "border-primary" : "border-transparent"
              }`}
            >
              <Image
                src={img}
                alt={`${name} - Vorschau ${i + 1}`}
                fill
                className="object-cover"
                sizes="100px"
              />
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center">
          <button
            onClick={() => setLightbox(false)}
            className="absolute top-4 right-4 text-white hover:text-primary-light z-10"
          >
            <X size={32} />
          </button>
          <button
            onClick={() => setSelected((s) => (s > 0 ? s - 1 : images.length - 1))}
            className="absolute left-4 text-white hover:text-primary-light z-10"
          >
            <ChevronLeft size={40} />
          </button>
          <button
            onClick={() => setSelected((s) => (s < images.length - 1 ? s + 1 : 0))}
            className="absolute right-4 text-white hover:text-primary-light z-10"
          >
            <ChevronRight size={40} />
          </button>
          <div className="relative w-full max-w-5xl h-[80vh] mx-4">
            <Image
              src={images[selected]}
              alt={`${name} - Bild ${selected + 1}`}
              fill
              className="object-contain"
              sizes="100vw"
            />
          </div>
        </div>
      )}
    </>
  );
}
