import PageHeader from "@/components/PageHeader";
import ScrollReveal from "@/components/ScrollReveal";
import FAQAccordions from "@/components/FAQAccordions";
import { PrismaClient } from "@prisma/client";
import Image from "next/image";

const prisma = new PrismaClient();

export const revalidate = 60; // Revalidate every 60 seconds

export default async function FAQPage() {
  let settings = null;
  try {
    settings = await prisma.siteSettings.findFirst();
  } catch (err) {
    console.error("FAQ settings query failed:", err);
  }

  const faqSections = [
    {
      title: "RESERVATIONS & BOOKINGS",
      items: [
        {
          question: "How do I schedule an appointment?",
          answer: "You can easily book through our online portal by clicking any 'Book Now' button. Alternatively, you may call our hotline or message us on WhatsApp to speak directly with our concierge team."
        },
        {
          question: "What is your cancellation policy?",
          answer: "We require at least 24 hours notice for all cancellations or rescheduling. Cancellations made within less than 24 hours may incur a small charge. No-shows will be charged 50% of the reserved service amount."
        }
      ]
    },
    {
      title: "BRIDAL PACKAGES",
      items: [
        {
          question: "When should I book my bridal trial?",
          answer: "We recommend booking your bridal trial session 3 to 4 months prior to your wedding date. This allows our certified makeup artists to perfect your look and align on Saree draping details."
        },
        {
          question: "Do you offer on-site services for weddings?",
          answer: "Yes, our elite bridal team is available for travel inside the Kathmandu valley. We provide full-service makeup, hair, and styling at your wedding venue. Travel fees apply based on distance."
        }
      ]
    },
    {
      title: "SERVICES & PRODUCTS",
      items: [
        {
          question: "What brands of products do you use?",
          answer: "We use only premium, internationally certified professional ranges for our skin and hair treatments. This includes L'Oreal Professional, Dermalogica, and certified nanoplastia products."
        },
        {
          question: "Is there parking available at the salon?",
          answer: "Yes, we provide secure, complimentary parking spaces directly outside our main entrance in New Baneshwor, Kathmandu for all our clients."
        }
      ]
    }
  ];

  return (
    <main className="pb-24">
      <PageHeader 
        title="Common Inquiries" 
        subtitle="We believe in clarity and intentionality. Below you will find answers regarding our beauty rituals."
      />
      
      <section className="px-6 md:px-16 lg:px-20 w-[92%] max-w-[1200px] mx-auto py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Category Sidebar (4/12) */}
          <aside className="lg:col-span-4 lg:sticky lg:top-32 space-y-8">
            <ScrollReveal delay={0.1} className="relative aspect-[4/5] overflow-hidden rounded-3xl group shadow-premium border border-primary-container/5">
              <Image 
                src="/gallery/salon-8.webp"
                alt="Salon Atmosphere"
                fill
                className="object-cover group-hover:scale-102 transition-transform duration-700"
                sizes="(max-width: 1024px) 100vw, 30vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
                <h4 className="font-display-lg text-[18px] font-bold text-[#ede0d9]">Still have questions?</h4>
                <p className="text-[13px] text-white/80">Our concierge is here to help.</p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.15} className="bg-[#f8f3ee] p-6 rounded-3xl border border-[#d0c4bd]/40 space-y-4 shadow-sm">
              <p className="text-[10px] font-label-md uppercase tracking-wider text-[#7f756f] font-bold">Contact Us</p>
              <div className="flex items-center gap-3 group cursor-pointer text-on-surface-variant hover:text-primary transition-colors">
                <span className="material-symbols-outlined text-[#745a32] text-[20px]">mail</span>
                <span className="text-[13px] font-bold">hello@newroyalbeauty.com</span>
              </div>
              <a href={`tel:${settings?.contactPhone || "+9779813451412"}`} className="flex items-center gap-3 group cursor-pointer text-on-surface-variant hover:text-primary transition-colors">
                <span className="material-symbols-outlined text-[#745a32] text-[20px]">call</span>
                <span className="text-[13px] font-bold">{settings?.contactPhone || "+977 981-3451412"}</span>
              </a>
            </ScrollReveal>
          </aside>

          {/* Accordion Section (8/12) */}
          <div className="lg:col-span-8">
            <FAQAccordions sections={faqSections} />
          </div>

        </div>
      </section>
    </main>
  );
}