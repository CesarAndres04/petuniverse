import MetricsCards from "@/components/admin/MetricsCards";
import RevenueChart from "@/components/admin/RevenueChart";
import LTVTable from "@/components/admin/LTVTable";
import { MOCK_CUSTOMERS } from "@/lib/mock-data";
import { formatDate } from "@/lib/utils";

export const metadata = {
  title: "Panel BI — PetUniverse Admin",
};

export default function AdminPage() {
  const highRisk = MOCK_CUSTOMERS.filter((c) => c.retentionRisk === "HIGH");
  const today = new Date();

  return (
    <div className="p-6 lg:p-8 space-y-6 max-w-screen-xl">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <p className="text-gray-400 text-sm">Panel de Business Intelligence</p>
          <h1 className="font-display text-3xl font-bold text-forest-700 mt-1">
            Dashboard Ejecutivo
          </h1>
          <p className="text-gray-400 text-sm mt-1">
            Actualizado: {formatDate(today)} · Datos de Abril 2024
          </p>
        </div>

        {/* Alerta de riesgo */}
        {highRisk.length > 0 && (
          <div
            className="flex items-center gap-3 bg-red-50 border border-red-200
                       rounded-2xl px-5 py-3"
          >
            <span className="text-2xl">⚠️</span>
            <div>
              <p className="text-sm font-semibold text-red-700">
                {highRisk.length} clientes en riesgo alto de abandono
              </p>
              <p className="text-xs text-red-500">
                Sin compra en más de 90 días
              </p>
            </div>
            <button
              className="ml-2 text-xs font-semibold text-red-600 bg-red-100
                         hover:bg-red-200 px-3 py-1.5 rounded-xl transition-colors"
            >
              Ver →
            </button>
          </div>
        )}
      </div>

      {/* KPIs */}
      <MetricsCards />

      {/* Gráfica de ingresos */}
      <RevenueChart />

      {/* Tabla de LTV */}
      <LTVTable />
    </div>
  );
}
