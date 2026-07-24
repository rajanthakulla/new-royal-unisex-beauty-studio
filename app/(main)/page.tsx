import { PrismaClient } from "@prisma/client";
import HomePageClient from "@/components/HomePageClient";

const prisma = new PrismaClient();

export const revalidate = 60; // Revalidate every 60 seconds

export default async function Home() {
  // Fetch site settings
  let settings = null;
  try {
    settings = await prisma.siteSettings.findFirst();
  } catch (err) {
    console.error("Database connection failed for settings:", err);
  }
  
  if (!settings) {
    settings = {
      id: "default",
      heroTitle: "Best Unisex Salon",
      heroSubtitle: "in New Baneshwor Kathmandu",
      heroDescription: "Professional hair, beauty, and makeup services...",
      contactPhone: "+977 981-3451412",
      whatsappNumber: "9779813451412",
      address: "M8RP+CCR, Kathmandu 44600",
      googleMapsUrl: "https://maps.google.com/?q=M8RP%2BCCR,+Kathmandu+44600",
      businessHours: "Everyday 9:00 AM - 8:00 PM",
      facebookUrl: "https://www.facebook.com/NewRoyalBeautysalon12345/",
      instagramUrl: "https://www.instagram.com/nrbs_official/",
      tiktokUrl: "https://www.tiktok.com/@newroyalbeautysalon",
      updatedAt: new Date(),
    } as any;
  }

  // Fetch featured services
  let dbServices: any[] = [];
  try {
    dbServices = await prisma.service.findMany({
      take: 3,
      orderBy: { createdAt: "desc" },
      include: { category: true }
    });
  } catch (err) {
    console.error("Database connection failed for services:", err);
  }

  const fallbackServices = [
    {
      id: "fs1",
      title: "Signature Royal Haircut",
      slug: "hair-styling",
      description: "Includes consultation, head massage, and bespoke styling.",
      price: 2800,
      category: { name: "Hair Artistry" }
    },
    {
      id: "fs2",
      title: "Hydra-Radiance Facial",
      slug: "facial-skin-care",
      description: "Deep infusion treatment for instant clinical glow.",
      price: 4500,
      category: { name: "Dermal Radiance" }
    },
    {
      id: "fs3",
      title: "Bridal Makeup Glow",
      slug: "bridal-makeup",
      description: "Timeless elegance for your most significant moments.",
      price: 15000,
      category: { name: "Bridal Makeup" }
    }
  ];

  const services = dbServices.length > 0 ? dbServices : fallbackServices;

  // Fetch testimonials
  let dbTestimonials: any[] = [];
  try {
    dbTestimonials = await prisma.testimonial.findMany({
      where: { isActive: true },
      take: 3,
      orderBy: { createdAt: "desc" }
    });
  } catch (err) {
    console.error("Database connection failed for testimonials:", err);
  }

  const fallbackTestimonials = [
    {
      id: "ft1",
      name: "Sabina Shrestha",
      role: "Bride",
      content: "The absolute best bridal makeup experience in Kathmandu. Sita Sharma made me feel like royalty on my wedding day. The makeup lasted all night!",
      rating: 5,
      isActive: true,
      createdAt: new Date()
    },
    {
      id: "ft2",
      name: "Roshani Devkota",
      role: "Regular Client",
      content: "I have been coming here for Hydra-Facials for the past year. The dermal therapists are certified and very gentle. My skin has never looked healthier.",
      rating: 5,
      isActive: true,
      createdAt: new Date()
    },
    {
      id: "ft3",
      name: "Alisha Gurung",
      role: "Regular Client",
      content: "Their Nail Art is next level! Extremely precise patterns and very sanitary tools. Highly recommend Priya for nails.",
      rating: 5,
      isActive: true,
      createdAt: new Date()
    }
  ];

  const testimonials = dbTestimonials.length > 0 ? dbTestimonials : fallbackTestimonials;

  // Fetch specials
  let dbSpecials: any[] = [];
  try {
    dbSpecials = await prisma.seasonalSpecial.findMany({
      orderBy: { createdAt: "asc" }
    });
  } catch (err) {
    console.error("Database connection failed for specials:", err);
  }

  const fallbackSpecials = [
    {
      id: "fsp1",
      tag: "Monsoon Special",
      title: "Monsoon Hair Hydration",
      description: "Bespoke hair spa treatment combined with an intensive anti-frizz mask and a luxury blow-dry.",
      price: 4900,
      bookingLink: "/book",
      createdAt: new Date()
    },
    {
      id: "fsp2",
      tag: "Festival Glow",
      title: "Royal Facial & Dermal Radiance",
      description: "Our signature clinical hydra-facial coupled with a relaxing head massage and organic tan removal.",
      price: 8900,
      bookingLink: "/book",
      createdAt: new Date()
    },
    {
      id: "fsp3",
      tag: "Bridal Special",
      title: "Complete Queen Makeover",
      description: "Professional high-definition bridal makeup trial, deluxe pedicure, and ultimate hair styling prep.",
      price: 15000,
      bookingLink: "/book",
      createdAt: new Date()
    }
  ];

  const rawSpecials = dbSpecials.length > 0 ? dbSpecials : fallbackSpecials;
  const specials = rawSpecials.map(special => ({
    ...special,
    price: special.price < 500 ? special.price * 100 : special.price
  }));

  return (
    <HomePageClient 
      settings={settings}
      services={services as any}
      testimonials={testimonials as any}
      specials={specials as any}
    />
  );
}
