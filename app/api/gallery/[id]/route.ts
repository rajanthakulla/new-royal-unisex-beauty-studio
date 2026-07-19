import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    await prisma.galleryItem.delete({
      where: { id }
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Gallery DELETE Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to delete gallery item" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { url, type, caption, category } = body;

    const updatedItem = await prisma.galleryItem.update({
      where: { id },
      data: {
        url,
        type,
        caption,
        category
      }
    });

    return NextResponse.json(updatedItem);
  } catch (error: any) {
    console.error("Gallery PUT Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to update gallery item" },
      { status: 500 }
    );
  }
}
