export async function GET(
  req: Request,
  context: { params: { id: string } }
) {
  try {
    const { id } = context.params; // ✅ This is now safe

    const response = await fetch(`http://localhost:3001/user/${id}/organizers`, {
      cache: "no-store", // always fresh data
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.status}`);
    }

    const data = await response.json();
    console.log("Response from backend:", data);
    return new Response(JSON.stringify(data.organizers ?? data), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: error instanceof Error ? error.message : "Unknown error",
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
