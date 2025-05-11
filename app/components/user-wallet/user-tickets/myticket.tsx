"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CalendarDaysIcon, MapPinIcon } from "@heroicons/react/24/outline";
import Image from "next/image";

type TicketEvent = {
  id: number;
  title: string;
  dateRange: string;
  location: string;
  imageUrl: string;
};

export default function MyTicket() {
  const [activeTab, setActiveTab] = useState<"active" | "past">("active");

  // Mock data
  const activeTickets: TicketEvent[] = [
    {
      id: 1,
      title: "Pepsi presents S2O Songkran Music Festival 2025",
      dateRange: "22 Apr 2025, 19:00 - 23 Apr 2025, 23:59",
      location: "Rajamangala National Stadium, Bangkok, Thailand",
      imageUrl: "/pepsi.png",
    },
    {
      id: 2,
      title: "Infinity Saga Concert Experience",
      dateRange: "5 Mar 2025, 18:00 - 6 Mar 2025, 00:00",
      location: "Prince Mahidol Hall, Nakhon Pathom, Thailand",
      imageUrl: "/marvel.png",
    },
  ];

  const pastTickets: TicketEvent[] = [];

  return (
    <div className="p-4 md:p-6 bg-white">
      <h2 className="text-2xl font-bold text-gray-900">Tickets</h2>

      {/* Tabs */}
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
                    className="flex flex-col md:flex-row items-start gap-10 border rounded-lg p-4"
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
                      <Button variant={'content'}>View details</Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <>
                <p className="text-lg font-semibold">
                  You haven't bought any ticket
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
                  className="flex flex-col md:flex-row items-start gap-4 border rounded-lg p-4"
                >
                  <Image
                    src={ticket.imageUrl}
                    alt={ticket.title}
                    className="w-full md:w-32 h-32 object-cover rounded-md"
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

                    <Button>View details</Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <>
              <p className="text-lg font-semibold">No past tickets found</p>
              <p className="text-gray-500">
                You haven't attended any events yet
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
