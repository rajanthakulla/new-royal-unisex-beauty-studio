import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { tag, title, description, price, bookingLink } = body;

    const updateData: any = {};
    if (tag !== undefined) updateData.tag = tag;
    if (title !== undefined) updateData.title = title;
    if (description !== undefined) updateData.description = description;
    if (price !== undefined) updateData.price = parseFloat(price);
    if (bookingLink !== undefined) updateData.bookingLink = bookingLink;

    const updated = await prisma.seasonalSpecial.update({
      where: { id },
      data: updateData
    });

    return NextResponse.json({ success: true, special: updated });
  } catch (error: any) {
    console.error("Special PUT Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to update seasonal special" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    await prisma.seasonalSpecial.delete({
      where: { id }
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Special DELETE Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to delete seasonal special" },
      { status: 500 }
    );
  }
}
