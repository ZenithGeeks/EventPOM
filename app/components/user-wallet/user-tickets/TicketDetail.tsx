"use client";

import { useEffect, useState } from "react";
import { Ticket, User } from "@/types/models";
import { Button } from "@/components/ui/button";
import { CalendarDaysIcon, MapPinIcon } from "@heroicons/react/24/outline";
import { useQRCode } from "next-qrcode";
import Image from "next/image";
import { useSession } from "next-auth/react";

interface TicketDetailProps {
  ticket: Ticket;
  onBack: () => void;
}

export default function TicketDetail({ ticket, onBack }: TicketDetailProps) {
  const { Canvas } = useQRCode();
  
  const { data: session } = useSession();
  const owner = session?.user;


  const formatShortDate = (start: string | Date, end: string | Date) => {
    const startDate = new Date(start);
    const endDate = new Date(end);

    const options: Intl.DateTimeFormatOptions = {
      day: "2-digit",
      month: "long",
      year: "numeric",
    };

    return `${startDate.toLocaleDateString("en-GB", options)} - ${endDate.toLocaleDateString("en-GB", options)}`;
  };

  return (
    <div className="p-6 bg-white max-w-4xl mx-auto">
      <Button variant="ghost" onClick={onBack} className="mb-4">
        ← Back to All Tickets
      </Button>

      <h2 className="text-3xl font-bold text-[#2A2A6D] mb-6">Tickets</h2>

      <div className="border shadow-sm rounded-lg p-10">

        <div className="flex flex-col md:flex-row items-start gap-[3rem]">

          <div className="w-full md:w-1/4 flex justify-center">
          <Image
            src={ticket.event.imageUrl ?? "/placeholder.png"}
            width={200}
            height={250}
            alt={ticket.event.title || "Event Poster"}
            className="object-cover"
          />
          </div>

          <div className="flex-1">
            <h3 className="font-bold text-lg ">{ticket.event.title}</h3>

            <p className="flex items-center gap-2 pt-4 text-sm text-gray-700 mt-2">
              <CalendarDaysIcon className="h-5 w-5" />
              {formatShortDate(ticket.event.startTime, ticket.event.endTime)}
            </p>

            <p className="flex items-center gap-2 pt-4 text-sm text-gray-700 mt-1">
              <MapPinIcon className="h-5 w-5" />
              {ticket.event.location}
            </p>
          </div>
        </div>

        <div className="mt-6 pt-4">
          <h4 className="text-lg font-bold text-[#2A2A6D]">E-Tickets</h4>
          <p className="text-sm text-gray-500">
            This ticket is E-ticket. Please show this QR code to enter the event and do not share this QR to other people.
          </p>

          <div className="flex flex-col md:flex-row justify-between gap-8 mt-4">

            <div className="space-y-4 text-sm">
              <div>
                <p className="text-gray-500 font-medium">Type</p>
                <p className="text-black font-bold">{ticket.name}</p>
              </div>
              <div>
                <p className="text-gray-500 font-medium">Price</p>
                <p className="text-black font-bold">
                  {ticket.price === 0 ? "Free" : `$${ticket.price}`}
                </p>
              </div>
              {session?.user && (
                <div>
                  <p className="text-gray-500 font-medium pt-2">Owner Name</p>
                  <p className="text-black font-bold">{session.user.name}</p>
                  <p className="text-gray-800 text-sm">{session.user.email}</p>
                  <p className="text-gray-800 text-sm">{session.user.phone}</p>
                </div>
              )}
            </div>

            <div className="flex flex-col items-center w-full md:w-auto">
              <Canvas
                text={ticket.id}
                options={{
                  errorCorrectionLevel: "M",
                  margin: 3,
                  scale: 5,
                  width: 200,
                  color: {
                    dark: "#000000",
                    light: "#FFFFFF",
                  },
                }}
              />
              <p className="font-bold mt-2 text-sm">{ticket.id}</p>
            </div>
          </div>
        </div>
        <div className="mt-6 flex flex-col md:flex-row justify-center md:justify-between items-center gap-4 pr-0 md:pr-7">
          <Button variant="outline">View Order Detail</Button>
          <Button variant="content">Download Ticket</Button>
        </div>
      </div>
    </div>
  );
}
