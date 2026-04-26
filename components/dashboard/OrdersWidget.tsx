import { Package, Truck, CheckCircle, Clock, XCircle } from "lucide-react";
import { MOCK_ORDERS } from "@/lib/mock-data";
import { formatCurrency, formatDate } from "@/lib/utils";
import type { OrderStatus } from "@/types";

const STATUS_CONFIG: Record<
  OrderStatus,
  { label: string; color: string; Icon: React.ElementType }
> = {
  PENDING:   { label: "Pendiente de pago",   color: "bg-amber-100 text-amber-600",   Icon: Clock },
  CONFIRMED: { label: "Confirmado",           color: "bg-blue-100 text-blue-600",     Icon: CheckCircle },
  PREPARING: { label: "En preparación",       color: "bg-purple-100 text-purple-600", Icon: Package },
  SHIPPED:   { label: "En camino",            color: "bg-terra-50 text-terra-600",    Icon: Truck },
  DELIVERED: { label: "Entregado",            color: "bg-forest-50 text-forest-600",  Icon: CheckCircle },
  CANCELLED: { label: "Cancelado",            color: "bg-red-100 text-red-500",       Icon: XCircle },
  REFUNDED:  { label: "Reembolsado",          color: "bg-gray-100 text-gray-500",     Icon: XCircle },
};

export default function OrdersWidget() {
  return (
    <div className="bg-white rounded-3xl border border-cream-200 shadow-card-base">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-cream-200">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-forest-50 flex items-center justify-center">
            <Package className="w-4 h-4 text-forest-500" />
          </div>
          <div>
            <h3 className="font-display font-bold text-forest-700">Mis Pedidos</h3>
            <p className="text-xs text-forest-400">Últimos 3 pedidos</p>
          </div>
        </div>
        <button className="text-sm text-terra font-medium hover:text-terra-500 transition-colors">
          Ver todos →
        </button>
      </div>

      {/* Lista de pedidos */}
      <div className="divide-y divide-cream-100">
        {MOCK_ORDERS.map((order) => {
          const cfg = STATUS_CONFIG[order.status];
          const StatusIcon = cfg.Icon;

          return (
            <div key={order.id} className="p-6 hover:bg-cream-50 transition-colors">
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                {/* Ícono de estado */}
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${cfg.color}`}
                >
                  <StatusIcon className="w-5 h-5" />
                </div>

                {/* Info del pedido */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <p className="font-semibold text-forest-700 font-mono text-sm">
                      #{order.orderNumber}
                    </p>
                    <span className={`category-badge text-[10px] py-0.5 ${cfg.color}`}>
                      {cfg.label}
                    </span>
                  </div>

                  {/* Items del pedido */}
                  <p className="text-xs text-forest-400 truncate">
                    {order.items.map((i) => `${i.product.name} ×${i.quantity}`).join(" · ")}
                  </p>

                  <p className="text-xs text-forest-300 mt-1">
                    {formatDate(order.createdAt)}
                  </p>
                </div>

                {/* Total */}
                <div className="text-right flex-shrink-0">
                  <p className="font-bold text-forest-700">
                    {formatCurrency(order.total)}
                  </p>
                  {order.discount > 0 && (
                    <p className="text-xs text-terra">
                      -{formatCurrency(order.discount)} descuento
                    </p>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
