import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const id = req.nextUrl.pathname.split("/").at(-2); // Extract [id] from `/users/[id]/ping`

  if (!id || id === "false") {
    return new Response(JSON.stringify({ error: "Invalid or missing user ID" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const response = await fetch(`http://localhost:3001/users/${id}/ping`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({}),
      cache: "no-store",
    });

    if (!response.ok) {
      const text = await response.text();
      throw new Error(text);
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
