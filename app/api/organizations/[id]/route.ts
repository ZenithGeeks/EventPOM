import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL = "http://localhost:3001";

export async function PUT(req: NextRequest) {
  const id = req.nextUrl.pathname.split("/").pop();
  const body = await req.json();

  if (!id) {
    return NextResponse.json({ error: "Missing ID" }, { status: 400 });
  }

  try {
    const res = await fetch(`${BACKEND_URL}/organizers/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await res.json();

    if (!res.ok) throw new Error(data.error || "Failed to update organizer");

    return NextResponse.json({ success: true, organizer: data.organizer });
  } catch (err) {
    return NextResponse.json({ error: err}, { status: 500 });
  }
}
