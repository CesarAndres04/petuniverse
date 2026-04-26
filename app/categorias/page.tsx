import Link from "next/link";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";

export const metadata = { title: "Categorías — PetUniverse" };

const CATS = [
  { slug: "FOOD",        label: "Alimentos",   emoji: "🐟", desc: "Comida premium seca, húmeda y raw para todas las etapas de vida" },
  { slug: "TREATS",      label: "Premios",      emoji: "🦴", desc: "Snacks naturales y orgánicos sin conservadores artificiales" },
  { slug: "SUPPLEMENTS", label: "Suplementos",  emoji: "🌿", desc: "Omega-3, probióticos y vitaminas para una salud óptima" },
  { slug: "TOYS",        label: "Juguetes",     emoji: "🎾", desc: "Entretenimiento interactivo para mantenerlos activos y felices" },
  { slug: "CALMING",     label: "Relajación",   emoji: "💧", desc: "Productos naturales para reducir ansiedad y estrés" },
  { slug: "ACCESSORIES", label: "Accesorios",   emoji: "🛍️", desc: "Camas, transportadoras, collares y todo lo que necesitan" },
  { slug: "GROOMING",    label: "Grooming",     emoji: "🧴", desc: "Shampoos, cepillos y productos de higiene hipoalergénicos" },
  { slug: "HEALTH",      label: "Salud",        emoji: "💊", desc: "Antiparasitarios, vitaminas y cuidado preventivo" },
  { slug: "APPAREL",     label: "Ropa",         emoji: "👕", desc: "Ropa y accesorios de moda para las mascotas más estilosas" },
];

export default function CategoriasPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-cream-50 pt-20">
        <div className="section-wrapper py-16">
          <div className="text-center mb-12">
            <span className="category-badge bg-terra-50 text-terra-600 mb-3 inline-block">
              Explora
            </span>
            <h1 className="text-4xl font-display font-bold text-forest-700 mb-3">
              Todas las <span className="text-gradient-forest">categorías</span>
            </h1>
            <p className="text-forest-400 max-w-md mx-auto">
              Encuentra exactamente lo que tu mascota necesita
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {CATS.map((cat) => (
              <Link
                key={cat.slug}
                href={`/productos?category=${cat.slug}`}
                className="bg-white rounded-3xl border border-cream-200 p-8 text-center
                           hover:border-forest-200 hover:shadow-card-hover transition-all duration-300 group"
              >
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {cat.emoji}
                </div>
                <h2 className="font-display font-bold text-forest-700 text-xl mb-2">
                  {cat.label}
                </h2>
                <p className="text-sm text-forest-400 leading-relaxed">{cat.desc}</p>
                <div className="mt-4 text-terra text-sm font-medium">
                  Ver productos →
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
