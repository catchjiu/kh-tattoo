"use client";

import { useState, useRef } from "react";
import { createClient } from "@/lib/supabase/client";
import { Upload, X } from "lucide-react";

type Props = {
  value: string | null;
  onChange: (url: string | null) => void;
};

export function GalleryImageUpload({ value, onChange }: Props) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file?.type.startsWith("image/")) return;
    e.target.value = "";
    setError(null);
    setUploading(true);

    try {
      const supabase = createClient();
      const ext = file.name.split(".").pop() || "jpg";
      const path = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

      const { error: uploadError } = await supabase.storage
        .from("gallery-art")
        .upload(path, file, {
          cacheControl: "3600",
          upsert: false,
        });

      if (uploadError) throw new Error(uploadError.message);

      const {
        data: { publicUrl },
      } = supabase.storage.from("gallery-art").getPublicUrl(path);
      onChange(publicUrl);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div>
      <div className="flex items-center gap-4">
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          className="hidden"
          onChange={handleFileSelect}
          disabled={uploading}
        />
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="flex min-h-[120px] min-w-[120px] flex-col items-center justify-center gap-2 rounded-md border-2 border-dashed border-[var(--border)] bg-[#0d0d0d] px-4 py-3 text-sm text-[var(--muted)] transition hover:border-[var(--accent-gold)] hover:text-[var(--accent-gold)] disabled:opacity-50"
        >
          <Upload size={24} strokeWidth={1.5} />
          {uploading ? "Uploading…" : "Upload photo"}
        </button>
        {value && (
          <div className="relative">
            <img
              src={value}
              alt="Preview"
              className="h-24 w-24 rounded-md object-cover"
            />
            <button
              type="button"
              onClick={() => onChange(null)}
              className="absolute -right-2 -top-2 rounded-full bg-[var(--accent-crimson)] p-1 text-white hover:bg-red-700"
              aria-label="Remove"
            >
              <X size={12} />
            </button>
          </div>
        )}
      </div>
      {error && (
        <p className="mt-2 text-sm text-[var(--accent-crimson)]">{error}</p>
      )}
      <input type="hidden" name="image_url" value={value ?? ""} />
    </div>
  );
}
