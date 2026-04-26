import { MOCK_ORDERS } from "@/lib/mock-data";
import { formatCurrency } from "@/lib/utils";
import { Clock, CheckCircle, Truck, Package, XCircle } from "lucide-react";

export const metadata = { title: "Órdenes — Admin PetUniverse" };

const STATUS_CONFIG = {
  PENDING:   { label: "Pendiente",   color: "bg-amber-900 text-amber-300",   icon: Clock },
  CONFIRMED: { label: "Confirmado",  color: "bg-blue-900 text-blue-300",     icon: CheckCircle },
  PREPARING: { label: "Preparando",  color: "bg-purple-900 text-purple-300", icon: Package },
  SHIPPED:   { label: "Enviado",     color: "bg-forest-700 text-forest-200", icon: Truck },
  DELIVERED: { label: "Entregado",   color: "bg-green-900 text-green-300",   icon: CheckCircle },
  CANCELLED: { label: "Cancelado",   color: "bg-red-900 text-red-400",       icon: XCircle },
  REFUNDED:  { label: "Reembolsado", color: "bg-gray-800 text-gray-400",     icon: XCircle },
} as const;

export default function AdminOrdenesPage() {
  const totalRevenue = MOCK_ORDERS.reduce((s, o) => s + o.total, 0);

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-display font-bold text-white mb-1">Gestión de órdenes</h1>
        <p className="text-forest-300 text-sm">{MOCK_ORDERS.length} órdenes · {formatCurrency(totalRevenue)} en ingresos</p>
      </div>

      <div className="bg-forest-800 rounded-2xl border border-forest-600 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-forest-600">
              <th className="text-left p-4 text-forest-300 font-medium">Orden</th>
              <th className="text-left p-4 text-forest-300 font-medium hidden md:table-cell">Cliente</th>
              <th className="text-right p-4 text-forest-300 font-medium hidden sm:table-cell">Items</th>
              <th className="text-right p-4 text-forest-300 font-medium">Total</th>
              <th className="text-center p-4 text-forest-300 font-medium">Estado</th>
              <th className="text-right p-4 text-forest-300 font-medium hidden lg:table-cell">Fecha</th>
            </tr>
          </thead>
          <tbody>
            {MOCK_ORDERS.map((order) => {
              const cfg = STATUS_CONFIG[order.status as keyof typeof STATUS_CONFIG] ?? STATUS_CONFIG.PENDING;
              const StatusIcon = cfg.icon;
              return (
                <tr key={order.id} className="border-b border-forest-700 hover:bg-forest-700 transition-colors">
                  <td className="p-4">
                    <p className="font-semibold text-white text-sm">
                      #{order.orderNumber ?? order.id.slice(-8).toUpperCase()}
                    </p>
                  </td>
                  <td className="p-4 hidden md:table-cell text-forest-300">
                    {order.userId}
                  </td>
                  <td className="p-4 text-right hidden sm:table-cell text-forest-300">
                    {order.items.reduce((s, i) => s + i.quantity, 0)}
                  </td>
                  <td className="p-4 text-right font-bold text-white">
                    {formatCurrency(order.total)}
                  </td>
                  <td className="p-4 text-center">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${cfg.color}`}>
                      <StatusIcon className="w-3 h-3" />
                      {cfg.label}
                    </span>
                  </td>
                  <td className="p-4 text-right hidden lg:table-cell text-forest-400 text-xs">
                    {new Date(order.createdAt).toLocaleDateString("es-MX")}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
