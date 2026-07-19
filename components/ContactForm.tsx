"use client";

import { useState } from "react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate sending message
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 800);
  };

  if (success) {
    return (
      <div className="text-center py-12 space-y-4">
        <span className="material-symbols-outlined text-[48px] text-green-600 animate-bounce">check_circle</span>
        <h4 className="font-display-lg text-lg font-bold text-on-surface">Message Sent!</h4>
        <p className="text-[13px] text-on-surface-variant leading-relaxed">
          Thank you, <span className="font-bold text-on-surface">{formData.name}</span>. Your message has been sent successfully. Our team will get back to you shortly.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex flex-col gap-2">
        <label className="text-[11px] font-label-md uppercase tracking-wider text-[#7f756f] font-bold">Full Name</label>
        <input 
          type="text" 
          required
          className="bg-[#f2ede8] border-0 border-b-2 border-[#d0c4bd] focus:border-black focus:ring-0 transition-colors p-3 rounded-t-xl text-sm outline-none"
          placeholder="Your full name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-[11px] font-label-md uppercase tracking-wider text-[#7f756f] font-bold">Email Address</label>
        <input 
          type="email" 
          required
          className="bg-[#f2ede8] border-0 border-b-2 border-[#d0c4bd] focus:border-black focus:ring-0 transition-colors p-3 rounded-t-xl text-sm outline-none"
          placeholder="name@example.com"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-[11px] font-label-md uppercase tracking-wider text-[#7f756f] font-bold">Phone Number</label>
        <input 
          type="tel" 
          required
          className="bg-[#f2ede8] border-0 border-b-2 border-[#d0c4bd] focus:border-black focus:ring-0 transition-colors p-3 rounded-t-xl text-sm outline-none"
          placeholder="e.g. 9813451412"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-[11px] font-label-md uppercase tracking-wider text-[#7f756f] font-bold">Message or Inquiry</label>
        <textarea 
          rows={4} 
          required
          className="bg-[#f2ede8] border-0 border-b-2 border-[#d0c4bd] focus:border-black focus:ring-0 transition-colors p-3 rounded-t-xl text-sm outline-none resize-none"
          placeholder="Tell us about the services you're interested in..."
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
        ></textarea>
      </div>

      <button 
        type="submit" 
        disabled={loading}
        className="w-full py-4.5 bg-black hover:bg-[#745a32] text-white font-label-md text-[12px] uppercase tracking-widest rounded-full transition-all duration-500 transform hover:-translate-y-0.5 shadow-md border-none flex justify-center items-center"
      >
        {loading ? (
          <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
        ) : (
          "Send Message"
        )}
      </button>
    </form>
  );
}
