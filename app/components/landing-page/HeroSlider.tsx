"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  ArrowLeftCircleIcon,
  ArrowRightCircleIcon,
} from "@heroicons/react/24/solid";

const images: readonly string[] = [
  "https://storage.googleapis.com/eventpom-bucket/SRxQL1HRJqdWj9c3EXxz.png",
  "https://storage.googleapis.com/eventpom-bucket/uFPnEDEHYlHKfzPHURQb.png",
  "https://storage.googleapis.com/eventpom-bucket/aCM0Urm3Q1Ef3XxrpVsy.png",
  "https://storage.googleapis.com/eventpom-bucket/O8fd8lmX17zLhJ1x022c.png",
  "https://storage.googleapis.com/eventpom-bucket/hgt7gpJBXC925DXtsYJZ.png",
  "https://storage.googleapis.com/eventpom-bucket/rXQHecs3jP88BtMAKeyQ.png",
  "https://storage.googleapis.com/eventpom-bucket/aipZCw5PTYlJ2Q438xyR.png",
  "https://storage.googleapis.com/eventpom-bucket/iinNAKLqZXmMHArvg0lj.png",
  "https://storage.googleapis.com/eventpom-bucket/n0kYYkXrf6ZjWaWFXqgs.png",
];

export default function HeroSlider() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (typeof window !== "undefined") {
      images.forEach((src) => {
        const img = new window.Image();
        img.src = src;
      });
    }
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const goToImage = (index: number) => setCurrentImageIndex(index);

  return (
    <section className="w-full flex justify-center pt-32 pb-20 relative">
      {/* Blurred Background */}
      <div className="hidden lg:block absolute top-0 left-0 w-full h-[575px] z-0 overflow-hidden">
        <Image
          src={images[currentImageIndex]}
          alt={`Event ${currentImageIndex + 1} blurred`}
          fill
          className="object-cover filter blur-xl scale-110"
        />
      </div>

      {/* Foreground Content */}
      <div className="relative w-full h-64 sm:h-72 md:h-80 lg:h-96 overflow-hidden z-10">
        <div className="relative w-full h-full">
          {images.map((src, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
                index === currentImageIndex ? "opacity-100 z-10" : "opacity-0 z-0"
              }`}
            >
              <Image
                src={src}
                alt={`Event ${index + 1}`}
                fill
                priority={index === currentImageIndex}
                className="object-contain"
              />
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        <ArrowLeftCircleIcon
          className="absolute left-2 md:left-[7%] lg:left-[9%] xl:left-[16%] 2xl:left-[23%] top-1/2 transform -translate-y-1/2 w-10 h-10 text-white bg-gray-800 bg-opacity-50 hover:bg-opacity-75 rounded-full cursor-pointer z-20"
          onClick={() =>
            setCurrentImageIndex((prev) =>
              prev === 0 ? images.length - 1 : prev - 1
            )
          }
        />
        <ArrowRightCircleIcon
          className="absolute right-2 md:right-[7%] lg:right-[9%] xl:right-[16%] 2xl:right-[23%] top-1/2 transform -translate-y-1/2 w-10 h-10 text-white bg-gray-800 bg-opacity-50 hover:bg-opacity-75 rounded-full cursor-pointer z-20"
          onClick={() =>
            setCurrentImageIndex((prev) =>
              prev === images.length - 1 ? 0 : prev + 1
            )
          }
        />

        {/* Dots Navigation */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
          {images.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full ${
                index === currentImageIndex ? "bg-white" : "bg-gray-400"
              } hover:bg-gray-200 transition-colors duration-300`}
              onClick={() => goToImage(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
