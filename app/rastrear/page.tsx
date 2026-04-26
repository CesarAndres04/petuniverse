"use client";

import { useState } from "react";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { Search, Package, Truck, CheckCircle, Clock } from "lucide-react";

interface TrackingInfo {
  status: string;
  product: string;
  estimatedDelivery: string;
  carrier: string;
  trackingNumber: string;
  steps: { label: string; done: boolean; date: string }[];
}

const MOCK_TRACKING: Record<string, TrackingInfo> = {
  "PU-2026-847291": {
    status: "SHIPPED",
    product: "Premio Orgánico Sin Gluten + Suplemento Omega-3",
    estimatedDelivery: "28 Abr 2026",
    carrier: "Fedex",
    trackingNumber: "726495038471",
    steps: [
      { label: "Pedido confirmado", done: true, date: "24 Abr 2026, 10:32am" },
      { label: "Preparando en almacén", done: true, date: "24 Abr 2026, 3:15pm" },
      { label: "Recolectado por Fedex", done: true, date: "25 Abr 2026, 9:00am" },
      { label: "En camino a destino", done: false, date: "Estimado 28 Abr" },
      { label: "Entregado", done: false, date: "—" },
    ],
  },
};

export default function RastrearPage() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState<TrackingInfo | null | "not_found">(null);
  const [loading, setLoading] = useState(false);

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (!query.trim()) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    setLoading(false);
    const found = MOCK_TRACKING[query.trim().toUpperCase() as keyof typeof MOCK_TRACKING];
    setResult(found ?? "not_found");
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-cream-50 pt-20">
        <div className="section-wrapper py-16 max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <span className="category-badge bg-forest-50 text-forest-600 mb-3 inline-block">
              Rastreo
            </span>
            <h1 className="text-4xl font-display font-bold text-forest-700 mb-3">
              Rastrea tu <span className="text-gradient-forest">pedido</span>
            </h1>
            <p className="text-forest-400">
              Ingresa tu número de pedido (ej. PU-2026-847291)
            </p>
          </div>

          <form onSubmit={handleSearch} className="flex gap-3 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-forest-300" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="PU-2026-XXXXXX"
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-cream-200 bg-white
                           focus:outline-none focus:border-forest-300 text-sm"
              />
            </div>
            <button type="submit" disabled={loading} className="btn-primary px-6">
              {loading ? (
                <span className="inline-block w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
              ) : (
                "Buscar"
              )}
            </button>
          </form>

          {result === "not_found" && (
            <div className="bg-white rounded-2xl border border-red-100 p-6 text-center">
              <p className="text-2xl mb-2">🔍</p>
              <p className="font-semibold text-forest-700 mb-1">Pedido no encontrado</p>
              <p className="text-sm text-forest-400">
                Verifica el número e intenta de nuevo o{" "}
                <a href="/contacto" className="text-terra underline">contáctanos</a>.
              </p>
            </div>
          )}

          {result && result !== "not_found" && (
            <div className="bg-white rounded-2xl border border-cream-200 shadow-card-base overflow-hidden">
              <div className="p-6 border-b border-cream-100">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs text-forest-400 mb-1">Número de pedido</p>
                    <p className="font-bold text-forest-700">{query.toUpperCase()}</p>
                    <p className="text-sm text-forest-500 mt-1">{result.product}</p>
                  </div>
                  <div className="text-right">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-forest-50 text-forest-600">
                      <Truck className="w-3 h-3" />
                      En camino
                    </span>
                    <p className="text-xs text-forest-400 mt-1.5">
                      Llega aprox. {result.estimatedDelivery}
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <div className="space-y-4">
                  {result.steps.map((step, i) => (
                    <div key={i} className="flex items-start gap-4">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                        step.done ? "bg-forest text-white" : "bg-cream-200 text-forest-400"
                      }`}>
                        {step.done ? (
                          <CheckCircle className="w-4 h-4" />
                        ) : (
                          <Clock className="w-4 h-4" />
                        )}
                      </div>
                      <div className="flex-1 pb-4 border-b border-cream-100 last:border-0 last:pb-0">
                        <p className={`font-medium text-sm ${step.done ? "text-forest-700" : "text-forest-300"}`}>
                          {step.label}
                        </p>
                        <p className="text-xs text-forest-400 mt-0.5">{step.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {!result && (
            <p className="text-center text-xs text-forest-400 mt-4">
              Prueba con el número de ejemplo: <button onClick={() => setQuery("PU-2026-847291")} className="text-terra underline">PU-2026-847291</button>
            </p>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
