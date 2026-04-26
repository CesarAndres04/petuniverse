import { TrendingUp, TrendingDown, DollarSign, ShoppingCart, Users, Percent } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { METRICS } from "@/lib/mock-data";

interface MetricCardProps {
  title: string;
  value: string;
  growth: number;
  icon: React.ElementType;
  color: string;
  note?: string;
}

function MetricCard({ title, value, growth, icon: Icon, color, note }: MetricCardProps) {
  const positive = growth >= 0;

  return (
    <div className="bg-white rounded-2xl p-6 border border-cream-200 shadow-card-base">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${color}`}>
          <Icon className="w-5 h-5" />
        </div>
        <span
          className={`flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full ${
            positive ? "bg-green-50 text-green-600" : "bg-red-50 text-red-500"
          }`}
        >
          {positive ? (
            <TrendingUp className="w-3 h-3" />
          ) : (
            <TrendingDown className="w-3 h-3" />
          )}
          {positive ? "+" : ""}
          {growth}%
        </span>
      </div>

      {/* Valor */}
      <p className="font-display text-3xl font-bold text-forest-700 leading-none mb-1">
        {value}
      </p>
      <p className="text-sm text-forest-400">{title}</p>
      {note && <p className="text-xs text-forest-300 mt-2">{note}</p>}
    </div>
  );
}

export default function MetricsCards() {
  const metrics: MetricCardProps[] = [
    {
      title: "Ingresos del Mes",
      value: formatCurrency(METRICS.revenueTotal),
      growth: METRICS.revenueGrowth,
      icon: DollarSign,
      color: "bg-forest-50 text-forest-500",
      note: "vs. mes anterior",
    },
    {
      title: "Órdenes Completadas",
      value: METRICS.ordersTotal.toLocaleString("es-MX"),
      growth: METRICS.ordersGrowth,
      icon: ShoppingCart,
      color: "bg-terra-50 text-terra",
      note: "Abril 2024",
    },
    {
      title: "LTV Promedio",
      value: formatCurrency(METRICS.avgLTV),
      growth: METRICS.ltvGrowth,
      icon: Users,
      color: "bg-blue-50 text-blue-500",
      note: "Por cliente activo",
    },
    {
      title: "Tasa de Retención",
      value: `${METRICS.retentionRate}%`,
      growth: METRICS.retentionGrowth,
      icon: Percent,
      color: "bg-purple-50 text-purple-500",
      note: "Clientes que repiten compra",
    },
  ];

  return (
    <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-5">
      {metrics.map((m) => (
        <MetricCard key={m.title} {...m} />
      ))}
    </div>
  );
}
