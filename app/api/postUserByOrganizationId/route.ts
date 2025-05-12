export async function POST(req: Request) {
  try {
    const body = await req.json();
    const userId = body.userID;
    const organizerId = body.organizerId;
    const response = await fetch(
      `http://localhost:3001/organizer/${organizerId}/users`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: userId }),
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to post: ${response.status}`);
    }

    const data = await response.json();
    return new Response(JSON.stringify(data), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: error instanceof Error ? error.message : "Unknown error",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
