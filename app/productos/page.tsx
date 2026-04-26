import { Suspense } from "react";
import Navbar from "@/components/landing/Navbar";
import ProductosClient from "./_client";

export const metadata = { title: "Productos — PetUniverse" };

export default function ProductosPage({
  searchParams,
}: {
  searchParams: { category?: string; sort?: string; species?: string; q?: string };
}) {
  return (
    <>
      <Navbar />
      <Suspense
        fallback={
          <div className="min-h-screen pt-24 flex items-center justify-center">
            <p className="text-forest-400 animate-pulse">Cargando catálogo...</p>
          </div>
        }
      >
        <ProductosClient
          initialCategory={searchParams.category}
          initialSort={searchParams.sort}
          initialSpecies={searchParams.species}
          initialQuery={searchParams.q}
        />
      </Suspense>
    </>
  );
}
