"use client";

import { useState, DragEvent } from "react";
import Image from "next/image";
import { UploadCloud, Loader2 } from "lucide-react";

interface ImageUploaderProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
}

export default function ImageUploader({ value, onChange, label = "Upload Image" }: ImageUploaderProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const uploadFile = async (file: File) => {
    setLoading(true);
    setError("");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to upload image.");
      }

      onChange(data.url);
    } catch (err: any) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      uploadFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      uploadFile(e.target.files[0]);
    }
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-semibold text-on-surface-variant uppercase tracking-wider text-[11px]">
        {label}
      </label>

      <div 
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`relative border-2 border-dashed rounded-3xl p-6 flex flex-col items-center justify-center min-h-[180px] transition-all duration-300 ${
          isDragOver ? "border-primary bg-primary/5" : "border-[#d0c4bd]/60 bg-[#f8f3ee]"
        }`}
      >
        {loading ? (
          <div className="flex flex-col items-center gap-2 text-on-surface-variant">
            <Loader2 className="w-8 h-8 animate-spin" />
            <span className="text-sm font-medium">Uploading image...</span>
          </div>
        ) : value ? (
          <div className="flex flex-col items-center gap-4 w-full">
            <div className="relative w-36 h-36 rounded-2xl overflow-hidden shadow-md border border-[#d0c4bd]">
              <Image 
                src={value} 
                alt="Uploaded preview" 
                fill 
                className="object-cover" 
              />
            </div>
            <div className="flex gap-2">
              <label className="cursor-pointer bg-black text-white px-4 py-2 rounded-full text-xs font-semibold hover:bg-primary transition-colors">
                Change Image
                <input 
                  type="file" 
                  accept="image/*" 
                  className="hidden" 
                  onChange={handleFileChange} 
                />
              </label>
              <button 
                type="button"
                onClick={() => onChange("")}
                className="bg-red-50 text-red-600 border border-red-200 px-4 py-2 rounded-full text-xs font-semibold hover:bg-red-100 transition-colors"
              >
                Remove
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2 text-center text-on-surface-variant">
            <UploadCloud className="w-10 h-10 text-on-surface-variant/40" />
            <p className="text-sm font-medium">Drag &amp; drop your image here, or <label className="text-black hover:opacity-70 cursor-pointer font-bold transition-opacity">browse<input type="file" accept="image/*" className="hidden" onChange={handleFileChange} /></label></p>
            <p className="text-xs text-on-surface-variant/60">Supports PNG, JPG, JPEG, WEBP</p>
          </div>
        )}

        {error && (
          <div className="absolute bottom-2 left-0 right-0 text-center text-xs text-red-600 font-medium">
            {error}
          </div>
        )}
      </div>
    </div>
  );
}
