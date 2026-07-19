import { PrismaClient } from "@prisma/client";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import ScrollReveal from "@/components/ScrollReveal";

const prisma = new PrismaClient();

export const revalidate = 60; // Revalidate every 60 seconds

export default async function ServiceDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;

  // Fetch current service details
  const service = await prisma.service.findUnique({
    where: { slug },
    include: { category: true }
  });

  if (!service) {
    notFound();
  }

  // Fetch related services in same category (excluding current)
  const relatedServices = await prisma.service.findMany({
    where: {
      categoryId: service.categoryId,
      NOT: { id: service.id }
    },
    take: 3
  });

  return (
    <main className="pb-24">
      <PageHeader 
        title={service.title} 
        subtitle={service.category?.name || "Premium Treatment"}
      />

      <section className="px-6 md:px-16 lg:px-20 w-[92%] max-w-[1200px] mx-auto py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left: Large Image Block */}
          <ScrollReveal delay={0.1} className="lg:col-span-7 rounded-[2rem] overflow-hidden shadow-premium border border-primary-container/5 relative aspect-[16/11] bg-surface-dim">
            {service.image ? (
              <Image 
                src={service.image} 
                alt={service.title} 
                fill 
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 60vw"
                priority
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-primary/5 text-primary">
                <span className="material-symbols-outlined text-[64px]">spa</span>
              </div>
            )}
          </ScrollReveal>

          {/* Right: Description & Action Block */}
          <ScrollReveal delay={0.2} className="lg:col-span-5 bg-white p-8 md:p-12 rounded-[2.5rem] shadow-premium border border-primary-container/5 space-y-8">
            <div className="space-y-4">
              <span className="text-[12px] font-label-md uppercase tracking-wider text-[#e3c191] bg-[#211a16] px-4 py-1.5 rounded-full inline-block font-bold">
                {service.category?.name || "Service Details"}
              </span>
              <h2 className="font-display-lg text-[26px] md:text-[32px] font-semibold text-on-surface leading-tight">
                {service.title}
              </h2>
              <div className="font-display-lg text-2xl font-bold text-primary">
                Rs. {service.price.toLocaleString()}
              </div>
            </div>

            <div className="h-[1px] bg-primary-container/10"></div>

            <p className="font-body-md text-[14px] text-on-surface-variant leading-relaxed">
              {service.description}
            </p>

            <div className="pt-4">
              <Link href={`/book?service=${service.slug}`} className="block w-full">
                <button className="w-full py-4 bg-on-surface hover:bg-primary text-white font-label-md text-[12px] uppercase tracking-widest rounded-full transition-colors active:scale-95 shadow-md">
                  Book Treatment Now
                </button>
              </Link>
            </div>
          </ScrollReveal>

        </div>

        {/* Related Services */}
        {relatedServices.length > 0 && (
          <div className="mt-24 space-y-10">
            <ScrollReveal delay={0.1} className="flex items-center gap-6">
              <h3 className="font-display-lg text-[24px] font-semibold text-on-surface">Related Treatments</h3>
              <div className="h-[1px] flex-grow bg-gradient-to-r from-primary-container/20 to-transparent"></div>
            </ScrollReveal>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedServices.map((rel, idx) => (
                <ScrollReveal 
                  key={rel.id} 
                  delay={0.05 * idx} 
                  className="bg-white rounded-2xl overflow-hidden shadow-premium border border-primary-container/5 flex flex-col group h-full"
                >
                  <div className="relative aspect-[16/10] bg-surface-dim overflow-hidden">
                    {rel.image ? (
                      <Image 
                        src={rel.image} 
                        alt={rel.title} 
                        fill 
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-primary/5 text-primary">
                        <span className="material-symbols-outlined text-[32px]">spa</span>
                      </div>
                    )}
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <h4 className="font-headline-md text-lg font-bold text-on-surface mb-2 group-hover:text-primary transition-colors">
                      {rel.title}
                    </h4>
                    <p className="text-on-surface-variant text-[13px] leading-relaxed line-clamp-2 mb-4 flex-grow">
                      {rel.description}
                    </p>
                    <div className="flex justify-between items-center mt-auto pt-4 border-t border-primary-container/5">
                      <span className="font-bold text-primary text-sm">Rs. {rel.price.toLocaleString()}</span>
                      <Link href={`/services/${rel.slug}`} className="text-[12px] font-bold text-on-surface hover:text-primary flex items-center gap-1">
                        View <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                      </Link>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        )}
      </section>
    </main>
  );
}