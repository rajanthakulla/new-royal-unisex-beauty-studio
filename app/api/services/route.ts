import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const DEFAULT_SERVICES = [
  {
    title: "Hydra-Radiance Facial",
    categoryName: "Facial",
    description: "Our signature botanical facials are tailored to your skin's unique rhythm, using cold-pressed oils and active minerals to restore luminosity.",
    price: 4500,
    image: "/gallery/salon-1.webp",
    slug: "facial-skin-care"
  },
  {
    title: "Hair Styling",
    categoryName: "Hair",
    description: "From architectural cuts to effortless waves, we craft styles that enhance your structural beauty.",
    price: 2800,
    image: "/gallery/salon-2.webp",
    slug: "hair-styling"
  },
  {
    title: "Bridal Makeup",
    categoryName: "Makeup",
    description: "Timeless elegance for your most significant moments. A personalized journey from trial to ceremony.",
    price: 15000,
    image: "/gallery/salon-3.webp",
    slug: "bridal-makeup"
  },
  {
    title: "Mehndi",
    categoryName: "Mehndi",
    description: "Traditional henna artistry reimagined for the modern aesthetic. Intricate patterns, lasting soul.",
    price: 1200,
    image: "/gallery/salon-4.webp",
    slug: "mehndi"
  },
  {
    title: "Nail Art",
    categoryName: "Nails",
    description: "Precision manicures and creative artistry that serves as an extension of your personal style.",
    price: 1500,
    image: "/gallery/salon-5.webp",
    slug: "nail-art"
  }
];

export async function GET() {
  try {
    let services = await prisma.service.findMany({
      orderBy: { createdAt: "desc" },
      include: { category: true }
    });

    // Auto-seed if database contains 0 services
    if (services.length === 0) {
      console.log("Seeding default categories and services...");
      
      for (const item of DEFAULT_SERVICES) {
        // Find or create category
        let category = await prisma.category.findFirst({
          where: { name: item.categoryName }
        });

        if (!category) {
          category = await prisma.category.create({
            data: {
              name: item.categoryName,
              slug: item.categoryName.toLowerCase().replace(/[^a-z0-9]/g, "-")
            }
          });
        }

        // Create service
        await prisma.service.create({
          data: {
            title: item.title,
            slug: item.slug,
            description: item.description,
            price: item.price,
            image: item.image,
            categoryId: category.id
          }
        });
      }

      // Re-fetch services
      services = await prisma.service.findMany({
        orderBy: { createdAt: "desc" },
        include: { category: true }
      });
    }

    return NextResponse.json(services);
  } catch (error: any) {
    console.error("Services GET API Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch services" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, description, price, image, categoryId } = body;

    if (!title || !description || price === undefined) {
      return NextResponse.json(
        { error: "Missing required fields (title, description, price)" },
        { status: 400 }
      );
    }

    // Generate unique slug
    const slug = title.toLowerCase().replace(/[^a-z0-9]/g, "-").replace(/-+/g, "-");

    const newService = await prisma.service.create({
      data: {
        title,
        slug,
        description,
        price: parseFloat(price),
        image: image || null,
        categoryId: categoryId || null
      }
    });

    return NextResponse.json({ success: true, service: newService });
  } catch (error: any) {
    console.error("Services POST API Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to create service" },
      { status: 500 }
    );
  }
}
