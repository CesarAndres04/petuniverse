import { getGreeting, formatCurrency } from "@/lib/utils";
import { MOCK_USER, MOCK_PET } from "@/lib/mock-data";
import AdoptiversaryBanner from "@/components/dashboard/AdoptiversaryBanner";
import PetCard from "@/components/dashboard/PetCard";
import RecommendedProducts from "@/components/dashboard/RecommendedProducts";
import OrdersWidget from "@/components/dashboard/OrdersWidget";
import { getCustomerTier, TIER_CONFIG } from "@/lib/utils";
import { ShoppingBag, Star, TrendingUp } from "lucide-react";

export const metadata = {
  title: `La tienda de ${MOCK_PET.name}`,
};

const quickStats = [
  {
    label: "Total gastado",
    value: formatCurrency(MOCK_USER.totalSpent),
    icon: ShoppingBag,
    color: "text-forest-500 bg-forest-50",
  },
  {
    label: "Pedidos realizados",
    value: MOCK_USER.orderCount.toString(),
    icon: Star,
    color: "text-terra bg-terra-50",
  },
  {
    label: "Nivel de cliente",
    value: TIER_CONFIG[getCustomerTier(MOCK_USER.ltv)].label,
    icon: TrendingUp,
    color: "text-forest-500 bg-forest-50",
  },
];

export default function DashboardPage() {
  return (
    <div className="p-6 lg:p-8 space-y-6 max-w-7xl">
      {/* Header personalizado */}
      <div>
        <p className="text-forest-400 text-sm font-medium">{getGreeting()},</p>
        <h1 className="font-display text-3xl md:text-4xl font-bold text-forest-700 mt-1">
          La tienda de{" "}
          <span className="text-gradient-terra">{MOCK_PET.name} 🐾</span>
        </h1>
        <p className="text-forest-400 mt-1">
          Mostrando solo productos aptos para {MOCK_PET.name} — sin gluten, sin pollo
        </p>
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-3 gap-4">
        {quickStats.map(({ label, value, icon: Icon, color }) => (
          <div
            key={label}
            className="bg-white rounded-2xl p-4 border border-cream-200 shadow-card-base"
          >
            <div className={`w-8 h-8 rounded-xl flex items-center justify-center mb-3 ${color}`}>
              <Icon className="w-4 h-4" />
            </div>
            <p className="font-bold text-forest-700 text-lg leading-none">{value}</p>
            <p className="text-xs text-forest-400 mt-1">{label}</p>
          </div>
        ))}
      </div>

      {/* Banner de adoptiversario (se muestra solo si faltan ≤30 días) */}
      <AdoptiversaryBanner />

      {/* Pet card + Recomendaciones */}
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <PetCard />
        </div>
        <div className="lg:col-span-2">
          <RecommendedProducts />
        </div>
      </div>

      {/* Pedidos recientes */}
      <OrdersWidget />
    </div>
  );
}
