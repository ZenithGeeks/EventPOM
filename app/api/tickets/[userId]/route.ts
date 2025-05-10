// app/api/tickets/[userId]/route.ts
import { NextResponse } from "next/server";

const BACKEND = process.env.BACKEND_URL;

export async function GET({
    params,
  }: {
    params: { userId: string };
  }) {
    const { userId } = params;
    const BACKEND = process.env.BACKEND_URL ?? "http://localhost:3001";
  
    try {
      const response = await fetch(
        `${BACKEND}/ticketToUsers/${userId}`,
        { cache: "no-store" }
      );
  
      // If the backend didn’t return 2xx, forward its status & text
      if (!response.ok) {
        const text = await response.text();
        return new Response(
          JSON.stringify({ error: `Upstream ${response.status}: ${text}` }),
          {
            status: response.status,
            headers: { "Content-Type": "application/json" },
          }
        );
      }
  
      // Parse the Elysia payload { success: boolean; data: Ticket[] }
      const payload = await response.json();
  
      // Always return 200 as long as the fetch itself succeeded,
      // and wrap only the "data" array for your component.
      return new Response(
        JSON.stringify({ data: payload.data ?? [] }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }
      );
    } catch (err: any) {
      // Catch network errors, JSON parse errors, etc.
      return new Response(
        JSON.stringify({
          error: err?.message ?? "Unknown proxy error",
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
  }
  