import Link from "next/link";
import { CheckCircle, Package, Home } from "lucide-react";
import { formatDate } from "@/lib/utils";

export default function ConfirmacionPage({
  searchParams,
}: {
  searchParams: { orderNumber?: string; delivery?: string };
}) {
  const orderNumber = searchParams.orderNumber ?? "PU-2024-000001";
  const deliveryStr = searchParams.delivery;
  const deliveryDate = deliveryStr ? new Date(deliveryStr) : new Date(Date.now() + 5 * 24 * 60 * 60 * 1000);

  return (
    <div className="min-h-screen gradient-hero flex items-center justify-center px-4">
      <div className="w-full max-w-lg bg-white rounded-4xl shadow-card-hover border border-cream-200 p-10 text-center">
        {/* Ícono de éxito */}
        <div className="relative w-20 h-20 mx-auto mb-8">
          <div className="w-20 h-20 rounded-full bg-forest-50 flex items-center justify-center">
            <CheckCircle className="w-10 h-10 text-forest-500" />
          </div>
          <span className="absolute -top-1 -right-1 text-2xl animate-paw-print">🐾</span>
        </div>

        {/* Título */}
        <h1 className="font-display text-3xl font-bold text-forest-700 mb-2">
          ¡Pedido confirmado!
        </h1>
        <p className="text-forest-400 mb-8">
          Gracias por tu compra. Tu pedido está siendo preparado con mucho amor 💚
        </p>

        {/* Detalle del pedido */}
        <div className="bg-cream-50 rounded-2xl p-6 mb-8 text-left space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-forest-400">Número de pedido</span>
            <span className="font-mono font-bold text-forest-700">{orderNumber}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-forest-400">Estado</span>
            <span className="category-badge bg-forest-50 text-forest-600 text-[11px]">
              ✓ Confirmado
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-forest-400">Entrega estimada</span>
            <span className="font-semibold text-forest-700 text-sm">
              {formatDate(deliveryDate)}
            </span>
          </div>
        </div>

        {/* Pasos del flujo */}
        <div className="flex items-center justify-between mb-8 px-4">
          {[
            { icon: "✅", label: "Confirmado" },
            { icon: "📦", label: "Preparando" },
            { icon: "🚚", label: "En camino" },
            { icon: "🏠", label: "Entregado" },
          ].map(({ icon, label }, i) => (
            <div key={label} className="flex flex-col items-center gap-1 relative">
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center text-lg
                  ${i === 0 ? "bg-forest-50 ring-2 ring-forest-400" : "bg-cream-100"}`}
              >
                {icon}
              </div>
              <span className={`text-[10px] font-medium ${i === 0 ? "text-forest-600" : "text-forest-300"}`}>
                {label}
              </span>
              {i < 3 && (
                <div className="absolute top-4 left-9 w-full h-0.5 bg-cream-200" style={{ width: "calc(100% - 0.5rem)" }} />
              )}
            </div>
          ))}
        </div>

        {/* CTAs */}
        <div className="flex flex-col gap-3">
          <Link href="/dashboard" className="btn-terra justify-center">
            <Package className="w-4 h-4" />
            Ver mis pedidos
          </Link>
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 text-sm font-medium
                       text-forest-500 hover:text-terra transition-colors"
          >
            <Home className="w-4 h-4" />
            Continuar comprando
          </Link>
        </div>
      </div>
    </div>
  );
}
