"use client";

import { useState } from "react";
import { ShoppingCart, Heart, Sparkles } from "lucide-react";
import { MOCK_PRODUCTS, MOCK_PET, CATEGORY_EMOJIS } from "@/lib/mock-data";
import { formatCurrency } from "@/lib/utils";
import { useCart } from "@/lib/store/cart";

// Filtra y rankea productos según el perfil de la mascota
function getRecommendations() {
  return MOCK_PRODUCTS.filter((p) => {
    const speciesOk = p.targetSpecies.includes(MOCK_PET.species);
    const allergyOk = MOCK_PET.foodAllergies.every((a) =>
      p.allergenFree.includes(a) || p.category === "TOYS" || p.category === "ACCESSORIES"
    );
    return speciesOk && allergyOk;
  })
    .slice(0, 4)
    .map((p) => {
      let reason = "";
      if (p.allergenFree.includes("gluten") && MOCK_PET.foodAllergies.includes("gluten"))
        reason = `Sin gluten — seguro para ${MOCK_PET.name}`;
      else if (p.allergenFree.includes("pollo") && MOCK_PET.foodAllergies.includes("pollo"))
        reason = `Sin pollo — respeta sus alergias`;
      else if (p.energyLevels.includes(MOCK_PET.energyLevel))
        reason = `Ideal para nivel ${MOCK_PET.energyLevel.toLowerCase()}`;
      else if (p.category === "CALMING" && MOCK_PET.fears.length > 0)
        reason = `Reduce ansiedad por ${MOCK_PET.fears[0] === "FIREWORKS" ? "pirotecnia" : "tormentas"}`;
      else
        reason = `Recomendado para ${MOCK_PET.breed}`;
      return { ...p, reason };
    });
}

export default function RecommendedProducts() {
  const cart = useCart();
  const [wishlist, setWishlist] = useState<Set<string>>(new Set());
  const products = getRecommendations();

  return (
    <div className="bg-white rounded-3xl border border-cream-200 shadow-card-base p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-terra-50 flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-terra" />
          </div>
          <div>
            <h3 className="font-display font-bold text-forest-700">
              Recomendado para {MOCK_PET.name}
            </h3>
            <p className="text-xs text-forest-400">
              Filtrado por sus alergias y nivel de energía
            </p>
          </div>
        </div>
        <button className="text-sm text-terra font-medium hover:text-terra-500 transition-colors">
          Ver todos →
        </button>
      </div>

      {/* Grid de productos */}
      <div className="grid sm:grid-cols-2 gap-4">
        {products.map((product) => {
          const inCart = cart.items.some((i) => i.product.id === product.id);
          const inWish = wishlist.has(product.id);

          return (
            <div
              key={product.id}
              className="group flex gap-4 p-4 rounded-2xl border border-cream-200
                         hover:border-forest-200 hover:bg-cream-50 transition-all duration-200"
            >
              {/* Emoji producto */}
              <div
                className="w-16 h-16 rounded-xl bg-gradient-to-br from-cream-100 to-cream-200
                           flex items-center justify-center text-3xl flex-shrink-0
                           group-hover:scale-105 transition-transform"
              >
                {CATEGORY_EMOJIS[product.category]}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-forest-700 text-sm leading-snug mb-1 truncate">
                  {product.name}
                </p>

                {/* Razón de recomendación */}
                <p className="text-[11px] text-terra font-medium mb-2 flex items-center gap-1">
                  <span>✓</span>
                  {product.reason}
                </p>

                {/* Precio + acciones */}
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-bold text-forest-700">
                      {formatCurrency(product.price)}
                    </span>
                    {product.comparePrice && (
                      <span className="text-xs text-forest-300 line-through ml-1">
                        {formatCurrency(product.comparePrice)}
                      </span>
                    )}
                  </div>
                  <div className="flex gap-1.5">
                    <button
                      onClick={() =>
                        setWishlist((prev) => {
                          const next = new Set(prev);
                          inWish ? next.delete(product.id) : next.add(product.id);
                          return next;
                        })
                      }
                      className={`w-7 h-7 rounded-lg flex items-center justify-center
                                  transition-all ${
                                    inWish
                                      ? "text-terra"
                                      : "text-forest-300 hover:text-terra"
                                  }`}
                    >
                      <Heart className={`w-3.5 h-3.5 ${inWish ? "fill-terra" : ""}`} />
                    </button>
                    <button
                      onClick={() => cart.addItem(product)}
                      className={`w-7 h-7 rounded-lg flex items-center justify-center
                                  transition-all ${
                                    inCart
                                      ? "bg-forest-100 text-forest-500"
                                      : "bg-terra text-white hover:bg-terra-500"
                                  }`}
                    >
                      <ShoppingCart className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
