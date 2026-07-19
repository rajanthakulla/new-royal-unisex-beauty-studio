"use client";

import { useState, useEffect } from "react";
import { FileText, Plus, Edit, Trash2, X, Loader2 } from "lucide-react";
import ImageUploader from "@/components/ImageUploader";

interface Blog {
  id: string;
  title: string;
  slug: string;
  content: string;
  author: string;
  image: string | null;
  published: boolean;
  createdAt: string;
}

export default function AdminBlog() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"ADD" | "EDIT">("ADD");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // Form State
  const [activeId, setActiveId] = useState("");
  const [formTitle, setFormTitle] = useState("");
  const [formContent, setFormContent] = useState("");
  const [formAuthor, setFormAuthor] = useState("");
  const [formImage, setFormImage] = useState("");
  const [formPublished, setFormPublished] = useState(false);

  const fetchBlogs = async () => {
    try {
      const res = await fetch("/api/blog");
      if (res.ok) {
        const data = await res.json();
        setBlogs(data);
      }
    } catch (err) {
      console.error("Failed to load blog posts:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const openAddModal = () => {
    setModalMode("ADD");
    setActiveId("");
    setFormTitle("");
    setFormContent("");
    setFormAuthor("NRB Salon Specialist");
    setFormImage("");
    setFormPublished(true);
    setError("");
    setIsModalOpen(true);
  };

  const openEditModal = (blog: Blog) => {
    setModalMode("EDIT");
    setActiveId(blog.id);
    setFormTitle(blog.title);
    setFormContent(blog.content);
    setFormAuthor(blog.author);
    setFormImage(blog.image || "");
    setFormPublished(blog.published);
    setError("");
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle || !formContent || !formAuthor) {
      setError("Please fill out all required fields.");
      return;
    }

    setSaving(true);
    setError("");

    const payload = {
      title: formTitle,
      content: formContent,
      author: formAuthor,
      image: formImage,
      published: formPublished
    };

    try {
      const url = modalMode === "ADD" ? "/api/blog" : `/api/blog/${activeId}`;
      const method = modalMode === "ADD" ? "POST" : "PUT";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      if (res.ok) {
        setIsModalOpen(false);
        fetchBlogs();
      } else {
        setError(data.error || "Failed to save blog post.");
      }
    } catch (err) {
      setError("An unexpected error occurred.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this blog post?")) return;
    try {
      const res = await fetch(`/api/blog/${id}`, {
        method: "DELETE"
      });
      if (res.ok) {
        setBlogs(prev => prev.filter(b => b.id !== id));
      }
    } catch (err) {
      console.error("Failed to delete blog post:", err);
    }
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto p-4 md:p-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-on-surface font-display-lg">Manage Blog Posts</h1>
          <p className="text-on-surface-variant font-body-md text-sm mt-1">Publish hair care tips, trends, and cosmetic updates.</p>
        </div>
        <button 
          onClick={openAddModal}
          className="flex items-center gap-2 bg-black hover:bg-black/85 text-white px-5 py-2.5 rounded-full font-label-md text-xs uppercase tracking-widest transition-all duration-300"
        >
          <Plus size={16} />
          Write Post
        </button>
      </div>

      {loading ? (
        <div className="min-h-[300px] flex items-center justify-center">
          <div className="w-10 h-10 border-4 border-black border-t-transparent rounded-full animate-spin" />
        </div>
      ) : blogs.length === 0 ? (
        <div className="bg-white rounded-3xl border border-outline-variant/20 p-12 text-center text-on-surface-variant flex flex-col items-center justify-center min-h-[300px]">
          <FileText size={52} className="mb-4 text-black/20" />
          <h2 className="text-xl font-bold text-on-surface mb-2">No Posts Yet</h2>
          <p className="text-sm max-w-sm">Share beauty tips, new cosmetic lines, or styling tutorials with your salon audience.</p>
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-outline-variant/20 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface border-b border-outline-variant/30 text-[11px] font-label-md uppercase tracking-wider text-on-surface-variant/80">
                  <th className="p-5 pl-8">Post Details</th>
                  <th className="p-5">Author</th>
                  <th className="p-5">Published Date</th>
                  <th className="p-5">Status</th>
                  <th className="p-5 pr-8 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/20 font-body-md text-sm text-on-surface">
                {blogs.map((blog) => (
                  <tr key={blog.id} className="hover:bg-surface-container-lowest/50 transition-colors">
                    <td className="p-5 pl-8">
                      <div className="font-bold text-[15px]">{blog.title}</div>
                      <div className="text-xs text-on-surface-variant line-clamp-1 max-w-md mt-1">{blog.content}</div>
                    </td>
                    <td className="p-5 text-on-surface-variant font-medium">
                      {blog.author}
                    </td>
                    <td className="p-5 text-on-surface-variant">
                      {new Date(blog.createdAt).toLocaleDateString(undefined, { 
                        month: 'short', 
                        day: 'numeric', 
                        year: 'numeric' 
                      })}
                    </td>
                    <td className="p-5">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        blog.published 
                          ? "bg-green-50 text-green-700 border border-green-200" 
                          : "bg-yellow-50 text-yellow-700 border border-yellow-200"
                      }`}>
                        {blog.published ? "PUBLISHED" : "DRAFT"}
                      </span>
                    </td>
                    <td className="p-5 pr-8 text-right">
                      <div className="flex justify-end gap-2">
                        <button 
                          onClick={() => openEditModal(blog)}
                          className="w-9 h-9 flex items-center justify-center text-on-surface-variant hover:bg-surface-container-low hover:text-black rounded-full transition-colors border-none"
                          title="Edit"
                        >
                          <Edit size={16} />
                        </button>
                        <button 
                          onClick={() => handleDelete(blog.id)}
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

      {/* Blog Post Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-3xl shadow-xl w-full max-w-2xl max-h-[95vh] overflow-hidden flex flex-col">
            <div className="p-6 border-b border-outline-variant/30 flex justify-between items-center bg-[#f8f3ee]">
              <h3 className="font-display-lg text-lg font-bold text-on-surface">
                {modalMode === "ADD" ? "Write Blog Post" : "Edit Blog Post"}
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="col-span-1 md:col-span-2">
                  <label className="block text-sm font-semibold text-on-surface-variant uppercase tracking-wider text-[11px] mb-1">Post Title *</label>
                  <input 
                    type="text" 
                    value={formTitle}
                    onChange={(e) => setFormTitle(e.target.value)}
                    placeholder="e.g. 5 Hair Care Secrets from Sita Sharma"
                    className="w-full border-gray-300 rounded-2xl shadow-sm focus:ring-black focus:border-black p-3 border text-sm"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-on-surface-variant uppercase tracking-wider text-[11px] mb-1">Author Name *</label>
                  <input 
                    type="text" 
                    value={formAuthor}
                    onChange={(e) => setFormAuthor(e.target.value)}
                    placeholder="e.g. Sita Sharma"
                    className="w-full border-gray-300 rounded-2xl shadow-sm focus:ring-black focus:border-black p-3 border text-sm"
                    required
                  />
                </div>

                <div className="flex items-center gap-2">
                  <input 
                    type="checkbox" 
                    id="published"
                    checked={formPublished}
                    onChange={(e) => setFormPublished(e.target.checked)}
                    className="rounded text-black focus:ring-black border-gray-300 h-4 w-4"
                  />
                  <label htmlFor="published" className="text-sm font-medium text-on-surface select-none cursor-pointer">
                    Publish immediately (visible to public)
                  </label>
                </div>

                <div className="col-span-1 md:col-span-2">
                  <label className="block text-sm font-semibold text-on-surface-variant uppercase tracking-wider text-[11px] mb-1">Content Details *</label>
                  <textarea 
                    value={formContent}
                    onChange={(e) => setFormContent(e.target.value)}
                    placeholder="Write the full post contents here..."
                    rows={8}
                    className="w-full border-gray-300 rounded-2xl shadow-sm focus:ring-black focus:border-black p-3 border text-sm"
                    required
                  />
                </div>

                <div className="col-span-1 md:col-span-2">
                  <ImageUploader 
                    label="Featured Header Image (Optional)"
                    value={formImage}
                    onChange={(url) => setFormImage(url)}
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
                  ) : "Save Post"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
