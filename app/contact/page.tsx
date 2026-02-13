import { createClient } from "@/lib/supabase/server";
import { BookingForm } from "@/components/booking/BookingForm";

export default async function ContactPage() {
  const supabase = await createClient();
  const { data: artists } = await supabase
    .from("artists")
    .select("id, name")
    .eq("is_active", true)
    .order("display_order", { ascending: true });

  return (
    <div className="mx-auto max-w-7xl px-6 py-24">
      <h1 className="font-serif text-4xl font-medium">Book a Session</h1>
      <p className="mt-4 text-[var(--muted)]">
        Share your vision and we&apos;ll craft something extraordinary together.
      </p>

      <div className="mt-16 grid gap-12 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="rounded-md border border-[var(--border)] bg-[var(--card)] p-8">
            <BookingForm artists={artists ?? []} />
          </div>
        </div>
        <div className="space-y-6">
          <div className="rounded-md border border-[var(--border)] bg-[var(--card)] p-6">
            <h3 className="font-serif text-lg font-medium text-[var(--accent-gold)]">
              What to expect
            </h3>
            <ul className="mt-4 space-y-2 text-sm text-[var(--muted)]">
              <li>• We&apos;ll respond within 24–48 hours</li>
              <li>• Consultation can be in-person or via video</li>
              <li>• A deposit secures your spot</li>
              <li>• Bring reference images to your session</li>
            </ul>
          </div>
          <div className="rounded-md border border-[var(--border)] bg-[var(--card)] p-6">
            <h3 className="font-serif text-lg font-medium text-[var(--accent-gold)]">
              Contact
            </h3>
            <p className="mt-2 text-sm text-[var(--muted)]">
              Prefer to reach out directly? DM us on Instagram{" "}
              <a
                href="https://instagram.com/tattookaohsiung"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--accent-gold)] hover:underline"
              >
                @tattookaohsiung
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
