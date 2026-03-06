"use server";

import { headers } from "next/headers";
import { uploadToGCP, isGCPConfigured } from "@/lib/gcp-storage";
import { rateLimit, getClientIdentifier } from "@/lib/rate-limit";
import { createAdminClient } from "@/lib/supabase/admin";

const UPLOAD_LIMIT = 20; // admin can upload more

export async function uploadPortfolioImage(
  formData: FormData
): Promise<{ url?: string; error?: string }> {
  const file = formData.get("file") as File | null;
  if (!file?.type?.startsWith("image/")) {
    return { error: "Invalid file type." };
  }

  const headersList = await headers();
  const clientId = getClientIdentifier(headersList);
  const limit = rateLimit(clientId, "portfolio-upload", UPLOAD_LIMIT);
  if (!limit.success) {
    return {
      error: `Too many uploads. Try again in ${limit.retryAfter} seconds.`,
    };
  }

  if (isGCPConfigured()) {
    const result = await uploadToGCP(file, "portfolio");
    if ("error" in result) return { error: result.error };
    return { url: result.url };
  }

  try {
    const supabase = createAdminClient();
    const path = `${Date.now()}-${Math.random().toString(36).slice(2)}.jpg`;

    const { error } = await supabase.storage
      .from("gallery-art")
      .upload(path, file, {
        contentType: file.type,
        cacheControl: "3600",
        upsert: false,
      });

    if (error) return { error: error.message };

    const { data } = supabase.storage.from("gallery-art").getPublicUrl(path);
    return { url: data.publicUrl };
  } catch (err) {
    return { error: err instanceof Error ? err.message : "Upload failed" };
  }
}
