import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL = "http://localhost:3001";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      name,
      phone,
      type,
      ApplicationDocument,
      status = "PENDING",
      userId,
      userData,
    } = body;

    if (!name || !phone || !type || !ApplicationDocument || !userId || !userData) {
      return NextResponse.json(
        { error: "Missing required fields." },
        { status: 400 }
      );
    }

    // Step 1: Create Organizer
    const createOrganizerRes = await fetch(`${BACKEND_URL}/organizers`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, phone, type, ApplicationDocument, status }),
    });

    const createOrganizerData = await createOrganizerRes.json();
    if (!createOrganizerRes.ok || createOrganizerData.error) {
      return NextResponse.json(
        { error: createOrganizerData.error || "Failed to create organizer." },
        { status: createOrganizerRes.status }
      );
    }

    const organizerId = createOrganizerData.organizer?.id;
    if (!organizerId) {
      return NextResponse.json(
        { error: "Organizer ID not returned from backend." },
        { status: 500 }
      );
    }

    // Step 2: Add User to Organizer
    const addUserRes = await fetch(`${BACKEND_URL}/organizer/${organizerId}/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId }),
    });

    const addUserData = await addUserRes.json();
    if (!addUserRes.ok || addUserData.error) {
      return NextResponse.json(
        { error: addUserData.error || "Failed to add user to organizer." },
        { status: addUserRes.status }
      );
    }

    // Step 3: Update User
    const updatedUserPayload = {
      name: userData.name ?? "",
      firstName: userData.firstName ?? "",
      lastName: userData.lastName ?? "",
      email: userData.email ?? "",
      emailVerified: userData.emailVerified ?? null,
      password: userData.password ?? "",
      phone: userData.phone ?? "",
      image: userData.image ?? "",
      dob: userData.dob ?? null,
      address: userData.address ?? "",
      gender: userData.gender ?? "",
      role: "ORGANIZER",
      organizerId: organizerId,
    };
    const updateUserRes = await fetch(`${BACKEND_URL}/users/${userId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedUserPayload),
    });

    const updateUserData = await updateUserRes.json();


    if (!updateUserRes.ok || updateUserData.error) {
      return NextResponse.json(
        { error: updateUserData.error || "Failed to update user." },
        { status: updateUserRes.status }
      );
    }

    return NextResponse.json({
      success: true,
      organizer: createOrganizerData.organizer,
    });
  } catch (err) {
    console.error("API Error:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Unexpected error occurred." },
      { status: 500 }
    );
  }
}
