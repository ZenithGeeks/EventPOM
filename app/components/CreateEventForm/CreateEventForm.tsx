"use client";

import * as React from "react";
import PosterUpload from "./PosterUpload";
import EventDetailsForm from "./EventDetailsForm";
import TicketsForm from "./TicketsForm";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Event, EventStatus } from "@/types/models"; // Import type definitions

export default function CreateEventForm() {
  const [date, setDate] = useState<Date>();
  const [picture, setPicture] = useState<File | null>(null);
  const [tag, setTag] = useState<string>("");
  const [eventData, setEventData] = useState<
    Omit<Event, "id" | "createdAt" | "application">
  >({
    title: "",
    typeId: "",
    description: "",
    location: "",
    startTime: new Date(),
    endTime: new Date(),
    status: EventStatus.PENDING_APPROVAL,
    organizerId: "",
    tickets: [],
    orders: [],
    eventCategory: ""
  });
  
  useEffect(() => {
    setEventData((prevEventData) => ({
      ...prevEventData,
      eventCategory: tag,
      imageUrl: picture ? URL.createObjectURL(picture) : "",
    }));
  }, [tag, picture]);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    try {
      const formattedData: Omit<Event, "id" | "createdAt"> = {
        ...eventData,
        startTime: date
          ? new Date(date.getTime() + 2 * 60 * 60 * 1000)
          : new Date(),
        endTime: date
          ? new Date(date.getTime() + 2 * 60 * 60 * 1000)
          : new Date(),
        imageUrl: picture ? URL.createObjectURL(picture) : "",
      };

      const response = await fetch("/api/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formattedData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to create event");
      }

      console.log("Event Created Successfully:", result.event);
      alert("Event created successfully!");
    } catch (error) {
      console.error("Event creation failed:", error);
      alert("Failed to create event.");
    }
  }

  return (
    <form className="flex flex-col gap-12 pt-10 px-4" onSubmit={handleSubmit}>
      <div className="flex justify-start pt-10">
        <h1 className="text-3xl font-bold text-[#2A2A6D]">Create Event</h1>
      </div>
      <div className="flex flex-col md:flex-row gap-12">
        <div className="flex items-start justify-center md:justify-start pt-2">
          <PosterUpload picture={picture} setPicture={setPicture} />
        </div>
        <div className="flex flex-col gap-8 w-full pt-2">
          <EventDetailsForm date={date} setDate={setDate}  setTag={setTag}/>
          <TicketsForm />
        </div>
      </div>

      <div className="flex justify-end">
        <Button type="submit">Create Event</Button>
      </div>
    </form>
  );
}
