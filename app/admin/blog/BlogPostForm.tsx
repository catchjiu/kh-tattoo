"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";
import type { BlogPost } from "@/types/database";
import { createBlogPost, updateBlogPost } from "./actions";

type Props = {
  post?: BlogPost | null;
  onClose: () => void;
};

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

export function BlogPostForm({ post, onClose }: Props) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const isEditing = !!post;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const form = e.currentTarget;
    const formData = new FormData(form);

    const result = isEditing
      ? await updateBlogPost(post.id, formData)
      : await createBlogPost(formData);

    if (result?.error) {
      setError(result.error);
      return;
    }
    router.refresh();
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-md border border-[var(--border)] bg-[var(--card)] p-6">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="font-serif text-xl font-medium">
            {isEditing ? "Edit Post" : "New Post"}
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
              Title *
            </label>
            <input
              name="title"
              required
              defaultValue={post?.title}
              onChange={(e) => {
                const slugInput = e.target.form?.querySelector('[name="slug"]') as HTMLInputElement;
                if (slugInput && !post) slugInput.value = slugify(e.target.value);
              }}
              className="mt-1 w-full rounded-md border border-[var(--border)] bg-[#121212] px-3 py-2 text-[var(--foreground)]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[var(--muted)]">
              Slug *
            </label>
            <input
              name="slug"
              required
              defaultValue={post?.slug}
              className="mt-1 w-full rounded-md border border-[var(--border)] bg-[#121212] px-3 py-2 text-[var(--foreground)]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[var(--muted)]">
              Excerpt
            </label>
            <textarea
              name="excerpt"
              rows={2}
              defaultValue={post?.excerpt ?? ""}
              className="mt-1 w-full rounded-md border border-[var(--border)] bg-[#121212] px-3 py-2 text-[var(--foreground)]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[var(--muted)]">
              Content * (Markdown supported)
            </label>
            <textarea
              name="content"
              required
              rows={12}
              defaultValue={post?.content ?? ""}
              className="mt-1 w-full rounded-md border border-[var(--border)] bg-[#121212] px-3 py-2 font-mono text-sm text-[var(--foreground)]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[var(--muted)]">
              Cover Image URL
            </label>
            <input
              name="cover_image_url"
              type="url"
              defaultValue={post?.cover_image_url ?? ""}
              placeholder="https://..."
              className="mt-1 w-full rounded-md border border-[var(--border)] bg-[#121212] px-3 py-2 text-[var(--foreground)]"
            />
          </div>

          <div className="flex gap-6">
            <div className="flex-1">
              <label className="block text-sm font-medium text-[var(--muted)]">
                Category
              </label>
              <input
                name="category"
                defaultValue={post?.category ?? ""}
                placeholder="Studio News, Aftercare Tips"
                className="mt-1 w-full rounded-md border border-[var(--border)] bg-[#121212] px-3 py-2 text-[var(--foreground)]"
              />
            </div>
            <div className="flex items-center gap-2 pt-6">
              <input
                name="is_published"
                type="checkbox"
                defaultChecked={post?.is_published ?? false}
                className="h-4 w-4 rounded border-[var(--border)]"
              />
              <label className="text-sm text-[var(--muted)]">Published</label>
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
