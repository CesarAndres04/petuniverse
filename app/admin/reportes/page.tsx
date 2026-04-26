import { METRICS, REVENUE_DATA } from "@/lib/mock-data";
import { formatCurrency } from "@/lib/utils";
import RevenueChart from "@/components/admin/RevenueChart";

export const metadata = { title: "Reportes — Admin PetUniverse" };

export default function AdminReportesPage() {
  const avgOrderValue = METRICS.revenueTotal / METRICS.ordersTotal;

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-display font-bold text-white mb-1">Reportes financieros</h1>
        <p className="text-forest-300 text-sm">Análisis de ingresos y métricas clave</p>
      </div>

      {/* KPIs ampliados */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Ingresos totales", value: formatCurrency(METRICS.revenueTotal) },
          { label: "Órdenes totales", value: METRICS.ordersTotal.toString() },
          { label: "Ticket promedio", value: formatCurrency(avgOrderValue) },
          { label: "Tasa de retención", value: `${METRICS.retentionRate}%` },
        ].map((k) => (
          <div key={k.label} className="bg-forest-800 rounded-2xl p-5 border border-forest-600">
            <p className="text-forest-300 text-xs mb-1">{k.label}</p>
            <p className="text-xl font-bold text-white">{k.value}</p>
          </div>
        ))}
      </div>

      {/* Gráfica */}
      <div className="mb-8">
        <RevenueChart />
      </div>

      {/* Tabla mensual */}
      <div className="bg-forest-800 rounded-2xl border border-forest-600 overflow-hidden">
        <div className="p-5 border-b border-forest-600">
          <h2 className="font-semibold text-white">Ingresos por mes</h2>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-forest-600">
              <th className="text-left p-4 text-forest-300 font-medium">Mes</th>
              <th className="text-right p-4 text-forest-300 font-medium">Ingresos</th>
              <th className="text-right p-4 text-forest-300 font-medium hidden sm:table-cell">Órdenes</th>
              <th className="text-right p-4 text-forest-300 font-medium hidden md:table-cell">Ticket promedio</th>
            </tr>
          </thead>
          <tbody>
            {REVENUE_DATA.map((row) => (
              <tr key={row.mes} className="border-b border-forest-700 hover:bg-forest-700 transition-colors">
                <td className="p-4 text-white font-medium">{row.mes}</td>
                <td className="p-4 text-right text-green-400 font-semibold">
                  {formatCurrency(row.ingresos)}
                </td>
                <td className="p-4 text-right hidden sm:table-cell text-forest-300">
                  {row.ordenes}
                </td>
                <td className="p-4 text-right hidden md:table-cell text-forest-300">
                  {formatCurrency(row.ingresos / row.ordenes)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
