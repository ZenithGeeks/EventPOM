import React, { useState, useEffect } from "react";
import Image from "next/image";
import { ArrowLeftCircleIcon, ArrowRightCircleIcon } from "@heroicons/react/24/solid";

const images = [
  "http://localhost:9000/eventpom-bucket/hero1.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=cvZyrkt2huShNXglI1x4%2F20250422%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20250422T094302Z&X-Amz-Expires=300&X-Amz-SignedHeaders=host&X-Amz-Signature=e11b346b15f4af9c397f9996ba80952bab7b7af706ed531fdeaec9c25c08b9c2",
  "http://localhost:9000/eventpom-bucket/hero2.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=cvZyrkt2huShNXglI1x4%2F20250422%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20250422T095833Z&X-Amz-Expires=300&X-Amz-SignedHeaders=host&X-Amz-Signature=75e4d1d870cc6fc5d6a9f78006632de210639a4b8a9f838b7cc025ad25c5297e",
  "http://localhost:9000/eventpom-bucket/hero3.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=cvZyrkt2huShNXglI1x4%2F20250422%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20250422T100519Z&X-Amz-Expires=300&X-Amz-SignedHeaders=host&X-Amz-Signature=272382f70485dbe2e2f275a7b373b32bb7467316d9586a1cee4562e837d82397",
  "http://localhost:9000/eventpom-bucket/hero4.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=cvZyrkt2huShNXglI1x4%2F20250422%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20250422T100333Z&X-Amz-Expires=300&X-Amz-SignedHeaders=host&X-Amz-Signature=c9ad5cf68596e1e1b3cbe8fe8b21945ebf9ed298e245e3e80fece7167eaab3aa",
  "http://localhost:9000/eventpom-bucket/hero5.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=cvZyrkt2huShNXglI1x4%2F20250422%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20250422T101109Z&X-Amz-Expires=300&X-Amz-SignedHeaders=host&X-Amz-Signature=65ed78585d37dbbc8b74a1c1ba8a3cad9317a1db5f92432e77dddcdc018fc6eb",
  "http://localhost:9000/eventpom-bucket/hero6.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=cvZyrkt2huShNXglI1x4%2F20250422%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20250422T101330Z&X-Amz-Expires=300&X-Amz-SignedHeaders=host&X-Amz-Signature=d0cca2464fe13dfac29178d39b910f8648ab8ab016d8afae3352f5300e7da594",
  "http://localhost:9000/eventpom-bucket/hero7.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=cvZyrkt2huShNXglI1x4%2F20250422%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20250422T101604Z&X-Amz-Expires=300&X-Amz-SignedHeaders=host&X-Amz-Signature=cbad5a5571aeea3afbeff91e5a1f63a974f2b993779e577d4a832c8759cc5acc",
  "http://localhost:9000/eventpom-bucket/hero8.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=cvZyrkt2huShNXglI1x4%2F20250422%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20250422T101703Z&X-Amz-Expires=300&X-Amz-SignedHeaders=host&X-Amz-Signature=da9bcb032894d5f3892ea6863fd5f80ee30b1551b9f202295538117c6215b4dd",
  "http://localhost:9000/eventpom-bucket/hero9.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=cvZyrkt2huShNXglI1x4%2F20250422%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20250422T101801Z&X-Amz-Expires=300&X-Amz-SignedHeaders=host&X-Amz-Signature=021075140b19499cebc12cdcf31d6ec34c94d92b12765848fbb2304a3db80b6a",
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