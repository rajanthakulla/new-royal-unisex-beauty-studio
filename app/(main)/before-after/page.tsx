"use client";

import PageHeader from "@/components/PageHeader";
import ScrollReveal from "@/components/ScrollReveal";
import { ReactCompareSlider, ReactCompareSliderImage } from "react-compare-slider";

export default function BeforeAfterPage() {
  const comparisons = [
    {
      title: "Premium Balayage Highlights",
      desc: "Color correction, volume restoration, and warm blonde balayage transformation.",
      before: "/gallery/salon-9.webp",
      after: "/gallery/hero-main.png"
    },
    {
      title: "Royal Bridal Makeover",
      desc: "Complete bridal makeup, custom styling, and traditional saree draping transformation.",
      before: "/gallery/salon-1.webp",
      after: "/gallery/salon-2.webp"
    }
  ];

  return (
    <main className="pb-24">
      <PageHeader 
        title="Before & After" 
        subtitle="Witness the royal transformation. Slide to compare."
      />
      
      <section className="px-6 md:px-16 lg:px-20 w-[92%] max-w-[1200px] mx-auto py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {comparisons.map((item, i) => (
            <ScrollReveal key={i} delay={0.1 * (i % 2)} className="space-y-6 flex flex-col items-center">
              <div className="rounded-[2rem] overflow-hidden shadow-premium border border-primary-container/10 aspect-[4/3] w-full max-w-[500px]">
                <ReactCompareSlider
                  itemOne={<ReactCompareSliderImage src={item.before} alt="Before" className="filter brightness-90" />}
                  itemTwo={<ReactCompareSliderImage src={item.after} alt="After" />}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-center max-w-sm">
                <h3 className="font-display-lg text-[20px] font-bold text-on-surface mb-2">{item.title}</h3>
                <p className="font-body-md text-[14px] text-on-surface-variant leading-relaxed">{item.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>
    </main>
  );
}
