"use client";

import { useState } from "react";
import { Settings, Bell, Shield, Globe, Check } from "lucide-react";

export default function AdminConfigPage() {
  const [saved, setSaved] = useState(false);

  function handleSave() {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  return (
    <div className="p-6 lg:p-8 max-w-2xl">
      <div className="mb-8">
        <h1 className="text-2xl font-display font-bold text-white mb-1">Configuración del sistema</h1>
        <p className="text-forest-300 text-sm">Ajustes globales de la plataforma</p>
      </div>

      <div className="space-y-5">
        {/* Tienda */}
        <section className="bg-forest-800 rounded-2xl border border-forest-600 p-6">
          <div className="flex items-center gap-2 mb-5">
            <Globe className="w-4 h-4 text-terra" />
            <h2 className="font-semibold text-white">Configuración de tienda</h2>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-forest-300 mb-1">Nombre de la tienda</label>
              <input
                defaultValue="PetUniverse"
                className="w-full bg-forest-700 border border-forest-500 rounded-xl px-3 py-2
                           text-sm text-white focus:outline-none focus:border-terra"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-forest-300 mb-1">Envío gratis desde (MXN)</label>
              <input
                defaultValue="800"
                type="number"
                className="w-full bg-forest-700 border border-forest-500 rounded-xl px-3 py-2
                           text-sm text-white focus:outline-none focus:border-terra"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-forest-300 mb-1">Moneda</label>
              <select className="w-full bg-forest-700 border border-forest-500 rounded-xl px-3 py-2
                                 text-sm text-white focus:outline-none focus:border-terra">
                <option value="MXN">MXN — Peso mexicano</option>
                <option value="USD">USD — Dólar estadounidense</option>
              </select>
            </div>
          </div>
        </section>

        {/* Seguridad */}
        <section className="bg-forest-800 rounded-2xl border border-forest-600 p-6">
          <div className="flex items-center gap-2 mb-5">
            <Shield className="w-4 h-4 text-terra" />
            <h2 className="font-semibold text-white">Seguridad</h2>
          </div>
          <div className="space-y-3">
            {[
              { label: "Autenticación de dos factores para admins", on: true },
              { label: "Sesiones automáticas de 30 días", on: false },
              { label: "Registro de actividad de administradores", on: true },
            ].map(({ label, on }) => (
              <label key={label} className="flex items-center justify-between cursor-pointer">
                <span className="text-sm text-forest-200">{label}</span>
                <div className={`relative w-10 h-5 rounded-full transition-colors ${on ? "bg-terra" : "bg-forest-600"}`}>
                  <span className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${on ? "translate-x-5" : ""}`} />
                </div>
              </label>
            ))}
          </div>
        </section>

        {/* Notificaciones */}
        <section className="bg-forest-800 rounded-2xl border border-forest-600 p-6">
          <div className="flex items-center gap-2 mb-5">
            <Bell className="w-4 h-4 text-terra" />
            <h2 className="font-semibold text-white">Alertas del sistema</h2>
          </div>
          <div className="space-y-3">
            {[
              { label: "Alertas de stock bajo", on: true },
              { label: "Notificaciones de nuevos pedidos", on: true },
              { label: "Alertas de churn detectado", on: true },
              { label: "Resumen semanal por email", on: false },
            ].map(({ label, on }) => (
              <label key={label} className="flex items-center justify-between cursor-pointer">
                <span className="text-sm text-forest-200">{label}</span>
                <div className={`relative w-10 h-5 rounded-full transition-colors ${on ? "bg-terra" : "bg-forest-600"}`}>
                  <span className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${on ? "translate-x-5" : ""}`} />
                </div>
              </label>
            ))}
          </div>
        </section>
      </div>

      <div className="mt-6 flex justify-end">
        <button
          onClick={handleSave}
          className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-semibold text-sm transition-all ${
            saved ? "bg-green-900 text-green-300" : "bg-terra text-white hover:bg-terra-500"
          }`}
        >
          {saved ? <><Check className="w-4 h-4" /> Guardado</> : "Guardar cambios"}
        </button>
      </div>
    </div>
  );
}
