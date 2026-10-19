import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, mobile, locality, service, serviceItem, preferredDate, notes } = body;

    const errors = {};

    // Validate name
    if (!name || typeof name !== "string" || name.trim().length < 2) {
      errors.name = "Please provide a valid full name (minimum 2 characters).";
    }

    // Validate mobile (Indian 10-digit number format)
    const cleanMobile = (mobile || "").replace(/[^\d]/g, "");
    if (!cleanMobile || cleanMobile.length < 10) {
      errors.mobile = "Please provide a valid 10-digit mobile number.";
    }

    // Validate locality
    if (!locality || typeof locality !== "string" || locality.trim().length < 2) {
      errors.locality = "Please specify your locality or address area.";
    }

    // Validate service selection
    const allowedServices = ["test", "package", "help-choosing"];
    if (!service || !allowedServices.includes(service)) {
      errors.service = "Please select a valid diagnostic service.";
    }

    // Validate preferred date
    if (!preferredDate) {
      errors.preferredDate = "Please choose a preferred collection date.";
    }

    if (Object.keys(errors).length > 0) {
      return NextResponse.json(
        { success: false, errors },
        { status: 400 }
      );
    }

    // Sanitize and structure the verified booking request payload
    const bookingRecord = {
      id: `REQ-${Date.now()}`,
      receivedAt: new Date().toISOString(),
      name: name.trim().slice(0, 100),
      mobile: cleanMobile.slice(-10),
      locality: locality.trim().slice(0, 120),
      service,
      serviceItem: serviceItem ? String(serviceItem).slice(0, 100) : null,
      preferredDate,
      notes: notes ? String(notes).trim().slice(0, 300) : "",
    };

    // Log the request safely to server console (TODO: integrate lab SMS/Email/WhatsApp notification hook here)
    console.log("[Sanap Health Services] New Home Collection Request:", bookingRecord);

    return NextResponse.json({
      success: true,
      message: "Request received. The lab will contact you to confirm time, availability, price and preparation.",
      requestId: bookingRecord.id,
    });
  } catch (error) {
    console.error("[Booking API Error]:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error. Please call the lab directly." },
      { status: 500 }
    );
  }
}
