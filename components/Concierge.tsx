import { SiteSettings } from "@prisma/client";
import Link from "next/link";

interface ConciergeProps {
  settings: SiteSettings | null;
}

export default function Concierge({ settings }: ConciergeProps) {
  return (
    <aside className="fixed bottom-6 right-6 flex flex-col gap-3.5 z-50">
      
      {/* 1. Blog (Gold Gradient) */}
      <Link href="/blog" title="Read Our Blog">
        <button className="w-14 h-14 rounded-full bg-gradient-to-tr from-[#D4AF37] to-[#C5A059] text-white flex items-center justify-center shadow-[0_4px_12px_rgba(197,160,89,0.3)] hover:scale-110 active:scale-95 transition-all duration-300">
          <span className="material-symbols-outlined text-[26px]">auto_stories</span>
        </button>
      </Link>

      {/* 2. Location / Maps (Warm Charcoal) */}
      <a href={settings?.googleMapsUrl || "https://maps.google.com/?q=M8RP%2BCCR,+Kathmandu+44600"} target="_blank" rel="noopener noreferrer" title="View on Maps">
        <button className="w-14 h-14 rounded-full bg-[#211a16] text-[#ede0d9] flex items-center justify-center shadow-[0_4px_12px_rgba(33,26,22,0.3)] hover:scale-110 active:scale-95 transition-all duration-300 border border-white/5">
          <span className="material-symbols-outlined text-[24px]">location_on</span>
        </button>
      </a>

      {/* 3. Book Appointment (Gold Gradient) */}
      <Link href="/book" title="Book Appointment">
        <button className="w-14 h-14 rounded-full bg-gradient-to-tr from-[#D4AF37] to-[#C5A059] text-white flex items-center justify-center shadow-[0_4px_12px_rgba(197,160,89,0.3)] hover:scale-110 active:scale-95 transition-all duration-300">
          <span className="material-symbols-outlined text-[24px]">event_available</span>
        </button>
      </Link>

      {/* 4. Call Hotline (Warm Charcoal) */}
      <a href={`tel:${settings?.contactPhone || "+9779813451412"}`} title="Call Now">
        <button className="w-14 h-14 rounded-full bg-[#211a16] text-[#ede0d9] flex items-center justify-center shadow-[0_4px_12px_rgba(33,26,22,0.3)] hover:scale-110 active:scale-95 transition-all duration-300 border border-white/5">
          <span className="material-symbols-outlined text-[24px]">call</span>
        </button>
      </a>

      {/* 5. WhatsApp Chat (Elegant Theme Green or Branding Green) */}
      <a
        href={`https://wa.me/${(settings?.whatsappNumber || "9779813451412").replace(/[^0-9]/g, "")}`}
        target="_blank"
        rel="noreferrer"
        title="WhatsApp Support"
      >
        <button className="w-14 h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-[0_4px_12px_rgba(37,211,102,0.3)] hover:scale-110 active:scale-95 transition-all duration-300">
          <span className="material-symbols-outlined text-[26px]">chat</span>
        </button>
      </a>

    </aside>
  );
}
