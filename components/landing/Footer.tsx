import Link from "next/link";

const PawIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C10.34 2 9 3.34 9 5s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3zM6.5 5C5.12 5 4 6.12 4 7.5S5.12 10 6.5 10 9 8.88 9 7.5 7.88 5 6.5 5zm11 0C16.12 5 15 6.12 15 7.5S16.12 10 17.5 10 20 8.88 20 7.5 18.88 5 17.5 5zM12 11c-3 0-9 1.5-9 4.5V18h18v-2.5c0-3-6-4.5-9-4.5z" />
  </svg>
);

const links = {
  Tienda: [
    { label: "Productos", href: "/productos" },
    { label: "Categorías", href: "/categorias" },
    { label: "Más vendidos", href: "/productos?sort=bestseller" },
    { label: "Novedades", href: "/productos?sort=new" },
    { label: "Ofertas", href: "/ofertas" },
  ],
  Empresa: [
    { label: "Sobre Nosotros", href: "/nosotros" },
    { label: "Blog", href: "/blog" },
    { label: "Prensa", href: "/prensa" },
    { label: "Afiliados", href: "/afiliados" },
  ],
  Soporte: [
    { label: "Centro de Ayuda", href: "/ayuda" },
    { label: "Envíos y Devoluciones", href: "/envios" },
    { label: "Rastrear Pedido", href: "/rastrear" },
    { label: "Contacto", href: "/contacto" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-forest-700 text-white">
      {/* Parte superior */}
      <div className="section-wrapper py-16">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Marca */}
          <div className="lg:col-span-2 space-y-6">
            <Link href="/" className="flex items-center gap-2 group w-fit">
              <div
                className="w-9 h-9 rounded-2xl bg-terra flex items-center justify-center
                            group-hover:scale-110 transition-transform duration-300"
              >
                <PawIcon className="w-5 h-5 text-white" />
              </div>
              <span className="font-display text-xl font-bold">
                Pet<span className="text-terra-300">Universe</span>
              </span>
            </Link>

            <p className="text-white/60 leading-relaxed max-w-sm">
              La plataforma eCommerce premium donde cada producto fue seleccionado
              pensando en el bienestar de tu mascota. Personalización real, no
              genérica.
            </p>

            {/* Redes sociales */}
            <div className="flex gap-3">
              {[
                { label: "Instagram", emoji: "📸" },
                { label: "TikTok",    emoji: "🎵" },
                { label: "Facebook",  emoji: "👥" },
                { label: "YouTube",   emoji: "▶️" },
              ].map(({ label, emoji }) => (
                <button
                  key={label}
                  aria-label={label}
                  className="w-9 h-9 rounded-xl bg-white/10 hover:bg-terra/80
                             flex items-center justify-center text-sm
                             transition-all duration-200 hover:scale-110"
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(links).map(([section, items]) => (
            <div key={section}>
              <h4 className="font-semibold text-white mb-4">{section}</h4>
              <ul className="space-y-2.5">
                {items.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-white/60 hover:text-terra-300
                                 text-sm transition-colors duration-200"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter */}
        <div
          className="mt-12 pt-12 border-t border-white/10
                     flex flex-col md:flex-row gap-6 items-start md:items-center justify-between"
        >
          <div>
            <h4 className="font-semibold text-white mb-1">
              Recibe consejos y ofertas exclusivas
            </h4>
            <p className="text-white/50 text-sm">
              Únete a +8,000 familias que reciben nuestro newsletter semanal
            </p>
          </div>
          <div className="flex gap-2 w-full md:w-auto">
            <input
              type="email"
              placeholder="tu@email.com"
              className="flex-1 md:w-64 bg-white/10 border border-white/20
                         text-white placeholder:text-white/40
                         px-4 py-2.5 rounded-xl text-sm
                         focus:outline-none focus:border-terra-300 transition-colors"
            />
            <button className="btn-terra whitespace-nowrap text-sm px-5 py-2.5">
              Suscribirme
            </button>
          </div>
        </div>
      </div>

      {/* Parte inferior */}
      <div className="border-t border-white/10">
        <div
          className="section-wrapper py-6 flex flex-col sm:flex-row gap-3
                     justify-between items-center text-white/40 text-sm"
        >
          <p>© 2024 PetUniverse. Todos los derechos reservados.</p>
          <div className="flex gap-6">
            <Link href="/terminos"   className="hover:text-terra-300 transition-colors">Términos</Link>
            <Link href="/privacidad" className="hover:text-terra-300 transition-colors">Privacidad</Link>
            <Link href="/cookies"    className="hover:text-terra-300 transition-colors">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
