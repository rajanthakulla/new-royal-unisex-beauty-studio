"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Services", href: "/services" },
    { name: "About", href: "/about" },
    { name: "Gallery", href: "/gallery" },
    { name: "Offers", href: "/offers" },
    { name: "Team", href: "/team" },
    { name: "FAQ", href: "/faq" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <>
      {/* Floating Capsule Header */}
      <header
        className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[94%] max-w-[1240px] transition-all duration-500 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-lg border border-primary/20 py-2"
            : "bg-white/70 backdrop-blur-md border border-white/40 py-2.5"
        } rounded-full px-5 md:px-8`}
      >
        <div className="flex justify-between items-center w-full">
          <Link href="/" className="flex items-center gap-3 group">
            <Image 
              src="/logo.png" 
              alt="New Royal Beauty Studio & Unisex Salon" 
              width={56} 
              height={56} 
              className="object-contain h-[50px] w-[50px] md:h-[56px] md:w-[56px] transition-transform duration-300 group-hover:scale-105" 
            />
            <div className="flex flex-col">
              <span className="font-display-lg text-[18px] md:text-[22px] font-bold text-on-surface tracking-tight leading-none group-hover:text-primary transition-colors">
                New Royal
              </span>
              <span className="text-[9px] md:text-[10.5px] font-bold uppercase tracking-[0.18em] text-[#C5A059] leading-tight mt-0.5">
                Beauty & Unisex Salon
              </span>
            </div>
          </Link>
          
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (pathname.startsWith(link.href) && link.href !== '/');
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`font-body-md text-[14px] font-medium transition-colors duration-300 ${
                    isActive
                      ? "text-primary font-bold border-b-2 border-primary pb-0.5"
                      : "text-on-surface-variant hover:text-primary"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>
          
          <div className="flex items-center gap-3">
            <Link href="/book" className="hidden sm:block">
              <button className="gold-button px-6 py-2.5 rounded-full font-label-md text-[11px] uppercase tracking-[0.12em] font-bold active:scale-95 transition-all">
                Book Appointment
              </button>
            </Link>
            <button 
              className="lg:hidden text-on-surface flex items-center justify-center p-2 rounded-full hover:bg-black/5"
              onClick={() => setIsMobileOpen(true)}
              aria-label="Open Mobile Menu"
            >
              <span className="material-symbols-outlined text-[28px]">menu</span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 bg-background/98 backdrop-blur-xl z-[100] flex flex-col justify-center items-center gap-6 transition-transform duration-500 lg:hidden ${isMobileOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <button 
          className="absolute top-8 right-8 text-on-surface p-2"
          onClick={() => setIsMobileOpen(false)}
        >
          <span className="material-symbols-outlined text-[36px]">close</span>
        </button>
        
        <div className="flex flex-col items-center mb-2">
          <Image src="/logo.png" alt="Logo" width={90} height={90} className="mb-3 object-contain" />
          <span className="font-display-lg text-[26px] font-bold text-on-surface">New Royal</span>
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-primary">Beauty & Unisex Salon</span>
        </div>

        <nav className="flex flex-col items-center gap-4">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href} 
              className="font-display-lg text-[22px] text-on-surface hover:text-primary transition-colors font-medium"
              onClick={() => setIsMobileOpen(false)}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        <Link href="/book" onClick={() => setIsMobileOpen(false)}>
          <button className="gold-button px-10 py-3.5 rounded-full font-label-md text-[12px] uppercase tracking-[0.12em] font-bold mt-4 shadow-lg">
            Book Your Appointment
          </button>
        </Link>
      </div>
    </>
  );
}
