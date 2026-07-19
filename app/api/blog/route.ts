import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const blogs = await prisma.blog.findMany({
      orderBy: { createdAt: "desc" }
    });
    return NextResponse.json(blogs);
  } catch (error: any) {
    console.error("Blogs GET Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch blog posts" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, content, author, image, published } = body;

    if (!title || !content || !author) {
      return NextResponse.json(
        { error: "Missing required fields (title, content, author)" },
        { status: 400 }
      );
    }

    // Generate unique slug
    const slug = title.toLowerCase().replace(/[^a-z0-9]/g, "-").replace(/-+/g, "-");

    const blog = await prisma.blog.create({
      data: {
        title,
        slug,
        content,
        author,
        image: image || null,
        published: published !== undefined ? published : false
      }
    });

    return NextResponse.json({ success: true, blog });
  } catch (error: any) {
    console.error("Blog POST Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to create blog post" },
      { status: 500 }
    );
  }
}
