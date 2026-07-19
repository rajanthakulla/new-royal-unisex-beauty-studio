import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const specials = await prisma.seasonalSpecial.findMany({
      orderBy: { createdAt: "asc" }
    });
    return NextResponse.json(specials);
  } catch (error: any) {
    console.error("Specials GET API Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch seasonal specials" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const count = await prisma.seasonalSpecial.count();
    if (count >= 3) {
      return NextResponse.json(
        { error: "Maximum limit reached. Only up to 3 seasonal specials can be added at a time." },
        { status: 400 }
      );
    }

    const body = await request.json();
    const { tag, title, description, price, bookingLink } = body;

    if (!tag || !title || !description || price === undefined || !bookingLink) {
      return NextResponse.json(
        { error: "Missing required fields (tag, title, description, price, bookingLink)" },
        { status: 400 }
      );
    }

    const newSpecial = await prisma.seasonalSpecial.create({
      data: {
        tag,
        title,
        description,
        price: parseFloat(price),
        bookingLink
      }
    });

    return NextResponse.json({ success: true, special: newSpecial });
  } catch (error: any) {
    console.error("Specials POST API Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to create seasonal special" },
      { status: 500 }
    );
  }
}
