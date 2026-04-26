import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";

export const metadata = { title: "Nosotros — PetUniverse" };

const TEAM = [
  { name: "Ana Martínez", role: "CEO & Co-fundadora", emoji: "👩‍💼", bio: "Veterinaria con 12 años de experiencia y 3 perros rescatados." },
  { name: "Luis Pérez",   role: "CTO & Co-fundador",  emoji: "👨‍💻", bio: "Apasionado del ML aplicado al bienestar animal." },
  { name: "Sofía Ruiz",   role: "Head of Products",   emoji: "👩‍🔬", bio: "Nutricionista canina certificada y mamagatera." },
  { name: "Diego Torres", role: "Head of Growth",     emoji: "👨‍📊", bio: "6 años escalando marketplaces de nicho en LATAM." },
];

export default function NosotrosPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-cream-50 pt-20">
        {/* Hero */}
        <section className="bg-white border-b border-cream-200">
          <div className="section-wrapper py-20 text-center">
            <span className="category-badge bg-forest-50 text-forest-600 mb-4 inline-block">
              Nuestra historia
            </span>
            <h1 className="text-4xl lg:text-5xl font-display font-bold text-forest-700 mb-6">
              Nacimos del amor<br />
              <span className="text-gradient-forest">por las mascotas</span>
            </h1>
            <p className="text-forest-500 max-w-2xl mx-auto text-lg leading-relaxed">
              PetUniverse nació en 2021 cuando nos dimos cuenta de que las tiendas de mascotas
              ignoraban las necesidades individuales de cada animal. Nuestra misión: tecnología
              al servicio del bienestar animal.
            </p>
          </div>
        </section>

        {/* Misión y valores */}
        <section className="section-wrapper py-16">
          <div className="grid md:grid-cols-3 gap-8 mb-20">
            {[
              { title: "Misión",  emoji: "🎯", text: "Hacer que cada mascota reciba exactamente lo que necesita, personalizado según su perfil único." },
              { title: "Visión",  emoji: "🔭", text: "Ser el mayor ecosistema de bienestar animal en LATAM para 2027, conectando +1M de mascotas con productos premium." },
              { title: "Valores", emoji: "💚", text: "Transparencia en ingredientes, sostenibilidad en el empaque y bienestar animal en cada decisión." },
            ].map((v) => (
              <div key={v.title} className="bg-white rounded-3xl border border-cream-200 p-8 text-center shadow-card-base">
                <div className="text-4xl mb-4">{v.emoji}</div>
                <h3 className="font-display font-bold text-forest-700 text-xl mb-3">{v.title}</h3>
                <p className="text-forest-400 text-sm leading-relaxed">{v.text}</p>
              </div>
            ))}
          </div>

          {/* Stats */}
          <div className="bg-gradient-to-br from-forest to-forest-600 rounded-3xl p-10 mb-20">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { label: "Mascotas felices", value: "50,000+" },
                { label: "Productos curados", value: "500+" },
                { label: "Ciudades en MX", value: "32" },
                { label: "Años de experiencia", value: "4" },
              ].map((s) => (
                <div key={s.label}>
                  <p className="text-3xl font-bold text-white mb-1">{s.value}</p>
                  <p className="text-forest-200 text-sm">{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Equipo */}
          <div className="text-center mb-12">
            <h2 className="text-3xl font-display font-bold text-forest-700 mb-3">
              El equipo detrás del universo
            </h2>
            <p className="text-forest-400">Apasionados por las mascotas, obsesionados con la calidad</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {TEAM.map((m) => (
              <div key={m.name} className="bg-white rounded-3xl border border-cream-200 p-6 text-center shadow-card-base">
                <div className="text-5xl mb-4">{m.emoji}</div>
                <h3 className="font-semibold text-forest-700 mb-1">{m.name}</h3>
                <p className="text-xs text-terra font-medium mb-3">{m.role}</p>
                <p className="text-xs text-forest-400 leading-relaxed">{m.bio}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
