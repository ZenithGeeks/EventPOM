import { NextResponse, NextRequest } from "next/server";

const BACKEND = process.env.BACKEND_URL;

export async function GET() {
  try {
    const response = await fetch("http://localhost:3001/getTicket", {
      cache: "no-store",
    });

    const contentType = response.headers.get("content-type");

    if (!response.ok) {
      const errorText = await response.text();
      console.error("❌ Backend responded with error:", response.status, errorText);
      return new Response(JSON.stringify({ error: errorText }), {
        status: response.status,
        headers: { "Content-Type": "application/json" },
      });
    }

    // parse only if JSON
    if (contentType?.includes("application/json")) {
      const json = await response.json();
      return new Response(JSON.stringify(json), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    } else {
      // plain text fallback
      const text = await response.text();
      return new Response(JSON.stringify({ data: text }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

  } catch (error) {
    console.error("❌ Fetch to backend failed:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const res = await fetch(`${BACKEND}/tickets`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    })

    const data = await res.json()

    if (!res.ok) {
      return NextResponse.json({ error: data.error || "Failed to create ticket" }, { status: res.status })
    }

    return NextResponse.json(data)
  } catch (err) {
    return NextResponse.json({ error: err || "Unexpected error" }, { status: 500 })
  }
}
