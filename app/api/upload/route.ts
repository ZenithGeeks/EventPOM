// /app/api/uploadPoster/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const formData = await req.formData();
    const file = formData.get("file");

    if (!(file instanceof File)) {
      return NextResponse.json({ error: "Invalid file" }, { status: 400 });
    }

    const uploadForm = new FormData();
    uploadForm.append("file", file);

    const uploadRes = await fetch(`${process.env.BACKEND_URL}/upload/`, {
      method: "POST",
      body: uploadForm,
    });

    const result = await uploadRes.json();

    if (!uploadRes.ok) {
      return NextResponse.json({ error: result.error || "Upload failed" }, { status: uploadRes.status });
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "Internal Server Error", detail: (error as Error).message }, { status: 500 });
  }
}
