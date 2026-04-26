"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/landing/Navbar";
import { Mail, ArrowLeft, Check } from "lucide-react";

export default function RecuperarPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setSent(true);
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-cream-50 pt-20 flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-3xl border border-cream-200 shadow-card-base p-8">
            {sent ? (
              <div className="text-center py-6">
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-5">
                  <Check className="w-8 h-8 text-green-600" />
                </div>
                <h2 className="font-display font-bold text-forest-700 text-2xl mb-2">
                  ¡Correo enviado!
                </h2>
                <p className="text-forest-400 text-sm mb-6">
                  Revisa tu bandeja de entrada en <strong>{email}</strong>.
                  El enlace de recuperación expira en 30 minutos.
                </p>
                <Link href="/login" className="btn-primary w-full justify-center">
                  Volver al inicio de sesión
                </Link>
              </div>
            ) : (
              <>
                <div className="text-center mb-8">
                  <div className="w-14 h-14 rounded-2xl bg-terra-50 flex items-center justify-center mx-auto mb-4">
                    <Mail className="w-7 h-7 text-terra" />
                  </div>
                  <h1 className="font-display font-bold text-forest-700 text-2xl mb-2">
                    Recupera tu contraseña
                  </h1>
                  <p className="text-forest-400 text-sm">
                    Ingresa tu correo y te enviaremos un enlace para restablecer tu contraseña.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-forest-600 mb-1.5">
                      Correo electrónico
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="tu@correo.com"
                      className="w-full border border-cream-200 rounded-xl px-4 py-2.5 text-sm
                                 focus:outline-none focus:border-forest-300"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full btn-primary justify-center"
                  >
                    {loading ? (
                      <span className="inline-block w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                    ) : (
                      "Enviar enlace de recuperación"
                    )}
                  </button>
                </form>

                <div className="mt-6 text-center">
                  <Link
                    href="/login"
                    className="inline-flex items-center gap-1.5 text-sm text-forest-400 hover:text-forest"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    Volver al inicio de sesión
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
