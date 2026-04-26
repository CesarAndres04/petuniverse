"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Star, Shield, Heart, Sparkles } from "lucide-react";
import { useAuth, SPECIES_EMOJIS, getPetLifeStage, LIFE_STAGE_CONFIG } from "@/lib/store/auth";

const FloatingPaw = ({ style, delay = 0 }: { style: React.CSSProperties; delay?: number }) => (
  <div className="absolute opacity-10 text-forest-400 animate-float pointer-events-none select-none"
    style={{ ...style, animationDelay: `${delay}s` }}>🐾</div>
);

const stats = [
  { value: "+15,000", label: "mascotas felices" },
  { value: "98%",     label: "satisfacción garantizada" },
  { value: "+500",    label: "productos premium" },
];

const AVATAR_COLORS = ["bg-terra-200", "bg-forest-200", "bg-cream-600", "bg-forest-300"];

export default function Hero() {
  const { pet } = useAuth();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const lifeStage = pet ? getPetLifeStage(pet.birthDate, pet.species) : null;
  const lifeConfig = lifeStage ? LIFE_STAGE_CONFIG[lifeStage] : null;

  // Días hasta adoptiversario
  const daysUntilAdoptiversario = (() => {
    if (!pet?.adoptionDate) return null;
    const d = new Date(pet.adoptionDate);
    const next = new Date(new Date().getFullYear(), d.getMonth(), d.getDate());
    if (next < new Date()) next.setFullYear(next.getFullYear() + 1);
    return Math.ceil((next.getTime() - Date.now()) / (1000 * 60 * 60 * 24));
  })();

  const isPersonalized = mounted && !!pet;
  const speciesEmoji = pet ? (SPECIES_EMOJIS[pet.species] ?? "🐾") : "🐕";

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden gradient-hero pt-20">
      <FloatingPaw style={{ top: "15%", left: "8%",  fontSize: "2rem" }} delay={0}   />
      <FloatingPaw style={{ top: "70%", left: "5%",  fontSize: "1.5rem" }} delay={1} />
      <FloatingPaw style={{ top: "25%", right: "6%", fontSize: "2.5rem" }} delay={2} />
      <FloatingPaw style={{ top: "60%", right: "4%", fontSize: "1.8rem" }} delay={0.5} />
      <FloatingPaw style={{ top: "45%", left: "50%", fontSize: "3rem"  }} delay={1.5} />

      <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-forest-100/40 to-cream-200/60 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-gradient-to-tr from-terra-100/30 to-cream-200/50 blur-3xl pointer-events-none" />

      <div className="section-wrapper w-full relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* ─── Columna izquierda ─────────────────────────────── */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Badge */}
            <motion.div
              key={isPersonalized ? "personalized" : "default"}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm
                         border border-forest-100 rounded-full px-4 py-2 shadow-sm"
            >
              <div className="w-2 h-2 rounded-full bg-forest-400 animate-pulse" />
              <span className="text-sm font-medium text-forest-600">
                {isPersonalized
                  ? `La tienda de ${pet!.name} está lista ✨`
                  : "La tienda de lujo para tu mejor amigo"}
              </span>
            </motion.div>

            {/* Titular */}
            <motion.h1
              key={isPersonalized ? "title-pet" : "title-default"}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="font-display text-5xl md:text-6xl lg:text-7xl leading-[1.1] font-bold"
            >
              {isPersonalized ? (
                <>
                  <span className="text-forest-700">Todo lo que</span>
                  <br />
                  <span className="text-gradient-terra">{pet!.name}</span>
                  <br />
                  <span className="text-forest-700">merece</span>
                </>
              ) : (
                <>
                  <span className="text-forest-700">Todo lo que</span>
                  <br />
                  <span className="text-gradient-terra">tu mascota</span>
                  <br />
                  <span className="text-forest-700">merece</span>
                </>
              )}
            </motion.h1>

            {/* Subtítulo */}
            <motion.p
              key={isPersonalized ? "sub-pet" : "sub-default"}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-lg md:text-xl text-forest-500 leading-relaxed max-w-lg"
            >
              {isPersonalized
                ? `Hemos personalizado el catálogo para ${pet!.name}. Cada producto está filtrado por sus alergias, nivel de energía y etapa de vida.`
                : "Crea el perfil de tu compañero y descubre una experiencia de compra única, donde cada recomendación está hecha a su medida."}
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              {isPersonalized ? (
                <>
                  <Link href="/dashboard" className="btn-terra text-base px-8 py-4 group">
                    Ver tienda de {pet!.name}
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <Link href="/productos" className="btn-outline text-base px-8 py-4">
                    Ver catálogo completo
                  </Link>
                </>
              ) : (
                <>
                  <Link href="/registro" className="btn-terra text-base px-8 py-4 group">
                    Crea el perfil de tu mascota
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <Link href="/productos" className="btn-outline text-base px-8 py-4">
                    Explorar productos
                  </Link>
                </>
              )}
            </motion.div>

            {/* Social proof */}
            <div className="flex items-center gap-4">
              <div className="flex -space-x-2">
                {AVATAR_COLORS.map((color, i) => (
                  <div key={i} className={`w-9 h-9 rounded-full ${color} border-2 border-white flex items-center justify-center text-sm`}>
                    {["🐕", "🐈", "🐇", "🦜"][i]}
                  </div>
                ))}
              </div>
              <div>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-terra text-terra" />)}
                </div>
                <p className="text-sm text-forest-400">
                  <strong className="text-forest-600">+15,000</strong> familias confían en nosotros
                </p>
              </div>
            </div>
          </motion.div>

          {/* ─── Columna derecha: Tarjeta ─────────────────────── */}
          <motion.div
            className="relative lg:h-[580px] flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.15, duration: 0.6 }}
          >
            <div className="relative w-full max-w-sm mx-auto">
              {/* Tarjeta mascota */}
              <div className="bg-white rounded-4xl shadow-card-hover overflow-hidden border border-cream-200 aspect-[4/5]">
                <div className="h-full gradient-hero flex flex-col items-center justify-center relative p-8">
                  <motion.div
                    key={isPersonalized ? "pet-photo" : "default-photo"}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", damping: 14 }}
                    className="w-48 h-48 rounded-full bg-gradient-to-br from-forest-100 to-forest-200 flex items-center justify-center text-8xl shadow-forest mb-6 animate-float"
                  >
                    {isPersonalized && pet!.photoUrl ? (
                      <img src={pet!.photoUrl} alt={pet!.name} className="w-full h-full object-cover rounded-full" />
                    ) : (
                      speciesEmoji
                    )}
                  </motion.div>
                  <h3 className="font-display text-2xl font-bold text-forest-700 mb-1">
                    {isPersonalized ? pet!.name : "Copérnico"}
                  </h3>
                  <p className="text-forest-400 text-sm mb-4">
                    {isPersonalized
                      ? `${pet!.breed ?? pet!.species} · ${lifeConfig?.label ?? "Adulto"}`
                      : "Golden Retriever · 3 años"}
                  </p>
                  <div className="flex gap-2 flex-wrap justify-center">
                    {isPersonalized ? [
                      lifeConfig!.label,
                      pet!.foodAllergies.length > 0 ? `Sin ${pet!.foodAllergies[0]}` : null,
                      pet!.energyLevel === "ACTIVE" ? "Activo" : pet!.energyLevel === "ATHLETE" ? "Atleta" : "Relajado",
                    ].filter(Boolean).map((tag) => (
                      <span key={tag!} className="category-badge bg-forest-50 text-forest-600 text-[11px]">{tag}</span>
                    )) : (
                      ["Activo", "Sin gluten", "Ama los juguetes"].map((tag) => (
                        <span key={tag} className="category-badge bg-forest-50 text-forest-600 text-[11px]">{tag}</span>
                      ))
                    )}
                  </div>
                </div>
              </div>

              {/* Tarjeta flotante izquierda */}
              <motion.div
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="absolute -left-8 top-12 bg-white rounded-2xl p-4 shadow-card-hover border border-cream-200 w-52"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-xl bg-terra-50 flex items-center justify-center">
                    <Heart className="w-4 h-4 text-terra fill-terra" />
                  </div>
                  <span className="text-xs font-semibold text-forest-700">
                    {isPersonalized ? `Para ${pet!.name}` : "Recomendado para ti"}
                  </span>
                </div>
                <p className="text-xs text-forest-400 leading-relaxed">
                  {isPersonalized
                    ? <><strong className="text-forest-600">Catálogo personalizado</strong> — filtrado por sus alergias y etapa de vida</>
                    : <><strong className="text-forest-600">Premio orgánico sin gluten</strong> — perfecto para el nivel de energía de Copérnico</>
                  }
                </p>
              </motion.div>

              {/* Tarjeta flotante derecha */}
              <motion.div
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.65 }}
                className="absolute -right-8 bottom-20 bg-white rounded-2xl p-4 shadow-card-hover border border-cream-200 w-48"
              >
                {isPersonalized && daysUntilAdoptiversario !== null && daysUntilAdoptiversario <= 30 ? (
                  <>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-lg">🎂</span>
                      <span className="text-xs font-semibold text-forest-700">Adoptiversario</span>
                    </div>
                    <p className="text-[11px] text-forest-400">
                      En <strong className="text-terra">{daysUntilAdoptiversario} días</strong> — regalo especial con 20% de descuento
                    </p>
                  </>
                ) : (
                  <>
                    <div className="flex items-center gap-2 mb-2">
                      <Sparkles className="w-4 h-4 text-terra" />
                      <span className="text-xs font-semibold text-forest-700">Personalizado</span>
                    </div>
                    <p className="text-[11px] text-forest-400">
                      Registra a tu mascota y recibe <strong className="text-terra">20% off</strong> en tu primer pedido
                    </p>
                  </>
                )}
              </motion.div>

              {/* Badge seguridad */}
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-forest text-white rounded-2xl px-4 py-2 flex items-center gap-2 shadow-forest whitespace-nowrap">
                <Shield className="w-3.5 h-3.5" />
                <span className="text-xs font-semibold">Compra 100% segura</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Estadísticas */}
        <div className="mt-20 grid grid-cols-3 gap-8 border-t border-cream-200 pt-12">
          {stats.map(({ value, label }) => (
            <div key={label} className="text-center">
              <p className="font-display text-3xl md:text-4xl font-bold text-forest-700 mb-1">{value}</p>
              <p className="text-sm text-forest-400">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
