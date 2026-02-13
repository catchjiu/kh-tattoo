import Link from "next/link";
import { LayoutDashboard, Users, Image, FileText, CalendarCheck, LogOut } from "lucide-react";
import { createClient } from "@/lib/supabase/server";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="min-h-screen bg-[#0d0d0d]">
      {user && (
        <aside className="fixed left-0 top-16 z-40 h-[calc(100vh-4rem)] w-56 border-r border-[var(--border)] bg-[#121212]">
          <nav className="flex flex-col gap-1 p-4">
            <Link
              href="/admin"
              className="flex items-center gap-3 rounded-md px-3 py-2 text-sm text-[var(--muted)] transition-colors hover:bg-[var(--card)] hover:text-[var(--foreground)]"
            >
              <LayoutDashboard size={18} strokeWidth={1.5} />
              Dashboard
            </Link>
            <Link
              href="/admin/artists"
              className="flex items-center gap-3 rounded-md px-3 py-2 text-sm text-[var(--muted)] transition-colors hover:bg-[var(--card)] hover:text-[var(--foreground)]"
            >
              <Users size={18} strokeWidth={1.5} />
              Artists
            </Link>
            <Link
              href="/admin/gallery"
              className="flex items-center gap-3 rounded-md px-3 py-2 text-sm text-[var(--muted)] transition-colors hover:bg-[var(--card)] hover:text-[var(--foreground)]"
            >
              <Image size={18} strokeWidth={1.5} />
              Gallery
            </Link>
            <Link
              href="/admin/blog"
              className="flex items-center gap-3 rounded-md px-3 py-2 text-sm text-[var(--muted)] transition-colors hover:bg-[var(--card)] hover:text-[var(--foreground)]"
            >
              <FileText size={18} strokeWidth={1.5} />
              Blog
            </Link>
            <Link
              href="/admin/bookings"
              className="flex items-center gap-3 rounded-md px-3 py-2 text-sm text-[var(--muted)] transition-colors hover:bg-[var(--card)] hover:text-[var(--foreground)]"
            >
              <CalendarCheck size={18} strokeWidth={1.5} />
              Bookings
            </Link>
            <div className="mt-auto border-t border-[var(--border)] pt-4">
              <form action="/api/auth/signout" method="post">
                <button
                  type="submit"
                  className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm text-[var(--muted)] transition-colors hover:bg-[var(--card)] hover:text-[var(--accent-crimson)]"
                >
                  <LogOut size={18} strokeWidth={1.5} />
                  Sign out
                </button>
              </form>
            </div>
          </nav>
        </aside>
      )}
      <div className={user ? "pl-56" : ""}>{children}</div>
    </div>
  );
}
