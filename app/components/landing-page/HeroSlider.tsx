import React, { useState, useEffect } from "react";
import Image from "next/image";
import { ArrowLeftCircleIcon, ArrowRightCircleIcon } from "@heroicons/react/24/solid";

const images = [
  "https://storage.googleapis.com/eventpom-bucket/fxrNBUgyNYQYx56w9I6e.png",
  "https://storage.googleapis.com/eventpom-bucket/uFPnEDEHYlHKfzPHURQb.png",
  "https://storage.googleapis.com/eventpom-bucket/aCM0Urm3Q1Ef3XxrpVsy.png",
];

export default function HeroSlider() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [direction, setDirection] = useState<"next" | "prev">("next");

  // Preload images to ensure smooth transitions
  useEffect(() => {
    images.forEach((src) => {
      const img = new window.Image();
      img.src = src;
    });
  }, []);

  // Autoplay: Change image every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      goToNextImage();
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // Left arrow click
  const goToPreviousImage = () => {
    setDirection("prev");
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  // Right arrow click
  const goToNextImage = () => {
    setDirection("next");
    setCurrentImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Dot navigation click
  const goToImage = (index: number) => {
    setDirection(index > currentImageIndex ? "next" : "prev");
    setCurrentImageIndex(index);
  };

  return (
    <section className="w-full flex justify-center pt-32 pb-20 relative">
      {/* Full-width blurred background */}
      <div className="hidden lg:block absolute top-0 left-0 w-full h-[575px] z-0 overflow-hidden">
        <Image
          src={images[currentImageIndex]}
          alt={`Event ${currentImageIndex + 1} blurred`}
          layout="fill"
          objectFit="cover"
          className="filter blur-xl scale-110"
        />
      </div>

      {/* Foreground content */}
      <div className="relative w-full sm:w-full md:w-full lg:w-full h-64 sm:h-72 md:h-80 lg:h-96 overflow-hidden z-10">
        <div className="relative w-full h-full">
          {images?.map((src, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
                index === currentImageIndex ? "opacity-100 z-10" : "opacity-0 z-0"
              }`}
            >
              <Image
                src={src}
                alt={`Event ${index + 1}`}
                layout="fill"
                objectFit="contain"
                priority={index === currentImageIndex}
              />
            </div>
          ))}
        </div>
        {/* Navigation arrows */}
        <ArrowLeftCircleIcon
          className="absolute left-2 sm:left-2 md:left-[7%] lg:left-[9%] xl:left-[16%] 2xl:left-[23%] top-1/2 transform -translate-y-1/2 w-10 h-10 text-white bg-gray-800 bg-opacity-50 hover:bg-opacity-75 rounded-full cursor-pointer z-20"
          onClick={goToPreviousImage}
        />
        <ArrowRightCircleIcon
          className="absolute right-2 sm:right-2 md:right-[7%] lg:right-[9%] xl:right-[16%] 2xl:right-[23%] top-1/2 transform -translate-y-1/2 w-10 h-10 text-white bg-gray-800 bg-opacity-50 hover:bg-opacity-75 rounded-full cursor-pointer z-20"
          onClick={goToNextImage}
        />
        {/* Navigation dots */}
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