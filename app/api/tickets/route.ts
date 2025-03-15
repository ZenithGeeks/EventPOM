// app/api/tickets/route.ts
import { NextResponse } from "next/server";
import path from "path";
import fs from "fs";

export async function GET() {
  try {
    const tickets = path.join(process.cwd(), "mockdata", "tickets.json");
    const events = path.join(process.cwd(), "mockdata", "events.json");
    const eventsContent = fs.readFileSync(events, "utf-8");
    const eventsData = JSON.parse(eventsContent);
    const ticketContent = fs.readFileSync(tickets, "utf-8");
    const ticketsData = JSON.parse(ticketContent);
    // console.log("ticketsData", ticketsData);
    // console.log("eventsData", eventsData);
    ticketsData.forEach((ticket: any) => {
        const event = getEventById(ticket.eventId, eventsData);
        ticket.event = event;
        console.log("ticket", ticket);
    });


    if (!Array.isArray(ticketsData)) {
      throw new Error("tickets.json must contain an array of tickets!");
    }

    return NextResponse.json({
      success: true,
      data: ticketsData,
    });
  } catch (error) {
    console.error("Error reading tickets.json:", error);
    return NextResponse.json(
      { success: false, message: "Failed to load tickets" },
      { status: 500 }
    );
  }
}

function getEventById(id: number, events: any[]) {
  return events.find((event) => event.eventId === id);
}
