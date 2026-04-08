"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { ADMIN_NAV_LINKS } from "@/lib/constants";
import { LayoutDashboard, Calendar, BookOpen, FileText, LogOut, User } from "lucide-react";
import { cn } from "@/lib/utils";

const ICONS: Record<string, React.ElementType> = {
  "/admin": LayoutDashboard,
  "/admin/buchungen": BookOpen,
  "/admin/mietanfragen": FileText,
  "/admin/kalender": Calendar,
};

export default function AdminSidebar({ userName }: { userName: string }) {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-white border-r border-border hidden md:flex flex-col shrink-0">
      <div className="p-4 border-b border-border">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
            <User size={16} className="text-primary" />
          </div>
          <div>
            <p className="text-sm font-medium">{userName}</p>
            <p className="text-xs text-muted">Administrator</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-3 space-y-1">
        {ADMIN_NAV_LINKS.map((link) => {
          const Icon = ICONS[link.href] || LayoutDashboard;
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary/10 text-primary"
                  : "text-muted hover:bg-accent hover:text-foreground"
              )}
            >
              <Icon size={18} />
              {link.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-3 border-t border-border">
        <button
          onClick={() => signOut({ callbackUrl: "/admin/login" })}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-muted hover:bg-red-50 hover:text-destructive transition-colors w-full"
        >
          <LogOut size={18} />
          Abmelden
        </button>
      </div>
    </aside>
  );
}
