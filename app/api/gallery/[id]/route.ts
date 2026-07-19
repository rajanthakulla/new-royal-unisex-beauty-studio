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
