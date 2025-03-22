"use client";
import React from "react";
import Image from 'next/image';
import { useState, useEffect } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { MapPinIcon } from "@heroicons/react/24/solid";
import { ArrowLeftCircleIcon, ArrowRightCircleIcon } from "@heroicons/react/24/solid";

export default function Page() {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [searchSubmitted, setSearchSubmitted] = useState(false);
  //const [loading, setLoading] = useState(false);
  //const [error, setError] = useState(null);

  // Sample events data (Replace this with real API data later)
  const [events, setEvents] = useState([
    { id: 1, title: "Music Festival", location: "New York", date: "2025-04-10", image: "/images/hero7.png" },
    { id: 2, title: "Tech Conference", location: "San Francisco", date: "2025-05-15", image: "/images/hero2.png" },
    { id: 3, title: "Art Exhibition", location: "Paris", date: "2025-06-20", image: "/images/hero9.jpg" },
    { id: 4, title: "Food Fair", location: "Tokyo", date: "2025-07-05", image: "/images/hero5.png" },
    { id: 5, title: "Book Fair", location: "London", date: "2025-08-12", image: "/images/hero3.jpg" },
    { id: 6, title: "Fashion Show", location: "Milan", date: "2025-09-18", image: "/images/hero4.jpg" },
    { id: 7, title: "Film Festival", location: "Los Angeles", date: "2025-10-05", image: "/images/hero8.png" },
    { id: 8, title: "Gaming Expo", location: "Seoul", date: "2025-11-22", image: "/images/hero6.jpg" },
    { id: 9, title: "Car Show", location: "Detroit", date: "2025-12-10", image: "/images/hero1.png" },
    { id: 10, title: "Marathon", location: "Boston", date: "2026-01-15", image: "/images/hero8.png" },
    { id: 11, title: "Comedy Night", location: "Chicago", date: "2026-02-20", image: "/images/hero2.png" },
    { id: 12, title: "Photography Expo", location: "Berlin", date: "2026-03-25", image: "/images/hero1.png" },
    { id: 13, title: "Science Fair", location: "Toronto", date: "2026-04-14", image: "/images/hero3.jpg" },
    { id: 14, title: "Wine Tasting", location: "Napa Valley", date: "2026-05-09", image: "/images/hero7.png" },
    { id: 15, title: "Yoga Retreat", location: "Bali", date: "2026-06-30", image: "/images/hero9.jpg" },
    { id: 16, title: "Space Exploration Summit", location: "Houston", date: "2026-07-21", image: "/images/hero9.jpg" },
    { id: 17, title: "Pet Expo", location: "Sydney", date: "2026-08-15", image: "/images/hero2.png" },
    { id: 18, title: "Sustainability Conference", location: "Copenhagen", date: "2026-09-12", image: "/images/hero6.jpg" },
    { id: 19, title: "Robotics Fair", location: "Tokyo", date: "2026-10-28", image: "/images/hero5.png" },
    { id: 20, title: "History Museum Exhibit", location: "Athens", date: "2026-11-19", image: "/images/hero7.png" }
  ]);

  // Debounce search input
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);

    return () => clearTimeout(handler);
  }, [searchTerm]);

  /*
      // Fetch events from the backend
      useEffect(() => {
        const fetchEvents = async () => {
          setLoading(true);
          setError(null);
          try {
            const response = await fetch("/api/events"); // Replace this with real API
            if (!response.ok) {
              throw new Error("Failed to fetch events");
            }
            const data = await response.json();
            setEvents(data);
          } catch (err) {
            setError(err.message);
          } finally {
            setLoading(false);
          }
        };
        fetchEvents();
      }, []);
  */

  //regex search
  const filteredEvents = searchTerm
    ? events.filter((event) => {
      const regex = new RegExp(debouncedSearchTerm, "i");
      return regex.test(event.title) || regex.test(event.location) || regex.test(event.date);
    })
    : events;

  // Handle search submission
  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setShowSuggestions(false);
    setSearchSubmitted(true);
  };

  // Image For Hero Section
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = [
    "/images/hero1.png",
    "/images/hero2.png",
    "/images/hero3.jpg",
    "/images/hero4.jpg",
    "/images/hero5.png",
    "/images/hero6.jpg",
    "/images/hero7.png",
    "/images/hero8.png",
    "/images/hero9.jpg",
  ];

  // Left arrow click
  const goToPreviousImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  // Right arrow click
  const goToNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <div className="bg-white min-h-screen overflow-auto">
      {/* Hero Section - Image Slider */}
      <section className="w-full flex justify-center py-6 mt-20 relative">
        <div className="relative w-3/4 h-64 bg-gray-300 flex items-center justify-center">
          <ArrowLeftCircleIcon
            className="absolute left-2 top-1/2 transform -translate-y-1/2 w-8 h-8 text-gray-700 cursor-pointer"
            onClick={goToPreviousImage}
          />
          <Image
            src={images[currentImageIndex]}
            alt={`Event ${currentImageIndex + 1}`}
            layout="responsive"
            width={500}
            height={300}
            className="w-full h-full object-cover"
          />
          <ArrowRightCircleIcon
            className="absolute right-2 top-1/2 transform -translate-y-1/2 w-8 h-8 text-gray-700 cursor-pointer"
            onClick={goToNextImage}
          />
        </div>
      </section>

      {/* Upcoming Events Title */}
      <section className="px-8 py-2">
        <h2 className="text-2xl font-bold text-center text-indigo-900">
          Upcoming Events
        </h2>
        </section>

        {/* Search & Filter Row */}
        <div className="mt-4 space-y-4 relative flex flex-col items-center">
          <form onSubmit={handleSearchSubmit} className="w-full max-w-2xl mx-auto flex items-center border rounded-lg px-4 py-2 bg-gray-100 relative">
            <input
              type="text"
              className="w-full bg-transparent outline-none text-gray-700"
              placeholder="Search for event"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setShowSuggestions(true);
                setSearchSubmitted(false);
              }}
            />
            <MagnifyingGlassIcon className="w-6 h-6 text-gray-500" />
          </form>

          {/* Search Suggestions */}
          {showSuggestions && searchTerm && (
            <ul className="absolute bg-white shadow-lg rounded-md top-6 w-full max-w-2xl mx-auto text-center left-1/2 transform -translate-x-1/2">
              {filteredEvents.slice(0, 5).map((event) => (
                <li
                  key={event.id}
                  className="px-4 py-2 cursor-pointer hover:bg-gray-200"
                  onClick={() => {
                    setSearchTerm(event.title);
                    setShowSuggestions(false);
                  }}
                >
                  {event.title} - {event.location}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Events Grid */}
        <section className="mt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredEvents.map((event) => (
              <div key={event.id} className="overflow-hidden bg-white transition shadow-lg rounded-lg">
                <div className="relative w-full h-80">
                  <Image
                    src={event.image}
                    alt={event.title}
                    layout="responsive"
                    width={500}
                    height={300}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800">{event.title}</h3>
                  <p className="text-gray-600">{event.date}</p>
                  <div className="flex items-center space-x-2 text-gray-500 mt-2">
                    <MapPinIcon className="w-5 h-5" />
                    <p>{event.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
    </div>
  );
}