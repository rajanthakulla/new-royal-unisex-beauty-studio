import PageHeader from "@/components/PageHeader";
import ScrollReveal from "@/components/ScrollReveal";
import { PrismaClient } from "@prisma/client";
import ContactForm from "@/components/ContactForm";
import Image from "next/image";

const prisma = new PrismaClient();
export const revalidate = 60;

export default async function ContactPage() {
  let settings = null;
  try {
    settings = await prisma.siteSettings.findFirst();
  } catch (err) {
    console.error("Contact settings query failed:", err);
  }

  return (
    <main className="pb-24">
      <PageHeader 
        title="Contact Us" 
        subtitle="Get in touch, visit our studio, or write to our concierge."
      />
      
      <section className="px-6 md:px-16 lg:px-20 w-[92%] max-w-[1200px] mx-auto py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Category Sidebar Left Column (4/12) */}
          <aside className="lg:col-span-4 lg:sticky lg:top-32 space-y-8">
            <ScrollReveal delay={0.1} className="relative aspect-[4/5] overflow-hidden rounded-3xl group shadow-premium border border-primary-container/5 bg-surface-dim">
              <Image 
                src="/gallery/salon-3.webp"
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
              <div className="flex items-center gap-3 text-on-surface-variant hover:text-primary transition-colors">
                <span className="material-symbols-outlined text-[#745a32] text-[20px]">mail</span>
                <span className="text-[13px] font-bold">hello@newroyalbeauty.com</span>
              </div>
              <a href={`tel:${settings?.contactPhone || "+9779813451412"}`} className="flex items-center gap-3 text-on-surface-variant hover:text-primary transition-colors">
                <span className="material-symbols-outlined text-[#745a32] text-[20px]">call</span>
                <span className="text-[13px] font-bold">{settings?.contactPhone || "+977 981-3451412"}</span>
              </a>
              <div className="flex items-center gap-3 text-on-surface-variant hover:text-primary transition-colors">
                <span className="material-symbols-outlined text-[#745a32] text-[20px]">location_on</span>
                <a href={settings?.googleMapsUrl || "https://maps.google.com/?q=M8RP%2BCCR,+Kathmandu+44600"} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors text-[13px] font-bold">
                  {settings?.address || "New Baneshwor (Near Baneshwor Chowk), Kathmandu"}
                </a>
              </div>
              <div className="flex items-center gap-3 text-on-surface-variant hover:text-primary transition-colors">
                <span className="material-symbols-outlined text-[#745a32] text-[20px]">schedule</span>
                <span className="text-[13px] font-bold">{settings?.businessHours || "Everyday 9:00 AM - 8:00 PM"}</span>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.2} className="bg-[#f8f3ee] p-6 rounded-3xl border border-[#d0c4bd]/40 space-y-4 shadow-sm">
              <p className="text-[10px] font-label-md uppercase tracking-wider text-[#7f756f] font-bold">Studio Guidelines</p>
              <div className="space-y-4">
                <div>
                  <h5 className="font-bold text-[13px] text-on-surface">Arrival</h5>
                  <p className="text-[12px] text-on-surface-variant mt-1">Please arrive 10 minutes prior to your scheduled appointment to check-in and relax.</p>
                </div>
                <div>
                  <h5 className="font-bold text-[13px] text-on-surface">Parking</h5>
                  <p className="text-[12px] text-on-surface-variant mt-1">Complimentary valet parking is available for all our guests at the main entrance.</p>
                </div>
                <div>
                  <h5 className="font-bold text-[13px] text-on-surface">Cancellations</h5>
                  <p className="text-[12px] text-on-surface-variant mt-1">We kindly request a 24-hour notice for any cancellations or rescheduling.</p>
                </div>
              </div>
            </ScrollReveal>
          </aside>

          {/* Right Column: Contact form & Map (8/12) */}
          <div className="lg:col-span-8 space-y-8">
            <ScrollReveal delay={0.2} className="bg-[#f8f3ee] p-8 md:p-12 rounded-3xl border border-[#d0c4bd]/40 space-y-6 shadow-sm">
              <h3 className="font-display-lg text-[22px] font-bold text-on-surface">Send A Message</h3>
              <ContactForm />
            </ScrollReveal>

            {/* Google Map */}
            <ScrollReveal delay={0.25} className="w-full h-[400px] rounded-3xl overflow-hidden shadow-premium border border-[#d0c4bd]/30 relative grayscale hover:grayscale-0 transition-all duration-500">
              <iframe
                src="https://maps.google.com/maps?q=M8RP%2BCCR,+Kathmandu+44600&t=&z=15&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </ScrollReveal>
          </div>

        </div>
      </section>
    </main>
  );
}