import PageHeader from "@/components/PageHeader";
import ScrollReveal from "@/components/ScrollReveal";
import AnimatedNumber from "@/components/AnimatedNumber";
import Image from "next/image";
import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="pb-24">
      <PageHeader 
        title="About Us" 
        subtitle="Discover the luxury and precision behind New Royal Beauty & Unisex Salon."
      />
      
      <section className="px-margin-desktop max-w-container-max mx-auto py-20 flex flex-col md:flex-row gap-16 items-center">
        <ScrollReveal className="flex-1 w-full aspect-[3/4] relative overflow-hidden bg-surface-container-low border border-primary-container/20">
          <div className="absolute inset-0 bg-black/10 z-10 mix-blend-multiply"></div>
          <Image 
            src="/gallery/salon-5.webp"
            alt="Salon Interior"
            fill
            className="object-cover"
          />
        </ScrollReveal>

        <div className="flex-1 space-y-8">
          <ScrollReveal delay={0.1}>
            <h2 className="font-display-lg text-[40px] text-on-surface mb-6">Our Royal Legacy</h2>
            <p className="font-body-lg text-on-surface-variant leading-relaxed">
              Located in the heart of New Baneshwor, Kathmandu, New Royal Beauty & Unisex Salon is a sanctuary of luxury, precision, and world-class service. With over 12 years of professional experience, our certified stylists and beauty experts are dedicated to elevating your natural beauty.
            </p>
          </ScrollReveal>
          
          <ScrollReveal delay={0.2}>
            <p className="font-body-lg text-on-surface-variant leading-relaxed">
              We specialize in a comprehensive range of services including precision haircuts, glamorous styling, advanced coloring techniques like balayage and highlights, as well as premium skin and nail treatments. We proudly use only top-tier, certified international products to ensure the highest quality results.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.3} className="pt-6">
            <Link href="/book">
              <button className="px-8 py-4 bg-primary text-[#111111] rounded-sm font-label-lg tracking-widest uppercase hover:bg-black hover:text-white transition-colors duration-300">
                Experience Luxury
              </button>
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-24 bg-surface-container-lowest">
        <div className="px-margin-desktop max-w-container-max mx-auto space-y-16">
          <ScrollReveal direction="up" className="text-center max-w-3xl mx-auto space-y-4">
            <h2 className="font-display-lg text-[40px] text-on-surface">Our Philosophy</h2>
            <p className="font-body-lg text-on-surface-variant leading-relaxed">
              We believe that beauty is not just about appearances—it is a holistic experience that nourishes both the body and the soul. Our approach is grounded in three core pillars.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <ScrollReveal direction="up" delay={0.1} className="space-y-6 text-center group">
              <div className="w-20 h-20 mx-auto rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-500">
                <span className="material-symbols-outlined text-[32px]">palette</span>
              </div>
              <h3 className="font-display-sm text-[24px] text-on-surface">Artistry</h3>
              <p className="font-body-md text-on-surface-variant">Our stylists are passionate artists who treat every client as a unique masterpiece, tailoring techniques to suit individual features and personalities.</p>
            </ScrollReveal>
            
            <ScrollReveal direction="up" delay={0.2} className="space-y-6 text-center group">
              <div className="w-20 h-20 mx-auto rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-500">
                <span className="material-symbols-outlined text-[32px]">spa</span>
              </div>
              <h3 className="font-display-sm text-[24px] text-on-surface">Wellness</h3>
              <p className="font-body-md text-on-surface-variant">We prioritize the health of your hair and skin. We exclusively use premium, non-toxic products that rejuvenate and protect your natural beauty.</p>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.3} className="space-y-6 text-center group">
              <div className="w-20 h-20 mx-auto rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-500">
                <span className="material-symbols-outlined text-[32px]">diamond</span>
              </div>
              <h3 className="font-display-sm text-[24px] text-on-surface">Luxury</h3>
              <p className="font-body-md text-on-surface-variant">From the moment you step through our doors, you are treated to a VIP experience. Every detail is curated to provide you with ultimate comfort and relaxation.</p>
            </ScrollReveal>
          </div>
        </div>
      </section>
      
      {/* Quick Stats */}
      <section className="py-24 px-margin-desktop max-w-container-max mx-auto">
        <div className="bg-[#111111] text-white py-12 px-6 md:px-12 rounded-[2.5rem] shadow-2xl border border-white/5">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-white/10">
            <ScrollReveal direction="up" delay={0.1} className="text-center px-4">
              <p className="font-display-lg text-5xl text-primary mb-2">
                <AnimatedNumber value={12} suffix="+" />
              </p>
              <p className="font-label-md tracking-widest uppercase opacity-80 mt-3">Years Experience</p>
            </ScrollReveal>
            <ScrollReveal direction="up" delay={0.2} className="text-center px-4">
              <p className="font-display-lg text-5xl text-primary mb-2">
                <AnimatedNumber value={10} suffix="k+" />
              </p>
              <p className="font-label-md tracking-widest uppercase opacity-80 mt-3">Happy Clients</p>
            </ScrollReveal>
            <ScrollReveal direction="up" delay={0.3} className="text-center px-4">
              <p className="font-display-lg text-5xl text-primary mb-2">
                <AnimatedNumber value={15} suffix="+" />
              </p>
              <p className="font-label-md tracking-widest uppercase opacity-80 mt-3">Certified Experts</p>
            </ScrollReveal>
            <ScrollReveal direction="up" delay={0.4} className="text-center px-4">
              <p className="font-display-lg text-5xl text-primary mb-2">
                <AnimatedNumber value={100} suffix="%" />
              </p>
              <p className="font-label-md tracking-widest uppercase opacity-80 mt-3">Premium Products</p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Commitment to Excellence */}
      <section className="py-20 px-margin-desktop max-w-container-max mx-auto border-t border-primary/10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <ScrollReveal direction="up" className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-primary/5 z-10 mix-blend-overlay"></div>
            <Image 
              src="/gallery/salon-7.webp"
              alt="Salon Excellence"
              fill
              className="object-cover"
            />
          </ScrollReveal>
          
          <div className="space-y-8">
            <ScrollReveal direction="up" delay={0.1}>
              <div className="flex items-center gap-4 mb-4">
                <div className="h-px w-12 bg-primary"></div>
                <span className="font-label-md text-[13px] text-primary uppercase tracking-[0.2em] font-bold">
                  Our Promise
                </span>
              </div>
              <h2 className="font-display-lg text-[40px] md:text-[48px] text-on-surface leading-tight">
                A Commitment to <br /> Uncompromising Quality
              </h2>
            </ScrollReveal>
            
            <ScrollReveal direction="up" delay={0.2} className="space-y-6">
              <p className="font-body-lg text-on-surface-variant leading-relaxed">
                At New Royal Beauty, we refuse to compromise on the products we use or the level of service we provide. Our stylists are continuously educated on the latest global trends and techniques to ensure you receive the absolute best.
              </p>
              <ul className="space-y-4 text-on-surface-variant font-medium">
                <li className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-primary">check_circle</span>
                  <span>100% Authentic, Imported Products</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-primary">check_circle</span>
                  <span>Strict Hygiene and Sanitization Protocols</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-primary">check_circle</span>
                  <span>Personalized Consultations Before Every Service</span>
                </li>
              </ul>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-surface-container-lowest">
        <ScrollReveal direction="up" className="max-w-4xl mx-auto text-center px-6 space-y-8">
          <h2 className="font-display-lg text-[48px] md:text-[64px] text-on-surface">Ready to Glow?</h2>
          <p className="font-body-lg text-[18px] text-on-surface-variant max-w-2xl mx-auto">
            Book your appointment today and let our certified experts give you the royal treatment you deserve.
          </p>
          <div className="pt-4">
            <Link href="/book">
              <button className="px-10 py-5 bg-[#111111] text-white rounded-full font-label-md tracking-widest uppercase hover:bg-primary transition-colors duration-300 shadow-xl hover:shadow-primary/20 hover:-translate-y-1 transform">
                Book Your Experience
              </button>
            </Link>
          </div>
        </ScrollReveal>
      </section>
    </main>
  );
}
