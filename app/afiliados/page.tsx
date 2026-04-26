import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import Link from "next/link";

export const metadata = { title: "Programa de Afiliados — PetUniverse" };

const STEPS = [
  { step: "01", title: "Regístrate", desc: "Crea tu cuenta de afiliado en menos de 5 minutos. Solo necesitas tu correo.", emoji: "✍️" },
  { step: "02", title: "Comparte", desc: "Obtén tu enlace único y compártelo en redes sociales, blog o con tu comunidad.", emoji: "🔗" },
  { step: "03", title: "Gana", desc: "Recibe el 8% de comisión por cada venta completada a través de tu enlace.", emoji: "💰" },
];

const TIERS = [
  { name: "Starter", color: "bg-amber-50 border-amber-200", badge: "bg-amber-100 text-amber-700", commission: "8%", min: "$0", max: "$5,000/mes", perks: ["Enlace único", "Panel de estadísticas", "Pagos mensuales"] },
  { name: "Pro", color: "bg-forest-50 border-forest-200", badge: "bg-forest-100 text-forest-700", commission: "12%", min: "$5,001", max: "$20,000/mes", perks: ["Todo lo anterior", "Cupón exclusivo", "Soporte prioritario", "Pagos quincenales"] },
  { name: "Elite", color: "bg-gradient-to-br from-terra-50 to-cream-100 border-terra-200", badge: "bg-terra text-white", commission: "15%", min: "$20,001+", max: "Sin límite", perks: ["Todo lo anterior", "Manager dedicado", "Acceso anticipado", "Pagos semanales"] },
];

export default function AfiliadosPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-cream-50 pt-20">
        {/* Hero */}
        <section className="bg-white border-b border-cream-200">
          <div className="section-wrapper py-20 text-center">
            <span className="category-badge bg-terra-50 text-terra-600 mb-4 inline-block">
              Programa de afiliados
            </span>
            <h1 className="text-4xl lg:text-5xl font-display font-bold text-forest-700 mb-6">
              Gana dinero recomendando
              <br />
              <span className="text-gradient-forest">lo mejor para mascotas</span>
            </h1>
            <p className="text-forest-500 max-w-xl mx-auto text-lg leading-relaxed mb-8">
              Únete a más de 1,200 creadores de contenido, veterinarios y dueños de
              mascotas que ya generan ingresos con PetUniverse.
            </p>
            <Link href="/registro" className="btn-primary text-base px-8 py-3.5">
              Unirme ahora — Es gratis
            </Link>
          </div>
        </section>

        <div className="section-wrapper py-16">
          {/* Cómo funciona */}
          <div className="text-center mb-12">
            <h2 className="text-3xl font-display font-bold text-forest-700 mb-3">
              ¿Cómo funciona?
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6 mb-20">
            {STEPS.map((s) => (
              <div key={s.step} className="bg-white rounded-3xl border border-cream-200 p-8 text-center shadow-card-base">
                <div className="w-12 h-12 rounded-2xl bg-forest-50 text-forest font-bold text-lg
                                flex items-center justify-center mx-auto mb-4">
                  {s.step}
                </div>
                <div className="text-4xl mb-4">{s.emoji}</div>
                <h3 className="font-display font-bold text-forest-700 text-xl mb-2">{s.title}</h3>
                <p className="text-forest-400 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>

          {/* Tiers */}
          <div className="text-center mb-12">
            <h2 className="text-3xl font-display font-bold text-forest-700 mb-3">
              Niveles de comisión
            </h2>
            <p className="text-forest-400">Mientras más vendes, más ganas</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {TIERS.map((t) => (
              <div key={t.name} className={`rounded-3xl border p-8 ${t.color}`}>
                <div className="flex items-center justify-between mb-6">
                  <span className={`px-3 py-1 rounded-full text-sm font-bold ${t.badge}`}>
                    {t.name}
                  </span>
                  <span className="text-3xl font-bold text-forest-700">{t.commission}</span>
                </div>
                <p className="text-xs text-forest-400 mb-1">Ventas mensuales</p>
                <p className="font-semibold text-forest-600 mb-5">
                  {t.min} – {t.max}
                </p>
                <ul className="space-y-2">
                  {t.perks.map((p) => (
                    <li key={p} className="flex items-center gap-2 text-sm text-forest-600">
                      <span className="text-green-500">✓</span>
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="bg-gradient-to-r from-forest to-forest-600 rounded-3xl p-10 text-center text-white">
            <h2 className="font-display font-bold text-3xl mb-3">¿Listo para empezar?</h2>
            <p className="text-forest-100 mb-6 max-w-md mx-auto">
              Regístrate gratis y empieza a ganar comisiones desde tu primera venta.
            </p>
            <Link
              href="/registro"
              className="inline-block bg-white text-forest font-semibold px-8 py-3 rounded-xl hover:bg-cream-50 transition-colors"
            >
              Crear cuenta de afiliado
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
