import { PrismaClient } from "@prisma/client";
import HomePageClient from "@/components/HomePageClient";

const prisma = new PrismaClient();

export const revalidate = 60; // Revalidate every 60 seconds

export default async function Home() {
  // Fetch site settings
  let settings = await prisma.siteSettings.findFirst();
  
  if (!settings) {
    settings = await prisma.siteSettings.create({
      data: {}
    });
  }

  // Fetch featured services (e.g. first 3)
  const services = await prisma.service.findMany({
    take: 3,
    orderBy: { createdAt: "desc" },
    include: { category: true }
  });

  // Fetch testimonials
  const testimonials = await prisma.testimonial.findMany({
    where: { isActive: true },
    take: 3,
    orderBy: { createdAt: "desc" }
  });

  // Fetch specials
  const specials = await prisma.seasonalSpecial.findMany({
    orderBy: { createdAt: "asc" }
  });

  return (
    <HomePageClient 
      settings={settings}
      services={services}
      testimonials={testimonials}
      specials={specials}
    />
  );
}
