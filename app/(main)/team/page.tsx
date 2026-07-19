import PageHeader from "@/components/PageHeader";
import ScrollReveal from "@/components/ScrollReveal";
import Image from "next/image";
import Link from "next/link";

export default function TeamPage() {
  const otherSpecialists = [
    {
      name: "Priya Thapa",
      role: "Bridal Artist",
      exp: "8 YRS EXP",
      desc: "Master of bridal transformations, Priya specializes in traditional and contemporary Nepali bridal looks, ensuring every bride glows on her special day.",
      img: "/gallery/salon-6.webp"
    },
    {
      name: "Anita Gurung",
      role: "Skin Therapist",
      exp: "10 YRS EXP",
      desc: "A specialist in advanced dermo-treatments, Anita combines scientific precision with traditional herbal remedies for lasting skin health.",
      img: "/gallery/salon-7.webp"
    },
    {
      name: "Kamala Rai",
      role: "Nail Artist",
      exp: "6 YRS EXP",
      desc: "Known for her intricate designs and flawless technique, Kamala turns nail care into an elevated art form with a keen eye for detail.",
      img: "/gallery/salon-8.webp"
    }
  ];

  return (
    <main className="pb-24">
      <PageHeader 
        title="Meet Our Specialists" 
        subtitle="Our curated team of experts brings decades of collective experience in the Kathmandu beauty scene."
      />
      
      {/* Featured Lead Specialist */}
      <section className="px-6 md:px-16 lg:px-20 w-[92%] max-w-[1200px] mx-auto py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          
          <ScrollReveal delay={0.1} className="md:col-span-7 rounded-[2rem] overflow-hidden aspect-[4/5] md:aspect-[16/10] relative group shadow-premium border border-primary-container/5">
            <Image 
              src="/gallery/salon-9.webp"
              alt="Sita Sharma"
              fill
              className="object-cover group-hover:scale-102 transition-transform duration-700"
              sizes="(max-width: 768px) 100vw, 60vw"
              priority
            />
          </ScrollReveal>

          <ScrollReveal delay={0.2} className="md:col-span-5 space-y-6">
            <span className="text-[12px] font-label-md uppercase tracking-wider text-[#e3c191] bg-[#211a16] px-4 py-1.5 rounded-full inline-block font-bold">
              Founder & Lead Beautician
            </span>
            <h2 className="font-display-lg text-[28px] md:text-[36px] font-semibold text-on-surface">
              Sita Sharma
            </h2>
            <p className="font-body-lg text-[16px] text-on-surface-variant leading-relaxed">
              With over 15 years of shaping the beauty standards of Kathmandu, Sita is a pioneer in holistic aesthetic treatments. Her philosophy centers on organic rejuvenation and precision.
            </p>
            <div className="flex items-center gap-3 border-t border-outline-variant/30 pt-6">
              <span className="material-symbols-outlined text-[#745a32]">verified</span>
              <span className="font-body-md text-on-surface text-sm font-bold">15+ Years Industry Experience</span>
            </div>
            
            {/* Social icons */}
            <div className="flex gap-4 pt-2">
              <a className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:bg-[#745a32] hover:text-white transition-all shadow-sm" href="#">
                <span className="material-symbols-outlined text-[18px]">public</span>
              </a>
              <a className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:bg-[#745a32] hover:text-white transition-all shadow-sm" href="#">
                <span className="material-symbols-outlined text-[18px]">photo_camera</span>
              </a>
            </div>
          </ScrollReveal>

        </div>
      </section>

      {/* Bento Style Grid for others */}
      <section className="px-6 md:px-16 lg:px-20 w-[92%] max-w-[1200px] mx-auto py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {otherSpecialists.map((specialist, idx) => (
            <ScrollReveal 
              key={idx} 
              delay={0.1 * idx} 
              className="bg-white rounded-3xl p-6 shadow-premium border border-primary-container/5 flex flex-col h-full hover:border-[#745a32]/20 transition-all duration-300"
            >
              <div className="rounded-2xl overflow-hidden aspect-[4/5] relative group mb-6 bg-surface-dim">
                <Image 
                  src={specialist.img}
                  alt={specialist.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, 30vw"
                />
              </div>
              <h3 className="font-display-lg text-[20px] font-bold text-on-surface mb-1">{specialist.name}</h3>
              <p className="text-[12px] font-label-md uppercase tracking-wider text-[#745a32] font-bold mb-4">{specialist.role}</p>
              <p className="font-body-md text-[14px] text-on-surface-variant leading-relaxed mb-6 flex-grow">{specialist.desc}</p>
              
              <div className="mt-auto pt-4 border-t border-primary-container/5 flex justify-between items-center text-[12px]">
                <span className="font-bold text-on-surface-variant/80 tracking-wide">{specialist.exp}</span>
                <a className="text-[#745a32] hover:underline flex items-center gap-1 font-bold" href="/book">
                  Book Slot <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                </a>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Recognition Section */}
      <section className="bg-surface-container py-16 mt-16 border-y border-primary-container/5">
        <div className="w-[92%] max-w-[1200px] mx-auto px-6 md:px-16 lg:px-20 text-center">
          <h2 className="font-display-lg text-[24px] md:text-[28px] font-semibold text-on-surface mb-10">Local Excellence</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 opacity-75 grayscale hover:grayscale-0 transition-all duration-500">
            <div className="flex flex-col items-center">
              <span className="material-symbols-outlined text-[36px] text-primary mb-2">workspace_premium</span>
              <span className="text-[11px] font-label-md uppercase tracking-wider text-on-surface font-bold">Kathmandu Style Award</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="material-symbols-outlined text-[36px] text-primary mb-2">star</span>
              <span className="text-[11px] font-label-md uppercase tracking-wider text-on-surface font-bold">Top Rated Studio</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="material-symbols-outlined text-[36px] text-primary mb-2">spa</span>
              <span className="text-[11px] font-label-md uppercase tracking-wider text-on-surface font-bold">Organic Care Certified</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="material-symbols-outlined text-[36px] text-primary mb-2">volunteer_activism</span>
              <span className="text-[11px] font-label-md uppercase tracking-wider text-on-surface font-bold">Customer Choice 2023</span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}