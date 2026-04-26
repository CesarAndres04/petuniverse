"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { REVENUE_DATA } from "@/lib/mock-data";
import { formatCurrency } from "@/lib/utils";

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;

  return (
    <div className="bg-white border border-cream-200 rounded-2xl p-4 shadow-card-hover">
      <p className="font-semibold text-forest-700 mb-3">{label}</p>
      {payload.map((entry: any) => (
        <div key={entry.dataKey} className="flex items-center gap-2 text-sm">
          <div
            className="w-2.5 h-2.5 rounded-full"
            style={{ backgroundColor: entry.color }}
          />
          <span className="text-forest-500 capitalize">{entry.name}:</span>
          <span className="font-semibold text-forest-700">
            {entry.dataKey === "ingresos"
              ? formatCurrency(entry.value)
              : entry.value.toLocaleString("es-MX")}
          </span>
        </div>
      ))}
    </div>
  );
};

export default function RevenueChart() {
  return (
    <div className="bg-white rounded-3xl border border-cream-200 shadow-card-base p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h3 className="font-display text-xl font-bold text-forest-700">
            Evolución de Ingresos
          </h3>
          <p className="text-sm text-forest-400 mt-1">
            Últimos 6 meses — ingresos y volumen de órdenes
          </p>
        </div>

        {/* Leyenda manual */}
        <div className="flex gap-5 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-forest-400" />
            <span className="text-forest-500">Ingresos</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-terra" />
            <span className="text-forest-500">Órdenes</span>
          </div>
        </div>
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={280}>
        <AreaChart data={REVENUE_DATA} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="gradIngresos" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%"  stopColor="#4A7C59" stopOpacity={0.15} />
              <stop offset="95%" stopColor="#4A7C59" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="gradOrdenes" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%"  stopColor="#C4714A" stopOpacity={0.15} />
              <stop offset="95%" stopColor="#C4714A" stopOpacity={0} />
            </linearGradient>
          </defs>

          <CartesianGrid strokeDasharray="3 3" stroke="#F5EDD4" vertical={false} />

          <XAxis
            dataKey="mes"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#7AB890", fontSize: 12 }}
          />

          <YAxis
            yAxisId="ingresos"
            orientation="left"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#7AB890", fontSize: 11 }}
            tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
            width={52}
          />

          <YAxis
            yAxisId="ordenes"
            orientation="right"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#DE9975", fontSize: 11 }}
            width={40}
          />

          <Tooltip content={<CustomTooltip />} />

          <Area
            yAxisId="ingresos"
            type="monotone"
            dataKey="ingresos"
            name="Ingresos"
            stroke="#4A7C59"
            strokeWidth={2.5}
            fill="url(#gradIngresos)"
            dot={{ fill: "#4A7C59", strokeWidth: 0, r: 4 }}
            activeDot={{ r: 6, strokeWidth: 0 }}
          />

          <Area
            yAxisId="ordenes"
            type="monotone"
            dataKey="ordenes"
            name="Órdenes"
            stroke="#C4714A"
            strokeWidth={2.5}
            fill="url(#gradOrdenes)"
            dot={{ fill: "#C4714A", strokeWidth: 0, r: 4 }}
            activeDot={{ r: 6, strokeWidth: 0 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
