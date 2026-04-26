import { ShoppingBag, Star } from "lucide-react";
import { MOCK_PRODUCTS, CATEGORY_EMOJIS } from "@/lib/mock-data";
import { formatCurrency } from "@/lib/utils";

export const metadata = { title: "Productos Favoritos — PetUniverse" };

const CATEGORY_LABELS: Record<string, string> = {
  FOOD: "Alimentos", TREATS: "Premios", TOYS: "Juguetes",
  ACCESSORIES: "Accesorios", HEALTH: "Salud", CALMING: "Relajación",
  SUPPLEMENTS: "Suplementos", APPAREL: "Ropa", GROOMING: "Grooming",
};

export default function DashboardProductosPage() {
  const featured = MOCK_PRODUCTS.filter((p) => p.isFeatured);

  return (
    <div className="p-6 lg:p-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-2xl font-display font-bold text-forest-700 mb-1">
          Productos destacados
        </h1>
        <p className="text-forest-400 text-sm">
          Los favoritos de la comunidad PetUniverse esta semana
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        {featured.map((product) => {
          const discount = product.comparePrice
            ? Math.round(((product.comparePrice - product.price) / product.comparePrice) * 100)
            : null;

          return (
            <div
              key={product.id}
              className="bg-white rounded-2xl border border-cream-200 shadow-card-base overflow-hidden
                         hover:border-forest-200 transition-colors group"
            >
              <div className="h-36 gradient-hero flex items-center justify-center">
                <span className="text-6xl group-hover:scale-110 transition-transform duration-300">
                  {CATEGORY_EMOJIS[product.category]}
                </span>
              </div>
              <div className="p-5">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div>
                    <span className="category-badge bg-cream-200 text-forest-500 mb-1 inline-block">
                      {CATEGORY_LABELS[product.category]}
                    </span>
                    <h3 className="font-semibold text-forest-700 leading-snug text-sm">
                      {product.name}
                    </h3>
                  </div>
                  {discount && (
                    <span className="category-badge bg-terra text-white text-[10px] py-0.5 flex-shrink-0">
                      -{discount}%
                    </span>
                  )}
                </div>

                <p className="text-xs text-forest-400 mb-3 leading-relaxed">
                  {product.shortDescription}
                </p>

                <div className="flex items-center gap-1 mb-4">
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

                <div className="flex items-center justify-between pt-3 border-t border-cream-100">
                  <div>
                    <p className="font-bold text-forest-700">{formatCurrency(product.price)}</p>
                    {product.comparePrice && (
                      <p className="text-xs text-forest-300 line-through">
                        {formatCurrency(product.comparePrice)}
                      </p>
                    )}
                  </div>
                  <a
                    href={`/productos?q=${encodeURIComponent(product.name)}`}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-terra text-white
                               text-xs font-semibold hover:bg-terra-500 transition-colors"
                  >
                    <ShoppingBag className="w-3 h-3" />
                    Ver
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
