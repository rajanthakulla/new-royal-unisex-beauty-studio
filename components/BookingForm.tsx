"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { SiteSettings } from "@prisma/client";

interface SimpleService {
  id: string;
  title: string;
  slug: string;
  price: number;
}

interface BookingFormProps {
  services: SimpleService[];
  preSelectedSlug: string;
  settings: SiteSettings | null;
}

export default function BookingForm({ services, preSelectedSlug, settings }: BookingFormProps) {
  const selectedService = services.find((s) => s.slug === preSelectedSlug);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    serviceId: selectedService ? selectedService.id : services[0]?.id || "",
    date: "",
    time: "09:00",
    notes: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const timeSlots = [
    "09:00", "10:00", "11:00", "12:00", "13:00", 
    "14:00", "15:00", "16:00", "17:00", "18:00", "19:00"
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!formData.name || !formData.phone || !formData.serviceId || !formData.date || !formData.time) {
      setError("Please fill out all required fields.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Something went wrong.");
      }

      setSuccess(true);
    } catch (err: any) {
      setError(err.message || "Failed to make booking. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const currentServiceObj = services.find((s) => s.id === formData.serviceId);

  if (success) {
    return (
      <div className="max-w-2xl mx-auto bg-white p-8 md:p-12 rounded-[2rem] shadow-premium border border-primary-container/5 text-center space-y-6">
        <span className="material-symbols-outlined text-[64px] text-green-600 animate-pulse">check_circle</span>
        <h3 className="font-display-lg text-[24px] md:text-[28px] font-semibold text-on-surface">
          Appointment Requested!
        </h3>
        <p className="text-on-surface-variant font-body-md text-[14px] leading-relaxed max-w-md mx-auto">
          Thank you, <span className="font-bold text-on-surface">{formData.name}</span>. Your appointment for <span className="font-bold text-on-surface">{currentServiceObj?.title}</span> has been requested for <span className="font-bold text-on-surface">{formData.date}</span> at <span className="font-bold text-on-surface">{formData.time}</span>.
        </p>
        <p className="text-[12px] text-on-surface-variant italic">
          Our team will contact you shortly via phone ({formData.phone}) to confirm your slot.
        </p>
        <div className="pt-6">
          <Link href="/">
            <button className="bg-on-surface hover:bg-primary text-white px-8 py-3 rounded-full font-label-md text-[12px] uppercase tracking-widest transition-colors">
              Return Home
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-16">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Booking Form Column (7/12) */}
        <div className="lg:col-span-7 bg-[#f8f3ee] p-8 md:p-12 rounded-3xl border border-[#d0c4bd]/40">
          <form onSubmit={handleSubmit} className="space-y-8">
            {error && (
              <div className="p-4 bg-red-50 text-red-700 text-sm rounded-xl border border-red-100 flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px]">error</span>
                {error}
              </div>
            )}

            <div className="space-y-6">
              <h2 className="font-display-lg text-[22px] font-semibold border-b border-[#d0c4bd] pb-4 text-on-surface">Personal Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-[11px] font-label-md uppercase tracking-wider text-[#7f756f] font-bold">FULL NAME</label>
                  <input
                    type="text"
                    required
                    className="bg-[#f2ede8] border-0 border-b-2 border-[#d0c4bd] focus:border-black focus:ring-0 transition-colors p-3 rounded-t-xl text-sm outline-none"
                    placeholder="Sarah Jenkins"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[11px] font-label-md uppercase tracking-wider text-[#7f756f] font-bold">PHONE NUMBER</label>
                  <input
                    type="tel"
                    required
                    className="bg-[#f2ede8] border-0 border-b-2 border-[#d0c4bd] focus:border-black focus:ring-0 transition-colors p-3 rounded-t-xl text-sm outline-none"
                    placeholder="e.g. 981-3451412"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <h2 className="font-display-lg text-[22px] font-semibold border-b border-[#d0c4bd] pb-4 text-on-surface">Service Selection</h2>
              <div className="flex flex-col gap-2">
                <label className="text-[11px] font-label-md uppercase tracking-wider text-[#7f756f] font-bold">SELECT SERVICE</label>
                <select
                  required
                  className="bg-[#f2ede8] border-0 border-b-2 border-[#d0c4bd] focus:border-black focus:ring-0 transition-colors p-3 rounded-t-xl text-sm outline-none cursor-pointer"
                  value={formData.serviceId}
                  onChange={(e) => setFormData({ ...formData, serviceId: e.target.value })}
                >
                  {services.length > 0 ? (
                    services.map((service) => (
                      <option key={service.id} value={service.id}>
                        {service.title} (Rs. {service.price.toLocaleString()})
                      </option>
                    ))
                  ) : (
                    <option value="">No services available</option>
                  )}
                </select>
              </div>
            </div>

            <div className="space-y-6">
              <h2 className="font-display-lg text-[22px] font-semibold border-b border-[#d0c4bd] pb-4 text-on-surface">Preferred Time</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-[11px] font-label-md uppercase tracking-wider text-[#7f756f] font-bold">DATE</label>
                  <input
                    type="date"
                    required
                    min={new Date().toISOString().split("T")[0]}
                    className="bg-[#f2ede8] border-0 border-b-2 border-[#d0c4bd] focus:border-black focus:ring-0 transition-colors p-3 rounded-t-xl text-sm outline-none"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[11px] font-label-md uppercase tracking-wider text-[#7f756f] font-bold">TIME SLOT</label>
                  <select
                    required
                    className="bg-[#f2ede8] border-0 border-b-2 border-[#d0c4bd] focus:border-black focus:ring-0 transition-colors p-3 rounded-t-xl text-sm outline-none cursor-pointer"
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  >
                    {timeSlots.map((slot) => (
                      <option key={slot} value={slot}>
                        {slot} {parseInt(slot.split(":")[0]) >= 12 ? "PM" : "AM"}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[11px] font-label-md uppercase tracking-wider text-[#7f756f] font-bold">MESSAGE OR SPECIAL REQUESTS</label>
              <textarea
                rows={3}
                className="bg-[#f2ede8] border-0 border-b-2 border-[#d0c4bd] focus:border-black focus:ring-0 transition-colors p-3 rounded-t-xl text-sm outline-none resize-none"
                placeholder="Tell us more about your needs..."
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4.5 bg-black hover:bg-[#745a32] text-white rounded-full font-label-md text-[13px] uppercase tracking-widest transition-all duration-500 transform hover:-translate-y-0.5 shadow-md flex justify-center items-center gap-2"
            >
              {loading ? (
                <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                "CONFIRM BOOKING REQUEST"
              )}
            </button>
          </form>
        </div>

        {/* Information Column (5/12) */}
        <div className="lg:col-span-5 space-y-8">
          {/* Contact Details Card */}
          <div className="bg-black text-white p-8 rounded-3xl space-y-6 shadow-lg">
            <h3 className="font-display-lg text-[22px] font-bold text-[#ede0d9]">Visit Our Sanctuary</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <span className="material-symbols-outlined text-[#ede0d9] text-[22px]">location_on</span>
                <div>
                  <p className="text-[10px] font-label-md uppercase tracking-wider text-[#ede0d9]/60 font-bold">ADDRESS</p>
                  <p className="text-[14px] text-white/90 leading-relaxed">
                    <a href={settings?.googleMapsUrl || "https://maps.google.com/?q=M8RP%2BCCR,+Kathmandu+44600"} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                      {settings?.address || "New Baneshwor (Near Baneshwor Chowk), Kathmandu 44600"}
                    </a>
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <span className="material-symbols-outlined text-[#ede0d9] text-[22px]">call</span>
                <div>
                  <p className="text-[10px] font-label-md uppercase tracking-wider text-[#ede0d9]/60 font-bold">CONTACT</p>
                  <p className="text-[14px] text-white/90 leading-relaxed">
                    {settings?.contactPhone || "+977 981-3451412"}<br />
                    hello@newroyalbeauty.com
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <span className="material-symbols-outlined text-[#ede0d9] text-[22px]">schedule</span>
                <div>
                  <p className="text-[10px] font-label-md uppercase tracking-wider text-[#ede0d9]/60 font-bold">HOURS</p>
                  <p className="text-[14px] text-white/90 leading-relaxed">
                    {settings?.businessHours || "Everyday 9:00 AM - 8:00 PM"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Map Section */}
          <div className="relative h-[240px] w-full rounded-3xl overflow-hidden group border border-[#d0c4bd]/30 shadow-md">
            <iframe
              src="https://maps.google.com/maps?q=M8RP%2BCCR,+Kathmandu+44600&t=&z=15&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
            ></iframe>
          </div>

          {/* Testimonial Card */}
          <div className="bg-[#fedaa8] p-8 rounded-3xl relative overflow-hidden shadow-md">
            <span className="material-symbols-outlined text-[#785e36]/10 text-7xl absolute -top-2 -left-2" style={{ fontVariationSettings: "'FILL' 1" }}>format_quote</span>
            <div className="relative z-10 space-y-6">
              <p className="font-display-lg text-[18px] text-[#281800] italic leading-relaxed">
                &ldquo;The most serene atmosphere I&apos;ve found in Kathmandu. Their attention to detail during my bridal styling was truly exceptional.&rdquo;
              </p>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full overflow-hidden bg-white/20 border border-[#785e36]/20 flex items-center justify-center font-bold text-[#281800]">
                  R
                </div>
                <div>
                  <p className="text-[11px] font-label-md uppercase tracking-wider text-[#281800] font-bold">REGINA SHRESTHA</p>
                  <p className="text-[11px] text-[#281800]/60">Loyal Client since 2021</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Aesthetic Divider */}
      <div className="w-full h-px bg-[#d0c4bd]/40"></div>

      {/* Secondary Info / FAQ Preview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 pt-4">
        <div className="space-y-3">
          <h4 className="text-[11px] font-label-md uppercase tracking-wider text-[#745a32] font-bold">CANCELLATION POLICY</h4>
          <p className="text-[14px] text-on-surface-variant leading-relaxed">We value your time and ours. Please provide at least 24 hours notice for any cancellations or rescheduling to avoid a fee.</p>
        </div>
        <div className="space-y-3">
          <h4 className="text-[11px] font-label-md uppercase tracking-wider text-[#745a32] font-bold">ARRIVING EARLY</h4>
          <p className="text-[14px] text-on-surface-variant leading-relaxed">We recommend arriving 15 minutes before your scheduled treatment to enjoy a complimentary herbal infusion and settle in.</p>
        </div>
        <div className="space-y-3">
          <h4 className="text-[11px] font-label-md uppercase tracking-wider text-[#745a32] font-bold">PARKING</h4>
          <p className="text-[14px] text-on-surface-variant leading-relaxed">Complimentary parking is available for all guests directly in front of our main entrance in Kathmandu.</p>
        </div>
      </div>
    </div>
  );
}
