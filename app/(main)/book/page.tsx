import { PrismaClient } from "@prisma/client";
import PageHeader from "@/components/PageHeader";
import BookingForm from "@/components/BookingForm";

const prisma = new PrismaClient();

export const revalidate = 0; // Disable caching for booking page to always load fresh services

export default async function BookPage({
  searchParams,
}: {
  searchParams: Promise<{ service?: string }>;
}) {
  const resolvedSearchParams = await searchParams;
  const preSelectedServiceSlug = resolvedSearchParams.service || "";

  let dbServices: any[] = [];
  try {
    dbServices = await prisma.service.findMany({
      orderBy: { title: "asc" },
      select: {
        id: true,
        title: true,
        slug: true,
        price: true,
      },
    });
  } catch (err) {
    console.error("Book page services query failed:", err);
  }

  const fallbackServices = [
    { id: "fs1", title: "Signature Royal Haircut", slug: "hair-styling", price: 2800 },
    { id: "fs2", title: "Hydra-Radiance Facial", slug: "facial-skin-care", price: 4500 },
    { id: "fs3", title: "Bridal Makeup Glow", slug: "bridal-makeup", price: 15000 }
  ];

  const services = dbServices.length > 0 ? dbServices : fallbackServices;

  let settings = null;
  try {
    settings = await prisma.siteSettings.findFirst();
  } catch (err) {
    console.error("Book page settings query failed:", err);
  }

  return (
    <main className="pb-24">
      <PageHeader 
        title="Book Appointment" 
        subtitle="Reserve your luxury treatment with our master stylists."
      />
      
      <section className="px-6 md:px-16 lg:px-20 w-[92%] max-w-[1200px] mx-auto py-16">
        <BookingForm 
          services={services} 
          preSelectedSlug={preSelectedServiceSlug} 
          settings={settings}
        />
      </section>
    </main>
  );
}