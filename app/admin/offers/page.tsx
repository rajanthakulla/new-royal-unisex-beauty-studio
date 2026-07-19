"use client";

import { useState, useEffect } from "react";
import { Tag, Plus, Edit, Trash2, X, Loader2 } from "lucide-react";
import ImageUploader from "@/components/ImageUploader";

interface Offer {
  id: string;
  title: string;
  description: string;
  discount: string;
  validUntil: string;
  image: string | null;
  isActive: boolean;
}

export default function AdminOffers() {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [loading, setLoading] = useState(true);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"ADD" | "EDIT">("ADD");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // Form State
  const [activeId, setActiveId] = useState("");
  const [formTitle, setFormTitle] = useState("");
  const [formDescription, setFormDescription] = useState("");
  const [formDiscount, setFormDiscount] = useState("");
  const [formValidUntil, setFormValidUntil] = useState("");
  const [formImage, setFormImage] = useState("");
  const [formIsActive, setFormIsActive] = useState(true);

  const fetchOffers = async () => {
    try {
      const res = await fetch("/api/offers");
      if (res.ok) {
        const data = await res.json();
        setOffers(data);
      }
    } catch (err) {
      console.error("Failed to load offers:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOffers();
  }, []);

  const openAddModal = () => {
    setModalMode("ADD");
    setActiveId("");
    setFormTitle("");
    setFormDescription("");
    setFormDiscount("");
    setFormValidUntil(new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split("T")[0]); // 1 week default
    setFormImage("");
    setFormIsActive(true);
    setError("");
    setIsModalOpen(true);
  };

  const openEditModal = (offer: Offer) => {
    setModalMode("EDIT");
    setActiveId(offer.id);
    setFormTitle(offer.title);
    setFormDescription(offer.description);
    setFormDiscount(offer.discount);
    setFormValidUntil(new Date(offer.validUntil).toISOString().split("T")[0]);
    setFormImage(offer.image || "");
    setFormIsActive(offer.isActive);
    setError("");
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle || !formDescription || !formDiscount || !formValidUntil) {
      setError("Please fill out all required fields.");
      return;
    }

    setSaving(true);
    setError("");

    const payload = {
      title: formTitle,
      description: formDescription,
      discount: formDiscount,
      validUntil: formValidUntil,
      image: formImage,
      isActive: formIsActive
    };

    try {
      const url = modalMode === "ADD" ? "/api/offers" : `/api/offers/${activeId}`;
      const method = modalMode === "ADD" ? "POST" : "PUT";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      if (res.ok) {
        setIsModalOpen(false);
        fetchOffers();
      } else {
        setError(data.error || "Failed to save offer details.");
      }
    } catch (err) {
      setError("An unexpected error occurred.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this offer?")) return;
    try {
      const res = await fetch(`/api/offers/${id}`, {
        method: "DELETE"
      });
      if (res.ok) {
        setOffers(prev => prev.filter(o => o.id !== id));
      }
    } catch (err) {
      console.error("Failed to delete offer:", err);
    }
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto p-4 md:p-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-on-surface font-display-lg">Manage Offers</h1>
          <p className="text-on-surface-variant font-body-md text-sm mt-1">Configure active promotional tags, campaigns, and discounts.</p>
        </div>
        <button 
          onClick={openAddModal}
          className="flex items-center gap-2 bg-black hover:bg-black/85 text-white px-5 py-2.5 rounded-full font-label-md text-xs uppercase tracking-widest transition-all duration-300"
        >
          <Plus size={16} />
          Create Offer
        </button>
      </div>

      {loading ? (
        <div className="min-h-[300px] flex items-center justify-center">
          <div className="w-10 h-10 border-4 border-black border-t-transparent rounded-full animate-spin" />
        </div>
      ) : offers.length === 0 ? (
        <div className="bg-white rounded-3xl border border-outline-variant/20 p-12 text-center text-on-surface-variant flex flex-col items-center justify-center min-h-[300px]">
          <Tag size={52} className="mb-4 text-black/20" />
          <h2 className="text-xl font-bold text-on-surface mb-2">No Active Offers</h2>
          <p className="text-sm max-w-sm">Create marketing campaigns or discount percentages to attract more clients.</p>
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-outline-variant/20 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface border-b border-outline-variant/30 text-[11px] font-label-md uppercase tracking-wider text-on-surface-variant/80">
                  <th className="p-5 pl-8">Offer Title</th>
                  <th className="p-5">Discount</th>
                  <th className="p-5">Valid Until</th>
                  <th className="p-5">Status</th>
                  <th className="p-5 pr-8 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/20 font-body-md text-sm text-on-surface">
                {offers.map((offer) => (
                  <tr key={offer.id} className="hover:bg-surface-container-lowest/50 transition-colors">
                    <td className="p-5 pl-8">
                      <div className="font-bold text-[15px]">{offer.title}</div>
                      <div className="text-xs text-on-surface-variant line-clamp-1 max-w-md mt-1">{offer.description}</div>
                    </td>
                    <td className="p-5 font-semibold text-primary">
                      {offer.discount}
                    </td>
                    <td className="p-5 text-on-surface-variant">
                      {new Date(offer.validUntil).toLocaleDateString(undefined, { 
                        month: 'short', 
                        day: 'numeric', 
                        year: 'numeric' 
                      })}
                    </td>
                    <td className="p-5">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        offer.isActive 
                          ? "bg-green-50 text-green-700 border border-green-200" 
                          : "bg-red-50 text-red-700 border border-red-200"
                      }`}>
                        {offer.isActive ? "ACTIVE" : "INACTIVE"}
                      </span>
                    </td>
                    <td className="p-5 pr-8 text-right">
                      <div className="flex justify-end gap-2">
                        <button 
                          onClick={() => openEditModal(offer)}
                          className="w-9 h-9 flex items-center justify-center text-on-surface-variant hover:bg-surface-container-low hover:text-black rounded-full transition-colors border-none"
                          title="Edit"
                        >
                          <Edit size={16} />
                        </button>
                        <button 
                          onClick={() => handleDelete(offer.id)}
                          className="w-9 h-9 flex items-center justify-center text-red-600 hover:bg-red-50 rounded-full transition-colors border-none"
                          title="Delete"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Offer Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-3xl shadow-xl w-full max-w-md max-h-[95vh] overflow-hidden flex flex-col">
            <div className="p-6 border-b border-outline-variant/30 flex justify-between items-center bg-[#f8f3ee]">
              <h3 className="font-display-lg text-lg font-bold text-on-surface">
                {modalMode === "ADD" ? "Create Promo Offer" : "Edit Offer Details"}
              </h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-on-surface-variant hover:text-black border-none bg-transparent"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-6 space-y-6 flex-1 overflow-y-auto">
              {error && (
                <div className="bg-red-50 text-red-700 p-4 rounded-2xl text-xs font-semibold border border-red-200">
                  {error}
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-on-surface-variant uppercase tracking-wider text-[11px] mb-1">Offer Title *</label>
                  <input 
                    type="text" 
                    value={formTitle}
                    onChange={(e) => setFormTitle(e.target.value)}
                    placeholder="e.g. Monsoon Special Blowout"
                    className="w-full border-gray-300 rounded-2xl shadow-sm focus:ring-black focus:border-black p-3 border text-sm"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-on-surface-variant uppercase tracking-wider text-[11px] mb-1">Discount Tag *</label>
                  <input 
                    type="text" 
                    value={formDiscount}
                    onChange={(e) => setFormDiscount(e.target.value)}
                    placeholder="e.g. 20% OFF or Rs. 1500 Flat"
                    className="w-full border-gray-300 rounded-2xl shadow-sm focus:ring-black focus:border-black p-3 border text-sm"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-on-surface-variant uppercase tracking-wider text-[11px] mb-1">Valid Until *</label>
                  <input 
                    type="date" 
                    value={formValidUntil}
                    onChange={(e) => setFormValidUntil(e.target.value)}
                    className="w-full border-gray-300 rounded-2xl shadow-sm focus:ring-black focus:border-black p-3 border text-sm"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-on-surface-variant uppercase tracking-wider text-[11px] mb-1">Description *</label>
                  <textarea 
                    value={formDescription}
                    onChange={(e) => setFormDescription(e.target.value)}
                    placeholder="Offer description details..."
                    rows={3}
                    className="w-full border-gray-300 rounded-2xl shadow-sm focus:ring-black focus:border-black p-3 border text-sm"
                    required
                  />
                </div>

                <div className="flex items-center gap-2">
                  <input 
                    type="checkbox" 
                    id="isActive"
                    checked={formIsActive}
                    onChange={(e) => setFormIsActive(e.target.checked)}
                    className="rounded text-black focus:ring-black border-gray-300 h-4 w-4"
                  />
                  <label htmlFor="isActive" className="text-sm font-medium text-on-surface select-none cursor-pointer">
                    Offer is active and visible
                  </label>
                </div>

                <ImageUploader 
                  label="Offer Banner Image (Optional)"
                  value={formImage}
                  onChange={(url) => setFormImage(url)}
                />
              </div>

              <div className="pt-4 border-t border-outline-variant/30 flex justify-end gap-3">
                <button 
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-6 py-2.5 border border-gray-300 hover:bg-gray-50 rounded-full font-semibold text-xs uppercase tracking-widest transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  disabled={saving}
                  className="bg-black hover:bg-black/85 text-white px-6 py-2.5 rounded-full font-semibold text-xs uppercase tracking-widest transition-colors disabled:opacity-50 flex items-center gap-2"
                >
                  {saving ? (
                    <>
                      <Loader2 size={14} className="animate-spin" />
                      Saving...
                    </>
                  ) : "Save Offer"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
