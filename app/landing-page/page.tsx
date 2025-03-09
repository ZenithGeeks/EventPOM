"use client";
import { useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { MapPinIcon } from "@heroicons/react/24/solid";
import { ArrowLeftCircleIcon, ArrowRightCircleIcon } from "@heroicons/react/24/solid";

export default function Page() {
  const [searchTerm, setSearchTerm] = useState("");
  const filters = [
    "Popular Events",
    "Upcoming Events",
    "New Events",
    "Music & Festival",
    "Stories",
    "Education",
  ];

  //Generate 20 Events
  const mockEvents = Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    title: `Event ${i + 1}`,
    date: "25 May 2023 - 26 May 2023",
    location: "Location",
  }));

  //Image For Hero Section
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = [
    "/path/to/image1.jpg",
    "/path/to/image2.jpg", 
    "/path/to/image3.jpg",
  ];

  //left arrow click
  const goToPreviousImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  //right arrow click
  const goToNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <div className="bg-white min-h-screen overflow-auto">
      {/* Hero Section - Upcoming Events */}
      <section className="w-full flex justify-center py-6 mt-20 relative">
  {/* Flex container for image and arrows */}
  <div className="relative w-3/4 h-64 bg-gray-300 flex items-center justify-center">
    {/* Left Arrow */}
    <ArrowLeftCircleIcon 
      className="absolute left-2 top-1/2 transform -translate-y-1/2 w-8 h-8 text-gray-700 cursor-pointer"
      onClick={goToPreviousImage}
    />
    <img
      src={images[currentImageIndex]}
      alt={`Event ${currentImageIndex + 1}`}
      className="w-full h-full object-cover"
    />
    {/* Right Arrow */}
    <ArrowRightCircleIcon 
      className="absolute right-2 top-1/2 transform -translate-y-1/2 w-8 h-8 text-gray-700 cursor-pointer"
      onClick={goToNextImage}
    />
  </div>
</section>


      {/* Upcoming Events Title*/}
      <section className="px-8 py-2">
        <h2 className="text-2xl font-bold text-center text-indigo-900">
          Upcoming Event
        </h2>

        {/* Search & Filter Row */}
        <div className="mt-4 space-y-4">
          {/* Search Bar */}
          <div className="w-full max-w-2xl mx-auto flex items-center border rounded-lg px-4 py-2 bg-gray-100">
            <input
              type="text"
              className="w-full bg-transparent outline-none text-gray-700"
              placeholder="Search for event"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <MagnifyingGlassIcon className="w-6 h-6 text-gray-500" />
          </div>

          {/* Filter */}
          <div className="space-y-2 text-gray-600">
            <h3 className="font-semibold text-gray-700">Filter</h3>
            <ul>
              {filters.map((filter) => (
                <li key={filter}>
                  <label>
                    <input type="radio" name="filter" /> {filter}
                  </label>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Events Grid */}
        <div className="flex justify-center mt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 gap-y-10 max-w-4xl w-full">
            {mockEvents.map((event) => (
              <div key={event.id} className="rounded-lg overflow-hidden">
                {/* Placeholder for image */}
                <div className="w-full h-64 bg-gray-300"></div>
                {/* Event Details */}
                <h3 className="mt-2 text-lg font-semibold text-gray-800">{event.title}</h3>
                <p className="text-gray-600">{event.date}</p>
                <div className="flex items-center space-x-2 text-gray-500">
                  <MapPinIcon className="w-5 h-5" />
                  <p>{event.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}