import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import AdminSidebar from "@/components/admin/AdminSidebar";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  // Login page has its own layout
  const isLoginPage = false; // Layout doesn't apply to login page due to its own full-screen layout

  if (!session && !isLoginPage) {
    redirect("/admin/login");
  }

  return (
    <div className="flex min-h-[calc(100vh-4rem)]">
      <AdminSidebar userName={session?.user?.name || "Admin"} />
      <div className="flex-1 p-6 md:p-8 overflow-auto">{children}</div>
    </div>
  );
}
