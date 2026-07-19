import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const offers = await prisma.offer.findMany({
      orderBy: { createdAt: "desc" }
    });
    return NextResponse.json(offers);
  } catch (error: any) {
    console.error("Offers GET Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch offers" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, description, discount, validUntil, image, isActive } = body;

    if (!title || !description || !discount || !validUntil) {
      return NextResponse.json(
        { error: "Missing required fields (title, description, discount, validUntil)" },
        { status: 400 }
      );
    }

    const offer = await prisma.offer.create({
      data: {
        title,
        description,
        discount,
        validUntil: new Date(validUntil),
        image: image || null,
        isActive: isActive !== undefined ? isActive : true
      }
    });

    return NextResponse.json({ success: true, offer });
  } catch (error: any) {
    console.error("Offer POST Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to create offer" },
      { status: 500 }
    );
  }
}
