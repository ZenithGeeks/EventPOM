import React from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

// ------------------ Types ------------------
interface Event {
  id: string;
  title: string;
  location: string;
}

interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  showSuggestions: boolean;
  setShowSuggestions: (show: boolean) => void;
  searchSubmitted: boolean;
  setSearchSubmitted: (submitted: boolean) => void;
  data: Event[];
  handleSearchSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

// ------------------ Component ------------------
export default function SearchBar({
  searchTerm,
  setSearchTerm,
  showSuggestions,
  setShowSuggestions,
  setSearchSubmitted,
  data,
  handleSearchSubmit,
}: SearchBarProps) {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setShowSuggestions(true);
    setSearchSubmitted(false);
  };

  const handleSuggestionClick = (event: Event) => {
    setSearchTerm(event.title);
    setShowSuggestions(false);
  };

  const filteredSuggestions = data.filter((event) =>
    event.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
          onChange={handleInputChange}
        />
        <MagnifyingGlassIcon className="w-6 h-6 text-gray-500" />
      </form>

      {showSuggestions && searchTerm && filteredSuggestions.length > 0 && (
        <ul className="absolute z-10 bg-white shadow-lg rounded-md top-16 w-full max-w-2xl mx-auto text-left left-1/2 transform -translate-x-1/2">
          {filteredSuggestions.slice(0, 5).map((event) => (
            <li
              key={event.id}
              className="px-4 py-2 cursor-pointer hover:bg-gray-200"
              onClick={() => handleSuggestionClick(event)}
            >
              <strong>{event.title}</strong> — <span>{event.location}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
