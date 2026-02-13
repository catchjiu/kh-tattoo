import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { Mail, Phone, Calendar } from "lucide-react";

export default async function AdminBookingsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/admin/login");

  const { data: bookings } = await supabase
    .from("bookings")
    .select("*, artists(name)")
    .order("created_at", { ascending: false });

  const pendingCount = bookings?.filter((b) => b.status === "pending").length ?? 0;

  return (
    <div className="p-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-3xl font-medium text-[var(--foreground)]">
            Bookings
          </h1>
          <p className="mt-2 text-[var(--muted)]">
            {bookings?.length ?? 0} total · {pendingCount} pending
          </p>
        </div>
      </div>

      <div className="mt-8 space-y-4">
        {(bookings ?? []).length === 0 ? (
          <div className="rounded-md border border-dashed border-[var(--border)] py-16 text-center text-[var(--muted)]">
            No bookings yet.
          </div>
        ) : (
          bookings?.map((b) => (
            <div
              key={b.id}
              className={`rounded-md border p-6 ${
                b.status === "pending"
                  ? "border-[var(--accent-gold)] bg-[var(--accent-gold-muted)]"
                  : "border-[var(--border)] bg-[var(--card)]"
              }`}
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <div className="flex items-center gap-3">
                    <h2 className="font-serif text-xl font-medium text-[var(--foreground)]">
                      {b.name}
                    </h2>
                    <span
                      className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                        b.status === "pending"
                          ? "bg-[var(--accent-gold)]/30 text-[var(--accent-gold)]"
                          : "bg-[var(--border)] text-[var(--muted)]"
                      }`}
                    >
                      {b.status}
                    </span>
                  </div>
                  <div className="mt-2 flex flex-wrap gap-4 text-sm text-[var(--muted)]">
                    <a href={`mailto:${b.email}`} className="flex items-center gap-1.5 hover:text-[var(--accent-gold)]">
                      <Mail size={14} strokeWidth={1.5} />
                      {b.email}
                    </a>
                    {b.phone && (
                      <a href={`tel:${b.phone}`} className="flex items-center gap-1.5 hover:text-[var(--accent-gold)]">
                        <Phone size={14} strokeWidth={1.5} />
                        {b.phone}
                      </a>
                    )}
                    <span className="flex items-center gap-1.5">
                      <Calendar size={14} strokeWidth={1.5} />
                      {new Date(b.created_at).toLocaleString()}
                    </span>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2 text-sm">
                    {b.style && (
                      <span className="rounded bg-[var(--border)] px-2 py-0.5">{b.style}</span>
                    )}
                    {b.placement && (
                      <span className="rounded bg-[var(--border)] px-2 py-0.5">{b.placement}</span>
                    )}
                    {b.size && (
                      <span className="rounded bg-[var(--border)] px-2 py-0.5">{b.size}</span>
                    )}
                    {(b as { artists?: { name: string } | null }).artists?.name && (
                      <span className="rounded bg-[var(--accent-gold-muted)] px-2 py-0.5 text-[var(--accent-gold)]">
                        {(b as { artists: { name: string } }).artists.name}
                      </span>
                    )}
                  </div>
                  {b.description && (
                    <p className="mt-3 max-w-2xl text-sm text-[var(--muted)]">
                      {b.description}
                    </p>
                  )}
                  {b.reference_url && (
                    <a
                      href={b.reference_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 inline-block text-sm text-[var(--accent-gold)] hover:underline"
                    >
                      View reference image →
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
