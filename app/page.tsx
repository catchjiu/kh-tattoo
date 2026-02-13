import { createClient } from "@/lib/supabase/server";
import { HeroSection } from "@/components/home/HeroSection";
import { ArtistShowcase } from "@/components/home/ArtistShowcase";
import { BookingCTA } from "@/components/home/BookingCTA";

export default async function Home() {
  const supabase = await createClient();
  const { data: artists } = await supabase
    .from("artists")
    .select("id, name, specialty, avatar_url, slug")
    .eq("is_active", true)
    .order("display_order", { ascending: true })
    .limit(6);

  return (
    <>
      <HeroSection />
      <ArtistShowcase artists={artists ?? []} />
      <BookingCTA />
    </>
  );
}
