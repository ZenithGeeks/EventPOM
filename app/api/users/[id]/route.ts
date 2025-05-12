import { NextRequest } from "next/server";

const BACKEND_URL = "http://localhost:3001";

// Helper to extract [id] from URL
function extractIdFromPath(pathname: string): string | null {
  const segments = pathname.split("/");
  return segments[segments.length - 1] || null;
}

// ----------- PUT -------------
export async function PUT(req: NextRequest) {
  const id = extractIdFromPath(req.nextUrl.pathname);
  const body = await req.json();

  if (!id) {
    return new Response(JSON.stringify({ error: "Missing user ID" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const response = await fetch(`${BACKEND_URL}/users/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(`Backend error: ${response.status}`);
    }

    const data = await response.json();
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

// ----------- DELETE -------------
export async function DELETE(req: NextRequest) {
  const id = extractIdFromPath(req.nextUrl.pathname);

  if (!id) {
    return new Response(JSON.stringify({ error: "Missing user ID" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const res = await fetch(`${BACKEND_URL}/users/${id}`, { method: "DELETE" });

    if (!res.ok) {
      const msg = await res.text();
      throw new Error(msg || "Failed to delete user in backend.");
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(
      JSON.stringify({ error: err instanceof Error ? err.message : "Unknown error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

// ----------- GET -------------
export async function GET(req: NextRequest) {
  const id = extractIdFromPath(req.nextUrl.pathname);

  if (!id) {
    return new Response(JSON.stringify({ error: "Missing user ID" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const response = await fetch(`${BACKEND_URL}/users/${id}`);

    if (!response.ok) {
      throw new Error(`Backend error: ${response.status}`);
    }

    const data = await response.json();
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
