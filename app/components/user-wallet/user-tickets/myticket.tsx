"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { CalendarDaysIcon, MapPinIcon } from "@heroicons/react/24/outline";
import Image from "next/image";

export interface event {
  eventId: string;
  title: string;
  startTime: string;
  endTime: string;
  location: string;
  imageUrl: string;
}

interface TicketEvent  {
  ticketId: number;
  event: event,
  imageUrl: string;
};

export default function MyTicket() {
  const [activeTab, setActiveTab] = useState<"active" | "past">("active");
  const [events, setEvents] = useState<TicketEvent[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchTickets() {
      try {
        const response = await fetch("/api/tickets"); 
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const originalData = await response.json(); 
        const rawTickets = originalData.data;
        console.log(rawTickets);
        setEvents(rawTickets);
      } catch (error) {
        console.error("Error fetching tickets:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchTickets();
  }, []);

  const now = new Date();
  const isValidDate = (date: string) => !isNaN(new Date(date).getTime());

  const activeTickets = events.filter((event) => {
    if (!isValidDate(event.event.endTime)) return false;
    return new Date(event.event.endTime).getTime() >= now.getTime();
  });

  const pastTickets = events.filter((event) => {
    if (!isValidDate(event.event.endTime)) return false;
    return new Date(event.event.endTime).getTime() < now.getTime();
  });

  if (loading) {
    return <div className="p-4 text-center">Loading tickets...</div>;
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hourCycle: "h23" // Use 24-hour format
    }).format(date);
  };
  

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
                    key={ticket.ticketId}
                    className="flex flex-col md:flex-row items-start gap-10 border p-4"
                  >
                    {/* Event image */}
                    <Image
                      src={ticket.event.imageUrl}
                      width={150}
                      height={50}
                      alt={ticket.event.title}
                      className="object-cover"
                    />

                    {/* Event details + button */}
                    <div className="flex-1 space-y-4">
                      <h3 className="font-semibold text-lg">{ticket.event.title}</h3>

                      {/* Date with calendar icon */}
                      <p className="flex items-center gap-1 text-sm text-gray-600">
                        <CalendarDaysIcon className="h-4 w-4" />
                        {formatDate(ticket.event.startTime)} - {formatDate(ticket.event.endTime)}
                      </p>

                      {/* Location with map-pin icon */}
                      <p className="flex items-center gap-1 text-sm text-gray-600">
                        <MapPinIcon className="h-4 w-4" />
                        {ticket.event.location}
                      </p>

                      {/* Button under the details */}
                      <Button variant="content">View details</Button>
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
                <Button variant="content">View event</Button>
              </>
            )
          ) : pastTickets.length > 0 ? (
            <div className="space-y-4 text-left">
              {pastTickets.map((ticket) => (
                <div
                  key={ticket.ticketId}
                  className="flex flex-col md:flex-row items-start gap-10 border p-4"
                >
                  <Image
                    src={ticket.event.imageUrl}
                    width={150}
                    height={150}
                    alt={ticket.event.title}
                    className="object-cover"
                  />
                  <div className="flex-1 space-y-4">
                    <h3 className="font-semibold text-lg">{ticket.event.title}</h3>
                    <p className="flex items-center gap-1 text-sm text-gray-600">
                      <CalendarDaysIcon className="h-4 w-4" />
                      {formatDate(ticket.event.startTime)} - {formatDate(ticket.event.endTime)}
                    </p>
                    <p className="flex items-center gap-1 text-sm text-gray-600">
                      <MapPinIcon className="h-4 w-4" />
                      {ticket.event.location}
                    </p>

                    <Button variant="content">View details</Button>
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
