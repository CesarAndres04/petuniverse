import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

export const metadata = { title: "Ayuda — PetUniverse" };

const FAQS = [
  {
    category: "Pedidos",
    items: [
      { q: "¿Cómo puedo rastrear mi pedido?", a: "Una vez confirmado tu pedido recibirás un número de seguimiento por correo. También puedes visitarnos en /rastrear para ver el estado en tiempo real." },
      { q: "¿Cuánto tarda en llegar mi pedido?", a: "Pedidos en CDMX y área metropolitana llegan en 1-2 días hábiles. El resto de México en 3-5 días hábiles con Fedex y DHL." },
      { q: "¿Puedo modificar o cancelar mi pedido?", a: "Tienes hasta 2 horas después de confirmado para solicitar cambios o cancelación. Después de ese tiempo, el pedido ya está en proceso." },
    ],
  },
  {
    category: "Envíos y devoluciones",
    items: [
      { q: "¿El envío es gratuito?", a: "Sí, los envíos son gratuitos en pedidos mayores a $800 MXN. Pedidos menores tienen un costo de $89 MXN." },
      { q: "¿Qué pasa si mi producto llega dañado?", a: "Contáctanos dentro de los primeros 3 días con fotos del producto. Te reponemos el artículo sin costo adicional." },
      { q: "¿Cuál es la política de devoluciones?", a: "Aceptamos devoluciones de productos sin abrir en los primeros 30 días. Productos de higiene o alimentación abiertos no son elegibles por seguridad." },
    ],
  },
  {
    category: "Cuenta y pagos",
    items: [
      { q: "¿Qué métodos de pago aceptan?", a: "Aceptamos tarjetas de crédito/débito (Visa, Mastercard, AmEx), OXXO, transferencia SPEI y PayPal." },
      { q: "¿Es seguro pagar en PetUniverse?", a: "Sí. Todas las transacciones están encriptadas con TLS 1.3. No almacenamos datos de tarjetas; procesamos con Stripe." },
      { q: "¿Puedo comprar sin crear una cuenta?", a: "Sí, puedes comprar como invitado. Sin embargo, al crear una cuenta puedes ver tu historial de pedidos y recibir recomendaciones personalizadas." },
    ],
  },
];

export default function AyudaPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-cream-50 pt-20">
        <div className="section-wrapper py-16 max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <span className="category-badge bg-terra-50 text-terra-600 mb-3 inline-block">
              Centro de ayuda
            </span>
            <h1 className="text-4xl font-display font-bold text-forest-700 mb-3">
              ¿En qué podemos{" "}
              <span className="text-gradient-forest">ayudarte?</span>
            </h1>
            <p className="text-forest-400">Encuentra respuestas rápidas a las preguntas más frecuentes</p>
          </div>

          {/* Accesos rápidos */}
          <div className="grid grid-cols-3 gap-4 mb-12">
            {[
              { label: "Rastrear pedido", href: "/rastrear", emoji: "📦" },
              { label: "Política de envíos", href: "/envios", emoji: "🚚" },
              { label: "Contactar soporte", href: "/contacto", emoji: "💬" },
            ].map((a) => (
              <Link
                key={a.href}
                href={a.href}
                className="bg-white rounded-2xl border border-cream-200 p-5 text-center
                           hover:border-forest-200 transition-colors"
              >
                <div className="text-3xl mb-2">{a.emoji}</div>
                <p className="text-sm font-medium text-forest-700">{a.label}</p>
              </Link>
            ))}
          </div>

          {/* FAQs */}
          {FAQS.map((section) => (
            <div key={section.category} className="mb-8">
              <h2 className="font-display font-bold text-forest-700 text-xl mb-4">
                {section.category}
              </h2>
              <div className="space-y-3">
                {section.items.map((faq) => (
                  <details
                    key={faq.q}
                    className="group bg-white rounded-2xl border border-cream-200 overflow-hidden"
                  >
                    <summary className="flex items-center justify-between p-5 cursor-pointer
                                        list-none font-medium text-forest-700 text-sm">
                      {faq.q}
                      <ChevronDown className="w-4 h-4 text-forest-400 group-open:rotate-180 transition-transform flex-shrink-0 ml-3" />
                    </summary>
                    <div className="px-5 pb-5 text-sm text-forest-500 leading-relaxed border-t border-cream-100 pt-4">
                      {faq.a}
                    </div>
                  </details>
                ))}
              </div>
            </div>
          ))}

          <div className="text-center mt-10 bg-white rounded-2xl border border-cream-200 p-8">
            <p className="text-forest-600 font-semibold mb-2">¿No encontraste tu respuesta?</p>
            <p className="text-forest-400 text-sm mb-4">Nuestro equipo responde en menos de 24 horas</p>
            <Link href="/contacto" className="btn-primary">
              Contactar soporte
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
