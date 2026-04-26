import Link from "next/link";
import { ArrowRight, Gift, Shield, Zap } from "lucide-react";

const perks = [
  { icon: Gift,   text: "Primer pedido con 15% de descuento" },
  { icon: Shield, text: "Sin compromiso — cancela cuando quieras" },
  { icon: Zap,    text: "Recomendaciones activas desde el día 1" },
];

export default function CTASection() {
  return (
    <section className="py-20 lg:py-28 relative overflow-hidden">
      {/* Fondo con gradiente */}
      <div className="absolute inset-0 gradient-forest opacity-95" />
      <div
        className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full
                   bg-white/5 blur-3xl pointer-events-none"
      />
      <div
        className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full
                   bg-terra/10 blur-3xl pointer-events-none"
      />

      <div className="section-wrapper relative z-10">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          {/* Badge */}
          <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm
                           border border-white/20 rounded-full px-4 py-2">
            <span className="w-2 h-2 rounded-full bg-terra animate-pulse" />
            <span className="text-sm font-medium text-white/90">
              +15,000 mascotas felices en México
            </span>
          </span>

          {/* Titular */}
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold
                         text-white leading-tight">
            Crea el perfil de tu mascota.{" "}
            <span className="text-terra-300">Es gratis.</span>
          </h2>

          <p className="text-lg text-white/80 leading-relaxed">
            En menos de 3 minutos tendrás una tienda personalizada donde cada
            producto está curado específicamente para las necesidades de tu
            compañero.
          </p>

          {/* Perks */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 text-sm">
            {perks.map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-2 text-white/80">
                <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-3 h-3 text-terra-300" />
                </div>
                {text}
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
            <Link
              href="/registro"
              className="btn-terra text-base px-8 py-4 bg-terra shadow-none
                         hover:bg-terra-500 group"
            >
              Comenzar gratis ahora
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/productos"
              className="inline-flex items-center justify-center gap-2
                         border-2 border-white/40 text-white font-semibold
                         px-8 py-4 rounded-2xl hover:bg-white/10
                         transition-all duration-300"
            >
              Ver productos
            </Link>
          </div>

          {/* Social proof */}
          <p className="text-white/50 text-sm">
            Sin tarjeta de crédito requerida · Cancelación inmediata
          </p>
        </div>
      </div>
    </section>
  );
}
