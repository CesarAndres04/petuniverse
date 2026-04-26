"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ShoppingCart, User, Menu, X, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCart } from "@/lib/store/cart";
import { useAuth, SPECIES_EMOJIS } from "@/lib/store/auth";

// ─── Íconos de pata personalizados ────────────────────────────
const PawIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C10.34 2 9 3.34 9 5s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3zM6.5 5C5.12 5 4 6.12 4 7.5S5.12 10 6.5 10 9 8.88 9 7.5 7.88 5 6.5 5zm11 0C16.12 5 15 6.12 15 7.5S16.12 10 17.5 10 20 8.88 20 7.5 18.88 5 17.5 5zM12 11c-3 0-9 1.5-9 4.5V18h18v-2.5c0-3-6-4.5-9-4.5z"/>
  </svg>
);

const navLinks = [
  { label: "Productos",   href: "/productos" },
  { label: "Categorías",  href: "/categorias" },
  { label: "Sobre Nosotros", href: "/nosotros" },
  { label: "Blog",        href: "/blog" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled]   = useState(false);
  const [isMobileOpen, setMobileOpen] = useState(false);
  const [cartCount, setCartCount]     = useState(0);
  const [mounted, setMounted]         = useState(false);
  const itemCount = useCart((s) => s.itemCount());
  const { pet } = useAuth();
  useEffect(() => { setCartCount(itemCount); setMounted(true); }, [itemCount]);
  const isAuthenticated = mounted && !!pet;

  // Detecta scroll para activar el fondo del navbar
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-cream-200"
          : "bg-transparent"
      )}
    >
      <div className="section-wrapper">
        <div className="flex items-center justify-between h-16 md:h-20">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-2xl gradient-forest flex items-center justify-center
                            group-hover:scale-110 transition-transform duration-300">
              <PawIcon className="w-5 h-5 text-white" />
            </div>
            <span className="font-display text-xl font-bold text-forest-600">
              Pet<span className="text-terra">Universe</span>
            </span>
          </Link>

          {/* Links de navegación — desktop */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-forest-500 hover:text-terra
                           relative after:absolute after:bottom-0 after:left-0
                           after:w-0 after:h-0.5 after:bg-terra after:rounded-full
                           after:transition-all after:duration-300
                           hover:after:w-full transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Acciones — desktop */}
          <div className="hidden md:flex items-center gap-3">
            <button
              className="w-9 h-9 flex items-center justify-center rounded-xl
                         text-forest-400 hover:text-forest hover:bg-cream-200
                         transition-all duration-200"
              aria-label="Buscar"
            >
              <Search className="w-4 h-4" />
            </button>

            <Link
              href="/checkout"
              className="w-9 h-9 flex items-center justify-center rounded-xl
                         text-forest-400 hover:text-forest hover:bg-cream-200
                         transition-all duration-200 relative"
              aria-label="Carrito"
            >
              <ShoppingCart className="w-4 h-4" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full
                                 bg-terra text-white text-[10px] font-bold
                                 flex items-center justify-center">
                  {cartCount > 9 ? "9+" : cartCount}
                </span>
              )}
            </Link>

            <Link
              href="/dashboard"
              className="flex items-center gap-2 btn-forest text-sm px-4 py-2"
            >
              {isAuthenticated ? (
                <>{SPECIES_EMOJIS[pet!.species] ?? "🐾"} {pet!.name}</>
              ) : (
                <><User className="w-3.5 h-3.5" /> Mi Mascota</>
              )}
            </Link>
          </div>

          {/* Menú hamburguesa — mobile */}
          <button
            className="md:hidden w-9 h-9 flex items-center justify-center
                       rounded-xl text-forest hover:bg-cream-200 transition-colors"
            onClick={() => setMobileOpen(!isMobileOpen)}
            aria-label="Menú"
          >
            {isMobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Menú móvil */}
        {isMobileOpen && (
          <div className="md:hidden py-4 border-t border-cream-200 space-y-2 animate-fade-up">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block px-4 py-3 text-forest-500 hover:text-terra
                           hover:bg-cream-200 rounded-xl transition-all duration-200"
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-2 flex gap-2">
              <Link
                href="/dashboard"
                className="flex-1 btn-forest text-sm justify-center"
              >
                Mi Mascota
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
