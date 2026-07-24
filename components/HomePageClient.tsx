"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import ScrollReveal from "@/components/ScrollReveal";
import Marquee from "react-fast-marquee";
import { ReactCompareSlider, ReactCompareSliderImage } from "react-compare-slider";
import { SiteSettings, Service, Testimonial, Category, SeasonalSpecial } from "@prisma/client";
import AnimatedNumber from "@/components/AnimatedNumber";

interface HomePageClientProps {
  settings: SiteSettings;
  services: (Service & { category: Category | null })[];
  testimonials: Testimonial[];
  specials?: SeasonalSpecial[];
}

export default function HomePageClient({ settings, services, testimonials, specials = [] }: HomePageClientProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setItemsPerView(1);
      } else if (window.innerWidth < 1024) {
        setItemsPerView(2);
      } else {
        setItemsPerView(3);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (testimonials.length === 0) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => {
        const maxIndex = testimonials.length - itemsPerView;
        if (maxIndex <= 0) return 0;
        return prev >= maxIndex ? 0 : prev + 1;
      });
    }, 1800);
    return () => clearInterval(timer);
  }, [testimonials.length, itemsPerView]);
  return (
    <main className="pb-20">

      {/* Bespoke Luxury Hero Section */}
      <section className="relative pt-32 pb-16 px-6 md:px-16 lg:px-20 max-w-7xl mx-auto overflow-hidden">
        {/* Soft Ambient Gold Radial Lighting Background */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-tr from-[#D4AF37]/20 via-[#F5E6AD]/25 to-transparent rounded-full blur-[120px] pointer-events-none"></div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center relative z-10">
          
          {/* Left: High-Fashion Luxury Text & Integrated CTAs */}
          <motion.div
            className="lg:col-span-7 space-y-6 text-left"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Luxury Eyebrow Pill */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/90 border border-[#D4AF37]/40 shadow-sm backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse"></span>
              <span className="font-label-md text-[11px] md:text-[12.5px] uppercase tracking-[0.2em] font-bold text-[#745a32]">
                Kathmandu&apos;s Premier Luxury Beauty Sanctuary
              </span>
            </div>

            {/* Editorial Serif Display Headline */}
            <h1 className="font-display-lg text-[44px] sm:text-[60px] lg:text-[72px] text-[#1c1815] leading-[1.04] tracking-tight font-semibold">
              Redefine Your Beauty. <br />
              <span className="gold-gradient-text italic font-serif font-normal">
                Unveil Royal Radiance.
              </span>
            </h1>

            {/* Refined Punchy Tagline */}
            <p className="font-body-lg text-[17px] md:text-[19px] text-[#4A4A4A] max-w-xl leading-relaxed font-normal">
              Step into Kathmandu&apos;s most prestigious salon for couture hair styling, glowing organic skin rituals, and award-winning bridal makeovers.
            </p>

            {/* Primary & Secondary Action Group */}
            <div className="pt-3 flex flex-wrap items-center gap-4">
              <Link href="/book">
                <motion.button 
                  whileHover={{ scale: 1.03 }} 
                  whileTap={{ scale: 0.97 }}
                  className="gold-button px-8 py-4 rounded-full font-label-md text-[12px] uppercase tracking-[0.14em] font-bold shadow-xl flex items-center gap-2.5"
                >
                  <span className="material-symbols-outlined text-[19px]">calendar_month</span>
                  Book Appointment
                </motion.button>
              </Link>

              <Link href="/offers">
                <motion.button 
                  whileHover={{ scale: 1.03 }} 
                  whileTap={{ scale: 0.97 }}
                  className="bg-white/90 border-2 border-[#D4AF37]/70 text-[#211a16] hover:bg-[#D4AF37]/10 px-7 py-3.5 rounded-full font-label-md text-[12px] uppercase tracking-[0.14em] font-bold transition-all shadow-sm flex items-center gap-2 group"
                >
                  <span className="material-symbols-outlined text-[19px] text-[#D4AF37] group-hover:rotate-12 transition-transform">local_offer</span>
                  Explore Offers
                  <span className="text-[9px] bg-red-500 text-white px-2 py-0.5 rounded-full font-bold uppercase tracking-wider animate-pulse">Special</span>
                </motion.button>
              </Link>
            </div>

            {/* Trust Badges */}
            <div className="pt-4 flex flex-wrap items-center gap-6 text-[13px] text-on-surface-variant font-medium border-t border-black/5 pt-5">
              <span className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[#D4AF37] text-[18px]">verified</span>
                Certified Stylists
              </span>
              <span className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[#D4AF37] text-[18px]">spa</span>
                Organic Care
              </span>
              <span className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[#D4AF37] text-[18px]">workspace_premium</span>
                5-Star Rated Studio
              </span>
            </div>
          </motion.div>

          {/* Right: Masterpiece Editorial Media Canvas */}
          <motion.div 
            className="lg:col-span-5 relative"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Main Visual Frame */}
            <div className="relative h-[500px] sm:h-[560px] w-full rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white glass-card-luxury group">
              <Image 
                src="/gallery/hero-main.png"
                alt="New Royal Beauty Studio Model"
                fill
                className="object-cover object-top group-hover:scale-105 transition-transform duration-700"
                priority
                sizes="(max-width: 1024px) 100vw, 45vw"
              />

              {/* Gradient Vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

              {/* Top Glass Rating Badge */}
              <div className="absolute top-5 left-5 right-5 flex justify-between items-center z-10">
                <div className="glass-dark-luxury px-4 py-2 rounded-full flex items-center gap-2 text-white shadow-lg border border-white/20">
                  <div className="flex text-[#FBBC05]">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <span key={i} className="material-symbols-outlined text-[15px]" style={{fontVariationSettings:"'FILL' 1"}}>star</span>
                    ))}
                  </div>
                  <span className="text-[11.5px] font-bold text-white tracking-wide">4.9/5.0 Google</span>
                </div>

                <div className="glass-dark-luxury px-3.5 py-1.5 rounded-full text-white text-[11px] font-bold uppercase tracking-widest border border-white/20">
                  Kathmandu
                </div>
              </div>

              {/* Bottom Testimonial Overlay Card (Pristine formatting, no cutoffs!) */}
              <div className="absolute bottom-5 left-5 right-5 p-5 glass-dark-luxury rounded-2xl text-white border border-white/20 backdrop-blur-md space-y-1.5 z-10">
                <p className="font-display-lg text-[16px] md:text-[17px] font-semibold text-[#ede0d9] leading-snug">
                  &ldquo;Kathmandu&apos;s absolute best beauty studio. The hair care & bridal makeover are unmatched!&rdquo;
                </p>
                <div className="flex items-center justify-between text-[12px] text-white/70 font-body-md pt-1">
                  <span>— Verified Client Review</span>
                  <span className="text-[#D4AF37] font-bold uppercase text-[10px] tracking-wider">New Baneshwor</span>
                </div>
              </div>
            </div>

            {/* Floating Secondary Gallery Card (Positioned cleanly without overlapping text) */}
            <motion.div 
              className="absolute -bottom-6 -left-6 w-36 h-36 sm:w-44 sm:h-44 rounded-2xl overflow-hidden shadow-2xl border-4 border-white z-20 hidden sm:block"
              animate={{ y: [0, -8, 0] }}
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
            >
              <Image 
                src="/gallery/salon-1.webp"
                alt="New Royal Beauty Salon Interior"
                fill
                className="object-cover"
                sizes="176px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <span className="absolute bottom-2 left-2 text-[10px] text-white font-bold bg-black/60 px-2 py-0.5 rounded-md backdrop-blur-sm">
                Sanitised Studio
              </span>
            </motion.div>

          </motion.div>

        </div>
      </section>

      {/* 3. Google Rating & Stats Bar */}
      <section className="relative z-30 px-margin-desktop max-w-container-max mx-auto py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-0 bg-white/90 backdrop-blur-md shadow-xl border border-[#D4AF37]/25 rounded-3xl overflow-hidden">
          <ScrollReveal delay={0.1} className="flex flex-col items-center justify-center p-8 border-b md:border-b-0 md:border-r border-[#D4AF37]/15 hover:bg-[#FAF9F6] transition-colors group">
            <span className="text-[#4285F4] font-bold text-xl mb-1 flex items-center gap-1">
              G <span className="material-symbols-outlined text-[20px] text-[#FBBC05]" style={{fontVariationSettings:"'FILL' 1"}}>star</span>
            </span>
            <div className="font-headline-lg text-headline-lg font-bold text-on-surface">4.9 / 5.0</div>
            <div className="font-label-md text-label-md text-on-surface-variant mt-1 font-medium">500+ Google Reviews</div>
          </ScrollReveal>
          
          <ScrollReveal delay={0.2} className="flex flex-col items-center justify-center p-8 border-b md:border-b-0 md:border-r border-[#D4AF37]/15 hover:bg-[#FAF9F6] transition-colors group">
            <span className="material-symbols-outlined text-[#D4AF37] text-[32px] mb-1 group-hover:scale-110 transition-transform">favorite</span>
            <div className="font-headline-lg text-headline-lg font-bold text-on-surface">
              <AnimatedNumber value={1000} suffix="+" />
            </div>
            <div className="font-label-md text-label-md text-on-surface-variant mt-1 font-medium">Happy Clients</div>
          </ScrollReveal>
          
          <ScrollReveal delay={0.3} className="flex flex-col items-center justify-center p-8 border-b md:border-b-0 md:border-r border-[#D4AF37]/15 hover:bg-[#FAF9F6] transition-colors group">
            <span className="material-symbols-outlined text-[#D4AF37] text-[32px] mb-1 group-hover:scale-110 transition-transform">workspace_premium</span>
            <div className="font-headline-lg text-headline-lg font-bold text-on-surface">
              <AnimatedNumber value={10} suffix="+" />
            </div>
            <div className="font-label-md text-label-md text-on-surface-variant mt-1 font-medium">Years Experience</div>
          </ScrollReveal>
          
          <ScrollReveal delay={0.4} className="flex flex-col items-center justify-center p-8 hover:bg-[#FAF9F6] transition-colors group">
            <span className="material-symbols-outlined text-[#D4AF37] text-[32px] mb-1 group-hover:scale-110 transition-transform">location_on</span>
            <div className="font-headline-lg text-headline-lg font-bold text-on-surface">New Baneshwor</div>
            <Link href="/contact" className="font-label-md text-label-md text-primary mt-1 hover:underline flex items-center font-semibold">
              Find Us on Map <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* 3.1 Awards & Certifications Showcase */}
      <section className="py-16 bg-gradient-to-b from-[#FAF9F6] via-white to-[#F8F5EF] border-y border-[#D4AF37]/20">
        <div className="w-[92%] max-w-[1240px] mx-auto px-4 md:px-12">
          <ScrollReveal delay={0.1} className="text-center mb-12 space-y-3">
            <span className="text-[12px] font-label-md uppercase tracking-[0.2em] text-[#745a32] block font-bold">
              TRUST & EXCELLENCE
            </span>
            <h2 className="font-display-lg text-[32px] md:text-[42px] text-on-surface font-semibold">
              Awards & Certifications
            </h2>
            <p className="font-body-lg text-[16px] text-on-surface-variant max-w-xl mx-auto leading-relaxed">
              We hold the highest global standards for hair transformations, aesthetic care, and hygiene.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <ScrollReveal delay={0.15} className="glass-card-luxury p-6 rounded-3xl border border-[#D4AF37]/30 flex flex-col items-center text-center group hover:-translate-y-1.5 transition-all duration-300">
              <div className="w-14 h-14 rounded-2xl gold-badge flex items-center justify-center text-white mb-4 shadow-md group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-[28px]">verified</span>
              </div>
              <h3 className="font-display-lg text-[19px] font-bold text-on-surface mb-2">L&apos;Oréal & Wella Certified</h3>
              <p className="font-body-md text-[13.5px] text-on-surface-variant leading-relaxed">
                Internationally trained stylists certified in advanced colorology & keratin care.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.2} className="glass-card-luxury p-6 rounded-3xl border border-[#D4AF37]/30 flex flex-col items-center text-center group hover:-translate-y-1.5 transition-all duration-300">
              <div className="w-14 h-14 rounded-2xl gold-badge flex items-center justify-center text-white mb-4 shadow-md group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-[28px]">military_tech</span>
              </div>
              <h3 className="font-display-lg text-[19px] font-bold text-on-surface mb-2">Top Rated Studio 2024</h3>
              <p className="font-body-md text-[13.5px] text-on-surface-variant leading-relaxed">
                Voted #1 luxury unisex beauty salon experience in New Baneshwor, Kathmandu.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.25} className="glass-card-luxury p-6 rounded-3xl border border-[#D4AF37]/30 flex flex-col items-center text-center group hover:-translate-y-1.5 transition-all duration-300">
              <div className="w-14 h-14 rounded-2xl gold-badge flex items-center justify-center text-white mb-4 shadow-md group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-[28px]">starlight</span>
              </div>
              <h3 className="font-display-lg text-[19px] font-bold text-on-surface mb-2">Master Bridal Artistry</h3>
              <p className="font-body-md text-[13.5px] text-on-surface-variant leading-relaxed">
                Award-winning HD bridal makeover specialist with bespoke pre-wedding rituals.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.3} className="glass-card-luxury p-6 rounded-3xl border border-[#D4AF37]/30 flex flex-col items-center text-center group hover:-translate-y-1.5 transition-all duration-300">
              <div className="w-14 h-14 rounded-2xl gold-badge flex items-center justify-center text-white mb-4 shadow-md group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-[28px]">sanitizer</span>
              </div>
              <h3 className="font-display-lg text-[19px] font-bold text-on-surface mb-2">100% Sanitized Studio</h3>
              <p className="font-body-md text-[13.5px] text-on-surface-variant leading-relaxed">
                Medical-grade tool sterilization, single-use kits & non-toxic luxury products.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* 3.2 Premium Brand Partners Showcase */}
      <section className="py-14 bg-[#211a16] text-[#ede0d9] overflow-hidden border-b border-white/10 relative">
        <div className="w-[92%] max-w-[1240px] mx-auto px-4 text-center mb-8">
          <span className="text-[11px] font-label-md uppercase tracking-[0.22em] text-[#D4AF37] block font-bold mb-1">
            WORLD-CLASS EXCELLENCE
          </span>
          <h3 className="font-display-lg text-[24px] md:text-[28px] font-semibold text-white">
            Premium Brands We Work With
          </h3>
        </div>

        {/* Marquee Container with Blur Vanishing Effect on Left and Right */}
        <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent_0%,black_10%,black_90%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_right,transparent_0%,black_10%,black_90%,transparent_100%)]">
          {/* Left & Right Fade & Blur Overlays */}
          <div className="absolute top-0 bottom-0 left-0 w-24 sm:w-44 bg-gradient-to-r from-[#211a16] via-[#211a16]/90 to-transparent z-10 pointer-events-none backdrop-blur-[2px]"></div>
          <div className="absolute top-0 bottom-0 right-0 w-24 sm:w-44 bg-gradient-to-l from-[#211a16] via-[#211a16]/90 to-transparent z-10 pointer-events-none backdrop-blur-[2px]"></div>

          <Marquee speed={35} pauseOnHover gradient={false}>
            {[
              { name: "L'Oréal Professional", origin: "Paris", tag: "Hair Care & Color" },
              { name: "Wella Professionals", origin: "Germany", tag: "Keratin & Shine" },
              { name: "Schwarzkopf Professional", origin: "Germany", tag: "Couture Styling" },
              { name: "Olaplex", origin: "California", tag: "Bond Building Treatment" },
              { name: "Dyson Beauty", origin: "UK", tag: "Precision Styling Tools" },
              { name: "MAC Cosmetics", origin: "USA", tag: "HD Bridal Makeover" },
            ].map((brand, idx) => (
              <div 
                key={idx} 
                className="mx-4 px-8 py-5 rounded-2xl bg-white/5 border border-white/10 hover:border-[#D4AF37]/60 hover:bg-white/10 transition-all duration-300 flex flex-col items-center justify-center shrink-0 min-w-[220px]"
              >
                <span className="font-display-lg text-lg font-bold text-white tracking-wide">{brand.name}</span>
                <div className="flex items-center gap-2 mt-1 text-[11px] text-[#D4AF37]">
                  <span>{brand.tag}</span>
                  <span className="opacity-40">•</span>
                  <span className="text-white/60">{brand.origin}</span>
                </div>
              </div>
            ))}
          </Marquee>
        </div>
      </section>

      {/* 3.5 Our Rituals / Process */}
      <section className="py-24 bg-[#f8f3ee] border-y border-[#d0c4bd]/30">
        <div className="w-[92%] max-w-[1200px] mx-auto px-6 md:px-16 lg:px-20">
          <ScrollReveal delay={0.1} className="text-center mb-16 space-y-4">
            <span className="text-[12px] font-label-md uppercase tracking-[0.15em] text-[#745a32] block font-bold">
              THE ART OF CARE
            </span>
            <h2 className="font-display-lg text-[32px] md:text-[40px] text-on-surface font-semibold">
              Our Salon Rituals
            </h2>
            <p className="font-body-lg text-[16px] text-on-surface-variant max-w-xl mx-auto leading-relaxed">
              We design experiences that elevate your natural glow through three distinct, customized stages.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ScrollReveal delay={0.15} className="bg-white p-8 rounded-3xl border border-[#d0c4bd]/20 shadow-sm flex flex-col justify-between group hover:border-[#745a32]/30 transition-all duration-300">
              <div className="space-y-6">
                <span className="font-display-lg text-4xl text-[#745a32]/30 font-bold block transition-colors group-hover:text-[#745a32]">01</span>
                <h3 className="font-display-lg text-xl font-bold text-on-surface">Precision Consultation</h3>
                <p className="font-body-md text-[14px] text-on-surface-variant leading-relaxed">
                  We analyze your skin texture, hair density, and face structure to draft a personalized care roadmap tailored exclusively to your goals.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.2} className="bg-white p-8 rounded-3xl border border-[#d0c4bd]/20 shadow-sm flex flex-col justify-between group hover:border-[#745a32]/30 transition-all duration-300">
              <div className="space-y-6">
                <span className="font-display-lg text-4xl text-[#745a32]/30 font-bold block transition-colors group-hover:text-[#745a32]">02</span>
                <h3 className="font-display-lg text-xl font-bold text-on-surface">The Treatment Ritual</h3>
                <p className="font-body-md text-[14px] text-on-surface-variant leading-relaxed">
                  Relax in our sanitized sanctuary while our master stylists perform your treatments using internationally certified, premium botanical products.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.25} className="bg-white p-8 rounded-3xl border border-[#d0c4bd]/20 shadow-sm flex flex-col justify-between group hover:border-[#745a32]/30 transition-all duration-300">
              <div className="space-y-6">
                <span className="font-display-lg text-4xl text-[#745a32]/30 font-bold block transition-colors group-hover:text-[#745a32]">03</span>
                <h3 className="font-display-lg text-xl font-bold text-on-surface">Aftercare Blueprint</h3>
                <p className="font-body-md text-[14px] text-on-surface-variant leading-relaxed">
                  To prolong your glowing results, we prescribe a bespoke home care routine along with top-tier products recommended by our skin & hair experts.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* 4. Salon Vibes Marquee */}
      <section className="py-12 bg-surface-container-lowest overflow-hidden">
        <ScrollReveal delay={0.1} className="text-center mb-8">
          <h2 className="font-headline-md text-headline-md text-primary tracking-widest uppercase">Salon Vibes</h2>
        </ScrollReveal>
        <Marquee speed={30} pauseOnHover gradient={false}>
          {[
            "/gallery/salon-2.webp",
            "/gallery/salon-3.webp",
            "/gallery/salon-4.webp",
            "/gallery/salon-5.webp",
            "/gallery/salon-6.webp"
          ].map((src, idx) => (
            <div key={idx} className="mx-4 relative w-64 h-80 overflow-hidden group shadow-md border border-black/5">
              <Image 
                src={src} 
                alt="Salon Vibe" 
                fill 
                className="object-cover group-hover:scale-110 transition-transform duration-700" 
                sizes="256px"
              />
            </div>
          ))}
        </Marquee>
      </section>

      {/* 5. Our Work (Portfolio Grid) */}
      <section className="py-24 px-margin-desktop max-w-container-max mx-auto">
        <ScrollReveal delay={0.1} className="text-center mb-16 space-y-4">
          <h2 className="font-display-lg text-display-lg text-on-surface">Our Work</h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto">
            Professional Hair & Beauty Services. See some of our best transformations and styling work from clients in Kathmandu.
          </p>
        </ScrollReveal>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { title: "Royal Glam Session", cat: "Editorial", img: "/gallery/salon-9.webp" },
            { title: "Signature Bridal Glow", cat: "Bridal", img: "/gallery/salon-8.webp" },
            { title: "Red-Carpet Blowout", cat: "Hair", img: "/gallery/salon-6.webp" },
            { title: "Custom Color Reveal", cat: "Color", img: "/gallery/salon-7.webp" },
            { title: "Velvet Smokey Lash", cat: "Makeup", img: "/gallery/salon-3.webp" },
            { title: "Designer Highlights", cat: "Color", img: "/gallery/salon-1.webp" }
          ].map((item, i) => (
            <Link href="/gallery" key={i} className="block w-full h-full">
              <ScrollReveal delay={0.1 * i} className="group relative aspect-square overflow-hidden cursor-pointer border border-black/5 rounded-2xl">
                <div className="absolute inset-0 bg-surface-dim">
                  <Image 
                    src={item.img} 
                    alt={item.title} 
                    fill 
                    className="object-cover group-hover:scale-110 transition-transform duration-700" 
                    sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute bottom-0 left-0 p-6 z-20 text-white translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                  <span className="text-xs uppercase tracking-wider text-primary-container bg-black/50 px-2 py-1 rounded-full mb-2 inline-block">{item.cat}</span>
                  <h4 className="font-headline-md text-headline-md">{item.title}</h4>
                  <p className="text-sm opacity-80">New Royal · Studio</p>
                </div>
              </ScrollReveal>
            </Link>
          ))}
        </div>
      </section>

      {/* 6. Real Results (Before/After Slider) */}
      <section className="py-24 bg-surface-container-lowest border-y border-primary-container/10">
        <div className="px-margin-desktop max-w-container-max mx-auto">
          <ScrollReveal delay={0.1} className="text-center mb-16 space-y-4">
            <h2 className="font-display-lg text-display-lg text-on-surface">Real Results</h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-xl mx-auto">
              Before / After Examples. Drag the handle to see real transformations from our recent clients.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <ScrollReveal delay={0.2} className="lg:col-span-8 overflow-hidden shadow-premium h-[380px] sm:h-[500px] md:h-[600px] border border-primary-container/10">
              <ReactCompareSlider
                className="w-full h-full object-cover"
                itemOne={<ReactCompareSliderImage src="/before_hair.jpg" alt="Before" />}
                itemTwo={<ReactCompareSliderImage src="/after_hair.jpg" alt="After" />}
              />
            </ScrollReveal>
            <ScrollReveal delay={0.4} className="lg:col-span-4 space-y-6">
              <div className="bg-white p-7 sm:p-8 rounded-3xl shadow-premium border border-primary-container/20 space-y-6">
                <div>
                  <div className="inline-block bg-[#D4AF37]/15 text-[#745a32] px-3.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-widest mb-3">
                    Stylist Report
                  </div>
                  <h3 className="font-headline-lg text-[22px] font-bold text-on-surface leading-snug">
                    Blonde Highlights & Restructure
                  </h3>
                </div>

                <p className="text-on-surface-variant font-body-md text-[14px] leading-relaxed">
                  Client had dry hair and frizz. We applied custom blonde highlights with keratin treatment. Results: shiny, healthy, soft hair.
                </p>

                <div className="space-y-3 border-t border-primary-container/15 pt-5 text-[13.5px]">
                  <div className="flex justify-between items-center">
                    <span className="text-on-surface-variant">Time Taken</span>
                    <span className="font-semibold text-primary">120 Minutes</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-on-surface-variant">Main Stylist</span>
                    <span className="font-semibold text-primary">Hair Color Specialist</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-on-surface-variant">Products Used</span>
                    <span className="font-semibold text-primary">Keratin & Premium Color</span>
                  </div>
                </div>

                <Link 
                  href={`https://wa.me/${(settings?.whatsappNumber || "9779813451412").replace(/[^0-9]/g, "")}`} 
                  target="_blank"
                  className="block w-full pt-2"
                >
                  <button className="w-full py-3.5 px-5 gold-button rounded-full text-[12px] sm:text-[13px] font-bold uppercase tracking-[0.1em] flex items-center justify-center gap-2 shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all">
                    <span className="material-symbols-outlined text-[18px]">chat</span>
                    <span>Book Similar Treatment</span>
                  </button>
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* 7. Our Services */}
      <section className="py-24 px-margin-desktop max-w-container-max mx-auto">
        <ScrollReveal delay={0.1} className="text-center mb-16 space-y-4">
          <h2 className="font-display-lg text-display-lg text-on-surface">Our Services</h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto">
            Hair, Beauty & Makeup Services. We offer professional hair care, beauty treatments, and makeup services.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.length > 0 ? services.map((service, idx) => (
            <ScrollReveal key={idx} delay={0.1 * (idx % 3)} className="bg-white border border-transparent p-10 shadow-premium hover:shadow-premium-hover hover:-translate-y-2 transition-all duration-300 group">
              <div className="w-12 h-12 bg-primary/10 text-primary flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-[#111111] transition-colors rounded-sm">
                <span className="material-symbols-outlined">spa</span>
              </div>
              <span className="text-xs font-bold text-on-surface-variant uppercase tracking-wider block mb-2">{service.category?.name || "Service"}</span>
              <h3 className="font-headline-md text-headline-md text-on-surface mb-3 group-hover:text-primary transition-colors">{service.title}</h3>
              <p className="text-on-surface-variant font-body-md mb-6 line-clamp-3">{service.description}</p>
              <Link href={`/services/${service.slug}`} className="font-label-md text-primary flex items-center gap-1 hover:underline">
                Book Service <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </Link>
            </ScrollReveal>
          )) : (
            <div className="col-span-3 text-center py-12 text-on-surface-variant">
              No services added yet. Please add them from the Admin Panel.
            </div>
          )}
        </div>

        {services.length > 0 && (
          <div className="text-center mt-12">
            <Link href="/services">
              <button className="bg-black hover:bg-[#745a32] text-white px-8 py-3.5 rounded-full font-label-md text-[12px] uppercase tracking-widest transition-all duration-300 shadow-md">
                Show All Services
              </button>
            </Link>
          </div>
        )}
      </section>

      {/* 7.5 Seasonal Specials / Offers */}
      <section className="py-24 bg-white border-b border-outline-variant/30">
        <div className="w-[92%] max-w-[1200px] mx-auto px-6 md:px-16 lg:px-20">
          <ScrollReveal delay={0.1} className="text-center mb-16 space-y-4">
            <span className="text-[12px] font-label-md uppercase tracking-[0.15em] text-[#745a32] block font-bold">
              EXCLUSIVE PACKAGES
            </span>
            <h2 className="font-display-lg text-[32px] md:text-[40px] text-on-surface font-semibold">
              Seasonal Specials
            </h2>
            <p className="font-body-lg text-[16px] text-on-surface-variant max-w-xl mx-auto leading-relaxed">
              Indulge in our carefully curated treatment combinations designed to provide complete rejuvenation at exceptional value.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {specials.length > 0 ? (
              specials.map((special, idx) => (
                <ScrollReveal key={special.id} delay={0.15 + (idx * 0.05)} className="bg-[#f8f3ee] p-8 rounded-3xl border border-[#d0c4bd]/40 flex flex-col justify-between hover:border-[#745a32]/40 transition-all duration-300 shadow-sm">
                  <div className="space-y-6">
                    <span className="text-[10px] font-label-md uppercase tracking-wider text-[#745a32] bg-[#fedaa8] px-3 py-1 rounded-full inline-block font-bold">
                      {special.tag}
                    </span>
                    <h3 className="font-display-lg text-xl font-bold text-on-surface">{special.title}</h3>
                    <p className="font-body-md text-[14px] text-on-surface-variant leading-relaxed">
                      {special.description}
                    </p>
                  </div>
                  <div className="pt-8 border-t border-[#d0c4bd]/30 mt-8 flex justify-between items-center">
                    <span className="font-display-lg text-lg font-bold text-on-surface">Rs. {special.price.toLocaleString()}</span>
                    <Link href={special.bookingLink}>
                      <button className="bg-black hover:bg-[#745a32] text-white px-5 py-2 rounded-full font-label-md text-[11px] uppercase tracking-widest transition-all duration-300">
                        Book Package
                      </button>
                    </Link>
                  </div>
                </ScrollReveal>
              ))
            ) : (
              <div className="col-span-3 text-center py-12 text-on-surface-variant italic font-body-md">
                No seasonal specials available at the moment.
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 7.7 Founder Spotlight */}
      <section className="py-24 bg-[#ece7e2] border-b border-[#d0c4bd]/40">
        <div className="w-[92%] max-w-[1200px] mx-auto px-6 md:px-16 lg:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Image Column */}
            <ScrollReveal delay={0.15} className="lg:col-span-5 relative aspect-[4/5] rounded-[2rem] overflow-hidden bg-surface-dim shadow-premium border border-primary-container/5">
              <Image 
                src="/gallery/salon-7.webp"
                alt="Sita Sharma"
                fill
                className="object-cover hover:scale-102 transition-transform duration-700"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
            </ScrollReveal>

            {/* Text details Column */}
            <ScrollReveal delay={0.2} className="lg:col-span-7 space-y-6">
              <span className="text-[12px] font-label-md uppercase tracking-[0.15em] text-[#745a32] block font-bold">
                MEET OUR FOUNDER
              </span>
              <h2 className="font-display-lg text-[32px] md:text-[40px] text-on-surface font-semibold leading-tight">
                Crafting Conscious Beauty
              </h2>
              <p className="font-body-lg text-[16px] text-on-surface-variant leading-relaxed italic">
                &ldquo;Beauty is an intentional ritual of restoration and self-love. For over 15 years, my mission has been to bring premium, organic-led beauty services to Kathmandu, honoring each client&apos;s natural essence.&rdquo;
              </p>
              <div className="pt-4 flex flex-wrap gap-4">
                <Link href="/team">
                  <button className="bg-black hover:bg-[#745a32] text-white px-8 py-3.5 rounded-full font-label-md text-[12px] uppercase tracking-widest transition-all duration-300">
                    Meet The Team
                  </button>
                </Link>
                <Link href="/book">
                  <button className="border border-black hover:bg-black hover:text-white text-black px-8 py-3.5 rounded-full font-label-md text-[12px] uppercase tracking-widest transition-all duration-300">
                    Book Appointment
                  </button>
                </Link>
              </div>
            </ScrollReveal>

          </div>
        </div>
      </section>

      {/* 8. Client Reviews */}
      <section className="py-24 bg-surface-container-low border-y border-primary-container/10">
        <div className="w-[92%] max-w-[1200px] mx-auto px-6 md:px-16 lg:px-20">
          <ScrollReveal delay={0.1} className="text-center mb-16 space-y-4">
            <h2 className="font-display-lg text-[32px] md:text-[40px] text-on-surface">What Our Clients Say</h2>
            <p className="font-body-lg text-[16px] text-on-surface-variant max-w-xl mx-auto leading-relaxed">
              Read genuine, verified reviews from our valued clients in New Baneshwor, Kathmandu.
            </p>
          </ScrollReveal>

          {testimonials.length > 0 ? (
            <div className="w-full relative py-4">
              <Marquee speed={40} direction="right" pauseOnHover gradient={true} gradientColor="#f8f3ee">
                {testimonials.map((review) => (
                  <div 
                    key={review.id} 
                    className="w-[380px] mx-4 shrink-0 animate-none"
                  >
                    <div className="bg-white p-8 rounded-2xl shadow-premium border border-primary-container/5 flex flex-col justify-between hover:border-[#745a32]/30 transition-all duration-300 h-full min-h-[260px]">
                      <div className="space-y-4 mb-6">
                        <div className="flex gap-1 text-[#FBBC05]">
                          {Array.from({ length: review.rating }).map((_, s) => (
                            <span key={s} className="material-symbols-outlined text-[16px]" style={{fontVariationSettings:"'FILL' 1"}}>star</span>
                          ))}
                        </div>
                        <p className="text-on-surface-variant font-body-md text-[14px] leading-relaxed italic line-clamp-5">
                          &ldquo;{review.content}&rdquo;
                        </p>
                      </div>
                      <div className="flex items-center gap-3.5 pt-4 border-t border-primary-container/5 mt-auto">
                        <div className="w-10 h-10 bg-primary/10 text-primary flex items-center justify-center font-bold text-sm rounded-full shrink-0">
                          {review.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-label-lg text-[14px] font-bold text-on-surface leading-tight">{review.name}</p>
                          <p className="text-[12px] text-on-surface-variant flex items-center gap-1 mt-0.5">
                            <span className="material-symbols-outlined text-[12px] text-green-600">verified</span> 
                            {review.role || "Verified Client"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </Marquee>
            </div>
          ) : (
            <div className="text-center py-12 text-on-surface-variant">
              No testimonials added yet. Please add them from the Admin Panel.
            </div>
          )}
        </div>
      </section>

      {/* 9. Contact Section */}
      <section className="py-24 px-margin-desktop max-w-container-max mx-auto">
        <ScrollReveal delay={0.2} direction="up" className="bg-surface shadow-premium flex flex-col md:flex-row border border-primary-container/10 group overflow-hidden rounded-3xl">
          <div className="w-full md:w-1/2 h-[400px] md:h-auto min-h-[400px] relative overflow-hidden block">
            <iframe
              src="https://maps.google.com/maps?q=M8RP%2BCCR,+Kathmandu+44600&t=&z=15&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="grayscale group-hover:grayscale-0 transition-all duration-700 w-full h-full"
            ></iframe>
          </div>
          <div className="w-full md:w-1/2 p-12 lg:p-20 flex flex-col justify-center space-y-8">
            <h2 className="font-headline-lg text-headline-lg text-on-surface group-hover:text-primary transition-colors duration-500">Visit Our Salon</h2>
            <p className="text-on-surface-variant font-body-md">Call or message us on WhatsApp to book an appointment. We are open every day.</p>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 shrink-0 rounded-full bg-primary-container/20 text-primary flex items-center justify-center">
                  <span className="material-symbols-outlined text-[20px]">location_on</span>
                </div>
                <div>
                  <p className="font-label-lg text-label-lg text-on-surface">
                    <a href={settings.googleMapsUrl || "https://maps.google.com/?q=M8RP%2BCCR,+Kathmandu+44600"} target="_blank" rel="noopener noreferrer" className="hover:underline">
                      {settings.address}
                    </a>
                  </p>
                  <p className="text-sm text-on-surface-variant">Nepal</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 shrink-0 rounded-full bg-primary-container/20 text-primary flex items-center justify-center">
                  <span className="material-symbols-outlined text-[20px]">schedule</span>
                </div>
                <div>
                  <p className="font-label-lg text-label-lg text-on-surface">Everyday</p>
                  <p className="text-sm text-on-surface-variant">{settings.businessHours}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 shrink-0 rounded-full bg-primary-container/20 text-primary flex items-center justify-center">
                  <span className="material-symbols-outlined text-[20px]">call</span>
                </div>
                <div>
                  <p className="font-label-lg text-label-lg text-on-surface">WhatsApp / Call: {settings.contactPhone}</p>
                  <p className="text-sm text-on-surface-variant">Sanitised studio with imported products.</p>
                </div>
              </div>
            </div>
            <div className="pt-4 flex gap-4">
              <Link href={`https://wa.me/${settings.whatsappNumber}`} target="_blank" className="w-full">
                <button className="w-full py-4 bg-[#25D366] text-white font-label-lg text-label-lg uppercase tracking-widest shadow-premium hover:-translate-y-1 hover:shadow-premium-hover duration-300 flex justify-center gap-2">
                  <span className="material-symbols-outlined">chat</span> Message
                </button>
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </main>
  );
}
