"use client";

import React from "react";
import type { Event } from "@/types/event";

interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  showSuggestions: boolean;
  setShowSuggestions: (show: boolean) => void;
  setSearchSubmitted: (submitted: boolean) => void;
  data: Event[];
  handleSearchSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  searchTerm,
  setSearchTerm,
  showSuggestions,
  setShowSuggestions,
  setSearchSubmitted,
  data,
  handleSearchSubmit,
}) => {
  const filteredSuggestions = (data ?? []).filter((event) =>
    event.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <form onSubmit={handleSearchSubmit} className="px-8 py-4">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onFocus={() => setShowSuggestions(true)}
        className="w-full border border-gray-300 rounded-md p-2"
        placeholder="Search by title or location"
      />
      {showSuggestions && searchTerm && (
        <ul className="bg-white border border-gray-300 mt-2 rounded-md max-h-48 overflow-y-auto">
          {filteredSuggestions.length > 0 ? (
            filteredSuggestions.map((event) => (
              <li
                key={event.id}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => {
                  setSearchTerm(event.title);
                  setShowSuggestions(false);
                  setSearchSubmitted(true);
                }}
              >
                {event.title}
              </li>
            ))
          ) : (
            <li className="px-4 py-2 text-gray-500">No results found</li>
          )}
        </ul>
      )}
    </form>
  );
};

export default SearchBar;