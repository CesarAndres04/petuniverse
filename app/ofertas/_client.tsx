"use client";

import { ShoppingCart, Star } from "lucide-react";
import { useCart } from "@/lib/store/cart";
import { formatCurrency } from "@/lib/utils";
import { CATEGORY_EMOJIS } from "@/lib/mock-data";
import type { Product } from "@/types";

const CATEGORY_LABELS: Record<string, string> = {
  FOOD: "Alimentos", TREATS: "Premios", TOYS: "Juguetes",
  ACCESSORIES: "Accesorios", HEALTH: "Salud", CALMING: "Relajación",
  SUPPLEMENTS: "Suplementos", APPAREL: "Ropa", GROOMING: "Grooming",
};

export default function OfertasClient({ products }: { products: Product[] }) {
  const cart = useCart();

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => {
        const inCart = cart.items.some((i) => i.product.id === product.id);
        const discount = product.comparePrice
          ? Math.round(((product.comparePrice - product.price) / product.comparePrice) * 100)
          : 0;

        return (
          <div key={product.id} className="product-card group flex flex-col relative">
            {/* Badge descuento */}
            <div className="absolute top-3 left-3 z-10">
              <span className="category-badge bg-red-500 text-white text-sm font-bold py-1 px-2">
                -{discount}%
              </span>
            </div>

            <div className="relative h-44 gradient-hero flex items-center justify-center overflow-hidden">
              <span className="text-6xl group-hover:scale-110 transition-transform duration-300">
                {CATEGORY_EMOJIS[product.category] ?? "🐾"}
              </span>
            </div>

            <div className="flex flex-col flex-1 p-5">
              <span className="category-badge bg-cream-200 text-forest-500 mb-2 self-start">
                {CATEGORY_LABELS[product.category]}
              </span>
              <h3 className="font-semibold text-forest-700 mb-1 leading-snug">{product.name}</h3>
              <p className="text-xs text-forest-400 leading-relaxed mb-3 flex-1">
                {product.shortDescription}
              </p>

              <div className="flex items-center gap-1 mb-4">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-3 h-3 ${i < Math.floor(product.rating ?? 0) ? "fill-terra text-terra" : "text-cream-300"}`} />
                  ))}
                </div>
                <span className="text-xs text-forest-400">{product.rating} ({product.reviewCount})</span>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-cream-200">
                <div>
                  <p className="font-bold text-forest-700 text-lg leading-none">
                    {formatCurrency(product.price)}
                  </p>
                  <p className="text-xs text-forest-300 line-through mt-0.5">
                    {formatCurrency(product.comparePrice!)}
                  </p>
                </div>
                <button
                  onClick={() => cart.addItem(product)}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                    inCart
                      ? "bg-forest-100 text-forest-600"
                      : "bg-terra text-white shadow-terra hover:bg-terra-500 hover:-translate-y-0.5"
                  }`}
                >
                  {inCart ? <>✓ Agregado</> : <><ShoppingCart className="w-3.5 h-3.5" />Agregar</>}
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
