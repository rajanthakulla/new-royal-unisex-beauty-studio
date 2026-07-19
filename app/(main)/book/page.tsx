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

  // Fetch all services to populate the selection list
  const services = await prisma.service.findMany({
    orderBy: { title: "asc" },
    select: {
      id: true,
      title: true,
      slug: true,
      price: true,
    },
  });

  const settings = await prisma.siteSettings.findFirst();

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