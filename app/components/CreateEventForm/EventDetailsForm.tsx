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

interface EventDetailsFormProps {
  date?: Date;
  setDate: (date: Date) => void;
  setTag: (tag: string) => void;
}

const EventDetailsForm: React.FC<EventDetailsFormProps> = ({
  date,
  setDate,
  setTag,
}) => {
  const tags = ["technology", "education", "science", "talk show"];

  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="flex flex-col md:flex-row gap-4 w-full">
        <div className="flex flex-col gap-2 w-full md:w-1/2">
          <Label className="font-bold">Event Name</Label>
          <Input placeholder="Event Name" />
        </div>
        <div className="flex flex-col gap-2 w-full md:w-1/2">
          <Label className="font-bold">Event Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : "Pick a date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={(day) => day && setDate(day)}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <Label className="font-bold">Event Description</Label>
        <Textarea placeholder="Event Description" />
      </div>

      <div className="flex flex-col md:flex-row gap-4 w-full">
        <div className="flex flex-col gap-2 w-full md:w-1/2">
          <Label className="font-bold">Event Tag</Label>
          <Select onValueChange={(value) => setTag(value)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select tag" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Tags</SelectLabel>
                {tags.map((tag) => (
                  <SelectItem key={tag} value={tag}>
                    {tag}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col gap-2 w-full md:w-1/2">
          <Label className="font-bold">Event Location</Label>
          <Input placeholder="Event Location" />
        </div>
      </div>
    </div>
  );
};

export default EventDetailsForm;
