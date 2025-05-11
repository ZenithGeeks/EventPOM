import React from "react";
import Image from "next/image";
import { MapPinIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

interface EventListProps {
  filteredEvents: any[];
}

export default function EventList({ filteredEvents }: EventListProps) {
  return (
    <section className="flex items-center justify-center mt-12">
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4 md:gap-14">
        {filteredEvents?.map((data: any) => (
          <div key={data.id} className="w-full">
          <Link href={"/buyTicketsPage/" + data.id} key={data.id}>
          <div key={data.id} className="w-full m-4 bg-white overflow-hidden">
            {/* Event Image */}
            <div className="relative w-full aspect-[2/3]">
              <Image
                src={data.imageUrl}
                alt={data.title}
                layout="fill"
                objectFit="cover"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Event Details */}
            <div className="p-2">
              <h3 className="text-base font-semibold text-gray-800">
                {data.title}
              </h3>
              <p className="text-sm text-red-500">
                {new Date(data.startTime).toLocaleDateString()} –{" "}
                {new Date(data.endTime).toLocaleDateString()}
              </p>
              <div className="flex items-center space-x-1 mt-1">
                <MapPinIcon className="w-4 h-4 text-white stroke-gray-500" />
                <p className="text-sm text-gray-600">{data.location}</p>
              </div>
            </div>
          </div>
          </Link>
          </div>
        ))}
      </div>
    </section>
  );
}