import { Package, Clock, CheckCircle, Truck, XCircle } from "lucide-react";
import { MOCK_ORDERS } from "@/lib/mock-data";
import { formatCurrency } from "@/lib/utils";

export const metadata = { title: "Mis Pedidos — PetUniverse" };

const STATUS_CONFIG = {
  PENDING:   { label: "Pendiente",   color: "bg-amber-50 text-amber-600",  icon: Clock },
  CONFIRMED: { label: "Confirmado",  color: "bg-blue-50 text-blue-600",    icon: CheckCircle },
  PREPARING: { label: "Preparando",  color: "bg-purple-50 text-purple-600",icon: Package },
  SHIPPED:   { label: "Enviado",     color: "bg-forest-50 text-forest-600",icon: Truck },
  DELIVERED: { label: "Entregado",   color: "bg-green-50 text-green-600",  icon: CheckCircle },
  CANCELLED: { label: "Cancelado",   color: "bg-red-50 text-red-500",      icon: XCircle },
  REFUNDED:  { label: "Reembolsado", color: "bg-gray-50 text-gray-500",    icon: XCircle },
} as const;

export default function PedidosPage() {
  return (
    <div className="p-6 lg:p-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-2xl font-display font-bold text-forest-700 mb-1">Mis pedidos</h1>
        <p className="text-forest-400 text-sm">Historial completo de tus compras</p>
      </div>

      <div className="space-y-4">
        {MOCK_ORDERS.map((order) => {
          const cfg = STATUS_CONFIG[order.status as keyof typeof STATUS_CONFIG] ?? STATUS_CONFIG.PENDING;
          const StatusIcon = cfg.icon;

          return (
            <div
              key={order.id}
              className="bg-white rounded-2xl border border-cream-200 shadow-card-base overflow-hidden"
            >
              {/* Header del pedido */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between
                              gap-3 p-5 border-b border-cream-100">
                <div>
                  <p className="font-semibold text-forest-700 text-sm">
                    Pedido #{order.orderNumber ?? order.id.slice(-8).toUpperCase()}
                  </p>
                  <p className="text-xs text-forest-400 mt-0.5">
                    {new Date(order.createdAt).toLocaleDateString("es-MX", {
                      year: "numeric", month: "long", day: "numeric",
                    })}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${cfg.color}`}>
                    <StatusIcon className="w-3 h-3" />
                    {cfg.label}
                  </span>
                  <span className="font-bold text-forest-700">
                    {formatCurrency(order.total)}
                  </span>
                </div>
              </div>

              {/* Items */}
              <div className="p-5 space-y-3">
                {order.items.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-cream-100 flex items-center justify-center text-base">
                        🐾
                      </div>
                      <div>
                        <p className="font-medium text-forest-700">{item.product.name}</p>
                        <p className="text-xs text-forest-400">
                          {item.quantity} × {formatCurrency(item.unitPrice)}
                        </p>
                      </div>
                    </div>
                    <p className="font-semibold text-forest-700">
                      {formatCurrency(item.unitPrice * item.quantity)}
                    </p>
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div className="px-5 pb-5 flex items-center justify-between">
                <p className="text-xs text-forest-400">
                  {order.items.reduce((s, i) => s + i.quantity, 0)} artículo(s) · México
                </p>
                <button className="text-sm text-terra font-medium hover:text-terra-500 transition-colors">
                  Ver detalle →
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
