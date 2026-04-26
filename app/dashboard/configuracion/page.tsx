"use client";

import { useState } from "react";
import { User, Bell, Shield, CreditCard, Trash2, Check } from "lucide-react";
import { MOCK_USER, MOCK_PET } from "@/lib/mock-data";

export default function ConfiguracionPage() {
  const [saved, setSaved] = useState(false);
  const [notifs, setNotifs] = useState({
    orders: true,
    promos: true,
    reminders: true,
    news: false,
  });

  function handleSave() {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  return (
    <div className="p-6 lg:p-8 max-w-2xl">
      <div className="mb-8">
        <h1 className="text-2xl font-display font-bold text-forest-700 mb-1">Configuración</h1>
        <p className="text-forest-400 text-sm">Gestiona tu cuenta y preferencias</p>
      </div>

      <div className="space-y-6">
        {/* Datos personales */}
        <section className="bg-white rounded-2xl border border-cream-200 p-6">
          <div className="flex items-center gap-2 mb-5">
            <User className="w-4 h-4 text-terra" />
            <h2 className="font-semibold text-forest-700">Datos personales</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-forest-500 mb-1">Nombre</label>
              <input
                defaultValue={MOCK_USER.name}
                className="w-full border border-cream-200 rounded-xl px-3 py-2 text-sm
                           focus:outline-none focus:border-forest-300"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-forest-500 mb-1">Correo</label>
              <input
                defaultValue={MOCK_USER.email}
                type="email"
                className="w-full border border-cream-200 rounded-xl px-3 py-2 text-sm
                           focus:outline-none focus:border-forest-300"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs font-medium text-forest-500 mb-1">
                Contraseña nueva
              </label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full border border-cream-200 rounded-xl px-3 py-2 text-sm
                           focus:outline-none focus:border-forest-300"
              />
            </div>
          </div>
        </section>

        {/* Mascota */}
        <section className="bg-white rounded-2xl border border-cream-200 p-6">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <span className="text-lg">🐾</span>
              <h2 className="font-semibold text-forest-700">
                Perfil de {MOCK_PET.name}
              </h2>
            </div>
            <span className="text-xs text-forest-400">{MOCK_PET.breed}</span>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-forest-500 mb-1">Nombre</label>
              <input
                defaultValue={MOCK_PET.name}
                className="w-full border border-cream-200 rounded-xl px-3 py-2 text-sm
                           focus:outline-none focus:border-forest-300"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-forest-500 mb-1">Peso (kg)</label>
              <input
                defaultValue={MOCK_PET.weight ?? ""}
                type="number"
                step="0.1"
                className="w-full border border-cream-200 rounded-xl px-3 py-2 text-sm
                           focus:outline-none focus:border-forest-300"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs font-medium text-forest-500 mb-1">
                Alergias alimentarias (separadas por coma)
              </label>
              <input
                defaultValue={MOCK_PET.foodAllergies.join(", ")}
                className="w-full border border-cream-200 rounded-xl px-3 py-2 text-sm
                           focus:outline-none focus:border-forest-300"
              />
            </div>
          </div>
        </section>

        {/* Notificaciones */}
        <section className="bg-white rounded-2xl border border-cream-200 p-6">
          <div className="flex items-center gap-2 mb-5">
            <Bell className="w-4 h-4 text-terra" />
            <h2 className="font-semibold text-forest-700">Notificaciones</h2>
          </div>
          <div className="space-y-3">
            {[
              { key: "orders" as const, label: "Estado de mis pedidos" },
              { key: "promos" as const, label: "Promociones y descuentos" },
              { key: "reminders" as const, label: "Recordatorios de reabastecimiento" },
              { key: "news" as const, label: "Novedades del catálogo" },
            ].map(({ key, label }) => (
              <label key={key} className="flex items-center justify-between cursor-pointer">
                <span className="text-sm text-forest-600">{label}</span>
                <button
                  onClick={() => setNotifs((p) => ({ ...p, [key]: !p[key] }))}
                  className={`relative w-10 h-5 rounded-full transition-colors ${
                    notifs[key] ? "bg-forest" : "bg-cream-300"
                  }`}
                >
                  <span
                    className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow
                                transition-transform ${notifs[key] ? "translate-x-5" : ""}`}
                  />
                </button>
              </label>
            ))}
          </div>
        </section>

        {/* Zona peligrosa */}
        <section className="bg-white rounded-2xl border border-red-100 p-6">
          <div className="flex items-center gap-2 mb-4">
            <Trash2 className="w-4 h-4 text-red-400" />
            <h2 className="font-semibold text-red-600">Zona de peligro</h2>
          </div>
          <p className="text-sm text-forest-400 mb-4">
            Eliminar tu cuenta es una acción permanente. Todos tus datos y el historial
            de pedidos serán eliminados.
          </p>
          <button className="text-sm text-red-500 border border-red-200 rounded-xl px-4 py-2
                             hover:bg-red-50 transition-colors font-medium">
            Eliminar mi cuenta
          </button>
        </section>
      </div>

      {/* Guardar */}
      <div className="mt-6 flex justify-end">
        <button
          onClick={handleSave}
          className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-semibold text-sm
                      transition-all ${
                        saved
                          ? "bg-green-100 text-green-700"
                          : "bg-terra text-white hover:bg-terra-500"
                      }`}
        >
          {saved ? (
            <>
              <Check className="w-4 h-4" /> Guardado
            </>
          ) : (
            "Guardar cambios"
          )}
        </button>
      </div>
    </div>
  );
}
