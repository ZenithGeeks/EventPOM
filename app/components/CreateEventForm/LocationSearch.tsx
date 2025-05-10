"use client";

import { useEffect, useState } from "react";

interface MapTilerAutocompleteProps {
  setLocation: (placeName: string) => void;
}

interface Suggestion {
  id: string;
  place_name: string;
}

export default function MapTilerAutocomplete({ setLocation }: MapTilerAutocompleteProps) {
  const [input, setInput] = useState("");
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (input.length < 2) {
        setSuggestions([]);
        return;
      }

      try {
        const res = await fetch(
          `https://api.maptiler.com/geocoding/${encodeURIComponent(input)}.json?key=${process.env.NEXT_PUBLIC_MAPTILER_KEY}&language=th&limit=5`
        );

        const data = await res.json();
        setSuggestions(data.features || []);
      } catch (err) {
        console.error("MapTiler autocomplete error:", err);
      }
    };

    const timeout = setTimeout(fetchSuggestions, 300); // debounce
    return () => clearTimeout(timeout);
  }, [input]);

  const handleSelect = (placeName: string) => {
    setLocation(placeName);
    setInput(placeName);
    setSuggestions([]);
  };

  return (
    <div className="relative">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="ค้นหาสถานที่..."
        className="w-full px-3 py-2 border rounded-md text-sm"
      />
      {suggestions.length > 0 && (
        <ul className="absolute z-10 w-full bg-white border border-gray-200 rounded-md mt-1 shadow">
          {suggestions.map((sug) => (
            <li
              key={sug.id}
              className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm"
              onClick={() => handleSelect(sug.place_name)}
            >
              {sug.place_name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
