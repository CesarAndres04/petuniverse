"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight, Star, Shield, Heart } from "lucide-react";

// ─── Partícula de pata flotante ───────────────────────────────
const FloatingPaw = ({
  style,
  delay = 0,
}: {
  style: React.CSSProperties;
  delay?: number;
}) => (
  <div
    className="absolute opacity-10 text-forest-400 animate-float pointer-events-none select-none"
    style={{ ...style, animationDelay: `${delay}s` }}
  >
    🐾
  </div>
);

// ─── Estadísticas sociales del hero ──────────────────────────
const stats = [
  { value: "+15,000",  label: "mascotas felices" },
  { value: "98%",      label: "satisfacción garantizada" },
  { value: "+500",     label: "productos premium" },
];

// ─── Avatares de clientes satisfechos ────────────────────────
const AVATAR_COLORS = [
  "bg-terra-200",
  "bg-forest-200",
  "bg-cream-600",
  "bg-forest-300",
];

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden gradient-hero pt-20">

      {/* Patas flotantes decorativas */}
      <FloatingPaw style={{ top: "15%", left: "8%",  fontSize: "2rem" }} delay={0}   />
      <FloatingPaw style={{ top: "70%", left: "5%",  fontSize: "1.5rem" }} delay={1} />
      <FloatingPaw style={{ top: "25%", right: "6%", fontSize: "2.5rem" }} delay={2} />
      <FloatingPaw style={{ top: "60%", right: "4%", fontSize: "1.8rem" }} delay={0.5} />
      <FloatingPaw style={{ top: "45%", left: "50%", fontSize: "3rem"  }} delay={1.5} />

      {/* Círculo de gradiente decorativo (fondo) */}
      <div
        className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full
                   bg-gradient-to-br from-forest-100/40 to-cream-200/60
                   blur-3xl pointer-events-none"
      />
      <div
        className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full
                   bg-gradient-to-tr from-terra-100/30 to-cream-200/50
                   blur-3xl pointer-events-none"
      />

      <div className="section-wrapper w-full relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* ─── Columna izquierda: Copy ────────────────────────── */}
          <div className="space-y-8 animate-fade-up">

            {/* Badge de confianza */}
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm
                            border border-forest-100 rounded-full px-4 py-2 shadow-sm">
              <div className="w-2 h-2 rounded-full bg-forest-400 animate-pulse" />
              <span className="text-sm font-medium text-forest-600">
                La tienda de lujo para tu mejor amigo
              </span>
            </div>

            {/* Titular principal */}
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl leading-[1.1] font-bold">
              <span className="text-forest-700">Todo lo que</span>
              <br />
              <span className="text-gradient-terra">tu mascota</span>
              <br />
              <span className="text-forest-700">merece</span>
            </h1>

            {/* Subtítulo */}
            <p className="text-lg md:text-xl text-forest-500 leading-relaxed max-w-lg">
              Crea el perfil de tu compañero y descubre una experiencia de compra
              única, donde cada recomendación está hecha a su medida.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/registro" className="btn-terra text-base px-8 py-4 group">
                Crea el perfil de tu mascota
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/productos" className="btn-outline text-base px-8 py-4">
                Explorar productos
              </Link>
            </div>

            {/* Prueba social — avatares */}
            <div className="flex items-center gap-4">
              <div className="flex -space-x-2">
                {AVATAR_COLORS.map((color, i) => (
                  <div
                    key={i}
                    className={`w-9 h-9 rounded-full ${color} border-2 border-white
                                flex items-center justify-center text-sm`}
                  >
                    {["🐕", "🐈", "🐇", "🦜"][i]}
                  </div>
                ))}
              </div>
              <div>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-terra text-terra" />
                  ))}
                </div>
                <p className="text-sm text-forest-400">
                  <strong className="text-forest-600">+15,000</strong> familias confían en nosotros
                </p>
              </div>
            </div>
          </div>

          {/* ─── Columna derecha: Tarjeta flotante ──────────────── */}
          <div className="relative lg:h-[580px] flex items-center justify-center">

            {/* Tarjeta principal del hero */}
            <div className="relative w-full max-w-sm mx-auto">

              {/* Imagen placeholder de mascota */}
              <div className="bg-white rounded-4xl shadow-card-hover overflow-hidden
                              border border-cream-200 aspect-[4/5]">
                <div className="h-full gradient-hero flex flex-col items-center justify-center
                                relative p-8">
                  {/* Foto de mascota placeholder */}
                  <div className="w-48 h-48 rounded-full bg-gradient-to-br from-forest-100
                                  to-forest-200 flex items-center justify-center text-8xl
                                  shadow-forest mb-6 animate-float">
                    🐕
                  </div>
                  <h3 className="font-display text-2xl font-bold text-forest-700 mb-1">
                    Copérnico
                  </h3>
                  <p className="text-forest-400 text-sm mb-4">Golden Retriever · 3 años</p>
                  <div className="flex gap-2 flex-wrap justify-center">
                    {["Activo", "Sin gluten", "Ama los juguetes"].map((tag) => (
                      <span
                        key={tag}
                        className="category-badge bg-forest-50 text-forest-600 text-[11px]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Tarjeta flotante — Recomendación personalizada */}
              <div className="absolute -left-8 top-12 bg-white rounded-2xl p-4
                              shadow-card-hover border border-cream-200
                              w-52 animate-fade-up" style={{ animationDelay: "0.4s" }}>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-xl bg-terra-50 flex items-center justify-center">
                    <Heart className="w-4 h-4 text-terra fill-terra" />
                  </div>
                  <span className="text-xs font-semibold text-forest-700">Recomendado para ti</span>
                </div>
                <p className="text-xs text-forest-400 leading-relaxed">
                  <strong className="text-forest-600">Premio orgánico sin gluten</strong>
                  {" "}— perfecto para el nivel de energía de Copérnico
                </p>
              </div>

              {/* Tarjeta flotante — Adoptiversario */}
              <div className="absolute -right-8 bottom-20 bg-white rounded-2xl p-4
                              shadow-card-hover border border-cream-200
                              w-48 animate-fade-up" style={{ animationDelay: "0.7s" }}>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg">🎂</span>
                  <span className="text-xs font-semibold text-forest-700">Adoptiversario</span>
                </div>
                <p className="text-[11px] text-forest-400">
                  En <strong className="text-terra">14 días</strong> — regalo especial
                  con 20% de descuento
                </p>
              </div>

              {/* Badge de seguridad */}
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2
                              bg-forest text-white rounded-2xl px-4 py-2
                              flex items-center gap-2 shadow-forest whitespace-nowrap">
                <Shield className="w-3.5 h-3.5" />
                <span className="text-xs font-semibold">Compra 100% segura</span>
              </div>
            </div>
          </div>
        </div>

        {/* ─── Estadísticas ────────────────────────────────────── */}
        <div className="mt-20 grid grid-cols-3 gap-8 border-t border-cream-200 pt-12">
          {stats.map(({ value, label }) => (
            <div key={label} className="text-center">
              <p className="font-display text-3xl md:text-4xl font-bold text-forest-700 mb-1">
                {value}
              </p>
              <p className="text-sm text-forest-400">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
