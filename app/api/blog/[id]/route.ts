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
    const { title, content, author, image, published } = body;

    const updateData: any = {};
    if (title !== undefined) {
      updateData.title = title;
      updateData.slug = title.toLowerCase().replace(/[^a-z0-9]/g, "-").replace(/-+/g, "-");
    }
    if (content !== undefined) updateData.content = content;
    if (author !== undefined) updateData.author = author;
    if (image !== undefined) updateData.image = image;
    if (published !== undefined) updateData.published = published;

    const updated = await prisma.blog.update({
      where: { id },
      data: updateData
    });

    return NextResponse.json({ success: true, blog: updated });
  } catch (error: any) {
    console.error("Blog PUT Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to update blog post" },
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

    await prisma.blog.delete({
      where: { id }
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Blog DELETE Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to delete blog post" },
      { status: 500 }
    );
  }
}
