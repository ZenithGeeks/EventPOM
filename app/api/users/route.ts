import { NextResponse } from "next/server";
import path from "path";
import fs from "fs";

export async function GET() {
  try {
    const usersPath = path.join(process.cwd(), "mockdata", "users.json");
    const content = fs.readFileSync(usersPath, "utf-8");
    const users = JSON.parse(content);

    return NextResponse.json({ success: true, data: users });
  } catch (error) {
    console.error("Error reading users.json:", error);
    return NextResponse.json({ success: false, message: "Failed to load users" }, { status: 500 });
  }
}
