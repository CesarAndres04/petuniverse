import { Gift, X } from "lucide-react";
import { daysUntilAdoptiversary } from "@/lib/utils";
import { MOCK_PET } from "@/lib/mock-data";

export default function AdoptiversaryBanner() {
  if (!MOCK_PET.adoptionDate) return null;

  const days = daysUntilAdoptiversary(MOCK_PET.adoptionDate);
  if (days > 30) return null;

  const isToday = days === 0;

  return (
    <div
      className="relative overflow-hidden rounded-3xl p-6
                 bg-gradient-to-r from-terra to-terra-500 text-white"
    >
      {/* Fondo decorativo */}
      <div className="absolute top-0 right-0 w-48 h-48 rounded-full bg-white/10 -translate-y-1/2 translate-x-1/4 blur-2xl" />
      <div className="absolute bottom-0 left-1/3 w-32 h-32 rounded-full bg-terra-700/30 blur-xl" />

      <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center gap-4">
        {/* Ícono */}
        <div
          className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-sm
                     flex items-center justify-center text-3xl flex-shrink-0"
        >
          {isToday ? "🎉" : "🎂"}
        </div>

        {/* Texto */}
        <div className="flex-1">
          {isToday ? (
            <>
              <p className="font-display text-xl font-bold mb-1">
                ¡Feliz Adoptiversario, {MOCK_PET.name}! 🎊
              </p>
              <p className="text-white/80 text-sm">
                Hoy es el día especial de tu compañero. Usa el código{" "}
                <strong className="bg-white/20 px-2 py-0.5 rounded-lg font-mono">
                  ADOPTA20
                </strong>{" "}
                para un 20% de descuento en tu pedido de hoy.
              </p>
            </>
          ) : (
            <>
              <p className="font-display text-xl font-bold mb-1">
                El adoptiversario de {MOCK_PET.name} se acerca 🎂
              </p>
              <p className="text-white/80 text-sm">
                Faltan <strong className="text-white">{days} días</strong> para el
                aniversario de adopción. Tenemos un regalo especial con{" "}
                <strong className="text-white">20% de descuento</strong> esperándote.
                Código:{" "}
                <strong className="bg-white/20 px-2 py-0.5 rounded-lg font-mono">
                  ADOPTA20
                </strong>
              </p>
            </>
          )}
        </div>

        {/* CTA */}
        <div className="flex items-center gap-3 flex-shrink-0">
          <button
            className="flex items-center gap-2 bg-white text-terra font-semibold
                       px-5 py-2.5 rounded-xl hover:bg-cream-50
                       transition-all duration-200 hover:scale-105 text-sm"
          >
            <Gift className="w-4 h-4" />
            Ver regalo
          </button>
        </div>
      </div>
    </div>
  );
}
