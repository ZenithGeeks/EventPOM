"use client";
import React, { useState, useEffect } from "react";
import HeroSlider from "@/app/components/landing-page/HeroSlider";
import SearchBar from "@/app/components/landing-page/SearchBar";
import EventList from "@/app/components/landing-page/EventList";

export default function Page() {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [searchSubmitted, setSearchSubmitted] = useState(false);
  const [data, setData] = useState<any>([]);

  // Debounce search input and fetch events
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);

    const fetchData = async () => {
      try {
        const res = await fetch("/api/events");
        const result = await res.json();
        if (!res.ok) {
          throw new Error(result.error || "An unknown error occurred");
        }
        setData(result.events);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
    return () => clearTimeout(handler);
  }, [searchTerm]);

  // Regex search
  const filteredEvents = searchTerm
    ? data.filter((event: any) => {
        const regex = new RegExp(debouncedSearchTerm, "i");
        return (
          regex.test(event.title) ||
          regex.test(event.location) ||
          regex.test(new Date(event.startTime).toLocaleDateString())
        );
      })
    : data;

  // Handle search submission
  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setShowSuggestions(false);
    setSearchSubmitted(true);
  };

  return (
    <div className="bg-white min-h-screen overflow-auto">
      <HeroSlider />
      <section className="px-8 py-1">
        <h2 className="text-2xl font-bold text-center text-indigo-900">
          Upcoming Events
        </h2>
      </section>
      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        showSuggestions={showSuggestions}
        setShowSuggestions={setShowSuggestions}
        searchSubmitted={searchSubmitted}
        setSearchSubmitted={setSearchSubmitted}
        data={data}
        handleSearchSubmit={handleSearchSubmit}
      />
      <EventList filteredEvents={filteredEvents} />
    </div>
  );
}