"use client";

import { useState, useMemo } from "react";
import { ShoppingCart, Star, Search, SlidersHorizontal, X } from "lucide-react";
import { MOCK_PRODUCTS, CATEGORY_EMOJIS } from "@/lib/mock-data";
import { formatCurrency } from "@/lib/utils";
import { useCart } from "@/lib/store/cart";
import type { ProductCategory, PetSpecies } from "@/types";
import Footer from "@/components/landing/Footer";

const CATEGORY_LABELS: Record<ProductCategory, string> = {
  FOOD: "Alimentos",
  TREATS: "Premios",
  TOYS: "Juguetes",
  ACCESSORIES: "Accesorios",
  HEALTH: "Salud",
  CALMING: "Relajación",
  SUPPLEMENTS: "Suplementos",
  APPAREL: "Ropa",
  GROOMING: "Grooming",
};

const SORT_OPTIONS = [
  { label: "Relevancia", value: "relevance" },
  { label: "Precio: menor a mayor", value: "price_asc" },
  { label: "Precio: mayor a menor", value: "price_desc" },
  { label: "Mejor valorados", value: "rating" },
  { label: "Más vendidos", value: "sales" },
];

const SPECIES_OPTIONS: { label: string; value: PetSpecies | "ALL" }[] = [
  { label: "Todos", value: "ALL" },
  { label: "Perro", value: "DOG" },
  { label: "Gato", value: "CAT" },
  { label: "Ave", value: "BIRD" },
  { label: "Conejo", value: "RABBIT" },
];

interface Props {
  initialCategory?: string;
  initialSort?: string;
  initialSpecies?: string;
  initialQuery?: string;
}

export default function ProductosClient({
  initialCategory,
  initialSort,
  initialSpecies,
  initialQuery,
}: Props) {
  const cart = useCart();
  const [query, setQuery] = useState(initialQuery ?? "");
  const [category, setCategory] = useState<ProductCategory | "ALL">(
    (initialCategory as ProductCategory) ?? "ALL"
  );
  const [species, setSpecies] = useState<PetSpecies | "ALL">(
    (initialSpecies as PetSpecies) ?? "ALL"
  );
  const [sort, setSort] = useState(initialSort ?? "relevance");
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    let list = [...MOCK_PRODUCTS];

    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          (p.shortDescription ?? "").toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    if (category !== "ALL") list = list.filter((p) => p.category === category);
    if (species !== "ALL") list = list.filter((p) => p.targetSpecies.includes(species));

    switch (sort) {
      case "price_asc":
        list.sort((a, b) => a.price - b.price);
        break;
      case "price_desc":
        list.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        list.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
        break;
      case "sales":
        list.sort((a, b) => (b.salesCount ?? 0) - (a.salesCount ?? 0));
        break;
    }

    return list;
  }, [query, category, species, sort]);

  const activeFiltersCount = [
    category !== "ALL",
    species !== "ALL",
    query.trim() !== "",
  ].filter(Boolean).length;

  function clearFilters() {
    setQuery("");
    setCategory("ALL");
    setSpecies("ALL");
    setSort("relevance");
  }

  return (
    <>
      <main className="min-h-screen bg-cream-50 pt-20">
        {/* Header */}
        <div className="bg-white border-b border-cream-200">
          <div className="section-wrapper py-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <span className="category-badge bg-terra-50 text-terra-600 mb-2 inline-block">
                  Catálogo completo
                </span>
                <h1 className="text-3xl font-display font-bold text-forest-700">
                  Todos los{" "}
                  <span className="text-gradient-forest">productos</span>
                </h1>
                <p className="text-forest-400 mt-1">
                  {filtered.length} producto{filtered.length !== 1 ? "s" : ""} encontrado
                  {filtered.length !== 1 ? "s" : ""}
                </p>
              </div>

              {/* Buscador */}
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-forest-300" />
                <input
                  type="text"
                  placeholder="Buscar productos..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-cream-200
                             focus:outline-none focus:border-forest-300 bg-cream-50 text-sm"
                />
                {query && (
                  <button
                    onClick={() => setQuery("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-forest-300 hover:text-forest"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="section-wrapper py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar filtros (desktop) */}
            <aside className="hidden lg:block w-56 flex-shrink-0">
              <div className="bg-white rounded-2xl border border-cream-200 p-5 sticky top-24">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-forest-700 text-sm">Filtros</h3>
                  {activeFiltersCount > 0 && (
                    <button
                      onClick={clearFilters}
                      className="text-xs text-terra hover:text-terra-500 font-medium"
                    >
                      Limpiar ({activeFiltersCount})
                    </button>
                  )}
                </div>

                {/* Especie */}
                <div className="mb-5">
                  <p className="text-xs font-semibold text-forest-500 uppercase tracking-wide mb-2">
                    Especie
                  </p>
                  <div className="space-y-1">
                    {SPECIES_OPTIONS.map((s) => (
                      <button
                        key={s.value}
                        onClick={() => setSpecies(s.value)}
                        className={`w-full text-left px-3 py-1.5 rounded-lg text-sm transition-colors ${
                          species === s.value
                            ? "bg-forest text-white"
                            : "text-forest-500 hover:bg-cream-100"
                        }`}
                      >
                        {s.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Categoría */}
                <div>
                  <p className="text-xs font-semibold text-forest-500 uppercase tracking-wide mb-2">
                    Categoría
                  </p>
                  <div className="space-y-1">
                    <button
                      onClick={() => setCategory("ALL")}
                      className={`w-full text-left px-3 py-1.5 rounded-lg text-sm transition-colors ${
                        category === "ALL"
                          ? "bg-forest text-white"
                          : "text-forest-500 hover:bg-cream-100"
                      }`}
                    >
                      Todas
                    </button>
                    {(Object.keys(CATEGORY_LABELS) as ProductCategory[]).map((c) => (
                      <button
                        key={c}
                        onClick={() => setCategory(c)}
                        className={`w-full text-left px-3 py-1.5 rounded-lg text-sm transition-colors ${
                          category === c
                            ? "bg-forest text-white"
                            : "text-forest-500 hover:bg-cream-100"
                        }`}
                      >
                        {CATEGORY_EMOJIS[c]} {CATEGORY_LABELS[c]}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </aside>

            {/* Contenido principal */}
            <div className="flex-1">
              {/* Barra superior: sort + filtros mobile */}
              <div className="flex items-center justify-between mb-6 gap-4">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden flex items-center gap-2 px-4 py-2 rounded-xl border
                             border-cream-200 bg-white text-sm text-forest-600 hover:border-forest-300"
                >
                  <SlidersHorizontal className="w-4 h-4" />
                  Filtros
                  {activeFiltersCount > 0 && (
                    <span className="w-5 h-5 rounded-full bg-terra text-white text-xs flex items-center justify-center">
                      {activeFiltersCount}
                    </span>
                  )}
                </button>

                <div className="flex items-center gap-2 ml-auto">
                  <span className="text-sm text-forest-400 hidden sm:inline">Ordenar:</span>
                  <select
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                    className="text-sm border border-cream-200 rounded-xl px-3 py-2 bg-white
                               text-forest-600 focus:outline-none focus:border-forest-300"
                  >
                    {SORT_OPTIONS.map((o) => (
                      <option key={o.value} value={o.value}>
                        {o.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Filtros mobile expandible */}
              {showFilters && (
                <div className="lg:hidden bg-white rounded-2xl border border-cream-200 p-5 mb-6">
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <p className="text-xs font-semibold text-forest-500 uppercase tracking-wide mb-2">
                        Especie
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {SPECIES_OPTIONS.map((s) => (
                          <button
                            key={s.value}
                            onClick={() => setSpecies(s.value)}
                            className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                              species === s.value
                                ? "bg-forest text-white"
                                : "bg-cream-100 text-forest-500"
                            }`}
                          >
                            {s.label}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-forest-500 uppercase tracking-wide mb-2">
                        Categoría
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        <button
                          onClick={() => setCategory("ALL")}
                          className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                            category === "ALL" ? "bg-forest text-white" : "bg-cream-100 text-forest-500"
                          }`}
                        >
                          Todas
                        </button>
                        {(Object.keys(CATEGORY_LABELS) as ProductCategory[]).map((c) => (
                          <button
                            key={c}
                            onClick={() => setCategory(c)}
                            className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                              category === c ? "bg-forest text-white" : "bg-cream-100 text-forest-500"
                            }`}
                          >
                            {CATEGORY_LABELS[c]}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Grid de productos */}
              {filtered.length === 0 ? (
                <div className="text-center py-24">
                  <p className="text-5xl mb-4">🐾</p>
                  <p className="text-forest-600 font-semibold mb-1">Sin resultados</p>
                  <p className="text-forest-400 text-sm mb-4">
                    No encontramos productos con esos filtros
                  </p>
                  <button onClick={clearFilters} className="btn-primary text-sm">
                    Limpiar filtros
                  </button>
                </div>
              ) : (
                <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filtered.map((product) => {
                    const inCart = cart.items.some((i) => i.product.id === product.id);
                    const discount = product.comparePrice
                      ? Math.round(
                          ((product.comparePrice - product.price) / product.comparePrice) * 100
                        )
                      : null;

                    return (
                      <div key={product.id} className="product-card group flex flex-col">
                        <div className="relative h-44 gradient-hero flex items-center justify-center overflow-hidden">
                          <span className="text-6xl group-hover:scale-110 transition-transform duration-300">
                            {CATEGORY_EMOJIS[product.category] ?? "🐾"}
                          </span>
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
                          {product.stock <= 10 && (
                            <div className="absolute top-3 right-3">
                              <span className="category-badge bg-red-50 text-red-500 text-[10px] py-0.5">
                                Últimas {product.stock}
                              </span>
                            </div>
                          )}
                        </div>

                        <div className="flex flex-col flex-1 p-5">
                          <span className="category-badge bg-cream-200 text-forest-500 mb-2 self-start">
                            {CATEGORY_LABELS[product.category]}
                          </span>
                          <h3 className="font-semibold text-forest-700 mb-1 leading-snug">
                            {product.name}
                          </h3>
                          <p className="text-xs text-forest-400 leading-relaxed mb-3 flex-1">
                            {product.shortDescription}
                          </p>

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

                          {product.allergenFree.length > 0 && (
                            <div className="flex flex-wrap gap-1 mb-4">
                              {product.allergenFree.slice(0, 3).map((a) => (
                                <span
                                  key={a}
                                  className="text-[10px] bg-forest-50 text-forest-500 px-2 py-0.5 rounded-full font-medium"
                                >
                                  ✓ Sin {a}
                                </span>
                              ))}
                            </div>
                          )}

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
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
