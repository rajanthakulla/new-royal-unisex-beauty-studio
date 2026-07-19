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
        className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-[1200px] transition-all duration-500 ${
          isScrolled
            ? "bg-white/90 backdrop-blur-md shadow-md border border-outline-variant/30 py-2"
            : "bg-white/40 backdrop-blur-sm border border-white/20 py-3"
        } rounded-full px-6 md:px-10`}
      >
        <div className="flex justify-between items-center w-full">
          <Link href="/" className="flex items-center gap-2 md:gap-3">
            <Image src="/logo.png" alt="New Royal Beauty" width={40} height={40} className="object-contain" />
            <span className="font-display-lg text-[16px] md:text-[18px] font-semibold text-on-surface tracking-tight">
              New Royal
            </span>
          </Link>
          
          <nav className="hidden md:flex items-center gap-6 lg:gap-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (pathname.startsWith(link.href) && link.href !== '/');
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`font-body-md text-[14px] transition-colors duration-300 ${
                    isActive
                      ? "text-primary font-semibold"
                      : "text-on-surface-variant hover:text-primary"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>
          
          <div className="flex items-center gap-4">
            <Link href="/book" className="hidden sm:block">
              <button className="bg-on-surface text-white px-6 py-2.5 rounded-full font-label-md text-[11px] uppercase tracking-[0.1em] font-bold hover:bg-primary transition-all active:scale-95 shadow-sm">
                Book Now
              </button>
            </Link>
            <button 
              className="md:hidden text-on-surface flex items-center justify-center p-1 rounded-full hover:bg-black/5"
              onClick={() => setIsMobileOpen(true)}
            >
              <span className="material-symbols-outlined text-[24px]">menu</span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 bg-background z-[100] flex flex-col justify-center items-center gap-8 transition-transform duration-500 md:hidden ${isMobileOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <button 
          className="absolute top-8 right-8 text-on-surface"
          onClick={() => setIsMobileOpen(false)}
        >
          <span className="material-symbols-outlined text-[32px]">close</span>
        </button>
        <Image src="/logo.png" alt="Logo" width={80} height={80} className="mb-4" />
        {navLinks.map((link) => (
          <Link 
            key={link.name} 
            href={link.href} 
            className="font-display-lg text-[24px] text-on-surface hover:text-primary transition-colors"
            onClick={() => setIsMobileOpen(false)}
          >
            {link.name}
          </Link>
        ))}
        <Link href="/book" onClick={() => setIsMobileOpen(false)}>
          <button className="bg-on-surface text-white px-10 py-3.5 rounded-full font-label-md text-[11px] uppercase tracking-[0.1em] font-bold mt-6 shadow-md">
            Book Now
          </button>
        </Link>
      </div>
    </>
  );
}
