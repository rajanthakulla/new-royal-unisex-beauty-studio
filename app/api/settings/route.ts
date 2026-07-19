import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    let settings = await prisma.siteSettings.findFirst();
    
    // Seed initial settings if none exist
    if (!settings) {
      settings = await prisma.siteSettings.create({
        data: {} // Uses default values defined in schema
      });
    }
    
    return NextResponse.json(settings);
  } catch (error) {
    console.error("Error fetching site settings:", error);
    return NextResponse.json({ error: "Failed to fetch settings" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const data = await request.json();
    const settings = await prisma.siteSettings.findFirst();

    if (!settings) {
      // Create if doesn't exist
      const newSettings = await prisma.siteSettings.create({
        data: {
          heroTitle: data.heroTitle,
          heroSubtitle: data.heroSubtitle,
          heroDescription: data.heroDescription,
          heroImage: data.heroImage,
          contactPhone: data.contactPhone,
          whatsappNumber: data.whatsappNumber,
          address: data.address,
          googleMapsUrl: data.googleMapsUrl,
          businessHours: data.businessHours,
          facebookUrl: data.facebookUrl,
          instagramUrl: data.instagramUrl,
          tiktokUrl: data.tiktokUrl,
        }
      });
      return NextResponse.json(newSettings);
    }

    // Update existing
    const updatedSettings = await prisma.siteSettings.update({
      where: { id: settings.id },
      data: {
        heroTitle: data.heroTitle,
        heroSubtitle: data.heroSubtitle,
        heroDescription: data.heroDescription,
        heroImage: data.heroImage,
        contactPhone: data.contactPhone,
        whatsappNumber: data.whatsappNumber,
        address: data.address,
        googleMapsUrl: data.googleMapsUrl,
        businessHours: data.businessHours,
        facebookUrl: data.facebookUrl,
        instagramUrl: data.instagramUrl,
        tiktokUrl: data.tiktokUrl,
      }
    });

    return NextResponse.json(updatedSettings);
  } catch (error) {
    console.error("Error updating site settings:", error);
    return NextResponse.json({ error: "Failed to update settings" }, { status: 500 });
  }
}
