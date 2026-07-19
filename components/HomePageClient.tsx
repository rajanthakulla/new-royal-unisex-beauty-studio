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

      {/* Hero Section */}
      <section className="relative pt-32 pb-24 px-6 md:px-16 lg:px-20 max-w-7xl mx-auto overflow-visible">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Left: Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="h-px w-12 bg-primary"></div>
              <span className="font-label-md text-[13px] text-primary uppercase tracking-[0.2em] font-bold">
                Luxury & Precision
              </span>
            </div>
            <h1 className="font-display-lg text-[48px] md:text-[64px] lg:text-[76px] text-on-surface leading-[1.1] mb-8 tracking-tight drop-shadow-sm">
              Unveil Your <br/>
              <span className="italic text-primary font-light">True Radiance</span>
            </h1>
            <p className="font-body-lg text-[18px] text-on-surface-variant mb-6 max-w-xl leading-relaxed">
              Step into Kathmandu&apos;s premier beauty sanctuary where <strong className="text-on-surface font-semibold">world-class artistry</strong> meets <strong className="text-on-surface font-semibold">unparalleled luxury</strong>. Experience holistic rituals tailored exclusively to elevate your natural glow and rejuvenate your spirit.
            </p>
            <ul className="space-y-4 mb-10 text-on-surface-variant font-medium">
              <li className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary text-[22px]">verified</span>
                <span>Internationally Certified Beauty Experts</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary text-[22px]">spa</span>
                <span>Premium Quality Non-Toxic Products</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary text-[22px]">star</span>
                <span>Award-Winning Bridal Makeovers</span>
              </li>
            </ul>
            <div className="flex flex-wrap gap-4">
              <Link href="/services">
                <motion.button 
                  whileHover={{ scale: 1.05 }} 
                  whileTap={{ scale: 0.95 }}
                  className="bg-on-surface text-white px-10 py-4 rounded-full font-label-md text-[12px] uppercase tracking-[0.1em] font-bold hover:bg-primary transition-colors"
                >
                  Explore Services
                </motion.button>
              </Link>
              <Link href="/gallery">
                <motion.button 
                  whileHover={{ scale: 1.05 }} 
                  whileTap={{ scale: 0.95 }}
                  className="border border-outline text-on-surface px-10 py-4 rounded-full font-label-md text-[12px] uppercase tracking-[0.1em] font-bold hover:border-primary hover:text-primary transition-colors"
                >
                  View Gallery
                </motion.button>
              </Link>
            </div>
          </motion.div>

          {/* Right: Overlapping Images */}
          <motion.div 
            className="relative h-[500px] md:h-[600px] w-full max-w-[550px] mx-auto lg:ml-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Rotated accent rectangle */}
            <div className="absolute inset-0 bg-primary/5 rounded-2xl -rotate-3"></div>
            
            {/* Main Image (top-right) */}
            <motion.div 
              className="absolute top-0 right-0 w-4/5 h-4/5 rounded-2xl overflow-hidden shadow-2xl z-10"
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 7, ease: "easeInOut" }}
            >
              <Image 
                src="/gallery/hero-main.png"
                alt="Beauty Model"
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 80vw, 40vw"
              />
            </motion.div>
            
            {/* Secondary Image (bottom-left, overlapping) */}
            <motion.div 
              className="absolute bottom-0 left-0 w-3/5 h-3/5 rounded-2xl overflow-hidden shadow-xl z-20 border-8 border-background"
              animate={{ y: [0, -12, 0] }}
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
            >
              <Image 
                src="/gallery/salon-1.webp"
                alt="Spa Treatment"
                fill
                priority
                className="object-cover"
                sizes="(max-width: 768px) 60vw, 30vw"
              />
            </motion.div>
          </motion.div>

        </div>
      </section>

      {/* 3. Google Rating & Stats */}
      <section className="relative z-30 px-margin-desktop max-w-container-max mx-auto py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-0 bg-white shadow-premium border border-primary-container/20">
          <ScrollReveal delay={0.1} className="flex flex-col items-center justify-center p-8 border-b md:border-b-0 md:border-r border-primary-container/10 hover:bg-surface-container-low transition-colors group">
            <span className="text-[#4285F4] font-bold text-xl mb-2 flex items-center gap-1">
              G <span className="material-symbols-outlined text-[18px] text-[#FBBC05]" style={{fontVariationSettings:"'FILL' 1"}}>star</span>
            </span>
            <div className="font-headline-lg text-headline-lg text-on-surface">4.9 / 5</div>
            <div className="font-label-md text-label-md text-on-surface-variant mt-1">Google Rating</div>
          </ScrollReveal>
          <ScrollReveal delay={0.2} className="flex flex-col items-center justify-center p-8 border-b md:border-b-0 md:border-r border-primary-container/5 hover:bg-surface-container-low transition-colors group">
            <span className="material-symbols-outlined text-primary text-[32px] mb-2 group-hover:scale-110 transition-transform">favorite</span>
            <div className="font-headline-lg text-headline-lg text-primary">1000+</div>
            <div className="font-label-md text-label-md text-on-surface-variant mt-1">Happy Clients</div>
          </ScrollReveal>
          <ScrollReveal delay={0.3} className="flex flex-col items-center justify-center p-8 border-b md:border-b-0 md:border-r border-primary-container/5 hover:bg-surface-container-low transition-colors group">
            <span className="material-symbols-outlined text-primary text-[32px] mb-2 group-hover:scale-110 transition-transform">workspace_premium</span>
            <div className="font-headline-lg text-headline-lg text-primary">10+</div>
            <div className="font-label-md text-label-md text-on-surface-variant mt-1">Years Experience</div>
          </ScrollReveal>
          <ScrollReveal delay={0.4} className="flex flex-col items-center justify-center p-8 hover:bg-surface-container-low transition-colors group">
            <span className="material-symbols-outlined text-primary text-[32px] mb-2 group-hover:scale-110 transition-transform">location_on</span>
            <div className="font-headline-lg text-headline-lg text-primary">1.3 km</div>
            <Link href="/contact" className="font-label-md text-label-md text-primary mt-1 hover:underline flex items-center">
              Find Us on Map <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </Link>
          </ScrollReveal>
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

      {/* 3.5 By The Numbers / Impact */}
      <section className="py-20 bg-[#211a16] text-[#ede0d9]">
        <div className="max-w-container-max mx-auto px-margin-desktop grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
          <ScrollReveal direction="up" delay={0.1} className="space-y-3">
            <h3 className="font-display-lg text-[48px] md:text-[64px] text-[#D4AF37]">
              <AnimatedNumber value={15} suffix="+" />
            </h3>
            <p className="font-label-md uppercase tracking-[0.2em] text-[11px] text-white/60">Years Experience</p>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.2} className="space-y-3">
            <h3 className="font-display-lg text-[48px] md:text-[64px] text-[#D4AF37]">
              <AnimatedNumber value={5000} suffix="+" />
            </h3>
            <p className="font-label-md uppercase tracking-[0.2em] text-[11px] text-white/60">Happy Brides</p>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.3} className="space-y-3">
            <h3 className="font-display-lg text-[48px] md:text-[64px] text-[#D4AF37]">
              <AnimatedNumber value={50} suffix="+" />
            </h3>
            <p className="font-label-md uppercase tracking-[0.2em] text-[11px] text-white/60">Premium Services</p>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.4} className="space-y-3">
            <h3 className="font-display-lg text-[48px] md:text-[64px] text-[#D4AF37]">
              <AnimatedNumber value={100} suffix="%" />
            </h3>
            <p className="font-label-md uppercase tracking-[0.2em] text-[11px] text-white/60">Satisfaction</p>
          </ScrollReveal>
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
            <ScrollReveal delay={0.2} className="lg:col-span-8 overflow-hidden shadow-premium h-[600px] border border-primary-container/10">
              <ReactCompareSlider
                className="w-full h-full object-cover"
                itemOne={<ReactCompareSliderImage src="/before_hair.jpg" alt="Before" />}
                itemTwo={<ReactCompareSliderImage src="/after_hair.jpg" alt="After" />}
              />
            </ScrollReveal>
            <ScrollReveal delay={0.4} className="lg:col-span-4 space-y-8">
              <div className="bg-white p-10 shadow-premium border border-primary-container/10">
                <div className="inline-block bg-primary/10 text-primary px-3 py-1 text-xs font-bold uppercase tracking-widest mb-4">Stylist Report</div>
                <h3 className="font-headline-lg text-headline-lg text-on-surface mb-4">Blonde Highlights & Restructure</h3>
                <p className="text-on-surface-variant font-body-md mb-6 leading-relaxed">
                  Client had dry hair and frizz. We applied custom blonde highlights with keratin treatment. Results: shiny, healthy, soft hair.
                </p>
                <div className="space-y-4 border-t border-primary-container/10 pt-6">
                  <div className="flex justify-between">
                    <span className="text-on-surface-variant text-sm">Time Taken</span>
                    <span className="font-semibold text-primary text-sm">120 Minutes</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-on-surface-variant text-sm">Main Stylist</span>
                    <span className="font-semibold text-primary text-sm">Hair Color Specialist</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-on-surface-variant text-sm">Products</span>
                    <span className="font-semibold text-primary text-sm">Keratin & Premium Color</span>
                  </div>
                </div>
                <Link href={`https://wa.me/${settings.whatsappNumber}`} target="_blank">
                  <button className="w-full mt-8 py-4 bg-primary text-[#111111] font-label-md hover:bg-primary/90 transition-colors uppercase tracking-widest">Book Similar Treatment</button>
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
