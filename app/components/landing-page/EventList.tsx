"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { MapPinIcon } from "@heroicons/react/24/solid";
import type { Event } from "@/types/event";

interface EventListProps {
  filteredEvents?: Event[];
}

const EventList: React.FC<EventListProps> = ({ filteredEvents = [] }) => {
  return (
    <section className="flex items-center justify-center mt-12">
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4 md:gap-14">
        {filteredEvents
          .filter((event) => event.status === "APPROVED")
          .map((event) => (
            <div key={event.id} className="w-full m-4 bg-white overflow-hidden">
            <div className="relative w-full aspect-[2/3]">
              <Image
                src={event.imageUrl}
                alt={event.title}
                layout="fill"
                objectFit="cover"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-2">
              <Link href={`/buyTicketsPage/${event.id}`}>
                <h3 className="text-md font-semibold">{event.title}</h3>
              </Link>
              <p className="text-sm text-gray-600 flex items-center">
                <MapPinIcon className="w-4 h-4 mr-1" />
                {event.location}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default EventList;
