"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { CalendarDaysIcon, MapPinIcon } from "@heroicons/react/24/outline";
import Image from "next/image";

type TicketEvent = {
  id: number;
  title: string;
  dateRange: string;
  location: string;
  imageUrl: string;
  endDate: string;
};

export default function MyTicket() {
  const [activeTab, setActiveTab] = useState<"active" | "past">("active");
  const [events, setEvents] = useState<TicketEvent[]>([]);

  useEffect(() => {
    setEvents([
      {
        id: 1,
        title: "Pepsi presents S2O Songkran Music Festival 2025",
        dateRange: "22 Apr 2025, 19:00 - 23 Apr 2025, 23:59",
        location: "Rajamangala National Stadium, Bangkok, Thailand",
        imageUrl: "/pepsi.png",
        endDate: "2025-04-23T23:59:00",
      },
      {
        id: 2,
        title: "Infinity Saga Concert Experience",
        dateRange: "5 Mar 2025, 18:00 - 6 Mar 2025, 00:00",
        location: "Prince Mahidol Hall, Nakhon Pathom, Thailand",
        imageUrl: "/marvel.png",
        endDate: "2025-03-06T00:00:00",
      },
      {
        id: 3,
        title: "Thai Pomeranian Club Championship Dog Show 2024",
        dateRange: "28 Sep 2024,11:00 -  29 Sep 2024, 21:00",
        location: "Central Bangna Hall",
        imageUrl: "/dogshow.png",
        endDate: "2024-09-29T23:59:00",
      },
    ]);
  }, []);

  const now = new Date();

  const isValidDate = (date: string | number | Date) => !isNaN(new Date(date).getTime());

  const activeTickets = events.filter((event) => {
    if (!isValidDate(event.endDate)) return false;
    return new Date(event.endDate).getTime() >= now.getTime();
  });

  const pastTickets = events.filter((event) => {
    if (!isValidDate(event.endDate)) return false;
    return new Date(event.endDate).getTime() < now.getTime();
  });

  return (
    <div className="p-4 md:p-6 bg-white">
      <h2 className="text-2xl font-bold text-gray-900">Tickets</h2>

      <div className="mt-4 border shadow-sm">
        <div className="flex border-b">
          <button
            onClick={() => setActiveTab("active")}
            className={`px-4 py-2 font-semibold ${
              activeTab === "active"
                ? "border-b-2 border-[#2A2A6D] text-gray-900"
                : "text-gray-500"
            }`}
          >
            Active tickets
          </button>
          <button
            onClick={() => setActiveTab("past")}
            className={`px-4 py-2 font-semibold ${
              activeTab === "past"
                ? "border-b-2 border-[#2A2A6D] text-gray-900"
                : "text-gray-500"
            }`}
          >
            Past tickets
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6 text-center">
          {activeTab === "active" ? (
            activeTickets.length > 0 ? (
              <div className="space-y-4 text-left">
                {activeTickets.map((ticket) => (
                  <div
                    key={ticket.id}
                    className="flex flex-col md:flex-row items-start gap-10 border p-4"
                  >
                    {/* Event image */}
                    <Image
                      src={ticket.imageUrl}
                      width={150}
                      height={50}
                      alt={ticket.title}
                      className="object-cover"
                    />

                    {/* Event details + button */}
                    <div className="flex-1 space-y-4">
                      <h3 className="font-semibold text-lg">{ticket.title}</h3>

                      {/* Date with calendar icon */}
                      <p className="flex items-center gap-1 text-sm text-gray-600">
                        <CalendarDaysIcon className="h-4 w-4" />
                        {ticket.dateRange}
                      </p>

                      {/* Location with map-pin icon */}
                      <p className="flex items-center gap-1 text-sm text-gray-600">
                        <MapPinIcon className="h-4 w-4" />
                        {ticket.location}
                      </p>

                      {/* Button under the details */}
                      <Button variant={"content"}>View details</Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <>
                <p className="text-lg font-semibold">
                  You haven&apos;t bought any ticket
                </p>
                <p className="text-gray-500">Click here to view events</p>
                <Button className="mt-4">View events</Button>
              </>
            )
          ) : pastTickets.length > 0 ? (
            <div className="space-y-4 text-left">
              {pastTickets.map((ticket) => (
                <div
                  key={ticket.id}
                  className="flex flex-col md:flex-row items-start gap-10 border p-4"
                >
                  <Image
                    src={ticket.imageUrl}
                    width={150}
                    height={150}
                    alt={ticket.title}
                    className="object-cover"
                  />
                  <div className="flex-1 space-y-4">
                    <h3 className="font-semibold text-lg">{ticket.title}</h3>
                    <p className="flex items-center gap-1 text-sm text-gray-600">
                      <CalendarDaysIcon className="h-4 w-4" />
                      {ticket.dateRange}
                    </p>
                    <p className="flex items-center gap-1 text-sm text-gray-600">
                      <MapPinIcon className="h-4 w-4" />
                      {ticket.location}
                    </p>

                    <Button variant={"content"}>View details</Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <>
              <p className="text-lg font-semibold">No past tickets found</p>
              <p className="text-gray-500">
                You haven&apos;t attended any events yet
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
