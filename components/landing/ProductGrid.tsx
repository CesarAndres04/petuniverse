"use client";

import { useState } from "react";
import { ShoppingCart, Star, Zap } from "lucide-react";
import { MOCK_PRODUCTS, CATEGORY_EMOJIS } from "@/lib/mock-data";
import { formatCurrency } from "@/lib/utils";
import { useCart } from "@/lib/store/cart";
import type { ProductCategory } from "@/types";

const CATEGORY_LABELS: Record<ProductCategory, string> = {
  FOOD:        "Alimentos",
  TREATS:      "Premios",
  TOYS:        "Juguetes",
  ACCESSORIES: "Accesorios",
  HEALTH:      "Salud",
  CALMING:     "Relajación",
  SUPPLEMENTS: "Suplementos",
  APPAREL:     "Ropa",
  GROOMING:    "Grooming",
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
  const cart = useCart();

  const filtered =
    activeFilter === "ALL"
      ? MOCK_PRODUCTS
      : MOCK_PRODUCTS.filter((p) => p.category === activeFilter);

  return (
    <section className="py-20 lg:py-28 bg-cream-50">
      <div className="section-wrapper">
        {/* Encabezado */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3">
            <span className="category-badge bg-terra-50 text-terra-600">
              Catálogo Premium
            </span>
            <h2 className="section-title">
              Los más vendidos{" "}
              <span className="text-gradient-forest">esta semana</span>
            </h2>
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
          {filtered.map((product) => {
            const inCart = cart.items.some((i) => i.product.id === product.id);
            const discount = product.comparePrice
              ? Math.round(
                  ((product.comparePrice - product.price) / product.comparePrice) * 100
                )
              : null;

            return (
              <div key={product.id} className="product-card group flex flex-col">
                {/* Imagen / emoji placeholder */}
                <div
                  className="relative h-48 gradient-hero flex items-center justify-center
                              overflow-hidden"
                >
                  <span className="text-7xl group-hover:scale-110 transition-transform duration-500">
                    {CATEGORY_EMOJIS[product.category] ?? "🐾"}
                  </span>

                  {/* Badges sobre la imagen */}
                  <div className="absolute top-3 left-3 flex flex-col gap-1">
                    {product.isFeatured && (
                      <span className="category-badge bg-terra text-white text-[10px] py-0.5">
                        ⭐ Destacado
                      </span>
                    )}
                    {discount && (
                      <span className="category-badge bg-forest text-white text-[10px] py-0.5">
                        -{discount}%
                      </span>
                    )}
                  </div>

                  {/* Stock bajo */}
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
                  {/* Categoría */}
                  <span className="category-badge bg-cream-200 text-forest-500 mb-2 self-start">
                    {CATEGORY_LABELS[product.category]}
                  </span>

                  {/* Nombre */}
                  <h3 className="font-semibold text-forest-700 mb-1 leading-snug">
                    {product.name}
                  </h3>

                  {/* Descripción corta */}
                  <p className="text-xs text-forest-400 leading-relaxed mb-3 flex-1">
                    {product.shortDescription}
                  </p>

                  {/* Rating */}
                  <div className="flex items-center gap-1 mb-3">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3 h-3 ${
                            i < Math.floor(product.rating ?? 0)
                              ? "fill-terra text-terra"
                              : "text-cream-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-forest-400">
                      {product.rating} ({product.reviewCount})
                    </span>
                  </div>

                  {/* Tags de alérgenos */}
                  {product.allergenFree.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-4">
                      {product.allergenFree.slice(0, 3).map((a) => (
                        <span
                          key={a}
                          className="text-[10px] bg-forest-50 text-forest-500
                                     px-2 py-0.5 rounded-full font-medium"
                        >
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

                    <button
                      onClick={() => cart.addItem(product)}
                      className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm
                                  font-semibold transition-all duration-300 ${
                                    inCart
                                      ? "bg-forest-100 text-forest-600"
                                      : "bg-terra text-white shadow-terra hover:bg-terra-500 hover:-translate-y-0.5"
                                  }`}
                    >
                      {inCart ? (
                        <>✓ Agregado</>
                      ) : (
                        <>
                          <ShoppingCart className="w-3.5 h-3.5" />
                          Agregar
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
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
