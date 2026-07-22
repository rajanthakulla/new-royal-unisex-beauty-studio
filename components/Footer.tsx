import Link from "next/link";
import Image from "next/image";
import { SiteSettings } from "@prisma/client";

interface FooterProps {
  settings: SiteSettings | null;
}

export default function Footer({ settings }: FooterProps) {
  return (
    <footer className="w-[92%] max-w-[1200px] mx-auto mb-10">
      <div className="bg-[#211a16] text-[#fef8f3] rounded-[2.5rem] p-8 md:p-12 shadow-xl border border-white/5 relative overflow-hidden">
        
        {/* Decorative subtle gradient background */}
        <div className="absolute inset-0 bg-gradient-to-tr from-[#745a32]/10 to-transparent pointer-events-none"></div>

        <div className="relative z-10 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-10">
          
          {/* Brand & Social Column */}
          <div className="space-y-4 max-w-sm">
            <Link href="/" className="flex items-center gap-3.5 group">
              <Image 
                src="/logo.png" 
                alt="New Royal Beauty Studio & Unisex Salon" 
                width={60} 
                height={60} 
                className="object-contain h-[56px] w-[56px] transition-transform duration-300 group-hover:scale-105" 
              />
              <div className="flex flex-col">
                <span className="font-display-lg text-[20px] font-bold text-[#ede0d9] leading-tight group-hover:text-primary transition-colors">
                  New Royal
                </span>
                <span className="text-[10px] uppercase font-bold tracking-[0.16em] text-[#D4AF37]">
                  Beauty & Unisex Salon
                </span>
              </div>
            </Link>
            <p className="text-[#8c827c] text-[13px] leading-relaxed">
              Elevating elegance through intentional beauty and expert care in Kathmandu.
            </p>
            <div className="flex gap-3 pt-2">
              {settings?.facebookUrl && (
                <Link
                  className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#745a32] hover:text-white transition-all text-[#8c827c]"
                  href={settings.facebookUrl}
                  target="_blank"
                >
                  <span className="material-symbols-outlined text-[18px]">public</span>
                </Link>
              )}
              {settings?.instagramUrl && (
                <Link
                  className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#745a32] hover:text-white transition-all text-[#8c827c]"
                  href={settings.instagramUrl}
                  target="_blank"
                >
                  <span className="material-symbols-outlined text-[18px]">photo_camera</span>
                </Link>
              )}
              {settings?.tiktokUrl && (
                <Link
                  className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#745a32] hover:text-white transition-all text-[#8c827c]"
                  href={settings.tiktokUrl}
                  target="_blank"
                >
                  <span className="material-symbols-outlined text-[18px]">movie</span>
                </Link>
              )}
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="flex flex-wrap gap-x-8 gap-y-4 max-w-md">
            <Link href="/services" className="text-[#8c827c] hover:text-white transition-colors text-[14px]">Services</Link>
            <Link href="/about" className="text-[#8c827c] hover:text-white transition-colors text-[14px]">About Us</Link>
            <Link href="/gallery" className="text-[#8c827c] hover:text-white transition-colors text-[14px]">Gallery</Link>
            <Link href="/offers" className="text-[#8c827c] hover:text-white transition-colors text-[14px]">Offers</Link>
            <Link href="/team" className="text-[#8c827c] hover:text-white transition-colors text-[14px]">Our Team</Link>
            <Link href="/contact" className="text-[#8c827c] hover:text-white transition-colors text-[14px]">Contact</Link>
            <Link href="/privacy" className="text-[#8c827c] hover:text-white transition-colors text-[14px]">Privacy Policy</Link>
            <Link href="/terms" className="text-[#8c827c] hover:text-white transition-colors text-[14px]">Terms</Link>
          </div>

          {/* Business Hours / Contact Info */}
          <div className="space-y-2 text-[#8c827c] text-[13px] border-t lg:border-t-0 lg:border-l border-white/10 pt-6 lg:pt-0 lg:pl-10">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[16px] text-[#e3c191]">schedule</span>
              <span>{settings?.businessHours || "Everyday 9:00 AM - 8:00 PM"}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[16px] text-[#e3c191]">location_on</span>
              <a href={settings?.googleMapsUrl || "https://maps.google.com/?q=M8RP%2BCCR,+Kathmandu+44600"} target="_blank" rel="noopener noreferrer" className="hover:underline">
                {settings?.address || "M8RP+CCR, Kathmandu 44600"}
              </a>
            </div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[16px] text-[#e3c191]">call</span>
              <span>{settings?.contactPhone || "+977 981-3451412"}</span>
            </div>
          </div>

        </div>

        <div className="mt-8 pt-6 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4 text-[12px] text-[#8c827c]">
          <p>© {new Date().getFullYear()} New Royal Beauty & Unisex Salon. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <p>Made with care in Nepal</p>
            <span className="opacity-30">|</span>
            <Link href="/login" className="hover:text-white transition-colors">Admin Login</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
