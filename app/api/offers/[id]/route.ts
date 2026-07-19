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
    const { title, description, discount, validUntil, image, isActive } = body;

    const updateData: any = {};
    if (title !== undefined) updateData.title = title;
    if (description !== undefined) updateData.description = description;
    if (discount !== undefined) updateData.discount = discount;
    if (validUntil !== undefined) updateData.validUntil = new Date(validUntil);
    if (image !== undefined) updateData.image = image;
    if (isActive !== undefined) updateData.isActive = isActive;

    const updated = await prisma.offer.update({
      where: { id },
      data: updateData
    });

    return NextResponse.json({ success: true, offer: updated });
  } catch (error: any) {
    console.error("Offer PUT Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to update offer" },
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

    await prisma.offer.delete({
      where: { id }
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Offer DELETE Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to delete offer" },
      { status: 500 }
    );
  }
}
