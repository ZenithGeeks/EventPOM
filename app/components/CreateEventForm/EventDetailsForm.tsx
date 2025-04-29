"use client";

import * as React from "react";
import { format } from "date-fns";
import { CalendarIcon } from "@heroicons/react/24/solid";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { EventStatus } from "@/types/models";
import { useEffect, useState } from "react";
import { get } from "http";
import { Order, Ticket } from "@/types/models";
interface EventDetailsFormProps {
  eventData: EventData;
  setEventData: React.Dispatch<React.SetStateAction<EventData>>;
  setTag: (categoryId: string) => void;
  startTime: Date;
  setStartTime: (time: Date) => void;
  endTime: Date;
  setEndTime: (time: Date) => void;

}
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

interface Category {
  id: number;
  name: string;
}

const EventDetailsForm: React.FC<EventDetailsFormProps> = ({
  eventData,
  setEventData,
  setTag,
  startTime,
  setStartTime,
  endTime,
  setEndTime,
}) => {
  const [categories, setCategories] = useState<Category[]>([]);
  
  useEffect(()=> {
    const getCategories = async () => {
      const res = await fetch("/api/category");
      const result = await res.json();
      if(result) {
        setCategories(result.categories);
      }
      else{
        console.error("Failed to fetch categories");
      }
    }
      getCategories();

  },[])
  
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setEventData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTimeChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    date: Date,
    setDate: (date: Date) => void
  ) => {
    const [hours, minutes] = e.target.value.split(":").map(Number);
    const updatedDate = new Date(date);
    updatedDate.setHours(hours, minutes);
    setDate(updatedDate);
  };

  return (
    <div className="flex flex-col gap-6 w-full">
      <Label className="font-bold">Event Name</Label>
      <Input
        name="title"
        value={eventData.title}
        onChange={handleInputChange}
        placeholder="Event Name"
      />

      <Label className="font-bold">Event Description</Label>
      <Textarea
        name="description"
        value={eventData.description}
        onChange={handleInputChange}
        placeholder="Event Description"
      />

      <Label className="font-bold">Event Category</Label>
      <Select onValueChange={(e) => setTag(e)} disabled={categories?.length === 0}>
  <SelectTrigger className="w-full">
    <SelectValue placeholder="Select a category" />
  </SelectTrigger>
  <SelectContent>
    <SelectGroup>
      <SelectLabel>Categories</SelectLabel>
      {categories?.length > 0 ? (
        categories.map((tag) => (
          <SelectItem key={tag.id} value={tag.id.toString()}>
            {tag.name}
          </SelectItem>
        ))
      ) : (
        <div className="p-2 text-sm text-muted-foreground">
          No categories available
        </div>
      )}
    </SelectGroup>
  </SelectContent>
</Select>

      <Label className="font-bold">Start Date & Time</Label>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">
            <CalendarIcon className="mr-2 h-4 w-4" />
            {format(startTime, "PPP")}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={startTime}
            onSelect={(date) => date && setStartTime(date)}
            initialFocus
          />
        </PopoverContent>
      </Popover>
      <Input
        type="time"
        onChange={(e) => handleTimeChange(e, startTime, setStartTime)}
      />

      <Label className="font-bold">End Date & Time</Label>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">
            <CalendarIcon className="mr-2 h-4 w-4" />
            {format(endTime, "PPP")}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={endTime}
            onSelect={(date) => date && setEndTime(date)}
            initialFocus
          />
        </PopoverContent>
      </Popover>
      <Input
        type="time"
        onChange={(e) => handleTimeChange(e, endTime, setEndTime)}
      />

      <Label className="font-bold">Event Location</Label>
      <Input
        name="location"
        value={eventData.location}
        onChange={handleInputChange}
        placeholder="Event Location"
      />
    </div>
  );
};

export default EventDetailsForm;
