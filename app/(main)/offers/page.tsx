import PageHeader from "@/components/PageHeader";
import ScrollReveal from "@/components/ScrollReveal";
import { PrismaClient } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

const prisma = new PrismaClient();
export const revalidate = 60;

export default async function OffersPage() {
  const offers = await prisma.offer.findMany({
    where: { isActive: true },
    orderBy: { createdAt: "desc" }
  });

  return (
    <main className="pb-24">
      <PageHeader 
        title="Special Offers" 
        subtitle="Exclusive packages and seasonal discounts."
      />
      
      <section className="px-6 md:px-16 lg:px-20 w-[92%] max-w-[1200px] mx-auto py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {offers.length > 0 ? offers.map((offer, i) => (
            <ScrollReveal 
              key={offer.id} 
              delay={0.1 * i} 
              className="bg-white rounded-3xl overflow-hidden shadow-premium hover:shadow-premium-hover transition-all duration-300 group flex flex-col h-full border border-primary-container/5"
            >
              <div className="w-full aspect-[4/3] relative overflow-hidden bg-surface-dim">
                {offer.image ? (
                  <Image 
                    src={offer.image} 
                    alt={offer.title} 
                    fill 
                    className="object-cover group-hover:scale-105 transition-transform duration-700" 
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-primary bg-primary/5">
                    <span className="material-symbols-outlined text-[48px]">local_offer</span>
                  </div>
                )}
                {offer.discount && (
                  <div className="absolute top-4 right-4 bg-primary text-white px-4 py-1.5 font-bold text-[12px] tracking-wider uppercase rounded-full shadow-md">
                    {offer.discount}
                  </div>
                )}
              </div>
              <div className="p-8 flex flex-col flex-grow">
                <h3 className="font-headline-md text-xl font-bold text-on-surface mb-3 group-hover:text-primary transition-colors leading-snug">
                  {offer.title}
                </h3>
                
                <p className="text-on-surface-variant font-body-md text-[14px] leading-relaxed mb-6 flex-grow whitespace-pre-wrap">
                  {offer.description}
                </p>
                
                <div className="border-t border-primary-container/10 pt-6 mt-auto space-y-4">
                  <div className="flex items-center text-[13px] text-on-surface-variant gap-2">
                    <span className="material-symbols-outlined text-[16px] text-primary">event</span>
                    Valid until: {new Date(offer.validUntil).toLocaleDateString()}
                  </div>
                  <Link href={`/book?notes=Claiming offer: ${encodeURIComponent(offer.title)}`} className="w-full block">
                    <button className="w-full py-3.5 bg-on-surface hover:bg-primary text-white font-label-md text-[12px] uppercase tracking-widest text-center rounded-full transition-colors active:scale-95 shadow-md border-none">
                      Claim Offer
                    </button>
                  </Link>
                </div>
              </div>
            </ScrollReveal>
          )) : (
            <div className="col-span-1 md:col-span-2 lg:col-span-3 text-center py-16 bg-white shadow-premium rounded-3xl border border-primary-container/10 w-full">
              <span className="material-symbols-outlined text-[48px] text-primary mb-4">hourglass_empty</span>
              <h3 className="font-headline-md text-xl text-on-surface mb-2">No active offers right now</h3>
              <p className="text-on-surface-variant font-body-md">Check back soon for upcoming holiday specials and packages!</p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}