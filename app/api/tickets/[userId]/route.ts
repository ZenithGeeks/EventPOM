// app/api/tickets/[userId]/route.ts
export async function GET(req: Request, { params }: { params: { userId: string } }) {
    try {
      const res = await fetch(`http://localhost:3001/ticketToUsers/${params.userId}`, {
        cache: "no-store",
      });
  
      const text = await res.text();
  
      if (!res.ok) {
        console.error("Backend error:", res.status, text);
        return new Response(
          JSON.stringify({ error: text }),
          { status: res.status, headers: { "Content-Type": "application/json" } }
        );
      }
  
      return new Response(text, {
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
  