import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { BookingsList } from "@/components/admin/BookingsList";

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
    <div className="p-4 sm:p-6 md:p-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-2xl font-medium text-[var(--foreground)] sm:text-3xl">
            Bookings
          </h1>
          <p className="mt-2 text-[var(--muted)]">
            {bookings?.length ?? 0} total · {pendingCount} pending
          </p>
        </div>
      </div>

      <BookingsList bookings={bookings ?? []} />
    </div>
  );
}
