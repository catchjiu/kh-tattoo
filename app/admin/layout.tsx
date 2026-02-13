import { createClient } from "@/lib/supabase/server";
import { AdminSidebar } from "@/components/admin/AdminSidebar";

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
      {user && <AdminSidebar />}
      <div
        className={`pt-14 md:pt-0 ${user ? "md:pl-56" : ""}`}
      >
        {children}
      </div>
    </div>
  );
}
