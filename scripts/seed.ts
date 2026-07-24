import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding Neon database...");

  // 1. Create Admin User
  const hashedPassword = await bcrypt.hash("admin123", 10);
  const admin = await prisma.user.upsert({
    where: { email: "admin@newroyal.com" },
    update: {},
    create: {
      email: "admin@newroyal.com",
      name: "Admin User",
      password: hashedPassword,
      role: "ADMIN",
    },
  });
  console.log("Admin seeded:", admin.email);

  // 2. Create Default Site Settings
  const settingsCount = await prisma.siteSettings.count();
  if (settingsCount === 0) {
    const settings = await prisma.siteSettings.create({
      data: {
        heroTitle: "Best Unisex Salon",
        heroSubtitle: "in New Baneshwor Kathmandu",
        heroDescription: "Professional hair, beauty, and makeup services...",
        contactPhone: "+977 981-3451412",
        whatsappNumber: "9779813451412",
        address: "New Baneshwor (Near Baneshwor Chowk), Kathmandu 44600",
        googleMapsUrl: "https://maps.google.com/?q=M8RP%2BCCR,+Kathmandu+44600",
        businessHours: "Everyday 9:00 AM - 8:00 PM",
        facebookUrl: "https://www.facebook.com/NewRoyalBeautysalon12345/",
        instagramUrl: "https://www.instagram.com/nrbs_official/",
        tiktokUrl: "https://www.tiktok.com/@newroyalbeautysalon",
      },
    });
    console.log("Default site settings created!", settings);
  }

  // 3. Seed Categories
  const categories = [
    { name: "Hair Artistry", slug: "hair" },
    { name: "Dermal Radiance", slug: "skin" },
    { name: "Bridal Makeup", slug: "bridal" },
    { name: "Mehndi", slug: "mehndi" },
    { name: "Nail Art", slug: "nails" },
  ];

  const dbCategories: Record<string, any> = {};
  for (const cat of categories) {
    const dbCat = await prisma.category.upsert({
      where: { slug: cat.slug },
      update: {},
      create: cat,
    });
    dbCategories[cat.slug] = dbCat;
    console.log(`Category Ensured: ${cat.name}`);
  }

  // 4. Seed Services (curated from frontend fallbacks)
  const defaultServices = [
    {
      title: "Facial & Skin Care",
      slug: "facial-skin-care",
      description: "Our signature botanical facials are tailored to your skin's unique rhythm, using cold-pressed oils and active minerals to restore luminosity.",
      price: 4500,
      categoryId: dbCategories["skin"].id,
    },
    {
      title: "Hair Styling",
      slug: "hair-styling",
      description: "From architectural cuts to effortless waves, we craft styles that enhance your structural beauty.",
      price: 2800,
      categoryId: dbCategories["hair"].id,
    },
    {
      title: "Bridal Makeup",
      slug: "bridal-makeup",
      description: "Timeless elegance for your most significant moments. A personalized journey from trial to ceremony.",
      price: 15000,
      categoryId: dbCategories["bridal"].id,
    },
    {
      title: "Mehndi",
      slug: "mehndi",
      description: "Traditional henna artistry reimagined for the modern aesthetic. Intricate patterns, lasting soul.",
      price: 1200,
      categoryId: dbCategories["mehndi"].id,
    },
    {
      title: "Nail Art",
      slug: "nail-art",
      description: "Precision manicures and creative artistry that serves as an extension of your personal style.",
      price: 1500,
      categoryId: dbCategories["nails"].id,
    },
  ];

  for (const service of defaultServices) {
    await prisma.service.upsert({
      where: { slug: service.slug },
      update: {
        description: service.description,
        price: service.price,
        categoryId: service.categoryId,
      },
      create: service,
    });
    console.log(`Service Ensured: ${service.title}`);
  }

  // 5. Seed Offers
  const offerCount = await prisma.offer.count();
  if (offerCount === 0) {
    await prisma.offer.create({
      data: {
        title: "Bridal Trial Special",
        description: "Get 50% off your bridal trial session when you book your wedding date with us.",
        discount: "50% OFF",
        validUntil: new Date("2026-12-31T00:00:00.000Z"),
      },
    });
    console.log("Seeded Bridal Trial Offer.");
  }

  // 6. Seed Seasonal Specials
  const specialsCount = await prisma.seasonalSpecial.count();
  if (specialsCount === 0) {
    await prisma.seasonalSpecial.createMany({
      data: [
        {
          tag: "Monsoon Special",
          title: "Monsoon Hair Hydration",
          description: "Bespoke hair spa treatment combined with an intensive anti-frizz mask and a luxury blow-dry.",
          price: 49,
          bookingLink: "/book",
        },
        {
          tag: "Festival Glow",
          title: "Royal Facial & Dermal Radiance",
          description: "Our signature clinical hydra-facial coupled with a relaxing head massage and organic tan removal.",
          price: 89,
          bookingLink: "/book",
        },
        {
          tag: "Bridal Special",
          title: "Complete Queen Makeover",
          description: "Professional high-definition bridal makeup trial, deluxe pedicure, and ultimate hair styling prep.",
          price: 150,
          bookingLink: "/book",
        },
      ],
    });
    console.log("Seeded 3 Seasonal Specials.");
  }

  // 7. Seed Gallery Items (curated from frontend fallbacks)
  const fallbackGalleryItems = [
    {
      url: "/gallery/salon-2.webp",
      type: "IMAGE",
      caption: "Balayage Highlights Transformation",
      category: "Hair",
    },
    {
      url: "/gallery/salon-3.webp",
      type: "IMAGE",
      caption: "Royal Saree Draping & Styling",
      category: "Bridal",
    },
    {
      url: "/gallery/salon-4.webp",
      type: "IMAGE",
      caption: "Gold Glow Bridal Makeover",
      category: "Bridal",
    },
    {
      url: "/gallery/salon-5.webp",
      type: "IMAGE",
      caption: "Luxury Nail Extension & Art",
      category: "Nails",
    },
    {
      url: "/gallery/salon-6.webp",
      type: "IMAGE",
      caption: "Creative Acrylic Extension Detail",
      category: "Nails",
    },
    {
      url: "/gallery/salon-7.webp",
      type: "IMAGE",
      caption: "Advanced Keratin Smoothing Treatment",
      category: "Hair",
    },
  ];

  for (const item of fallbackGalleryItems) {
    const exists = await prisma.galleryItem.findFirst({
      where: { url: item.url },
    });
    if (!exists) {
      await prisma.galleryItem.create({ data: item });
      console.log(`Seeded Gallery Item: ${item.caption}`);
    }
  }

  // 8. Seed Testimonials (curated for reviews marquee)
  const defaultTestimonials = [
    {
      name: "Sabina Shrestha",
      role: "Bride",
      content: "The absolute best bridal makeup experience in Kathmandu. Sita Sharma made me feel like royalty on my wedding day. The makeup lasted all night!",
      rating: 5,
      isActive: true,
    },
    {
      name: "Roshani Devkota",
      role: "Regular Client",
      content: "I have been coming here for Hydra-Facials for the past year. The dermal therapists are certified and very gentle. My skin has never looked healthier.",
      rating: 5,
      isActive: true,
    },
    {
      name: "Alisha Gurung",
      role: "Regular Client",
      content: "Their Nail Art is next level! Extremely precise patterns and very sanitary tools. Highly recommend Priya for nails.",
      rating: 5,
      isActive: true,
    },
  ];

  const testimonialCount = await prisma.testimonial.count();
  if (testimonialCount === 0) {
    for (const test of defaultTestimonials) {
      await prisma.testimonial.create({ data: test });
      console.log(`Seeded Testimonial: ${test.name}`);
    }
  }

  console.log("Database fully synchronized & seeded!");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
