"use client";

import React, { useState, useEffect } from "react";
import HeroSlider from "@/app/components/landing-page/HeroSlider";
import SearchBar from "@/app/components/landing-page/SearchBar";
import EventList from "@/app/components/landing-page/EventList";
import type { Event } from "@/types/event";

export default function Page() {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [data, setData] = useState<Event[]>([]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/events");
        const result: { events: Event[]; error?: string } = await res.json();
        if (!res.ok) throw new Error(result.error || "An error occurred");
        setData(result.events);
      } catch (err) {
        console.error("Failed to fetch events:", err);
      }
    };
    fetchData();
  }, []);

  const filteredEvents = debouncedSearchTerm
    ? data.filter((event) => {
        const regex = new RegExp(debouncedSearchTerm, "i");
        return (
          regex.test(event.title) ||
          regex.test(event.location) ||
          regex.test(new Date(event.startTime).toLocaleDateString())
        );
      })
    : data;
    
const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  setShowSuggestions(false);
};


  return (
    <div className="bg-white min-h-screen overflow-auto">
      <HeroSlider />
      <section className="px-8 py-1">
        <h2 className="text-2xl font-bold text-center text-indigo-900">Upcoming Events</h2>
      </section>
<SearchBar
  searchTerm={searchTerm}
  setSearchTerm={setSearchTerm}
  showSuggestions={showSuggestions}
  setShowSuggestions={setShowSuggestions}
  setSearchSubmitted={() => {}} // if needed for compatibility
  data={data}
  handleSearchSubmit={handleSearchSubmit}
/>

      <EventList filteredEvents={filteredEvents} />
    </div>
  );
}
