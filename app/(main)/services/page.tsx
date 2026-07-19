import { PrismaClient } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";
import PageHeader from "@/components/PageHeader";

const prisma = new PrismaClient();
export const revalidate = 60; // Revalidate every 60 seconds

export default async function ServicesPage() {
  const dbServices = await prisma.service.findMany();

  // Helper function to resolve dynamic service or use fallback templates
  const getService = (keyword: string, fallback: { title: string, description: string, price: number, image: string, slug: string }) => {
    const found = dbServices.find(s => 
      s.slug.toLowerCase().includes(keyword.toLowerCase()) || 
      s.title.toLowerCase().includes(keyword.toLowerCase())
    );
    if (found) {
      return {
        title: found.title,
        description: found.description,
        price: found.price,
        image: found.image || fallback.image,
        slug: found.slug
      };
    }
    return fallback;
  };

  const services = {
    facial: getService("facial", {
      title: "Facial & Skin Care",
      description: "Our signature botanical facials are tailored to your skin's unique rhythm, using cold-pressed oils and active minerals to restore luminosity.",
      price: 4500,
      image: "/gallery/hero-main.png",
      slug: "facial-skin-care"
    }),
    hair: getService("hair", {
      title: "Hair Styling",
      description: "From architectural cuts to effortless waves, we craft styles that enhance your structural beauty.",
      price: 2800,
      image: "/gallery/salon-1.webp",
      slug: "hair-styling"
    }),
    bridal: getService("bridal", {
      title: "Bridal Makeup",
      description: "Timeless elegance for your most significant moments. A personalized journey from trial to ceremony.",
      price: 15000,
      image: "/gallery/salon-2.webp",
      slug: "bridal-makeup"
    }),
    mehndi: getService("mehndi", {
      title: "Mehndi",
      description: "Traditional henna artistry reimagined for the modern aesthetic. Intricate patterns, lasting soul.",
      price: 1200,
      image: "/gallery/salon-3.webp",
      slug: "mehndi"
    }),
    nails: getService("nail", {
      title: "Nail Art",
      description: "Precision manicures and creative artistry that serves as an extension of your personal style.",
      price: 1500,
      image: "/gallery/salon-4.webp",
      slug: "nail-art"
    })
  };

  return (
    <main className="pb-24">
      <PageHeader 
        title="Our Curated Services" 
        subtitle="A sanctuary of intentional beauty. We combine ancient traditions with modern craftsmanship to deliver results that honor your natural essence." 
        label="REFINEMENT & CARE" 
      />

      {/* Services Grid - Bento/Asymmetric Layout */}
      <section className="py-20 px-6 md:px-16 lg:px-20 w-[92%] max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          
          {/* Facial & Skin Care (Large Feature md:col-span-8) */}
          <ScrollReveal delay={0.1} className="md:col-span-8 group overflow-hidden bg-surface-container rounded-3xl border border-outline-variant/30 transition-all duration-500 hover:border-[#745a32]/50 shadow-sm flex flex-col md:flex-row">
            <div className="w-full md:w-1/2 relative aspect-[4/5] md:aspect-auto min-h-[300px]">
              <Image 
                alt={services.facial.title} 
                src={services.facial.image}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-103"
                sizes="(max-width: 768px) 100vw, 40vw"
              />
            </div>
            <div className="w-full md:w-1/2 p-8 md:p-10 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <h3 className="font-display-lg text-[24px] font-bold text-on-surface">{services.facial.title}</h3>
                <p className="font-body-md text-[14px] text-on-surface-variant leading-relaxed">
                  {services.facial.description}
                </p>
                <div className="pt-2">
                  <p className="text-[10px] font-label-md uppercase tracking-wider text-[#7f756f] font-bold mb-1">EXPERIENCE STARTS AT</p>
                  <p className="font-display-lg text-2xl font-bold text-[#745a32]">Rs. {services.facial.price.toLocaleString()}</p>
                </div>
              </div>
              <Link href={`/book?service=${services.facial.slug}`} className="block w-full">
                <button className="w-full bg-black hover:bg-[#745a32] text-white py-3.5 px-8 rounded-full font-label-md text-[12px] uppercase tracking-widest transition-all duration-300">
                  Book Now
                </button>
              </Link>
            </div>
          </ScrollReveal>

          {/* Hair Styling (Vertical Card md:col-span-4) */}
          <ScrollReveal delay={0.15} className="md:col-span-4 group bg-surface-container rounded-3xl border border-outline-variant/30 flex flex-col transition-all duration-500 hover:border-[#745a32]/50 shadow-sm">
            <div className="relative aspect-[3/4] overflow-hidden rounded-t-3xl bg-surface-dim">
              <Image 
                alt={services.hair.title} 
                src={services.hair.image}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-103"
                sizes="(max-width: 768px) 100vw, 30vw"
              />
            </div>
            <div className="p-8 flex-1 flex flex-col justify-between space-y-6">
              <div className="space-y-3">
                <h3 className="font-display-lg text-xl font-bold text-on-surface">{services.hair.title}</h3>
                <p className="font-body-md text-[14px] text-on-surface-variant leading-relaxed">
                  {services.hair.description}
                </p>
                <p className="font-display-lg text-lg font-bold text-[#745a32] pt-1">Rs. {services.hair.price.toLocaleString()}</p>
              </div>
              <Link href={`/book?service=${services.hair.slug}`} className="block w-full">
                <button className="w-full border border-black hover:bg-black hover:text-white text-black py-3 rounded-full font-label-md text-[12px] uppercase tracking-widest transition-all duration-300">
                  Book Now
                </button>
              </Link>
            </div>
          </ScrollReveal>

          {/* Bridal Makeup (Asymmetric Grid md:col-span-4) */}
          <ScrollReveal delay={0.2} className="md:col-span-4 group bg-surface-container rounded-3xl border border-outline-variant/30 flex flex-col transition-all duration-500 hover:border-[#745a32]/50 shadow-sm">
            <div className="relative aspect-square overflow-hidden rounded-t-3xl bg-surface-dim">
              <Image 
                alt={services.bridal.title} 
                src={services.bridal.image}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-103"
                sizes="(max-width: 768px) 100vw, 30vw"
              />
            </div>
            <div className="p-8 flex-1 flex flex-col justify-between space-y-6">
              <div className="space-y-3">
                <h3 className="font-display-lg text-xl font-bold text-on-surface">{services.bridal.title}</h3>
                <p className="font-body-md text-[14px] text-on-surface-variant leading-relaxed">
                  {services.bridal.description}
                </p>
                <p className="font-display-lg text-lg font-bold text-[#745a32] pt-1">Rs. {services.bridal.price.toLocaleString()}</p>
              </div>
              <Link href={`/book?service=${services.bridal.slug}`} className="block w-full">
                <button className="w-full border border-black hover:bg-black hover:text-white text-black py-3 rounded-full font-label-md text-[12px] uppercase tracking-widest transition-all duration-300">
                  Book Now
                </button>
              </Link>
            </div>
          </ScrollReveal>

          {/* Mehndi & Nail Art (Horizontal Feature md:col-span-8) */}
          <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-8">
            
            {/* Mehndi */}
            <ScrollReveal delay={0.25} className="group bg-[#f8f3ee] p-6 rounded-3xl border border-outline-variant/30 flex flex-col justify-between transition-all duration-500 hover:border-[#745a32]/50 shadow-sm h-full">
              <div className="space-y-4">
                <div className="relative rounded-2xl overflow-hidden h-44 bg-surface-dim">
                  <Image 
                    alt={services.mehndi.title} 
                    src={services.mehndi.image}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 20vw"
                  />
                </div>
                <h3 className="font-display-lg text-lg font-bold text-on-surface">{services.mehndi.title}</h3>
                <p className="font-body-md text-[13px] text-on-surface-variant leading-relaxed">
                  {services.mehndi.description}
                </p>
              </div>
              <div className="flex items-center justify-between pt-6 mt-4 border-t border-[#d0c4bd]/40">
                <span className="font-display-lg text-[16px] font-bold text-[#745a32]">Rs. {services.mehndi.price.toLocaleString()}+</span>
                <Link href={`/book?service=${services.mehndi.slug}`}>
                  <button className="bg-black hover:bg-[#745a32] text-white px-5 py-2 rounded-full font-label-md text-[11px] uppercase tracking-widest transition-all duration-300">
                    Book
                  </button>
                </Link>
              </div>
            </ScrollReveal>

            {/* Nail Art */}
            <ScrollReveal delay={0.3} className="group bg-[#f8f3ee] p-6 rounded-3xl border border-outline-variant/30 flex flex-col justify-between transition-all duration-500 hover:border-[#745a32]/50 shadow-sm h-full">
              <div className="space-y-4">
                <div className="relative rounded-2xl overflow-hidden h-44 bg-surface-dim">
                  <Image 
                    alt={services.nails.title} 
                    src={services.nails.image}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 20vw"
                  />
                </div>
                <h3 className="font-display-lg text-lg font-bold text-on-surface">{services.nails.title}</h3>
                <p className="font-body-md text-[13px] text-on-surface-variant leading-relaxed">
                  {services.nails.description}
                </p>
              </div>
              <div className="flex items-center justify-between pt-6 mt-4 border-t border-[#d0c4bd]/40">
                <span className="font-display-lg text-[16px] font-bold text-[#745a32]">Rs. {services.nails.price.toLocaleString()}</span>
                <Link href={`/book?service=${services.nails.slug}`}>
                  <button className="bg-black hover:bg-[#745a32] text-white px-5 py-2 rounded-full font-label-md text-[11px] uppercase tracking-widest transition-all duration-300">
                    Book
                  </button>
                </Link>
              </div>
            </ScrollReveal>

          </div>

        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#ece7e2] overflow-hidden relative border-y border-[#d0c4bd]/40">
        <div className="absolute top-0 right-0 w-1/3 h-full opacity-10 bg-gradient-to-l from-[#745a32] to-transparent pointer-events-none"></div>
        <div className="w-[92%] max-w-[1200px] mx-auto px-6 md:px-16 lg:px-20 text-center relative z-10 space-y-6">
          <h2 className="font-display-lg text-[32px] md:text-[40px] text-on-surface font-semibold leading-tight">
            Experience the Transformation
          </h2>
          <p className="font-body-lg text-[16px] text-on-surface-variant max-w-xl mx-auto leading-relaxed">
            Step into a world where your well-being is the priority. Our experts are ready to curate an experience just for you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link href="/book">
              <button className="w-full sm:w-auto bg-black hover:bg-[#745a32] text-white px-10 py-4.5 rounded-full font-label-md text-[12px] uppercase tracking-widest transition-all duration-300 shadow-md">
                Book Your Appointment
              </button>
            </Link>
            <Link href="/gallery">
              <button className="w-full sm:w-auto border border-black hover:bg-black hover:text-white text-black px-10 py-4.5 rounded-full font-label-md text-[12px] uppercase tracking-widest transition-all duration-300">
                View Lookbook
              </button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
