"use client";

import { useState } from "react";
import { ArrowUpDown, Eye } from "lucide-react";
import { MOCK_CUSTOMERS } from "@/lib/mock-data";
import { formatCurrency, formatDate, SPECIES_EMOJIS } from "@/lib/utils";
import type { CustomerLTV } from "@/types";

const TIER_STYLES: Record<CustomerLTV["tier"], string> = {
  BRONZE:   "bg-amber-100 text-amber-700",
  SILVER:   "bg-gray-100 text-gray-600",
  GOLD:     "bg-yellow-100 text-yellow-700",
  PLATINUM: "bg-forest-100 text-forest-700",
};

const RISK_STYLES: Record<CustomerLTV["retentionRisk"], string> = {
  LOW:    "bg-green-50 text-green-600",
  MEDIUM: "bg-amber-50 text-amber-600",
  HIGH:   "bg-red-50 text-red-500",
};

const RISK_LABELS: Record<CustomerLTV["retentionRisk"], string> = {
  LOW:    "Bajo",
  MEDIUM: "Medio",
  HIGH:   "Alto",
};

type SortKey = "ltv" | "totalOrders" | "avgOrderValue";

export default function LTVTable() {
  const [sortKey, setSortKey] = useState<SortKey>("ltv");
  const [sortAsc, setSortAsc] = useState(false);

  const sorted = [...MOCK_CUSTOMERS].sort((a, b) => {
    const diff = a[sortKey] - b[sortKey];
    return sortAsc ? diff : -diff;
  });

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortAsc(!sortAsc);
    } else {
      setSortKey(key);
      setSortAsc(false);
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-cream-200 shadow-card-base overflow-hidden">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 border-b border-cream-200">
        <div>
          <h3 className="font-display text-xl font-bold text-forest-700">
            Valor de Vida del Cliente (LTV)
          </h3>
          <p className="text-sm text-forest-400 mt-1">
            {MOCK_CUSTOMERS.length} clientes activos — ordenados por LTV descendente
          </p>
        </div>

        {/* Resumen de tiers */}
        <div className="flex gap-2 flex-wrap">
          {(["PLATINUM", "GOLD", "SILVER", "BRONZE"] as const).map((tier) => {
            const count = MOCK_CUSTOMERS.filter((c) => c.tier === tier).length;
            return (
              <span key={tier} className={`category-badge text-[11px] ${TIER_STYLES[tier]}`}>
                {tier}: {count}
              </span>
            );
          })}
        </div>
      </div>

      {/* Tabla */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-cream-50 border-b border-cream-200">
              <th className="text-left px-6 py-4 text-xs font-semibold text-forest-400 uppercase tracking-wider">
                Cliente
              </th>
              <th className="text-left px-4 py-4 text-xs font-semibold text-forest-400 uppercase tracking-wider">
                Mascota
              </th>
              <th
                className="text-right px-4 py-4 text-xs font-semibold text-forest-400 uppercase tracking-wider cursor-pointer hover:text-forest transition-colors"
                onClick={() => handleSort("ltv")}
              >
                <span className="flex items-center justify-end gap-1">
                  LTV Total
                  <ArrowUpDown className="w-3 h-3" />
                </span>
              </th>
              <th className="text-center px-4 py-4 text-xs font-semibold text-forest-400 uppercase tracking-wider">
                Tier
              </th>
              <th
                className="text-right px-4 py-4 text-xs font-semibold text-forest-400 uppercase tracking-wider cursor-pointer hover:text-forest transition-colors"
                onClick={() => handleSort("totalOrders")}
              >
                <span className="flex items-center justify-end gap-1">
                  Pedidos
                  <ArrowUpDown className="w-3 h-3" />
                </span>
              </th>
              <th
                className="text-right px-4 py-4 text-xs font-semibold text-forest-400 uppercase tracking-wider cursor-pointer hover:text-forest transition-colors"
                onClick={() => handleSort("avgOrderValue")}
              >
                <span className="flex items-center justify-end gap-1">
                  AOV
                  <ArrowUpDown className="w-3 h-3" />
                </span>
              </th>
              <th className="text-right px-4 py-4 text-xs font-semibold text-forest-400 uppercase tracking-wider">
                Último Pedido
              </th>
              <th className="text-center px-4 py-4 text-xs font-semibold text-forest-400 uppercase tracking-wider">
                Riesgo
              </th>
              <th className="px-4 py-4" />
            </tr>
          </thead>

          <tbody className="divide-y divide-cream-100">
            {sorted.map((customer, i) => (
              <tr
                key={customer.userId}
                className="hover:bg-cream-50 transition-colors"
              >
                {/* Cliente */}
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-9 h-9 rounded-full flex items-center justify-center
                                 text-sm font-bold text-white flex-shrink-0"
                      style={{
                        background: i % 2 === 0
                          ? "linear-gradient(135deg, #4A7C59, #2D5A3D)"
                          : "linear-gradient(135deg, #C4714A, #8B4225)",
                      }}
                    >
                      {customer.userName.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold text-forest-700 text-sm">
                        {customer.userName}
                      </p>
                      <p className="text-xs text-forest-400">{customer.email}</p>
                    </div>
                  </div>
                </td>

                {/* Mascota */}
                <td className="px-4 py-4">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{SPECIES_EMOJIS[customer.primarySpecies]}</span>
                    <span className="text-sm text-forest-500">
                      {customer.petCount} {customer.petCount === 1 ? "mascota" : "mascotas"}
                    </span>
                  </div>
                </td>

                {/* LTV */}
                <td className="px-4 py-4 text-right">
                  <p className="font-bold text-forest-700">
                    {formatCurrency(customer.ltv)}
                  </p>
                </td>

                {/* Tier */}
                <td className="px-4 py-4 text-center">
                  <span
                    className={`category-badge text-[11px] font-bold ${TIER_STYLES[customer.tier]}`}
                  >
                    {customer.tier}
                  </span>
                </td>

                {/* Pedidos */}
                <td className="px-4 py-4 text-right">
                  <span className="font-semibold text-forest-700 text-sm">
                    {customer.totalOrders}
                  </span>
                </td>

                {/* AOV */}
                <td className="px-4 py-4 text-right">
                  <span className="text-sm text-forest-500">
                    {formatCurrency(customer.avgOrderValue)}
                  </span>
                </td>

                {/* Último pedido */}
                <td className="px-4 py-4 text-right">
                  <span className="text-xs text-forest-400">
                    {formatDate(customer.lastOrderDate)}
                  </span>
                </td>

                {/* Riesgo de abandono */}
                <td className="px-4 py-4 text-center">
                  <span
                    className={`category-badge text-[11px] ${RISK_STYLES[customer.retentionRisk]}`}
                  >
                    {RISK_LABELS[customer.retentionRisk]}
                  </span>
                </td>

                {/* Acción */}
                <td className="px-4 py-4">
                  <button
                    className="w-8 h-8 rounded-lg bg-cream-100 text-forest-400
                               flex items-center justify-center
                               hover:bg-forest hover:text-white transition-all"
                  >
                    <Eye className="w-3.5 h-3.5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer con totales */}
      <div className="px-6 py-4 bg-cream-50 border-t border-cream-200 flex flex-wrap gap-6 text-sm">
        <div>
          <span className="text-forest-400">LTV Total del portafolio:</span>
          <span className="font-bold text-forest-700 ml-2">
            {formatCurrency(MOCK_CUSTOMERS.reduce((sum, c) => sum + c.ltv, 0))}
          </span>
        </div>
        <div>
          <span className="text-forest-400">Clientes en riesgo alto:</span>
          <span className="font-bold text-red-500 ml-2">
            {MOCK_CUSTOMERS.filter((c) => c.retentionRisk === "HIGH").length}
          </span>
        </div>
        <div>
          <span className="text-forest-400">AOV promedio general:</span>
          <span className="font-bold text-forest-700 ml-2">
            {formatCurrency(
              Math.round(
                MOCK_CUSTOMERS.reduce((s, c) => s + c.avgOrderValue, 0) /
                  MOCK_CUSTOMERS.length
              )
            )}
          </span>
        </div>
      </div>
    </div>
  );
}
