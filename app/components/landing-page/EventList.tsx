import React from "react";
import Image from "next/image";
import { MapPinIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

// ------------------ Types ------------------
interface Event {
  id: string;
  title: string;
  imageUrl: string;
  location: string;
  startTime: string;
  endTime: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
}

interface EventListProps {
  filteredEvents: Event[];
}

// ------------------ Component ------------------
export default function EventList({ filteredEvents = [] }: EventListProps) {
  return (
    <section className="flex items-center justify-center mt-12">
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4 md:gap-14">
        {filteredEvents
          .filter((event) => event.status === "APPROVED")
          .map((event) => (
            <div
              key={event.id}
              className="w-full m-4 bg-white overflow-hidden"
            >
              {/* Event Image */}
              <div className="relative w-full aspect-[2/3]">
                <Image
                  src={event.imageUrl}
                  alt={event.title}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Event Details */}
              <div className="p-2">
                <Link href={`/buyTicketsPage/${event.id}`}>
                  <h3 className="cursor-pointer duration-300 text-base font-semibold text-gray-800 hover:text-red-500">
                    {event.title}
                  </h3>
                </Link>
                <p className="text-sm text-red-500">
                  {new Date(event.startTime).toLocaleDateString()} –{" "}
                  {new Date(event.endTime).toLocaleDateString()}
                </p>
                <div className="flex items-center space-x-1 mt-1">
                  <MapPinIcon className="w-4 h-4 text-white stroke-gray-500" />
                  <p className="text-sm text-gray-600">{event.location}</p>
                </div>
              </div>
            </div>
          ))}
      </div>
    </section>
  );
}
