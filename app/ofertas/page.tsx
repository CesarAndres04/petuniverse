import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { MOCK_PRODUCTS, CATEGORY_EMOJIS } from "@/lib/mock-data";
import { formatCurrency } from "@/lib/utils";
import OfertasClient from "./_client";

export const metadata = { title: "Ofertas — PetUniverse" };

export default function OfertasPage() {
  const onSale = MOCK_PRODUCTS.filter((p) => p.comparePrice);

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-cream-50 pt-20">
        {/* Banner */}
        <div className="bg-gradient-to-r from-terra to-terra-500 text-white">
          <div className="section-wrapper py-14 text-center">
            <p className="text-terra-100 text-sm font-medium mb-2">Tiempo limitado</p>
            <h1 className="text-4xl lg:text-5xl font-display font-bold mb-4">
              🔥 Ofertas de la semana
            </h1>
            <p className="text-terra-100 max-w-md mx-auto">
              Hasta 30% de descuento en productos seleccionados. Solo por tiempo limitado.
            </p>
          </div>
        </div>

        <div className="section-wrapper py-12">
          <OfertasClient products={onSale} />
        </div>
      </main>
      <Footer />
    </>
  );
}
