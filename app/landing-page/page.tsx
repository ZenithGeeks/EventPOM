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
  const [events, setEvents] = useState<any[]>([]);
  const [categories, setCategories] = useState<{ id: number; name: string }[]>([]);

  // 1) Fetch events + categories once on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        // ➤ Fetch events
        const evtRes = await fetch("/api/events", { cache: "no-store" });
        const evtJson = await evtRes.json();
        if (!evtRes.ok) throw new Error(evtJson.error || `Events fetch failed`);
        console.log("Fetched Events:", evtJson.events);
        setEvents(evtJson.events);

        // ➤ Fetch categories
        const catRes = await fetch("/api/categories", { cache: "no-store" });
        const catJson = await catRes.json();
        console.log(catJson)
        setCategories(catJson);
      } catch (err) {
        console.error("Data Fetch Error:", err);
      }
    };

    fetchData();
  }, []);

  // 2) Debounce the search term
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedSearchTerm(searchTerm), 300);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  // 3) Filter events by title / location / date
  const filteredEvents = debouncedSearchTerm
    ? events.filter((e) => {
        const rx = new RegExp(debouncedSearchTerm, "i");
        return (
          rx.test(e.title) ||
          rx.test(e.location) ||
          rx.test(new Date(e.startTime).toLocaleDateString())
        );
      })
    : events;

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSuggestions(false);
    setSearchSubmitted(true);
  };

  return (
    <div className="bg-white min-h-screen overflow-auto">
      <HeroSlider />

      <section className="px-8 py-4">
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
        data={events}
        handleSearchSubmit={handleSearchSubmit}
      />

      <EventList filteredEvents={filteredEvents} categories={categories} />
    </div>
  );
}
