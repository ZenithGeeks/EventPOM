export async function DELETE(req: Request) {
  try {
    const body = await req.json();
    const { userId, organizationId } = body;

    if (!userId || !organizationId) {
      return new Response(JSON.stringify({ error: "userId and organizationId are required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const response = await fetch("http://localhost:3001/organizer/deleteMember", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, organizationId }),
    });

    if (!response.ok) {
      throw new Error(`Failed to delete: ${response.status}`);
    }

    const data = await response.json();
    return new Response(JSON.stringify(data), {
      status: 200,
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
