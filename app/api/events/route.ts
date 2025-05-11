import { NextResponse } from "next/server";

const BACKEND_URL = process.env.BACKEND_URL

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

export async function GET() {
    try {
      const response = await fetch(`${BACKEND_URL}/getEvents`, {
        cache: "no-store",
      });
  
      if (!response.ok) {
        throw new Error(`Failed to fetch: ${response.status}`);
      }
  
      const data = await response.json();
  
      return new Response(JSON.stringify(data), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      return new Response(
        JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
        {
          status: 500,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }
  }
  