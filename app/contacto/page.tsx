"use client";

import { useState } from "react";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { Mail, Phone, MapPin, MessageSquare, Check } from "lucide-react";

export default function ContactoPage() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setSent(true);
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-cream-50 pt-20">
        <div className="section-wrapper py-16">
          <div className="text-center mb-12">
            <span className="category-badge bg-terra-50 text-terra-600 mb-3 inline-block">
              ¿Necesitas ayuda?
            </span>
            <h1 className="text-4xl font-display font-bold text-forest-700 mb-3">
              Contáctanos
            </h1>
            <p className="text-forest-400">
              Estamos aquí para ayudarte a ti y a tu mascota
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-10 max-w-4xl mx-auto">
            {/* Info */}
            <div className="space-y-6">
              <div className="bg-white rounded-2xl border border-cream-200 p-6 flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-terra-50 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-terra" />
                </div>
                <div>
                  <p className="font-semibold text-forest-700 mb-1">Correo electrónico</p>
                  <p className="text-sm text-forest-400">hola@petuniverse.mx</p>
                  <p className="text-xs text-forest-300 mt-0.5">Respuesta en menos de 24 horas</p>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-cream-200 p-6 flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-forest-50 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-forest" />
                </div>
                <div>
                  <p className="font-semibold text-forest-700 mb-1">WhatsApp</p>
                  <p className="text-sm text-forest-400">+52 55 1234 5678</p>
                  <p className="text-xs text-forest-300 mt-0.5">Lunes a viernes, 9am – 7pm</p>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-cream-200 p-6 flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-cream-200 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-forest-500" />
                </div>
                <div>
                  <p className="font-semibold text-forest-700 mb-1">Oficinas</p>
                  <p className="text-sm text-forest-400">
                    Av. Insurgentes Sur 1602<br />
                    Col. Crédito Constructor, CDMX
                  </p>
                </div>
              </div>

              <div className="bg-gradient-to-br from-forest to-forest-600 rounded-2xl p-6 text-white">
                <p className="font-bold mb-2">🐾 También puedes visitar nuestro blog</p>
                <p className="text-forest-100 text-sm">
                  Encuentra respuestas a las preguntas más comunes sobre nutrición, salud y bienestar animal.
                </p>
                <a href="/blog" className="mt-3 inline-block text-sm text-terra-200 hover:text-white font-medium">
                  Ir al blog →
                </a>
              </div>
            </div>

            {/* Formulario */}
            <div className="bg-white rounded-2xl border border-cream-200 p-8">
              {sent ? (
                <div className="text-center py-10">
                  <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                    <Check className="w-7 h-7 text-green-600" />
                  </div>
                  <h3 className="font-display font-bold text-forest-700 text-xl mb-2">
                    ¡Mensaje recibido!
                  </h3>
                  <p className="text-forest-400 text-sm">
                    Nos pondremos en contacto contigo en las próximas 24 horas.
                  </p>
                </div>
              ) : (
                <>
                  <div className="flex items-center gap-2 mb-6">
                    <MessageSquare className="w-5 h-5 text-terra" />
                    <h2 className="font-semibold text-forest-700">Envíanos un mensaje</h2>
                  </div>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-medium text-forest-500 mb-1">Nombre</label>
                        <input required placeholder="Tu nombre" className="w-full border border-cream-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-forest-300" />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-forest-500 mb-1">Correo</label>
                        <input required type="email" placeholder="tu@correo.com" className="w-full border border-cream-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-forest-300" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-forest-500 mb-1">Asunto</label>
                      <select className="w-full border border-cream-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-forest-300">
                        <option>Mi pedido</option>
                        <option>Producto / stock</option>
                        <option>Devolución / reembolso</option>
                        <option>Pregunta sobre mi mascota</option>
                        <option>Otro</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-forest-500 mb-1">Mensaje</label>
                      <textarea required rows={4} placeholder="¿Cómo podemos ayudarte?" className="w-full border border-cream-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-forest-300 resize-none" />
                    </div>
                    <button type="submit" disabled={loading} className="w-full btn-primary justify-center">
                      {loading ? (
                        <span className="inline-block w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                      ) : (
                        "Enviar mensaje"
                      )}
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
