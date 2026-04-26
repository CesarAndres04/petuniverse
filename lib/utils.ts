import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import type {
  EnergyLevel,
  PetSpecies,
  OrderStatus,
  ProductCategory,
  CustomerLTV,
} from "@/types";

// Merge de clases Tailwind sin conflictos
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// ─── Formateo de moneda ────────────────────────────────────────
export function formatCurrency(amount: number, currency = "MXN"): string {
  return new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
  }).format(amount);
}

// ─── Formateo de fechas en español ───────────────────────────
export function formatDate(date: Date | string): string {
  return new Intl.DateTimeFormat("es-MX", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
}

// Días hasta el próximo adoptiversario
export function daysUntilAdoptiversary(adoptionDate: Date | string): number {
  const today = new Date();
  const adoption = new Date(adoptionDate);
  const nextAnniversary = new Date(
    today.getFullYear(),
    adoption.getMonth(),
    adoption.getDate()
  );
  if (nextAnniversary < today) {
    nextAnniversary.setFullYear(today.getFullYear() + 1);
  }
  const diffMs = nextAnniversary.getTime() - today.getTime();
  return Math.ceil(diffMs / (1000 * 60 * 60 * 24));
}

// ─── Etiquetas en español ─────────────────────────────────────

export const ENERGY_LEVEL_LABELS: Record<EnergyLevel, string> = {
  SEDENTARY: "Sedentario",
  ACTIVE:    "Activo",
  ATHLETE:   "Atleta",
};

export const SPECIES_LABELS: Record<PetSpecies, string> = {
  DOG:     "Perro",
  CAT:     "Gato",
  BIRD:    "Ave",
  RABBIT:  "Conejo",
  FISH:    "Pez",
  REPTILE: "Reptil",
  OTHER:   "Otro",
};

export const SPECIES_EMOJIS: Record<PetSpecies, string> = {
  DOG:     "🐕",
  CAT:     "🐈",
  BIRD:    "🦜",
  RABBIT:  "🐇",
  FISH:    "🐠",
  REPTILE: "🦎",
  OTHER:   "🐾",
};

export const ORDER_STATUS_LABELS: Record<OrderStatus, string> = {
  PENDING:   "Pendiente de pago",
  CONFIRMED: "Confirmado",
  PREPARING: "En preparación",
  SHIPPED:   "Enviado",
  DELIVERED: "Entregado",
  CANCELLED: "Cancelado",
  REFUNDED:  "Reembolsado",
};

export const CATEGORY_LABELS: Record<ProductCategory, string> = {
  FOOD:        "Alimentos",
  TREATS:      "Premios",
  TOYS:        "Juguetes",
  ACCESSORIES: "Accesorios",
  HEALTH:      "Salud",
  CALMING:     "Relajación",
  SUPPLEMENTS: "Suplementos",
  APPAREL:     "Ropa",
  GROOMING:    "Grooming",
};

// ─── Cálculo de tier de cliente basado en LTV ─────────────────
export function getCustomerTier(ltv: number): CustomerLTV["tier"] {
  if (ltv >= 10000) return "PLATINUM";
  if (ltv >= 5000)  return "GOLD";
  if (ltv >= 1500)  return "SILVER";
  return "BRONZE";
}

export const TIER_CONFIG = {
  BRONZE:   { label: "Bronce",   color: "#CD7F32", min: 0,     max: 1499  },
  SILVER:   { label: "Plata",    color: "#C0C0C0", min: 1500,  max: 4999  },
  GOLD:     { label: "Oro",      color: "#FFD700", min: 5000,  max: 9999  },
  PLATINUM: { label: "Platino",  color: "#4A7C59", min: 10000, max: Infinity },
} as const;

// ─── Detectar riesgo de abandono ──────────────────────────────
export function getRetentionRisk(
  lastOrderDate: Date,
  orderCount: number
): CustomerLTV["retentionRisk"] {
  const daysSinceLastOrder =
    (Date.now() - new Date(lastOrderDate).getTime()) / (1000 * 60 * 60 * 24);

  if (orderCount === 1 && daysSinceLastOrder > 60)  return "HIGH";
  if (daysSinceLastOrder > 90)                       return "HIGH";
  if (daysSinceLastOrder > 45)                       return "MEDIUM";
  return "LOW";
}

// Calcula edad de mascota a partir de la fecha de nacimiento
export function calculatePetAge(birthDate: Date | string): string {
  const today = new Date();
  const birth = new Date(birthDate);
  const years  = today.getFullYear() - birth.getFullYear();
  const months = today.getMonth()    - birth.getMonth();

  if (years === 0) {
    const m = months < 0 ? months + 12 : months;
    return `${m} ${m === 1 ? "mes" : "meses"}`;
  }
  return `${years} ${years === 1 ? "año" : "años"}`;
}

// Genera saludo según hora del día
export function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return "Buenos días";
  if (hour < 18) return "Buenas tardes";
  return "Buenas noches";
}
