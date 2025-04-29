"use client";

import * as React from "react";
import PosterUpload from "./PosterUpload";
import EventDetailsForm from "./EventDetailsForm";
import TicketsForm from "./TicketsForm";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Event, EventStatus,Ticket ,Order} from "@/types/models"; // Import type definitions
import { toast } from "react-hot-toast";

interface EventData {
  title: string;
  categoryId: string;
  description: string;
  location: string;
  startTime: Date;
  endTime: Date;
  status: EventStatus;
  organizerId: string;
  tickets?: Ticket[];
  orders?: Order[];
  imageUrl?: string;
}

export default function CreateEventForm() {
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [endTime, setEndTime] = useState<Date | null>(null);
  const [picture, setPicture] = useState<File | null>(null);
  const [tag, setTag] = useState<string>("");

  const [eventData, setEventData] = useState<EventData>({
    title: "",
    categoryId: "",
    description: "",
    location: "",
    startTime: new Date(),
    endTime: new Date(),
    status: EventStatus.PENDING_APPROVAL,
    organizerId: "1",
    tickets: [],
    orders: [],
    imageUrl: "",
  });

  useEffect(() => {
    setEventData((prev) => ({
      ...prev,
      categoryId: tag,
      imageUrl: picture ? URL.createObjectURL(picture) : "",
    }));
  }, [tag, picture]);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
  
    if (
      // !eventData.title ||
      // !eventData.categoryId ||
      // !eventData.description ||
      // !eventData.location ||
      // !startTime ||
      // !endTime 
      !startTime
    ) {
      toast.error("Please fill in all required fields.");
      return;
    }
  
    try {
      let publicImageUrl = "";
      if (picture) {
        const formData = new FormData();
        formData.append("file", picture);
  
        const uploadRes = await fetch("http://localhost:3001/upload/", {
          method: "POST",
          body: formData,
        });


        if (!uploadRes.ok) {
          throw new Error("Image upload failed");
        }
  
        const uploadResult = await uploadRes.json();
        const uploadedFileName = uploadResult.fileName || uploadResult.name_file;
        const publicLinkRes = await fetch("http://localhost:3001/upload/public_link", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name_file: uploadedFileName }),
        });
  
        if (!publicLinkRes.ok) {
          throw new Error("Failed to retrieve public link");
        }
  
        const publicLinkResult = await publicLinkRes.json();
        publicImageUrl = publicLinkResult.publicUrl || publicLinkResult.url;
      }
  
      // 3. Now create event with public image URL
      const formattedData: Omit<Event, "id" | "createdAt"> = {
        ...eventData,
        imageUrl: publicImageUrl,
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
  
      toast.success("Event created successfully!");
      console.log("Created event:", result.event);
    } catch (error) {
      console.error("Submission error:", error);
      toast.error("Event creation failed.");
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
          <EventDetailsForm
            eventData={eventData}
            setEventData={setEventData}
            setStartTime={setStartTime}
            setEndTime={setEndTime}
            setTag={setTag} startTime={startTime as Date} endTime={endTime as Date} />
          <TicketsForm />
        </div>
      </div>

      <div className="flex justify-end">
        <Button type="submit">Create Event</Button>
      </div>
    </form>
  );
}
