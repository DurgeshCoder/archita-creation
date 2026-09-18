"use client";

import { usePathname } from "next/navigation";
import AdminSidebar from "@/components/admin/AdminSidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/admin/login";

  if (isLoginPage) {
    return <div className="min-h-screen">{children}</div>;
  }

  return (
    <div className="flex h-screen w-full overflow-hidden bg-neutral-100 dark:bg-neutral-950 text-luxury-dark dark:text-luxury-light">
      {/* Fixed Sidebar */}
      <AdminSidebar />

      {/* Independently Scrollable Content Area */}
      <main className="flex-1 flex flex-col h-screen overflow-y-auto overflow-x-hidden min-w-0 bg-neutral-100 dark:bg-neutral-950">
        {children}
      </main>
    </div>
  );
}
