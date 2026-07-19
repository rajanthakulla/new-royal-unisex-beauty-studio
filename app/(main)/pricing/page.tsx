import PageHeader from "@/components/PageHeader";
import ScrollReveal from "@/components/ScrollReveal";
import { PrismaClient } from "@prisma/client";
import Link from "next/link";

const prisma = new PrismaClient();
export const revalidate = 60;

export default async function PricingPage() {
  const categories = await prisma.category.findMany({
    include: {
      services: true
    },
    orderBy: { name: "asc" }
  });

  return (
    <main className="pb-24">
      <PageHeader 
        title="Menu & Pricing" 
        subtitle="Transparent pricing for our royal treatments."
      />
      
      <section className="px-6 md:px-16 lg:px-20 w-[92%] max-w-[800px] mx-auto py-20 space-y-16">
        {categories.length > 0 ? categories.map((cat, i) => (
          <div key={cat.id} className="space-y-8">
            <ScrollReveal delay={0.1}>
              <h2 className="font-display-lg text-[24px] md:text-[28px] font-semibold text-on-surface border-b border-primary-container/15 pb-4">
                {cat.name}
              </h2>
            </ScrollReveal>
            
            <div className="space-y-4">
              {cat.services.map((service, j) => (
                <ScrollReveal 
                  key={service.id} 
                  delay={0.05 * (j % 5)} 
                  className="flex flex-col sm:flex-row justify-between gap-4 p-6 bg-white hover:shadow-premium transition-all duration-300 rounded-2xl border border-primary-container/5"
                >
                  <div className="max-w-xl">
                    <h3 className="font-headline-md text-lg font-bold text-on-surface mb-2">{service.title}</h3>
                    <p className="font-body-md text-[14px] text-on-surface-variant leading-relaxed line-clamp-2">{service.description}</p>
                  </div>
                  <div className="flex flex-col items-start sm:items-end justify-center shrink-0">
                    <span className="font-display-lg text-xl font-bold text-primary">Rs. {service.price.toLocaleString()}</span>
                    <Link 
                      href={`/services#${cat.slug}`} 
                      className="text-[12px] font-label-md uppercase tracking-wider text-on-surface-variant hover:text-primary mt-2 flex items-center gap-1"
                    >
                      Book <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                    </Link>
                  </div>
                </ScrollReveal>
              ))}
              {cat.services.length === 0 && (
                <p className="text-on-surface-variant italic p-4 text-[14px]">No services listed yet.</p>
              )}
            </div>
          </div>
        )) : (
          <div className="text-center py-16 bg-white shadow-premium rounded-3xl border border-primary-container/10">
            <span className="material-symbols-outlined text-[48px] text-primary mb-4">hourglass_empty</span>
            <h3 className="font-headline-md text-xl text-on-surface mb-2">Pricing menu is being updated</h3>
            <p className="text-on-surface-variant font-body-md">Please check back later.</p>
          </div>
        )}
      </section>
    </main>
  );
}
