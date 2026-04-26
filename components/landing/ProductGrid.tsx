"use client";

import { useState } from "react";
import { ShoppingCart, Star, Zap, CheckCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { MOCK_PRODUCTS, CATEGORY_EMOJIS } from "@/lib/mock-data";
import { formatCurrency } from "@/lib/utils";
import { useCart } from "@/lib/store/cart";
import { useAuth, getPetLifeStage, LIFE_STAGE_CONFIG, SPECIES_EMOJIS } from "@/lib/store/auth";
import type { ProductCategory } from "@/types";

const CATEGORY_LABELS: Record<ProductCategory, string> = {
  FOOD: "Alimentos", TREATS: "Premios", TOYS: "Juguetes",
  ACCESSORIES: "Accesorios", HEALTH: "Salud", CALMING: "Relajación",
  SUPPLEMENTS: "Suplementos", APPAREL: "Ropa", GROOMING: "Grooming",
};

const FILTERS: { label: string; value: ProductCategory | "ALL" }[] = [
  { label: "Todos",       value: "ALL" },
  { label: "Alimentos",   value: "FOOD" },
  { label: "Premios",     value: "TREATS" },
  { label: "Suplementos", value: "SUPPLEMENTS" },
  { label: "Juguetes",    value: "TOYS" },
  { label: "Relajación",  value: "CALMING" },
  { label: "Accesorios",  value: "ACCESSORIES" },
];

export default function ProductGrid() {
  const [activeFilter, setActiveFilter] = useState<ProductCategory | "ALL">("ALL");
  const [addedId, setAddedId] = useState<string | null>(null);
  const cart = useCart();
  const { pet, openModal } = useAuth();

  const lifeStage = pet ? getPetLifeStage(pet.birthDate, pet.species) : null;
  const lifeConfig = lifeStage ? LIFE_STAGE_CONFIG[lifeStage] : null;

  const filtered =
    activeFilter === "ALL"
      ? MOCK_PRODUCTS
      : MOCK_PRODUCTS.filter((p) => p.category === activeFilter);

  // Si hay mascota y filtro "Todos", prioriza categorías por etapa de vida
  const sorted = pet && activeFilter === "ALL" && lifeConfig
    ? [...filtered].sort((a, b) => {
        const ai = lifeConfig.priorityCategories.indexOf(a.category);
        const bi = lifeConfig.priorityCategories.indexOf(b.category);
        if (ai === -1 && bi === -1) return 0;
        if (ai === -1) return 1;
        if (bi === -1) return -1;
        return ai - bi;
      })
    : filtered;

  function handleAddToCart(product: typeof MOCK_PRODUCTS[0]) {
    if (!pet) {
      openModal(product);
      return;
    }
    cart.addItem(product);
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 1800);
  }

  // Genera badge de recomendación para la mascota
  function getRecommendationBadge(product: typeof MOCK_PRODUCTS[0]) {
    if (!pet) return null;
    const speciesOk = product.targetSpecies.includes(pet.species as any);
    const allergyOk = pet.foodAllergies.every(
      (a) => product.allergenFree.includes(a) || product.category === "TOYS" || product.category === "ACCESSORIES"
    );

    if (speciesOk && allergyOk) {
      if (lifeStage === "PUPPY" && lifeConfig!.priorityCategories.includes(product.category)) {
        return { text: `Ideal para cachorros`, color: "bg-amber-50 text-amber-600 border-amber-200" };
      }
      if (lifeStage === "SENIOR" && lifeConfig!.priorityCategories.includes(product.category)) {
        return { text: `Para mascotas senior`, color: "bg-blue-50 text-blue-600 border-blue-200" };
      }
      if (pet.breed && speciesOk) {
        return { text: `Recomendado para ${pet.breed}`, color: "bg-terra-50 text-terra-600 border-terra-200" };
      }
      return { text: `Para ${SPECIES_EMOJIS[pet.species] ?? "🐾"} ${pet.name}`, color: "bg-forest-50 text-forest-600 border-forest-100" };
    }
    return null;
  }

  return (
    <section className="py-20 lg:py-28 bg-cream-50">
      <div className="section-wrapper">
        {/* Encabezado */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3">
            <span className="category-badge bg-terra-50 text-terra-600">
              {pet ? `Catálogo de ${pet.name}` : "Catálogo Premium"}
            </span>
            <h2 className="section-title">
              {pet ? (
                <>
                  Seleccionado para{" "}
                  <span className="text-gradient-forest">{pet.name}</span>
                </>
              ) : (
                <>
                  Los más vendidos{" "}
                  <span className="text-gradient-forest">esta semana</span>
                </>
              )}
            </h2>
            {pet && lifeConfig && (
              <p className="text-sm text-forest-400 flex items-center gap-2">
                <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border ${lifeConfig.color} border-current/20`}>
                  {lifeConfig.emoji} {lifeConfig.label}
                </span>
                Ordenado por prioridad para su etapa de vida
              </p>
            )}
          </div>

          {/* Filtros */}
          <div className="flex flex-wrap gap-2">
            {FILTERS.map((f) => (
              <button
                key={f.value}
                onClick={() => setActiveFilter(f.value)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  activeFilter === f.value
                    ? "bg-forest text-white shadow-forest"
                    : "bg-white text-forest-400 border border-cream-200 hover:border-forest-300 hover:text-forest"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <AnimatePresence mode="popLayout">
            {sorted.map((product, idx) => {
              const inCart = cart.items.some((i) => i.product.id === product.id);
              const justAdded = addedId === product.id;
              const discount = product.comparePrice
                ? Math.round(((product.comparePrice - product.price) / product.comparePrice) * 100)
                : null;
              const badge = getRecommendationBadge(product);

              return (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: idx * 0.04 }}
                  className="product-card group flex flex-col"
                >
                  {/* Imagen */}
                  <div className="relative h-48 gradient-hero flex items-center justify-center overflow-hidden">
                    <span className="text-7xl group-hover:scale-110 transition-transform duration-500">
                      {CATEGORY_EMOJIS[product.category] ?? "🐾"}
                    </span>
                    <div className="absolute top-3 left-3 flex flex-col gap-1">
                      {product.isFeatured && (
                        <span className="category-badge bg-terra text-white text-[10px] py-0.5">⭐ Destacado</span>
                      )}
                      {discount && (
                        <span className="category-badge bg-forest text-white text-[10px] py-0.5">-{discount}%</span>
                      )}
                    </div>
                    {product.stock <= 10 && (
                      <div className="absolute top-3 right-3">
                        <span className="category-badge bg-red-50 text-red-500 text-[10px] py-0.5">
                          Últimas {product.stock}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Contenido */}
                  <div className="flex flex-col flex-1 p-5">
                    <span className="category-badge bg-cream-200 text-forest-500 mb-2 self-start">
                      {CATEGORY_LABELS[product.category]}
                    </span>
                    <h3 className="font-semibold text-forest-700 mb-1 leading-snug">{product.name}</h3>
                    <p className="text-xs text-forest-400 leading-relaxed mb-3 flex-1">
                      {product.shortDescription}
                    </p>

                    {/* Badge de recomendación para mascota */}
                    {badge && (
                      <div className={`flex items-center gap-1 text-[11px] font-medium px-2 py-1 rounded-lg border mb-3 ${badge.color}`}>
                        <CheckCircle className="w-3 h-3 flex-shrink-0" />
                        {badge.text}
                      </div>
                    )}

                    {/* Rating */}
                    <div className="flex items-center gap-1 mb-3">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`w-3 h-3 ${i < Math.floor(product.rating ?? 0) ? "fill-terra text-terra" : "text-cream-300"}`} />
                        ))}
                      </div>
                      <span className="text-xs text-forest-400">{product.rating} ({product.reviewCount})</span>
                    </div>

                    {/* Alérgenos */}
                    {product.allergenFree.length > 0 && (
                      <div className="flex flex-wrap gap-1 mb-4">
                        {product.allergenFree.slice(0, 3).map((a) => (
                          <span key={a} className="text-[10px] bg-forest-50 text-forest-500 px-2 py-0.5 rounded-full font-medium">
                            ✓ Sin {a}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Precio + CTA */}
                    <div className="flex items-center justify-between pt-3 border-t border-cream-200">
                      <div>
                        <p className="font-bold text-forest-700 text-lg leading-none">
                          {formatCurrency(product.price)}
                        </p>
                        {product.comparePrice && (
                          <p className="text-xs text-forest-300 line-through mt-0.5">
                            {formatCurrency(product.comparePrice)}
                          </p>
                        )}
                      </div>
                      <motion.button
                        onClick={() => handleAddToCart(product)}
                        whileTap={{ scale: 0.93 }}
                        className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm
                                    font-semibold transition-all duration-300 ${
                                      justAdded
                                        ? "bg-green-100 text-green-700"
                                        : inCart
                                        ? "bg-forest-100 text-forest-600"
                                        : "bg-terra text-white shadow-terra hover:bg-terra-500 hover:-translate-y-0.5"
                                    }`}
                      >
                        {justAdded ? (
                          <><CheckCircle className="w-3.5 h-3.5" /> ¡Listo!</>
                        ) : inCart ? (
                          <>✓ Agregado</>
                        ) : (
                          <><ShoppingCart className="w-3.5 h-3.5" /> Agregar</>
                        )}
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Ver más */}
        <div className="text-center mt-12">
          <button className="btn-outline gap-2">
            <Zap className="w-4 h-4" />
            Ver catálogo completo (+500 productos)
          </button>
        </div>
      </div>
    </section>
  );
}
