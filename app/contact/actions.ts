"use server";

import { createClient } from "@/lib/supabase/server";

export async function submitBooking(formData: FormData) {
  const supabase = await createClient();
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const phone = (formData.get("phone") as string) || null;
  const style = (formData.get("style") as string) || null;
  const placement = (formData.get("placement") as string) || null;
  const size = (formData.get("size") as string) || null;
  const description = (formData.get("description") as string) || null;
  const reference_url = (formData.get("reference_url") as string) || null;
  const preferred_artist_id = (formData.get("preferred_artist_id") as string) || null;
  const preferred_date = (formData.get("preferred_date") as string) || null;

  const { error } = await supabase.from("bookings").insert({
    name,
    email,
    phone,
    style,
    placement,
    size,
    description,
    reference_url,
    preferred_artist_id: preferred_artist_id || null,
    preferred_date,
  });

  if (error) return { error: error.message };
  return { success: true };
}
