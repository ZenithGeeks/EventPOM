import { NextResponse } from "next/server";

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:3000"; // Your Elysia backend

export async function POST(req: Request) {
  try {
    const body = await req.json(); // Read request body
    console.log(`${BACKEND_URL}/createEvent`);
    const response = await fetch(`${BACKEND_URL}/createEvent`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json({ success: false, error: data.error }, { status: response.status });
    }

    return NextResponse.json({ success: true, event: data.event }, { status: 201 });
  } catch (error) {
    console.error("Error creating event:", error);
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
  }
}
