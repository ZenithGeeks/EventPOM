// app/api/dashboard/[organizerId]/route.ts
import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { organizerId: string } }
) {
  const { organizerId } = params;
    console.log("Organizer ID:", organizerId);
  try {
    const res = await fetch(`${process.env.BACKEND_URL}/organization/${organizerId}/dashboard`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store", // Disable caching for real-time updates
    });

    if (!res.ok) {
      return new Response(
        JSON.stringify({ error: "Failed to fetch dashboard data" }),
        { status: res.status }
      );
    }

    const data = await res.json();
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error }), {
      status: 500,
    });
  }
}
