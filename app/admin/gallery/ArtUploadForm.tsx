"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";
import type { ArtUpload } from "@/types/database";
import type { Artist } from "@/types/database";
import { createArtUpload, updateArtUpload } from "./actions";

type Props = {
  artUpload?: ArtUpload | null;
  artists: Artist[];
  onClose: () => void;
};

export function ArtUploadForm({ artUpload, artists, onClose }: Props) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const isEditing = !!artUpload;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const form = e.currentTarget;
    const formData = new FormData(form);

    const result = isEditing
      ? await updateArtUpload(artUpload.id, formData)
      : await createArtUpload(formData);

    if (result?.error) {
      setError(result.error);
      return;
    }
    router.refresh();
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-md border border-[var(--border)] bg-[var(--card)] p-6">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="font-serif text-xl font-medium">
            {isEditing ? "Edit Artwork" : "Add Artwork"}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded p-2 text-[var(--muted)] hover:bg-[var(--border)] hover:text-[var(--foreground)]"
          >
            <X size={20} strokeWidth={1.5} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="rounded-md border border-[var(--accent-crimson)] bg-[var(--accent-crimson-muted)] px-4 py-2 text-sm text-[var(--accent-crimson)]">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-[var(--muted)]">
              Artist
            </label>
            <select
              name="artist_id"
              defaultValue={artUpload?.artist_id ?? ""}
              className="mt-1 w-full rounded-md border border-[var(--border)] bg-[#121212] px-3 py-2 text-[var(--foreground)]"
            >
              <option value="">— None —</option>
              {artists.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-[var(--muted)]">
              Image URL *
            </label>
            <input
              name="image_url"
              type="url"
              required
              defaultValue={artUpload?.image_url ?? ""}
              placeholder="https://..."
              className="mt-1 w-full rounded-md border border-[var(--border)] bg-[#121212] px-3 py-2 text-[var(--foreground)]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[var(--muted)]">
              Title
            </label>
            <input
              name="title"
              defaultValue={artUpload?.title ?? ""}
              className="mt-1 w-full rounded-md border border-[var(--border)] bg-[#121212] px-3 py-2 text-[var(--foreground)]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[var(--muted)]">
              Description
            </label>
            <textarea
              name="description"
              rows={2}
              defaultValue={artUpload?.description ?? ""}
              className="mt-1 w-full rounded-md border border-[var(--border)] bg-[#121212] px-3 py-2 text-[var(--foreground)]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[var(--muted)]">
              Tags (comma-separated)
            </label>
            <input
              name="tags"
              defaultValue={artUpload?.tags?.join(", ") ?? ""}
              placeholder="Traditional, Fine-line, Realism"
              className="mt-1 w-full rounded-md border border-[var(--border)] bg-[#121212] px-3 py-2 text-[var(--foreground)]"
            />
          </div>

          <div className="flex gap-6">
            <div>
              <label className="block text-sm font-medium text-[var(--muted)]">
                Display Order
              </label>
              <input
                name="display_order"
                type="number"
                defaultValue={artUpload?.display_order ?? 0}
                className="mt-1 w-24 rounded-md border border-[var(--border)] bg-[#121212] px-3 py-2 text-[var(--foreground)]"
              />
            </div>
            <div className="flex items-center gap-2">
              <input
                name="is_featured"
                type="checkbox"
                defaultChecked={artUpload?.is_featured ?? false}
                className="h-4 w-4 rounded border-[var(--border)]"
              />
              <label className="text-sm text-[var(--muted)]">Featured</label>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="rounded-md border border-[var(--border)] px-4 py-2 text-sm hover:bg-[var(--border)]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-md bg-[var(--accent-gold)] px-4 py-2 text-sm font-medium text-[#121212] hover:bg-[#d4af37]"
            >
              {isEditing ? "Save" : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
