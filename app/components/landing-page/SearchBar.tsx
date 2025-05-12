import React from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  showSuggestions: boolean;
  setShowSuggestions: (show: boolean) => void;
  searchSubmitted: boolean;
  setSearchSubmitted: (submitted: boolean) => void;
  data: any[];
  handleSearchSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export default function SearchBar({
  searchTerm,
  setSearchTerm,
  showSuggestions,
  setShowSuggestions,
  searchSubmitted,
  setSearchSubmitted,
  data,
  handleSearchSubmit,
}: SearchBarProps) {
  // Filter events based on the search term for suggestions
  const filteredSuggestions = data.filter((event: any) => {
    const regex = new RegExp(searchTerm, "i");
    return (
      regex.test(event.title) ||
      regex.test(event.location) ||
      regex.test(new Date(event.startTime).toLocaleDateString())
    );
  });

  return (
    <div className="mt-4 space-y-4 relative flex flex-col items-center">
      <form
        onSubmit={handleSearchSubmit}
        className="w-full max-w-2xl mx-auto flex items-center border px-4 py-2 bg-gray-100 relative"
      >
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
      {showSuggestions && searchTerm && filteredSuggestions.length > 0 && (
        <ul className="absolute z-10 bg-white shadow-lg rounded-md top-6 w-full max-w-2xl mx-auto text-center left-1/2 transform -translate-x-1/2">
          {filteredSuggestions.map((event: any) => (
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
  );
}