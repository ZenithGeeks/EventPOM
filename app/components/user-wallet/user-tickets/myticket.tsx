"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { CalendarDaysIcon, MapPinIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { Ticket, EventStatus } from "@/types/models";
import TicketDetail from "./TicketDetail";
import { useSession } from "next-auth/react";

interface RawTicket {
  id: string;
  name: string;
  seat?: string;
  price: number;
  quantity: number;
  attendance: boolean;
  eventId: string;
  event_title: string;
  event_location: string;
  event_starttime: string;
  event_endtime: string;
  event_imageurl?: string;
}

export default function MyTicket() {
  const [activeTab, setActiveTab] = useState<"active" | "past">("active");
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const { data: session } = useSession();

  useEffect(() => {
    const userId = session?.user?.id;

    if (!userId) {
      setLoading(false);
      return;
    }

    async function fetchTickets() {
      try {
        const res = await fetch(`/api/tickets/${userId}`, {
          cache: "no-store",
        });

        if (!res.ok) {
          const errorText = await res.text();
          console.error("❌ Error fetching tickets:", res.status, errorText);
          setLoading(false);
          return;
        }

        const payload = await res.json();
        const rawTickets: RawTicket[] = payload.data || [];

        const mappedTickets: Ticket[] = rawTickets.map((t) => ({
          id: t.id,
          name: t.name,
          seat: t.seat,
          price: t.price,
          quantity: t.quantity,
          attendance: t.attendance,
          users: [],
          orders: [],
          eventId: t.eventId,
          event: {
            id: t.eventId,
            title: t.event_title,
            location: t.event_location,
            imageUrl: t.event_imageurl,
            startTime: new Date(t.event_starttime),
            endTime: new Date(t.event_endtime),
            status: EventStatus.APPROVED,
            description: "",
            typeId: "",
            eventCategory: "",
            organizerId: "",
            createdAt: new Date(),
          },
        }));

        setTickets(mappedTickets);
      } catch (err) {
        console.error("❌ Network error:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchTickets();
  }, [session?.user?.id]);

  const now = new Date();

  const activeTickets = tickets.filter(
    (ticket) => ticket.event.endTime >= now
  );
  const pastTickets = tickets.filter(
    (ticket) => ticket.event.endTime < now
  );

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-GB", {
      day: "2-digit",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hourCycle: "h23",
    }).format(date);
  };

  if (loading) {
    return <div className="p-4 text-center">Loading tickets...</div>;
  }

  if (selectedTicket) {
    return (
      <TicketDetail
        ticket={selectedTicket}
        onBack={() => setSelectedTicket(null)}
      />
    );
  }

  const renderTickets = (list: Ticket[]) => (
    <div className="space-y-4 text-left">
      {list.map((ticket) => (
        <article
          key={ticket.id}
          className="flex flex-col md:flex-row items-start gap-10 border p-4"
          aria-label={`Ticket for ${ticket.event.title}`}
        >
          <Image
            src={ticket.event.imageUrl || "/placeholder.png"}
            width={150}
            height={100}
            alt={`Image for event ${ticket.event.title}`}
            className="object-cover"
          />
          <div className="flex-1 space-y-4">
            <h3 className="font-semibold text-lg">
              {ticket.event.title}
            </h3>
            <p className="flex items-center gap-1 text-sm text-gray-600">
              <CalendarDaysIcon className="h-4 w-4" />
              {formatDate(ticket.event.startTime.toString())} -{" "}
              {formatDate(ticket.event.endTime.toString())}
            </p>
            <p className="flex items-center gap-1 text-sm text-gray-600">
              <MapPinIcon className="h-4 w-4" />
              {ticket.event.location}
            </p>
            <Button
              variant="content"
              onClick={() => setSelectedTicket(ticket)}
            >
              View details
            </Button>
          </div>
        </article>
      ))}
    </div>
  );

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

        <div className="p-6 text-center">
          {activeTab === "active" ? (
            activeTickets.length > 0 ? (
              renderTickets(activeTickets)
            ) : (
              <div>
                <p className="text-lg font-semibold">
                  You haven&apos;t bought any ticket
                </p>
                <p className="text-gray-500">
                  Click here to view events
                </p>
                <Button className="mt-4" variant="content">
                  View events
                </Button>
              </div>
            )
          ) : pastTickets.length > 0 ? (
            renderTickets(pastTickets)
          ) : (
            <div>
              <p className="text-lg font-semibold">
                No past tickets found
              </p>
              <p className="text-gray-500">
                You haven&apos;t attended any events yet
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
