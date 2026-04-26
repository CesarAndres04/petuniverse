import { Edit, Scale, Zap, AlertTriangle } from "lucide-react";
import { calculatePetAge, ENERGY_LEVEL_LABELS, SPECIES_EMOJIS } from "@/lib/utils";
import { MOCK_PET } from "@/lib/mock-data";

const FEAR_LABELS: Record<string, string> = {
  FIREWORKS:     "Pirotecnia",
  THUNDERSTORMS: "Tormentas",
  TRAVEL:        "Viajes",
  STRANGERS:     "Extraños",
  LOUD_NOISES:   "Ruidos fuertes",
  OTHER_ANIMALS: "Otros animales",
  SEPARATION:    "Ansiedad por separación",
};

export default function PetCard() {
  const pet = MOCK_PET;
  const age = pet.birthDate ? calculatePetAge(pet.birthDate) : null;

  return (
    <div className="bg-white rounded-3xl border border-cream-200 shadow-card-base overflow-hidden h-full">
      {/* Header del perfil */}
      <div className="gradient-hero p-8 text-center relative">
        {/* Foto / emoji */}
        <div
          className="w-24 h-24 rounded-2xl bg-gradient-to-br from-forest-100 to-forest-200
                     flex items-center justify-center text-5xl mx-auto mb-4
                     shadow-forest animate-float"
        >
          {SPECIES_EMOJIS[pet.species]}
        </div>

        <h2 className="font-display text-2xl font-bold text-forest-700">{pet.name}</h2>
        <p className="text-forest-400 text-sm mt-1">
          {pet.breed} · {age ?? "Edad no registrada"}
        </p>

        {/* Chip de género y esterilizado */}
        <div className="flex justify-center gap-2 mt-3">
          {pet.gender && (
            <span className="category-badge bg-white/80 text-forest-600 text-[11px]">
              {pet.gender === "MALE" ? "♂ Macho" : "♀ Hembra"}
            </span>
          )}
          {pet.isNeutered && (
            <span className="category-badge bg-white/80 text-forest-600 text-[11px]">
              ✓ Esterilizado
            </span>
          )}
        </div>

        {/* Botón de editar */}
        <button
          className="absolute top-4 right-4 w-8 h-8 rounded-xl bg-white/80 backdrop-blur-sm
                     flex items-center justify-center text-forest-400
                     hover:bg-white hover:text-terra transition-all"
        >
          <Edit className="w-4 h-4" />
        </button>
      </div>

      {/* Stats del perfil */}
      <div className="p-6 space-y-5">
        {/* Peso */}
        {pet.weight && (
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-forest-50 flex items-center justify-center flex-shrink-0">
              <Scale className="w-4 h-4 text-forest-500" />
            </div>
            <div>
              <p className="text-xs text-forest-400">Peso</p>
              <p className="font-semibold text-forest-700">{pet.weight} kg</p>
            </div>
          </div>
        )}

        {/* Nivel de energía */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-terra-50 flex items-center justify-center flex-shrink-0">
            <Zap className="w-4 h-4 text-terra" />
          </div>
          <div>
            <p className="text-xs text-forest-400">Nivel de energía</p>
            <p className="font-semibold text-forest-700">
              {ENERGY_LEVEL_LABELS[pet.energyLevel]}
            </p>
          </div>
        </div>

        {/* Alergias */}
        {pet.foodAllergies.length > 0 && (
          <div>
            <p className="text-xs text-forest-400 mb-2">Alergias alimentarias</p>
            <div className="flex flex-wrap gap-1.5">
              {pet.foodAllergies.map((a) => (
                <span
                  key={a}
                  className="category-badge bg-red-50 text-red-500 capitalize text-[11px]"
                >
                  ⚠ {a}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Preferencias */}
        {pet.foodPreferences.length > 0 && (
          <div>
            <p className="text-xs text-forest-400 mb-2">Preferencias alimentarias</p>
            <div className="flex flex-wrap gap-1.5">
              {pet.foodPreferences.map((p) => (
                <span
                  key={p}
                  className="category-badge bg-forest-50 text-forest-500 text-[11px]"
                >
                  ✓ {p}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Miedos */}
        {pet.fears.length > 0 && (
          <div>
            <p className="text-xs text-forest-400 mb-2 flex items-center gap-1">
              <AlertTriangle className="w-3 h-3" />
              Miedos registrados
            </p>
            <div className="flex flex-wrap gap-1.5">
              {pet.fears.map((f) => (
                <span
                  key={f}
                  className="category-badge bg-amber-50 text-amber-600 text-[11px]"
                >
                  {FEAR_LABELS[f] ?? f}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
