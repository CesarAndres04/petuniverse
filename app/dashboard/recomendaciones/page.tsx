import { Sparkles } from "lucide-react";
import RecommendedProducts from "@/components/dashboard/RecommendedProducts";
import { MOCK_PET } from "@/lib/mock-data";

export const metadata = { title: "Recomendaciones — PetUniverse" };

export default function RecomendacionesPage() {
  return (
    <div className="p-6 lg:p-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-2xl font-display font-bold text-forest-700 mb-1">
          Recomendaciones para {MOCK_PET.name}
        </h1>
        <p className="text-forest-400 text-sm">
          Selección personalizada según sus alergias, preferencias y nivel de energía
        </p>
      </div>

      {/* Banner de personalización */}
      <div className="bg-gradient-to-r from-terra-50 to-cream-100 rounded-2xl border border-terra-100 p-5 mb-8 flex gap-4">
        <div className="w-10 h-10 rounded-xl bg-terra-100 flex items-center justify-center flex-shrink-0">
          <Sparkles className="w-5 h-5 text-terra" />
        </div>
        <div>
          <p className="font-semibold text-forest-700 text-sm">
            IA personalizada para {MOCK_PET.name}
          </p>
          <p className="text-xs text-forest-500 mt-0.5">
            Filtramos productos sin {MOCK_PET.foodAllergies.join(", ")} y adecuados
            para su nivel de energía {MOCK_PET.energyLevel.toLowerCase()}.
          </p>
        </div>
      </div>

      <RecommendedProducts />
    </div>
  );
}
