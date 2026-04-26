import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";

export const metadata = { title: "Prensa — PetUniverse" };

const PRESS = [
  { outlet: "Forbes México", date: "Mar 2026", title: "PetUniverse: La startup que está revolucionando el mercado de mascotas en LATAM", type: "Artículo" },
  { outlet: "Expansión", date: "Feb 2026", title: "Personalización basada en IA: cómo PetUniverse creció 300% en 12 meses", type: "Entrevista" },
  { outlet: "TechCrunch", date: "Ene 2026", title: "PetUniverse raises $2M seed to bring AI-powered pet care to Latin America", type: "Nota de prensa" },
  { outlet: "El Financiero", date: "Nov 2025", title: "El bienestar animal tiene precio: el mercado de mascotas vale $45,000 MDD en México", type: "Mención" },
];

export default function PrensaPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-cream-50 pt-20">
        <div className="section-wrapper py-16 max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <span className="category-badge bg-forest-50 text-forest-600 mb-3 inline-block">
              Sala de prensa
            </span>
            <h1 className="text-4xl font-display font-bold text-forest-700 mb-3">
              PetUniverse en los <span className="text-gradient-forest">medios</span>
            </h1>
            <p className="text-forest-400">
              Cobertura mediática y comunicados de prensa
            </p>
          </div>

          {/* Stats de impacto */}
          <div className="grid grid-cols-3 gap-4 mb-12">
            {[
              { label: "Menciones en medios", value: "50+" },
              { label: "Países con cobertura", value: "8" },
              { label: "Inversión recaudada", value: "$2M USD" },
            ].map((s) => (
              <div key={s.label} className="bg-white rounded-2xl border border-cream-200 p-5 text-center shadow-card-base">
                <p className="text-2xl font-bold text-forest-700 mb-1">{s.value}</p>
                <p className="text-xs text-forest-400">{s.label}</p>
              </div>
            ))}
          </div>

          {/* Cobertura */}
          <div className="space-y-4 mb-12">
            {PRESS.map((p) => (
              <div key={p.title} className="bg-white rounded-2xl border border-cream-200 p-6 flex items-start gap-5">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cream-100 to-cream-200
                                flex items-center justify-center text-xl flex-shrink-0">
                  📰
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-bold text-forest-700 text-sm">{p.outlet}</span>
                    <span className="text-xs text-forest-300">·</span>
                    <span className="text-xs text-forest-400">{p.date}</span>
                    <span className="category-badge bg-cream-200 text-forest-500 text-[10px]">
                      {p.type}
                    </span>
                  </div>
                  <p className="text-sm text-forest-600 leading-snug">{p.title}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Kit de prensa */}
          <div className="bg-gradient-to-br from-forest to-forest-600 rounded-3xl p-8 text-white text-center">
            <p className="text-3xl mb-3">📦</p>
            <h2 className="font-display font-bold text-2xl mb-2">Kit de prensa</h2>
            <p className="text-forest-100 mb-6 max-w-sm mx-auto text-sm">
              Descarga nuestros logos, fotos del equipo, fact sheet y guía de marca en alta resolución.
            </p>
            <a
              href="/contacto"
              className="inline-block bg-white text-forest font-semibold px-6 py-3 rounded-xl
                         hover:bg-cream-50 transition-colors text-sm"
            >
              Solicitar kit de prensa
            </a>
          </div>

          <div className="text-center mt-8">
            <p className="text-forest-400 text-sm">
              Consultas de prensa: <a href="mailto:prensa@petuniverse.mx" className="text-terra">prensa@petuniverse.mx</a>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
