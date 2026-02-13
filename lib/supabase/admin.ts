import { createClient } from "@supabase/supabase-js";

/**
 * Server-only Supabase client with service role. Bypasses RLS.
 * Use only in server actions – never expose to the client.
 */
export function createAdminClient() {
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();
  if (!key) throw new Error("SUPABASE_SERVICE_ROLE_KEY is required for admin operations");
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    key,
    { auth: { persistSession: false } }
  );
}
