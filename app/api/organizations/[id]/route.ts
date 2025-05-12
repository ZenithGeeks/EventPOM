import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL = "http://localhost:3001";

export async function PUT(req: NextRequest, context: { params: { id: string } }) {
  const id = context.params.id;
  const body = await req.json();

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
    console.error("Organizer PUT error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
