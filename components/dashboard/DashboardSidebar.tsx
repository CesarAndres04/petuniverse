"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  Heart,
  ShoppingCart,
  Settings,
  LogOut,
  Bell,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { MOCK_USER, MOCK_PET } from "@/lib/mock-data";

const PawIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C10.34 2 9 3.34 9 5s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3zM6.5 5C5.12 5 4 6.12 4 7.5S5.12 10 6.5 10 9 8.88 9 7.5 7.88 5 6.5 5zm11 0C16.12 5 15 6.12 15 7.5S16.12 10 17.5 10 20 8.88 20 7.5 18.88 5 17.5 5zM12 11c-3 0-9 1.5-9 4.5V18h18v-2.5c0-3-6-4.5-9-4.5z" />
  </svg>
);

const navItems = [
  { href: "/dashboard",               icon: LayoutDashboard, label: "Mi Mascota" },
  { href: "/dashboard/recomendaciones", icon: Heart,           label: "Recomendados" },
  { href: "/dashboard/pedidos",        icon: ShoppingCart,    label: "Mis Pedidos" },
  { href: "/dashboard/productos",      icon: Package,         label: "Explorar" },
  { href: "/dashboard/configuracion",  icon: Settings,        label: "Cuenta" },
];

export default function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 min-h-screen bg-white border-r border-cream-200 flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-cream-200">
        <Link href="/" className="flex items-center gap-2 group w-fit">
          <div
            className="w-8 h-8 rounded-xl gradient-forest flex items-center justify-center
                        group-hover:scale-110 transition-transform"
          >
            <PawIcon className="w-4 h-4 text-white" />
          </div>
          <span className="font-display text-lg font-bold text-forest-600">
            Pet<span className="text-terra">Universe</span>
          </span>
        </Link>
      </div>

      {/* Perfil de mascota */}
      <div className="p-4 m-4 bg-cream-50 rounded-2xl border border-cream-200">
        <div className="flex items-center gap-3">
          <div
            className="w-11 h-11 rounded-xl bg-gradient-to-br from-forest-100 to-forest-200
                        flex items-center justify-center text-xl flex-shrink-0"
          >
            🐕
          </div>
          <div className="min-w-0">
            <p className="font-semibold text-forest-700 text-sm truncate">
              {MOCK_PET.name}
            </p>
            <p className="text-xs text-forest-400 truncate">{MOCK_PET.breed}</p>
          </div>
        </div>
      </div>

      {/* Navegación */}
      <nav className="flex-1 px-4 pb-4 space-y-1">
        {navItems.map(({ href, icon: Icon, label }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200",
                active
                  ? "bg-forest text-white shadow-forest"
                  : "text-forest-400 hover:bg-cream-100 hover:text-forest"
              )}
            >
              <Icon className="w-4 h-4 flex-shrink-0" />
              {label}
            </Link>
          );
        })}
      </nav>

      {/* Usuario + acciones */}
      <div className="p-4 border-t border-cream-200 space-y-3">
        <button
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl
                     text-sm text-forest-400 hover:bg-cream-100 transition-colors"
        >
          <Bell className="w-4 h-4" />
          Notificaciones
          <span className="ml-auto w-5 h-5 rounded-full bg-terra text-white text-[10px]
                           flex items-center justify-center font-bold">
            2
          </span>
        </button>

        <div className="flex items-center gap-3 px-2">
          <div
            className="w-8 h-8 rounded-full bg-gradient-to-br from-terra-200 to-terra-300
                        flex items-center justify-center text-sm font-bold text-white flex-shrink-0"
          >
            {MOCK_USER.name.charAt(0)}
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium text-forest-700 truncate">
              {MOCK_USER.name}
            </p>
            <p className="text-xs text-forest-400 truncate">{MOCK_USER.email}</p>
          </div>
          <button className="text-forest-300 hover:text-terra transition-colors">
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
}
