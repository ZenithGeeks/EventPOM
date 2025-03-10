"use client";

import * as React from "react";
import PosterUpload from "./PosterUpload";
import EventDetailsForm from "./EventDetailsForm";
import TicketsForm from "./TicketsForm";

export default function CreateEventForm() {
  const [date, setDate] = React.useState<Date>();
  const [picture, setPicture] = React.useState<File>();

  return (
    <div className="flex flex-col gap-6 px-4 py-4">
      <div className="flex w-full pt-[7rem] text-4xl font-bold text-[#2A2A6D] justify-start items-start">
        Create Event
      </div>
      <div className="flex flex-col md:flex-row gap-12 pt-[1rem]">
        <div className="flex items-start justify-center md:justify-center">
          <PosterUpload picture={picture} setPicture={setPicture} />
        </div>
        <div className="flex-1">
          <EventDetailsForm date={date} setDate={setDate} />
          <TicketsForm />
        </div>
      </div>
    </div>
  );
}
