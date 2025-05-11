"use client";

import * as React from "react";
import { useEffect, useState } from "react";
import PosterUpload from "./PosterUpload";
import EventDetailsForm from "./EventDetailsForm";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";

interface Category {
  id: number;
  name: string;
}

export default function CreateEventForm({
  organizerId,
  onSuccess,
}: {
  organizerId: string;
  onSuccess: (eventId: string) => void;
}) {
  const [picture, setPicture] = useState<File | null>(null);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [endTime, setEndTime] = useState<Date | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [eventData, setEventData] = useState({
    title: "",
    categoryId: "",
    description: "",
    location: "",
    imageUrl: "",
    startTime: null as Date | null,
    endTime: null as Date | null,
    organizerId: organizerId,
  });

  useEffect(() => {
    fetch("http://localhost:3001/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data.categories))
      .catch((err) => console.error("Failed to fetch categories:", err));
  }, []);

  useEffect(() => {
    setEventData((prev) => ({
      ...prev,
      startTime,
      endTime,
    }));
  }, [picture, startTime, endTime]);

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    if (picture) {
    const formData = new FormData();
    formData.append("file", picture);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const imageResult = await res.json();
    console.log("Image Result:", imageResult);

    if (!res.ok) throw new Error(imageResult.error || "Upload failed");
    const realImageUrl = `http://localhost:9000/eventpom-bucket/${imageResult.fileName}`;

    const payload = {
      ...eventData,
      imageUrl: realImageUrl,
      startTime: startTime ?? new Date(),
      endTime: endTime ?? new Date(),
    };

    const response = await fetch("/api/events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const result = await response.json();
    if (!response.ok) throw new Error(result.error || "Failed to create event");

    toast.success("Event created successfully!");
    onSuccess(result.event.id);
    }
  } catch (err) {
    console.error("Create Event Error:", err);
    alert("Failed to create event.");
  }
};


  return (
    <form className="flex flex-col gap-14 pt-10 px-4" onSubmit={handleSubmit}>
      <h1 className="text-3xl font-bold text-[#2A2A6D]">Create Event</h1>
     <div className="grid grid-cols-1 lg:grid-cols-3 gap-32 w-full">
 <div className="w-full max-w-sm">
  <PosterUpload picture={picture} setPicture={setPicture} />
</div>
  <div className="col-span-1 lg:col-span-2">
    <EventDetailsForm
      startTime={startTime ?? undefined}
      endTime={endTime ?? undefined}
      setstartTime={setStartTime}
      setendTime={setEndTime}
      settitle={(title) => setEventData((prev) => ({ ...prev, title }))}
      setdescription={(desc) => setEventData((prev) => ({ ...prev, description: desc }))}
      setlocation={(loc) => setEventData((prev) => ({ ...prev, location: loc }))}
      setstatus={() => {}}
      tags={categories}
      setCategoryId={(id) => setEventData((prev) => ({ ...prev, categoryId: id }))}
      setTag={() => {}}
      settypeId={() => {}}
    />
  </div>
</div>

      <div className="flex justify-end">
        <Button type="submit" className="px-8 py-2 text-lg">
          Create Event
        </Button>
      </div>
    </form>
  );
}
