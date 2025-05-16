// /app/api/public-link/route.ts
import { NextRequest, NextResponse } from "next/server";
const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:3001";

export async function POST(req: NextRequest) {
  const { fileName } = await req.json();
  if (!fileName) {
    return NextResponse.json({ error: "Missing fileName" }, { status: 400 });
  }

  const backendRes = await fetch(`${BACKEND_URL}/upload/public_link`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name_file: fileName }),
  });
  const backendData = await backendRes.json();

  if (backendRes.ok && backendData.data) {
    return NextResponse.json({ data: backendData.data }, { status: 200 });
  }
  return NextResponse.json(
    { error: backendData.error || "Failed to generate public link" },
    { status: backendRes.status }
  );
}
