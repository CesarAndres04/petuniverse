"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Package,
  ShoppingCart,
  BarChart3,
  Settings,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";

const PawIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C10.34 2 9 3.34 9 5s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3zM6.5 5C5.12 5 4 6.12 4 7.5S5.12 10 6.5 10 9 8.88 9 7.5 7.88 5 6.5 5zm11 0C16.12 5 15 6.12 15 7.5S16.12 10 17.5 10 20 8.88 20 7.5 18.88 5 17.5 5zM12 11c-3 0-9 1.5-9 4.5V18h18v-2.5c0-3-6-4.5-9-4.5z" />
  </svg>
);

const navItems = [
  { href: "/admin",          icon: LayoutDashboard, label: "Dashboard BI" },
  { href: "/admin/clientes", icon: Users,           label: "Clientes LTV" },
  { href: "/admin/productos", icon: Package,        label: "Productos" },
  { href: "/admin/ordenes",  icon: ShoppingCart,    label: "Órdenes" },
  { href: "/admin/reportes", icon: BarChart3,       label: "Reportes" },
  { href: "/admin/config",   icon: Settings,        label: "Configuración" },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 min-h-screen bg-forest-700 flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-white/10">
        <Link href="/" className="flex items-center gap-2 group w-fit">
          <div
            className="w-8 h-8 rounded-xl bg-terra flex items-center justify-center
                        group-hover:scale-110 transition-transform"
          >
            <PawIcon className="w-4 h-4 text-white" />
          </div>
          <span className="font-display text-lg font-bold text-white">
            Pet<span className="text-terra-300">Universe</span>
          </span>
        </Link>
        <span
          className="mt-2 inline-flex items-center gap-1.5 text-xs font-medium
                     bg-white/10 text-white/70 px-3 py-1 rounded-full"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-terra-300 animate-pulse" />
          Panel de Administración
        </span>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-4 py-6 space-y-1">
        {navItems.map(({ href, icon: Icon, label }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200",
                active
                  ? "bg-white/15 text-white"
                  : "text-white/60 hover:bg-white/10 hover:text-white"
              )}
            >
              <Icon className="w-4 h-4 flex-shrink-0" />
              {label}
            </Link>
          );
        })}
      </nav>

      {/* Footer del sidebar */}
      <div className="p-4 border-t border-white/10">
        <div className="flex items-center gap-3 px-2 mb-3">
          <div
            className="w-8 h-8 rounded-full bg-terra flex items-center justify-center
                        text-white text-sm font-bold flex-shrink-0"
          >
            A
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium text-white truncate">Admin</p>
            <p className="text-xs text-white/40 truncate">admin@petuniverse.mx</p>
          </div>
          <button className="text-white/40 hover:text-white transition-colors">
            <LogOut className="w-4 h-4" />
          </button>
        </div>

        <Link
          href="/dashboard"
          className="flex items-center justify-center gap-2 w-full py-2
                     bg-white/10 hover:bg-white/15 text-white/70 hover:text-white
                     rounded-xl text-xs font-medium transition-all"
        >
          Ver vista de cliente
        </Link>
      </div>
    </aside>
  );
}
