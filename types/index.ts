// ============================================================
// PETUNIVERSE — Tipos TypeScript compartidos
// Sincronizados con el esquema Prisma para type-safety end-to-end
// ============================================================

// ─── Enums (espejo de Prisma) ────────────────────────────────────
export type UserRole = "CLIENT" | "VIP" | "ADMIN";

export type PetSpecies = "DOG" | "CAT" | "BIRD" | "RABBIT" | "FISH" | "REPTILE" | "OTHER";

export type PetGender = "MALE" | "FEMALE";

export type EnergyLevel = "SEDENTARY" | "ACTIVE" | "ATHLETE";

export type PetFear =
  | "FIREWORKS"
  | "THUNDERSTORMS"
  | "TRAVEL"
  | "STRANGERS"
  | "LOUD_NOISES"
  | "OTHER_ANIMALS"
  | "SEPARATION";

export type ProductCategory =
  | "FOOD"
  | "TREATS"
  | "TOYS"
  | "ACCESSORIES"
  | "HEALTH"
  | "CALMING"
  | "SUPPLEMENTS"
  | "APPAREL"
  | "GROOMING";

export type OrderStatus =
  | "PENDING"
  | "CONFIRMED"
  | "PREPARING"
  | "SHIPPED"
  | "DELIVERED"
  | "CANCELLED"
  | "REFUNDED";

// ─── Modelos de dominio ──────────────────────────────────────────

export interface User {
  id: string;
  email: string;
  name: string;
  avatarUrl?: string;
  role: UserRole;
  totalSpent: number;
  orderCount: number;
  ltv: number;
  pets: PetProfile[];
  createdAt: Date;
}

export interface PetProfile {
  id: string;
  userId: string;
  name: string;
  species: PetSpecies;
  breed?: string;
  birthDate?: Date;
  adoptionDate?: Date;
  weight?: number;
  profilePhotoUrl?: string;
  gender?: PetGender;
  energyLevel: EnergyLevel;
  foodAllergies: string[];
  foodPreferences: string[];
  fears: PetFear[];
  isNeutered: boolean;
  createdAt: Date;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription?: string;
  price: number;
  comparePrice?: number;
  imageUrls: string[];
  category: ProductCategory;
  targetSpecies: PetSpecies[];
  energyLevels: EnergyLevel[];
  allergenFree: string[];
  tags: string[];
  stock: number;
  isActive: boolean;
  isFeatured: boolean;
  salesCount: number;
  rating?: number;
  reviewCount: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  userId: string;
  status: OrderStatus;
  subtotal: number;
  discount: number;
  shipping: number;
  tax: number;
  total: number;
  items: OrderItem[];
  createdAt: Date;
}

export interface OrderItem {
  id: string;
  productId: string;
  product: Product;
  quantity: number;
  unitPrice: number;
  total: number;
}

// ─── Tipos de Business Intelligence ─────────────────────────────

export interface CustomerLTV {
  userId: string;
  userName: string;
  email: string;
  ltv: number;
  totalOrders: number;
  avgOrderValue: number;
  lastOrderDate: Date;
  petCount: number;
  primarySpecies: PetSpecies;
  tier: "BRONZE" | "SILVER" | "GOLD" | "PLATINUM";
  retentionRisk: "LOW" | "MEDIUM" | "HIGH";
}

export interface RevenueMetrics {
  period: string;
  revenue: number;
  orders: number;
  newCustomers: number;
  returningCustomers: number;
  avgOrderValue: number;
}

export interface ProductPerformance {
  productId: string;
  productName: string;
  category: ProductCategory;
  revenue: number;
  unitsSold: number;
  conversionRate: number;
  rating: number;
}

export interface SegmentMetrics {
  segment: string;
  count: number;
  avgLTV: number;
  totalRevenue: number;
  percentage: number;
}

// ─── Tipos de UI ─────────────────────────────────────────────────

export interface NavItem {
  label: string;
  href: string;
  icon?: string;
}

export interface ProductCardProps {
  product: Product;
  petProfile?: PetProfile;
  onAddToCart?: (productId: string) => void;
}

// Respuesta de API estandarizada
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}
