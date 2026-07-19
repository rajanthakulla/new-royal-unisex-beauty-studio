"use client";

import { useState, useEffect } from "react";
import { Sparkles, Plus, Edit, Trash2, X, Loader2 } from "lucide-react";

interface SeasonalSpecial {
  id: string;
  tag: string;
  title: string;
  description: string;
  price: number;
  bookingLink: string;
}

export default function AdminSpecials() {
  const [specials, setSpecials] = useState<SeasonalSpecial[]>([]);
  const [loading, setLoading] = useState(true);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"ADD" | "EDIT">("ADD");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // Form State
  const [activeId, setActiveId] = useState("");
  const [formTag, setFormTag] = useState("");
  const [formTitle, setFormTitle] = useState("");
  const [formDescription, setFormDescription] = useState("");
  const [formPrice, setFormPrice] = useState("");
  const [formBookingLink, setFormBookingLink] = useState("");

  const fetchSpecials = async () => {
    try {
      const res = await fetch("/api/specials");
      if (res.ok) {
        const data = await res.json();
        setSpecials(data);
      }
    } catch (err) {
      console.error("Failed to load seasonal specials:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSpecials();
  }, []);

  const openAddModal = () => {
    if (specials.length >= 3) {
      alert("You can only configure up to a maximum of 3 Seasonal Specials at a time. Please edit or delete an existing special.");
      return;
    }
    setModalMode("ADD");
    setActiveId("");
    setFormTag("");
    setFormTitle("");
    setFormDescription("");
    setFormPrice("");
    setFormBookingLink("/book?service=");
    setError("");
    setIsModalOpen(true);
  };

  const openEditModal = (special: SeasonalSpecial) => {
    setModalMode("EDIT");
    setActiveId(special.id);
    setFormTag(special.tag);
    setFormTitle(special.title);
    setFormDescription(special.description);
    setFormPrice(special.price.toString());
    setFormBookingLink(special.bookingLink);
    setError("");
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTag || !formTitle || !formDescription || !formPrice || !formBookingLink) {
      setError("Please fill out all required fields.");
      return;
    }

    setSaving(true);
    setError("");

    const payload = {
      tag: formTag.toUpperCase(),
      title: formTitle,
      description: formDescription,
      price: parseFloat(formPrice),
      bookingLink: formBookingLink
    };

    try {
      const url = modalMode === "ADD" ? "/api/specials" : `/api/specials/${activeId}`;
      const method = modalMode === "ADD" ? "POST" : "PUT";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      if (res.ok) {
        setIsModalOpen(false);
        fetchSpecials();
      } else {
        setError(data.error || "Failed to save seasonal special.");
      }
    } catch (err) {
      setError("An unexpected error occurred.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this seasonal special?")) return;
    try {
      const res = await fetch(`/api/specials/${id}`, {
        method: "DELETE"
      });
      if (res.ok) {
        setSpecials(prev => prev.filter(s => s.id !== id));
      }
    } catch (err) {
      console.error("Failed to delete special:", err);
    }
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto p-4 md:p-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-on-surface font-display-lg">Seasonal Specials</h1>
          <p className="text-on-surface-variant font-body-md text-sm mt-1">Configure featured service combinations (maximum of 3 items display).</p>
        </div>
        <button 
          onClick={openAddModal}
          disabled={specials.length >= 3}
          className="flex items-center gap-2 bg-black hover:bg-black/85 text-white px-5 py-2.5 rounded-full font-label-md text-xs uppercase tracking-widest transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <Plus size={16} />
          Add Special ({specials.length}/3)
        </button>
      </div>

      {loading ? (
        <div className="min-h-[300px] flex items-center justify-center">
          <div className="w-10 h-10 border-4 border-black border-t-transparent rounded-full animate-spin" />
        </div>
      ) : specials.length === 0 ? (
        <div className="bg-white rounded-3xl border border-outline-variant/20 p-12 text-center text-on-surface-variant flex flex-col items-center justify-center min-h-[300px]">
          <Sparkles size={52} className="mb-4 text-black/20" />
          <h2 className="text-xl font-bold text-on-surface mb-2">No Specials Added</h2>
          <p className="text-sm max-w-sm">Create up to 3 packaged specials to display on the homepage promo grid.</p>
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-outline-variant/20 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface border-b border-outline-variant/30 text-[11px] font-label-md uppercase tracking-wider text-on-surface-variant/80">
                  <th className="p-5 pl-8">Package Title</th>
                  <th className="p-5">Tag / Category</th>
                  <th className="p-5">Price</th>
                  <th className="p-5">Booking Link</th>
                  <th className="p-5 pr-8 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/20 font-body-md text-sm text-on-surface">
                {specials.map((special) => (
                  <tr key={special.id} className="hover:bg-surface-container-lowest/50 transition-colors">
                    <td className="p-5 pl-8">
                      <div className="font-bold text-[15px]">{special.title}</div>
                      <div className="text-xs text-on-surface-variant line-clamp-1 max-w-md mt-1">{special.description}</div>
                    </td>
                    <td className="p-5">
                      <span className="px-3 py-1 bg-amber-50 text-amber-800 border border-amber-200 rounded-full text-xs font-bold">
                        {special.tag}
                      </span>
                    </td>
                    <td className="p-5 font-semibold text-secondary">
                      Rs. {special.price.toLocaleString()}
                    </td>
                    <td className="p-5 text-xs text-on-surface-variant italic font-medium">
                      {special.bookingLink}
                    </td>
                    <td className="p-5 pr-8 text-right">
                      <div className="flex justify-end gap-2">
                        <button 
                          onClick={() => openEditModal(special)}
                          className="w-9 h-9 flex items-center justify-center text-on-surface-variant hover:bg-surface-container-low hover:text-black rounded-full transition-colors border-none"
                          title="Edit"
                        >
                          <Edit size={16} />
                        </button>
                        <button 
                          onClick={() => handleDelete(special.id)}
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

      {/* specials Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-3xl shadow-xl w-full max-w-md max-h-[95vh] overflow-hidden flex flex-col">
            <div className="p-6 border-b border-outline-variant/30 flex justify-between items-center bg-[#f8f3ee]">
              <h3 className="font-display-lg text-lg font-bold text-on-surface">
                {modalMode === "ADD" ? "Create Seasonal Special" : "Edit Special Details"}
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
                  <label className="block text-sm font-semibold text-on-surface-variant uppercase tracking-wider text-[11px] mb-1">Package Tag *</label>
                  <input 
                    type="text" 
                    value={formTag}
                    onChange={(e) => setFormTag(e.target.value)}
                    placeholder="e.g. BRIDAL FAVORITE or HAIR ESSENTIAL"
                    className="w-full border-gray-300 rounded-2xl shadow-sm focus:ring-black focus:border-black p-3 border text-sm"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-on-surface-variant uppercase tracking-wider text-[11px] mb-1">Package Title *</label>
                  <input 
                    type="text" 
                    value={formTitle}
                    onChange={(e) => setFormTitle(e.target.value)}
                    placeholder="e.g. Bridal Glow Ritual"
                    className="w-full border-gray-300 rounded-2xl shadow-sm focus:ring-black focus:border-black p-3 border text-sm"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-on-surface-variant uppercase tracking-wider text-[11px] mb-1">Price (Rs.) *</label>
                  <input 
                    type="number" 
                    value={formPrice}
                    onChange={(e) => setFormPrice(e.target.value)}
                    placeholder="e.g. 18500"
                    className="w-full border-gray-300 rounded-2xl shadow-sm focus:ring-black focus:border-black p-3 border text-sm"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-on-surface-variant uppercase tracking-wider text-[11px] mb-1">Booking Link / Slug *</label>
                  <input 
                    type="text" 
                    value={formBookingLink}
                    onChange={(e) => setFormBookingLink(e.target.value)}
                    placeholder="e.g. /book?service=bridal-makeup"
                    className="w-full border-gray-300 rounded-2xl shadow-sm focus:ring-black focus:border-black p-3 border text-sm"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-on-surface-variant uppercase tracking-wider text-[11px] mb-1">Description *</label>
                  <textarea 
                    value={formDescription}
                    onChange={(e) => setFormDescription(e.target.value)}
                    placeholder="Provide details about what is included in the package combo..."
                    rows={4}
                    className="w-full border-gray-300 rounded-2xl shadow-sm focus:ring-black focus:border-black p-3 border text-sm"
                    required
                  />
                </div>
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
                  ) : "Save Special"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
