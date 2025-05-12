import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
  const url = req.nextUrl;
  const eventId = url.pathname.split("/").pop(); // extract [id] from URL
  const body = await req.json();

  if (!eventId) {
    return NextResponse.json({ error: "Missing event ID" }, { status: 400 });
  }

  try {
    const res = await fetch(`http://localhost:3001/updateEvent/${eventId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      throw new Error(`Failed to update event: ${res.status}`);
    }

    const data = await res.json();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
