import { MOCK_CUSTOMERS, METRICS } from "@/lib/mock-data";
import { formatCurrency } from "@/lib/utils";
import LTVTable from "@/components/admin/LTVTable";

export const metadata = { title: "Clientes — Admin PetUniverse" };

export default function AdminClientesPage() {
  const total = MOCK_CUSTOMERS.length;
  const avgLtv = METRICS.avgLTV;
  const atRisk = MOCK_CUSTOMERS.filter((c) => c.retentionRisk === "HIGH").length;

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-display font-bold text-white mb-1">Gestión de clientes</h1>
        <p className="text-forest-300 text-sm">Base de clientes activos y análisis LTV</p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {[
          { label: "Total clientes", value: total, suffix: "" },
          { label: "LTV promedio", value: formatCurrency(avgLtv), suffix: "" },
          { label: "En riesgo de churn", value: atRisk, suffix: " clientes" },
        ].map((k) => (
          <div key={k.label} className="bg-forest-800 rounded-2xl p-5 border border-forest-600">
            <p className="text-forest-300 text-xs mb-1">{k.label}</p>
            <p className="text-2xl font-bold text-white">
              {k.value}{k.suffix}
            </p>
          </div>
        ))}
      </div>

      <LTVTable />
    </div>
  );
}
