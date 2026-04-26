const features = [
  {
    icon: "🐾",
    badge: "Personalización",
    badgeColor: "bg-forest-100 text-forest-600",
    title: "Perfil único para tu mascota",
    description:
      "Registra alergias, preferencias alimentarias y nivel de energía. El catálogo se adapta automáticamente para mostrar solo productos seguros y 100% relevantes para tu compañero.",
    stat: "98% de recomendaciones acertadas",
    statIcon: "✓",
  },
  {
    icon: "🎂",
    badge: "Retención",
    badgeColor: "bg-terra-50 text-terra-600",
    title: "Adoptiversario especial",
    description:
      "Celebramos el aniversario de adopción con descuentos exclusivos y regalos sorpresa. Una experiencia que construye lealtad real y genera compras recurrentes en fechas clave.",
    stat: "+40% de conversión en campañas de fecha especial",
    statIcon: "↑",
  },
  {
    icon: "🛡️",
    badge: "Seguridad",
    badgeColor: "bg-forest-100 text-forest-600",
    title: "Filtro inteligente de alergias",
    description:
      "Nunca más compres un producto que pueda dañar a tu mascota. Nuestro motor filtra el catálogo en tiempo real basándose en las alergias e intolerancias registradas.",
    stat: "0 productos peligrosos mostrados",
    statIcon: "✓",
  },
  {
    icon: "💆",
    badge: "Bienestar",
    badgeColor: "bg-terra-50 text-terra-600",
    title: "Gestión de miedos y ansiedad",
    description:
      "Registra los miedos de tu mascota (pirotecnia, viajes, tormentas) y recibe campañas automáticas con productos de relajación antes de temporadas y eventos clave.",
    stat: "Campañas automáticas en 7 tipos de miedos",
    statIcon: "↑",
  },
];

export default function Features() {
  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="section-wrapper">
        {/* Encabezado */}
        <div className="text-center mb-16 space-y-4">
          <span className="category-badge bg-forest-100 text-forest-600">
            Por qué PetUniverse
          </span>
          <h2 className="section-title mx-auto max-w-2xl">
            Más que una tienda.{" "}
            <span className="text-gradient-terra">Un ecosistema</span> para tu
            mascota
          </h2>
          <p className="section-subtitle mx-auto">
            Cada funcionalidad fue diseñada para convertir compradores ocasionales
            en clientes de por vida.
          </p>
        </div>

        {/* Grid de funcionalidades */}
        <div className="grid md:grid-cols-2 gap-8">
          {features.map((f, i) => (
            <div
              key={i}
              className="group relative bg-cream-50 rounded-3xl p-8 border border-cream-200
                         hover:bg-white hover:shadow-card-hover hover:-translate-y-1
                         transition-all duration-300"
            >
              {/* Ícono y badge */}
              <div className="flex items-start justify-between mb-6">
                <div
                  className="w-14 h-14 rounded-2xl bg-white shadow-card-base
                              flex items-center justify-center text-3xl
                              group-hover:scale-110 transition-transform duration-300"
                >
                  {f.icon}
                </div>
                <span className={`category-badge ${f.badgeColor}`}>
                  {f.badge}
                </span>
              </div>

              {/* Contenido */}
              <h3 className="font-display text-xl font-bold text-forest-700 mb-3">
                {f.title}
              </h3>
              <p className="text-forest-400 leading-relaxed mb-6">
                {f.description}
              </p>

              {/* Stat */}
              <div className="flex items-center gap-2 pt-4 border-t border-cream-200">
                <span className="text-forest-400 text-sm font-medium">
                  <span className="text-terra font-bold mr-1">{f.statIcon}</span>
                  {f.stat}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
