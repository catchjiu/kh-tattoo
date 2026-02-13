import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { ArtistList } from "./ArtistList";

export default async function AdminArtistsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/admin/login");

  const { data: artists } = await supabase
    .from("artists")
    .select("*")
    .order("display_order", { ascending: true })
    .order("name", { ascending: true });

  return (
    <div className="p-8">
      <h1 className="font-serif text-3xl font-medium text-[var(--foreground)]">
        Artists
      </h1>
      <p className="mt-2 text-[var(--muted)]">
        Manage artist profiles (Bio, Specialty, IG Handle).
      </p>
      <div className="mt-8">
        <ArtistList artists={artists ?? []} />
      </div>
    </div>
  );
}
