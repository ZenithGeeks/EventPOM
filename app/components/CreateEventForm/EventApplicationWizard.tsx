"use client";

import React, { useState } from "react";
import Steps from "./Steps";
import CreateEventForm from "./CreateEventForm";
import TicketsForm from "./TicketsForm";
import { Button } from "@/components/ui/button";

const steps = ["Create Event", "Create Tickets", "Submit Application"];

export default function EventApplicationWizard({ organizerId }: { organizerId: string }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [eventId, setEventId] = useState<string | null>("");

  const handleNext = () => setCurrentStep((prev) => prev + 1);
  const handleBack = () => setCurrentStep((prev) => prev - 1);
  console.log("eventId", eventId);
  return (
    <div className="px-6 py-10">
      <Steps currentStep={currentStep} steps={steps} />

      {currentStep === 1 && (
        <CreateEventForm
          organizerId={organizerId}
          onSuccess={(createdEventId: string) => {
            setEventId(createdEventId);
            handleNext();
          }}
        />
    
      )}

      {currentStep === 2 && eventId && (
        <TicketsForm
          eventId={eventId}
          onBack={handleBack}
          onNext={handleNext}
        />
      )}

      {currentStep === 3 && eventId && (
        <div className="flex flex-col gap-4 text-center">
          <h2 className="text-2xl font-bold mb-4">Application Submitted!</h2>
          <p>Your event application has been submitted successfully.</p>
          <p>Event ID: {eventId}</p>
          <Button onClick={() => setCurrentStep(1)}>Create Another Event</Button>
        </div>
      )}
    </div>
  );
}
