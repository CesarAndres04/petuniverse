"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product } from "@/types";

export interface StoredPet {
  id: string;
  name: string;
  species: string;
  breed?: string;
  birthDate?: string;
  adoptionDate?: string;
  energyLevel: string;
  foodAllergies: string[];
  foodPreferences: string[];
  fears: string[];
  photoUrl?: string | null;
  isNeutered: boolean;
}

export interface StoredUser {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface AuthStore {
  user: StoredUser | null;
  pet: StoredPet | null;
  modalOpen: boolean;
  pendingProduct: Product | null;
  setUser: (user: StoredUser) => void;
  setPet: (pet: StoredPet) => void;
  logout: () => void;
  openModal: (product?: Product) => void;
  closeModal: () => void;
  commitPending: (addFn: (p: Product) => void) => void;
}

export const useAuth = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      pet: null,
      modalOpen: false,
      pendingProduct: null,

      setUser: (user) => set({ user }),
      setPet: (pet) => set({ pet }),
      logout: () => set({ user: null, pet: null }),

      openModal: (product) =>
        set({ modalOpen: true, pendingProduct: product ?? null }),

      closeModal: () => set({ modalOpen: false, pendingProduct: null }),

      commitPending: (addFn) => {
        const { pendingProduct } = get();
        if (pendingProduct) addFn(pendingProduct);
        set({ pendingProduct: null, modalOpen: false });
      },
    }),
    {
      name: "petuniverse-auth",
      partialize: (s) => ({ user: s.user, pet: s.pet }),
    }
  )
);

// ─── Helpers de etapa de vida ─────────────────────────────────────

export type LifeStage = "PUPPY" | "ADULT" | "SENIOR";

export function getPetLifeStage(birthDate?: string, species?: string): LifeStage {
  if (!birthDate) return "ADULT";
  const ageMonths = Math.floor(
    (Date.now() - new Date(birthDate).getTime()) / (1000 * 60 * 60 * 24 * 30.44)
  );
  if (species === "DOG") {
    if (ageMonths < 12) return "PUPPY";
    if (ageMonths > 84) return "SENIOR";
  } else if (species === "CAT") {
    if (ageMonths < 12) return "PUPPY";
    if (ageMonths > 96) return "SENIOR";
  } else {
    if (ageMonths < 6) return "PUPPY";
    if (ageMonths > 60) return "SENIOR";
  }
  return "ADULT";
}

export const LIFE_STAGE_CONFIG: Record<LifeStage, { label: string; emoji: string; color: string; priorityCategories: string[] }> = {
  PUPPY:  { label: "Cachorro",  emoji: "🐣", color: "bg-amber-50 text-amber-600",   priorityCategories: ["FOOD", "HEALTH", "TOYS", "ACCESSORIES"] },
  ADULT:  { label: "Adulto",    emoji: "🐕", color: "bg-forest-50 text-forest-600", priorityCategories: ["TREATS", "TOYS", "SUPPLEMENTS", "FOOD"] },
  SENIOR: { label: "Senior",    emoji: "🦮", color: "bg-blue-50 text-blue-600",     priorityCategories: ["HEALTH", "SUPPLEMENTS", "FOOD", "CALMING"] },
};

export const SPECIES_EMOJIS: Record<string, string> = {
  DOG: "🐕", CAT: "🐈", BIRD: "🦜", RABBIT: "🐇",
  FISH: "🐠", REPTILE: "🦎", OTHER: "🐾",
};
