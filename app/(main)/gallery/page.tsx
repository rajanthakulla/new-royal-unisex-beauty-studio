import { PrismaClient } from "@prisma/client";
import PageHeader from "@/components/PageHeader";
import GalleryTabs from "@/components/GalleryTabs";

const prisma = new PrismaClient();

export const revalidate = 60; // Revalidate every 60 seconds

export default async function GalleryPage() {
  let dbItems: any[] = [];
  try {
    dbItems = await prisma.galleryItem.findMany({
      orderBy: { createdAt: "desc" }
    });
  } catch (err) {
    console.error("Gallery query failed:", err);
  }

  // Gorgeous high-end curated fallbacks in case the DB is empty
  const fallbackItems = [
    {
      id: "fb1",
      url: "/gallery/salon-2.webp",
      type: "IMAGE",
      caption: "Balayage Highlights Transformation",
      category: "Hair"
    },
    {
      id: "fb2",
      url: "/gallery/salon-3.webp",
      type: "IMAGE",
      caption: "Royal Saree Draping & Styling",
      category: "Bridal"
    },
    {
      id: "fb3",
      url: "/gallery/salon-4.webp",
      type: "IMAGE",
      caption: "Gold Glow Bridal Makeover",
      category: "Bridal"
    },
    {
      id: "fb4",
      url: "/gallery/salon-5.webp",
      type: "IMAGE",
      caption: "Luxury Nail Extension & Art",
      category: "Nails"
    },
    {
      id: "fb5",
      url: "/gallery/salon-6.webp",
      type: "IMAGE",
      caption: "Creative Acrylic Extension Detail",
      category: "Nails"
    },
    {
      id: "fb6",
      url: "/gallery/salon-7.webp",
      type: "IMAGE",
      caption: "Advanced Keratin Smoothing Treatment",
      category: "Hair"
    }
  ];

  const galleryItems = dbItems.length > 0 ? dbItems.map(item => ({
    id: item.id,
    url: item.url,
    type: item.type,
    caption: item.caption || "Salon Transformation",
    category: item.category || "General"
  })) : fallbackItems;

  return (
    <main className="pb-24">
      <PageHeader 
        title="Visual Gallery" 
        subtitle="Explore our catalog of custom hairstyling, lash extensions, nail art, and bridal glow."
      />
      
      <section className="px-6 md:px-16 lg:px-20 w-[92%] max-w-[1200px] mx-auto py-16">
        <GalleryTabs items={galleryItems} />
      </section>
    </main>
  );
}