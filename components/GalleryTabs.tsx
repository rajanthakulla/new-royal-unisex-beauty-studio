"use client";

import { useState } from "react";
import Image from "next/image";
import ScrollReveal from "@/components/ScrollReveal";

interface GalleryItem {
  id: string;
  url: string;
  type: string;
  caption: string;
  category: string;
}

interface GalleryTabsProps {
  items: GalleryItem[];
}

export default function GalleryTabs({ items }: GalleryTabsProps) {
  const [activeTab, setActiveTab] = useState("All");
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  const tabs = ["All", "Hair", "Bridal", "Nails"];

  const filteredItems = activeTab === "All" 
    ? items 
    : items.filter(item => item.category.toLowerCase() === activeTab.toLowerCase());

  return (
    <div className="space-y-12">
      
      {/* Category Tabs */}
      <div className="flex justify-center items-center gap-3 overflow-x-auto no-scrollbar pb-2">
        <div className="inline-flex bg-surface-container-low p-1.5 rounded-full border border-outline-variant/30">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2.5 rounded-full font-label-md text-[13px] tracking-wide transition-all ${
                activeTab === tab
                  ? "bg-on-surface text-white shadow-sm"
                  : "text-on-surface-variant hover:text-on-surface"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredItems.map((item, idx) => (
          <ScrollReveal 
            key={item.id} 
            delay={0.05 * (idx % 3)} 
            className="group relative aspect-square overflow-hidden rounded-3xl shadow-premium border border-primary-container/5 cursor-pointer bg-surface-dim"
            onClick={() => setLightboxImage(item.url)}
          >
            <Image 
              src={item.url} 
              alt={item.caption} 
              fill 
              className="object-cover group-hover:scale-105 transition-transform duration-700"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
            
            {/* Hover details overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6 z-10">
              <span className="text-[10px] uppercase tracking-widest text-[#e3c191] bg-black/40 px-3 py-1 rounded-full w-fit mb-2 font-bold">
                {item.category}
              </span>
              <h4 className="font-headline-md text-white text-[16px] font-bold leading-snug">{item.caption}</h4>
            </div>
          </ScrollReveal>
        ))}
      </div>

      {/* Lightbox Modal */}
      {lightboxImage && (
        <div 
          className="fixed inset-0 bg-black/95 z-[200] flex items-center justify-center p-4 backdrop-blur-md transition-all duration-300 animate-fadeIn"
          onClick={() => setLightboxImage(null)}
        >
          <button 
            className="absolute top-6 right-6 text-white/80 hover:text-white hover:scale-110 transition-transform"
            onClick={() => setLightboxImage(null)}
          >
            <span className="material-symbols-outlined text-[36px]">close</span>
          </button>
          
          <div className="relative w-full max-w-4xl max-h-[85vh] aspect-[4/3] md:aspect-video rounded-2xl overflow-hidden shadow-2xl">
            <Image 
              src={lightboxImage} 
              alt="Lightbox View" 
              fill 
              className="object-contain" 
              sizes="90vw"
            />
          </div>
        </div>
      )}

    </div>
  );
}
