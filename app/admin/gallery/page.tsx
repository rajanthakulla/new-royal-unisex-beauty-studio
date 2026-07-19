"use client";

import { useState, useEffect } from "react";
import { ImageIcon, Plus, Trash2, X, Loader2 } from "lucide-react";
import ImageUploader from "@/components/ImageUploader";

interface GalleryItem {
  id: string;
  url: string;
  type: string;
  caption: string | null;
  category: string | null;
}

const CATEGORIES = ["General", "Hair", "Makeup", "Nails", "Bridal", "Facial"];

export default function AdminGallery() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("ALL");

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // Form State
  const [formUrl, setFormUrl] = useState("");
  const [formCaption, setFormCaption] = useState("");
  const [formCategory, setFormCategory] = useState("General");

  const fetchItems = async () => {
    try {
      const res = await fetch("/api/gallery");
      if (res.ok) {
        const data = await res.json();
        setItems(data);
      }
    } catch (err) {
      console.error("Failed to load gallery:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formUrl) {
      setError("Please upload an image first.");
      return;
    }

    setSaving(true);
    setError("");

    try {
      const res = await fetch("/api/gallery", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          url: formUrl,
          type: "IMAGE",
          caption: formCaption,
          category: formCategory
        })
      });

      const data = await res.json();
      if (res.ok) {
        setIsModalOpen(false);
        setFormUrl("");
        setFormCaption("");
        setFormCategory("General");
        fetchItems();
      } else {
        setError(data.error || "Failed to save gallery item.");
      }
    } catch (err) {
      setError("An unexpected error occurred.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this image from the gallery?")) return;
    try {
      const res = await fetch(`/api/gallery/${id}`, {
        method: "DELETE"
      });
      if (res.ok) {
        setItems(prev => prev.filter(item => item.id !== id));
      }
    } catch (err) {
      console.error("Failed to delete gallery item:", err);
    }
  };

  const filteredItems = items.filter(item => {
    if (activeFilter === "ALL") return true;
    return item.category === activeFilter;
  });

  return (
    <div className="space-y-6 max-w-6xl mx-auto p-4 md:p-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-on-surface font-display-lg">Manage Gallery</h1>
          <p className="text-on-surface-variant font-body-md text-sm mt-1">Upload and organize work portfolios and transformation results.</p>
        </div>
        <button 
          onClick={() => {
            setError("");
            setIsModalOpen(true);
          }}
          className="flex items-center gap-2 bg-black hover:bg-black/85 text-white px-5 py-2.5 rounded-full font-label-md text-xs uppercase tracking-widest transition-all duration-300"
        >
          <Plus size={16} />
          Upload Media
        </button>
      </div>

      {/* Category filter tabs */}
      <div className="flex flex-wrap gap-2 border-b border-[#d0c4bd]/30 pb-4">
        <button 
          onClick={() => setActiveFilter("ALL")}
          className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-colors border-none ${
            activeFilter === "ALL" 
              ? "bg-black text-white" 
              : "bg-surface-container-low hover:bg-surface-container-high text-on-surface-variant"
          }`}
        >
          All Media
        </button>
        {CATEGORIES.map((cat) => (
          <button 
            key={cat}
            onClick={() => setActiveFilter(cat)}
            className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-colors border-none ${
              activeFilter === cat 
                ? "bg-black text-white" 
                : "bg-surface-container-low hover:bg-surface-container-high text-on-surface-variant"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="min-h-[300px] flex items-center justify-center">
          <div className="w-10 h-10 border-4 border-black border-t-transparent rounded-full animate-spin" />
        </div>
      ) : filteredItems.length === 0 ? (
        <div className="bg-white rounded-3xl border border-outline-variant/20 p-12 text-center text-on-surface-variant flex flex-col items-center justify-center min-h-[300px]">
          <ImageIcon size={52} className="mb-4 text-black/20" />
          <h2 className="text-xl font-bold text-on-surface mb-2">No Media Found</h2>
          <p className="text-sm max-w-sm">No items found under this category filter.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <div key={item.id} className="relative aspect-square rounded-3xl bg-surface-container-low overflow-hidden group border border-[#d0c4bd]/30 shadow-sm">
              <img 
                src={item.url} 
                alt={item.caption || "Gallery item"} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4 z-10">
                <button 
                  onClick={() => handleDelete(item.id)}
                  className="self-end w-9 h-9 flex items-center justify-center bg-red-600 hover:bg-red-700 text-white rounded-full transition-colors border-none"
                  title="Delete"
                >
                  <Trash2 size={16} />
                </button>
                <div>
                  <span className="text-[10px] font-bold text-[#ede0d9] uppercase tracking-widest bg-black/35 px-2.5 py-1 rounded-full backdrop-blur-xs">
                    {item.category || "General"}
                  </span>
                  <p className="text-xs text-white font-medium mt-2 line-clamp-2">{item.caption || "—"}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Upload Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-3xl shadow-xl w-full max-w-md max-h-[95vh] overflow-hidden flex flex-col">
            <div className="p-6 border-b border-outline-variant/30 flex justify-between items-center bg-[#f8f3ee]">
              <h3 className="font-display-lg text-lg font-bold text-on-surface">Upload Gallery Media</h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-on-surface-variant hover:text-black border-none bg-transparent"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleUpload} className="p-6 space-y-6 flex-1 overflow-y-auto">
              {error && (
                <div className="bg-red-50 text-red-700 p-4 rounded-2xl text-xs font-semibold border border-red-200">
                  {error}
                </div>
              )}

              <div className="space-y-4">
                <ImageUploader 
                  label="Choose Image"
                  value={formUrl}
                  onChange={(url) => setFormUrl(url)}
                />

                <div>
                  <label className="block text-sm font-semibold text-on-surface-variant uppercase tracking-wider text-[11px] mb-1">Category</label>
                  <select 
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value)}
                    className="w-full border-gray-300 rounded-2xl shadow-sm focus:ring-black focus:border-black p-3 border text-sm"
                  >
                    {CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-on-surface-variant uppercase tracking-wider text-[11px] mb-1">Caption / Description</label>
                  <textarea 
                    value={formCaption}
                    onChange={(e) => setFormCaption(e.target.value)}
                    placeholder="Enter short description or client style detail..."
                    rows={3}
                    className="w-full border-gray-300 rounded-2xl shadow-sm focus:ring-black focus:border-black p-3 border text-sm"
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
                      Uploading...
                    </>
                  ) : "Publish Media"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
