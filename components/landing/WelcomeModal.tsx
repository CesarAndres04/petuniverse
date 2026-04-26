"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { X, Sparkles, Heart, Shield, Star } from "lucide-react";
import { useAuth } from "@/lib/store/auth";
import { useCart } from "@/lib/store/cart";

const BENEFITS = [
  { icon: Sparkles, text: "Recomendaciones filtradas por alergias y especie" },
  { icon: Heart,    text: "Descuentos exclusivos en el adoptiversario" },
  { icon: Shield,   text: "Catálogo 100% seguro para el perfil de tu mascota" },
  { icon: Star,     text: "Acceso anticipado a nuevos productos premium" },
];

export default function WelcomeModal() {
  const { modalOpen, closeModal, commitPending, pendingProduct } = useAuth();
  const cart = useCart();

  return (
    <AnimatePresence>
      {modalOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={closeModal}
            className="fixed inset-0 bg-forest-700/70 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4 pointer-events-none">
            <motion.div
              key="modal"
              initial={{ opacity: 0, scale: 0.88, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.88, y: 24 }}
              transition={{ type: "spring", damping: 22, stiffness: 320 }}
              className="bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden pointer-events-auto"
            >
              {/* Header visual */}
              <div className="gradient-hero h-44 flex items-center justify-center relative overflow-hidden">
                {/* Patas decorativas */}
                {["top-3 left-4 text-2xl", "bottom-4 right-6 text-3xl", "top-8 right-16 text-xl"].map((cls, i) => (
                  <span key={i} className={`absolute ${cls} opacity-20 animate-float`}
                    style={{ animationDelay: `${i * 0.5}s` }}>🐾</span>
                ))}

                <motion.div
                  initial={{ scale: 0, rotate: -10 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.15, type: "spring", damping: 12 }}
                  className="text-8xl select-none"
                >
                  🐾
                </motion.div>

                <button
                  onClick={closeModal}
                  className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20
                             hover:bg-white/40 flex items-center justify-center
                             text-white transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Content */}
              <div className="p-7">
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.18 }}
                >
                  <h2 className="font-display font-bold text-2xl text-forest-700 mb-2 text-center">
                    ¡Bienvenido al Club! 🎉
                  </h2>
                  <p className="text-forest-400 text-sm text-center mb-6 leading-relaxed">
                    Crea el perfil de tu mascota y recibe{" "}
                    <strong className="text-terra">recomendaciones personalizadas</strong>,
                    cupones exclusivos y mucho más.
                  </p>

                  {/* Beneficios */}
                  <motion.div
                    className="space-y-2.5 mb-7"
                    initial="hidden"
                    animate="visible"
                    variants={{
                      visible: { transition: { staggerChildren: 0.07, delayChildren: 0.25 } },
                    }}
                  >
                    {BENEFITS.map(({ icon: Icon, text }) => (
                      <motion.div
                        key={text}
                        variants={{ hidden: { opacity: 0, x: -8 }, visible: { opacity: 1, x: 0 } }}
                        className="flex items-center gap-3"
                      >
                        <div className="w-7 h-7 rounded-lg bg-terra-50 flex items-center justify-center flex-shrink-0">
                          <Icon className="w-3.5 h-3.5 text-terra" />
                        </div>
                        <p className="text-sm text-forest-600">{text}</p>
                      </motion.div>
                    ))}
                  </motion.div>

                  {/* CTAs */}
                  <Link
                    href="/registro"
                    onClick={closeModal}
                    className="flex items-center justify-center gap-2 w-full
                               bg-terra text-white font-semibold py-3 px-6 rounded-xl
                               hover:bg-terra-500 transition-all duration-200
                               shadow-terra hover:-translate-y-0.5 mb-3"
                  >
                    ✨ Crear perfil de mascota — es gratis
                  </Link>

                  {pendingProduct && (
                    <button
                      onClick={() => commitPending(cart.addItem)}
                      className="w-full text-center text-sm text-forest-400
                                 hover:text-forest-600 py-2 transition-colors"
                    >
                      Continuar sin personalización →
                    </button>
                  )}

                  {!pendingProduct && (
                    <Link
                      href="/login"
                      onClick={closeModal}
                      className="block w-full text-center text-sm text-forest-400
                                 hover:text-forest-600 py-2 transition-colors"
                    >
                      Ya tengo cuenta — Iniciar sesión →
                    </Link>
                  )}
                </motion.div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
