import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const items = await prisma.galleryItem.findMany({
      orderBy: { createdAt: "desc" }
    });
    return NextResponse.json(items);
  } catch (error: any) {
    console.error("Gallery GET API Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch gallery items" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { url, type, caption, category } = body;

    if (!url) {
      return NextResponse.json({ error: "Missing required field: url" }, { status: 400 });
    }

    const newItem = await prisma.galleryItem.create({
      data: {
        url,
        type: type || "IMAGE",
        caption: caption || "",
        category: category || "General"
      }
    });

    return NextResponse.json({ success: true, item: newItem });
  } catch (error: any) {
    console.error("Gallery POST API Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to add gallery item" },
      { status: 500 }
    );
  }
}
