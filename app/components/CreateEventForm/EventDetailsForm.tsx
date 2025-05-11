"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import LocationSearch from "./LocationSearch";

interface Tag {
  id: number;
  name: string;
}

interface EventDetailsFormProps {
  startTime?: Date;
  endTime?: Date;
  setstartTime: (startTime: Date) => void;
  setendTime: (endTime: Date) => void;
  setTag: (tag: string) => void;
  settitle: (title: string) => void;
  setdescription: (description: string) => void;
  setlocation: (location: string) => void;
  settypeId: (typeId: string) => void;
  setstatus: (status: string) => void;
  setpicture?: (file: File | null) => void;
  tags: Tag[];
  setCategoryId: (id: string) => void;
}

const EventDetailsForm: React.FC<EventDetailsFormProps> = ({
  startTime,
  endTime,
  setstartTime,
  setendTime,
  setCategoryId,
  setdescription,
  settitle,
  setlocation,
  tags,
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
      {/* Event Name */}
      <div className="flex flex-col gap-2">
        <Label className="text-sm font-semibold text-muted-foreground">Event Name</Label>
        <Input placeholder="e.g. Tech Future Summit" onChange={(e) => settitle(e.target.value)} />
      </div>

      {/* Location */}
      <div className="flex flex-col gap-2 col-span-2">
      <Label className="text-sm font-semibold text-muted-foreground">Location</Label>
      <LocationSearch setLocation={setlocation} />
    </div>

      {/* Start Time */}
      <div className="flex flex-col gap-2">
        <Label className="text-sm font-semibold text-muted-foreground">Start Time</Label>
        <DatePicker
          selected={startTime}
          onChange={(date: Date | null) => date && setstartTime(date)}
          showTimeSelect
          dateFormat="Pp"
          placeholderText="Pick start date & time"
          className={cn(
            "w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          )}
        />
      </div>

      {/* End Time */}
      <div className="flex flex-col gap-2">
        <Label className="text-sm font-semibold text-muted-foreground">End Time</Label>
        <DatePicker
          selected={endTime}
          onChange={(date: Date | null) => date && setendTime(date)}
          showTimeSelect
          dateFormat="Pp"
          placeholderText="Pick end date & time"
          className={cn(
            "w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          )}
        />
      </div>

      {/* Category Dropdown */}
      <div className="flex flex-col gap-2">
        <Label className="text-sm font-semibold text-muted-foreground">Category</Label>
        <Select onValueChange={(id) => setCategoryId(id)}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Categories</SelectLabel>
              {Array.isArray(tags) && tags.length > 0 ? (
                  tags.map((tag) => (
                    <SelectItem key={tag.id} value={tag.id.toString()}>
                      {tag.name}
                    </SelectItem>
                  ))
                ) : (
                  <SelectItem disabled value="0">
                    No categories available
                  </SelectItem>
                )}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      {/* Description - full width */}
      <div className="flex flex-col gap-2 md:col-span-2">
        <Label className="text-sm font-semibold text-muted-foreground">Description</Label>
        <Textarea
          placeholder="Tell us about your event..."
          rows={4}
          onChange={(e) => setdescription(e.target.value)}
        />
      </div>
    </div>
  );
};

export default EventDetailsForm;
