import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { ArtUploadList } from "./ArtUploadList";

export default async function AdminGalleryPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/admin/login");

  const { data: artUploads } = await supabase
    .from("art_uploads")
    .select("*, artists(name)")
    .order("display_order", { ascending: true })
    .order("created_at", { ascending: false });

  const { data: artists } = await supabase
    .from("artists")
    .select("*")
    .order("display_order", { ascending: true });

  return (
    <div className="p-4 sm:p-6 md:p-8">
      <h1 className="font-serif text-2xl font-medium text-[var(--foreground)] sm:text-3xl">
        Gallery
      </h1>
      <p className="mt-2 text-[var(--muted)]">
        Upload and manage portfolio pieces with tags.
      </p>
      <div className="mt-8">
        <ArtUploadList
          artUploads={artUploads ?? []}
          artists={artists ?? []}
        />
      </div>
    </div>
  );
}
