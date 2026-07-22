import { SiteSettings } from "@prisma/client";
import Link from "next/link";

interface ConciergeProps {
  settings: SiteSettings | null;
}

export default function Concierge({ settings }: ConciergeProps) {
  return (
    <aside className="fixed bottom-6 right-6 flex flex-col gap-3.5 z-50">
      
      {/* 1. Book Appointment (Gold Gradient) */}
      <Link href="/book" title="Book Your Appointment" className="group relative flex items-center">
        <span className="absolute right-16 bg-[#211a16] text-[#ede0d9] text-[11px] font-bold px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap shadow-md border border-white/10">
          Book Appointment
        </span>
        <button className="w-13 h-13 md:w-14 md:h-14 rounded-full gold-button flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-all duration-300">
          <span className="material-symbols-outlined text-[24px]">event_available</span>
        </button>
      </Link>

      {/* 2. Call Hotline (Warm Charcoal Luxury) */}
      <a 
        href={`tel:${settings?.contactPhone || "+9779813451412"}`} 
        title="Call Now"
        className="group relative flex items-center"
      >
        <span className="absolute right-16 bg-[#211a16] text-[#ede0d9] text-[11px] font-bold px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap shadow-md border border-white/10">
          Call Salon Now
        </span>
        <button className="w-13 h-13 md:w-14 md:h-14 rounded-full bg-[#211a16] text-[#ede0d9] flex items-center justify-center shadow-[0_4px_12px_rgba(33,26,22,0.3)] hover:scale-110 active:scale-95 transition-all duration-300 border border-primary/30">
          <span className="material-symbols-outlined text-[24px]">call</span>
        </button>
      </a>

      {/* 3. WhatsApp Chat (Conversion Green with Glow) */}
      <a
        href={`https://wa.me/${(settings?.whatsappNumber || "9779813451412").replace(/[^0-9]/g, "")}?text=Hello%20New%20Royal%20Beauty%20Studio,%20I%20would%20like%20to%20book%20an%20appointment.`}
        target="_blank"
        rel="noreferrer"
        title="Book on WhatsApp"
        className="group relative flex items-center"
      >
        <span className="absolute right-16 bg-[#211a16] text-[#ede0d9] text-[11px] font-bold px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap shadow-md border border-white/10">
          Book on WhatsApp
        </span>
        <button className="w-13 h-13 md:w-14 md:h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-[0_4px_16px_rgba(37,211,102,0.4)] hover:scale-110 active:scale-95 transition-all duration-300 relative">
          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-red-500 rounded-full border-2 border-white animate-pulse"></span>
          <span className="material-symbols-outlined text-[26px]">chat</span>
        </button>
      </a>

    </aside>
  );
}
