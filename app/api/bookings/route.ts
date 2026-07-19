import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const bookings = await prisma.booking.findMany({
      orderBy: { date: "desc" },
      include: {
        service: true
      }
    });
    return NextResponse.json(bookings);
  } catch (error: any) {
    console.error("Booking GET API Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch bookings" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, serviceId, date, time, notes } = body;

    if (!name || !phone || !serviceId || !date || !time) {
      return NextResponse.json(
        { error: "Missing required fields (Name, Phone, Service, Date, Time)" },
        { status: 400 }
      );
    }

    // Combine date and time strings into a single Date object
    const bookingDateTime = new Date(`${date}T${time}:00`);

    const booking = await prisma.booking.create({
      data: {
        customerName: name,
        customerEmail: email || "",
        customerPhone: phone,
        serviceId: serviceId,
        date: bookingDateTime,
        notes: notes || "",
        status: "PENDING"
      }
    });

    return NextResponse.json({ success: true, bookingId: booking.id });
  } catch (error: any) {
    console.error("Booking API Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to create booking" },
      { status: 500 }
    );
  }
}
