"use client";

import { useState, useEffect } from "react";
import { Edit, Trash2, Plus, X, Loader2, Scissors } from "lucide-react";
import ImageUploader from "@/components/ImageUploader";

interface Category {
  id: string;
  name: string;
}

interface Service {
  id: string;
  title: string;
  slug: string;
  description: string;
  price: number;
  image: string | null;
  categoryId: string | null;
  category: Category | null;
}

export default function AdminServices() {
  const [services, setServices] = useState<Service[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"ADD" | "EDIT">("ADD");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // Form states
  const [activeId, setActiveId] = useState("");
  const [formTitle, setFormTitle] = useState("");
  const [formDescription, setFormDescription] = useState("");
  const [formPrice, setFormPrice] = useState("");
  const [formImage, setFormImage] = useState("");
  const [formCategoryId, setFormCategoryId] = useState("");

  const fetchData = async () => {
    try {
      const [resServices, resCategories] = await Promise.all([
        fetch("/api/services"),
        fetch("/api/categories")
      ]);
      if (resServices.ok) {
        const servicesData = await resServices.json();
        setServices(servicesData);
      }
      if (resCategories.ok) {
        const categoriesData = await resCategories.json();
        setCategories(categoriesData);
      }
    } catch (err) {
      console.error("Failed to load admin services details:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const openAddModal = () => {
    setModalMode("ADD");
    setActiveId("");
    setFormTitle("");
    setFormDescription("");
    setFormPrice("");
    setFormImage("");
    setFormCategoryId(categories[0]?.id || "");
    setError("");
    setIsModalOpen(true);
  };

  const openEditModal = (service: Service) => {
    setModalMode("EDIT");
    setActiveId(service.id);
    setFormTitle(service.title);
    setFormDescription(service.description);
    setFormPrice(service.price.toString());
    setFormImage(service.image || "");
    setFormCategoryId(service.categoryId || "");
    setError("");
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle || !formDescription || !formPrice) {
      setError("Please fill out all required fields.");
      return;
    }

    setSaving(true);
    setError("");

    const payload = {
      title: formTitle,
      description: formDescription,
      price: parseFloat(formPrice),
      image: formImage,
      categoryId: formCategoryId || null
    };

    try {
      const url = modalMode === "ADD" ? "/api/services" : `/api/services/${activeId}`;
      const method = modalMode === "ADD" ? "POST" : "PUT";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      if (res.ok) {
        setIsModalOpen(false);
        fetchData();
      } else {
        setError(data.error || "Failed to save service details.");
      }
    } catch (err) {
      setError("An unexpected error occurred.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this service?")) return;
    try {
      const res = await fetch(`/api/services/${id}`, {
        method: "DELETE"
      });
      if (res.ok) {
        setServices(prev => prev.filter(s => s.id !== id));
      }
    } catch (err) {
      console.error("Failed to delete service:", err);
    }
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto p-4 md:p-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-on-surface font-display-lg">Manage Services</h1>
          <p className="text-on-surface-variant font-body-md text-sm mt-1">Configure service categories, pricing, and display images.</p>
        </div>
        <button 
          onClick={openAddModal}
          className="flex items-center gap-2 bg-black hover:bg-black/85 text-white px-5 py-2.5 rounded-full font-label-md text-xs uppercase tracking-widest transition-all duration-300"
        >
          <Plus size={16} />
          Add Service
        </button>
      </div>

      {loading ? (
        <div className="min-h-[400px] flex items-center justify-center">
          <div className="w-10 h-10 border-4 border-black border-t-transparent rounded-full animate-spin" />
        </div>
      ) : services.length === 0 ? (
        <div className="bg-white rounded-3xl border border-outline-variant/20 p-12 text-center text-on-surface-variant flex flex-col items-center justify-center min-h-[350px]">
          <Scissors size={52} className="mb-4 text-black/20" />
          <h2 className="text-xl font-bold text-on-surface mb-2">No Services Configured</h2>
          <p className="text-sm max-w-sm">Create salon treatments to allow clients to select them on the booking page.</p>
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-outline-variant/20 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface border-b border-outline-variant/30 text-[11px] font-label-md uppercase tracking-wider text-on-surface-variant/80">
                  <th className="p-5 pl-8">Service Title</th>
                  <th className="p-5">Category</th>
                  <th className="p-5">Price</th>
                  <th className="p-5">Image Preview</th>
                  <th className="p-5 pr-8 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/20 font-body-md text-sm text-on-surface">
                {services.map((service) => (
                  <tr key={service.id} className="hover:bg-surface-container-lowest/50 transition-colors">
                    <td className="p-5 pl-8">
                      <div className="font-bold text-[15px]">{service.title}</div>
                      <div className="text-xs text-on-surface-variant line-clamp-1 max-w-md mt-1">{service.description}</div>
                    </td>
                    <td className="p-5 text-on-surface-variant font-medium">
                      {service.category?.name || "Uncategorized"}
                    </td>
                    <td className="p-5 font-semibold text-secondary">
                      Rs. {service.price.toLocaleString()}
                    </td>
                    <td className="p-5">
                      {service.image ? (
                        <div className="relative w-12 h-12 rounded-lg overflow-hidden border border-outline-variant/30">
                          <img src={service.image} alt={service.title} className="object-cover w-full h-full" />
                        </div>
                      ) : (
                        <span className="text-xs text-on-surface-variant/60 italic">No image</span>
                      )}
                    </td>
                    <td className="p-5 pr-8 text-right">
                      <div className="flex justify-end gap-2">
                        <button 
                          onClick={() => openEditModal(service)}
                          className="w-9 h-9 flex items-center justify-center text-on-surface-variant hover:bg-surface-container-low hover:text-black rounded-full transition-colors border-none"
                          title="Edit"
                        >
                          <Edit size={16} />
                        </button>
                        <button 
                          onClick={() => handleDelete(service.id)}
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

      {/* Add / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-3xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
            <div className="p-6 border-b border-outline-variant/30 flex justify-between items-center bg-[#f8f3ee]">
              <h3 className="font-display-lg text-lg font-bold text-on-surface">
                {modalMode === "ADD" ? "Create New Service" : "Edit Service Details"}
              </h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-on-surface-variant hover:text-black border-none bg-transparent"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSave} className="flex-1 overflow-y-auto p-6 space-y-6">
              {error && (
                <div className="bg-red-50 text-red-700 p-4 rounded-2xl text-xs font-semibold border border-red-200">
                  {error}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-on-surface-variant uppercase tracking-wider text-[11px] mb-1">Service Title *</label>
                  <input 
                    type="text" 
                    value={formTitle}
                    onChange={(e) => setFormTitle(e.target.value)}
                    placeholder="e.g. Premium Hydrafacial"
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
                    placeholder="e.g. 5500"
                    className="w-full border-gray-300 rounded-2xl shadow-sm focus:ring-black focus:border-black p-3 border text-sm"
                    required
                  />
                </div>

                <div className="col-span-1 md:col-span-2">
                  <label className="block text-sm font-semibold text-on-surface-variant uppercase tracking-wider text-[11px] mb-1">Category *</label>
                  <select 
                    value={formCategoryId}
                    onChange={(e) => setFormCategoryId(e.target.value)}
                    className="w-full border-gray-300 rounded-2xl shadow-sm focus:ring-black focus:border-black p-3 border text-sm"
                  >
                    <option value="">Select Category</option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                  </select>
                </div>

                <div className="col-span-1 md:col-span-2">
                  <label className="block text-sm font-semibold text-on-surface-variant uppercase tracking-wider text-[11px] mb-1">Description *</label>
                  <textarea 
                    value={formDescription}
                    onChange={(e) => setFormDescription(e.target.value)}
                    placeholder="Provide details about what is included in the treatment..."
                    rows={4}
                    className="w-full border-gray-300 rounded-2xl shadow-sm focus:ring-black focus:border-black p-3 border text-sm"
                    required
                  />
                </div>

                <div className="col-span-1 md:col-span-2">
                  <ImageUploader 
                    label="Service Cover Image"
                    value={formImage}
                    onChange={(url) => setFormImage(url)}
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-outline-variant/30 flex justify-end gap-3">
                <button 
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-6 py-3 border border-gray-300 hover:bg-gray-50 rounded-full font-semibold text-xs uppercase tracking-widest transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  disabled={saving}
                  className="bg-black hover:bg-black/85 text-white px-6 py-3 rounded-full font-semibold text-xs uppercase tracking-widest transition-colors disabled:opacity-50 flex items-center gap-2"
                >
                  {saving ? (
                    <>
                      <Loader2 size={14} className="animate-spin" />
                      Saving...
                    </>
                  ) : "Save Service"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
