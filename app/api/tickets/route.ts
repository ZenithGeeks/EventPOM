import { NextResponse } from "next/server";
import path from "path";
import fs from "fs";
import { Ticket, Event } from "@/types/models";

export async function GET() {
  try {
    const ticketsPath = path.join(process.cwd(), "mockdata", "tickets.json");
    const eventsPath = path.join(process.cwd(), "mockdata", "events.json");

    const eventsData = JSON.parse(fs.readFileSync(eventsPath, "utf-8"));
    const ticketsData = JSON.parse(fs.readFileSync(ticketsPath, "utf-8"));

    if (!Array.isArray(ticketsData)) {
      throw new Error("tickets.json must contain an array of tickets!");
    }

    const mappedTickets = ticketsData.map((ticket: Ticket) => ({
      ...ticket,
      event: getEventById(ticket.eventId, eventsData),
    }));

    return NextResponse.json({
      success: true,
      data: mappedTickets,
    });
  } catch (error) {
    console.error("Error reading tickets.json:", error);
    return NextResponse.json(
      { success: false, message: "Failed to load tickets" },
      { status: 500 }
    );
  }
}

function getEventById(eventId: string, events: Event[]) {
  return events.find((event) => event.id === eventId) || null;
}
