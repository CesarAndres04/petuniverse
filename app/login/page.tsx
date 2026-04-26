"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, ArrowRight } from "lucide-react";

const PawIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C10.34 2 9 3.34 9 5s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3zM6.5 5C5.12 5 4 6.12 4 7.5S5.12 10 6.5 10 9 8.88 9 7.5 7.88 5 6.5 5zm11 0C16.12 5 15 6.12 15 7.5S16.12 10 17.5 10 20 8.88 20 7.5 18.88 5 17.5 5zM12 11c-3 0-9 1.5-9 4.5V18h18v-2.5c0-3-6-4.5-9-4.5z" />
  </svg>
);

export default function LoginPage() {
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // TODO: integrar con NextAuth signIn("credentials", { email, password })
    setTimeout(() => {
      setLoading(false);
      window.location.href = "/dashboard";
    }, 1200);
  };

  return (
    <div className="min-h-screen gradient-hero flex items-center justify-center px-4">
      {/* Card de login */}
      <div className="w-full max-w-md bg-white rounded-4xl shadow-card-hover border border-cream-200 p-8">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <Link href="/" className="flex items-center gap-2 group">
            <div
              className="w-10 h-10 rounded-2xl gradient-forest flex items-center justify-center
                          group-hover:scale-110 transition-transform"
            >
              <PawIcon className="w-5 h-5 text-white" />
            </div>
            <span className="font-display text-2xl font-bold text-forest-600">
              Pet<span className="text-terra">Universe</span>
            </span>
          </Link>
        </div>

        <h1 className="font-display text-2xl font-bold text-forest-700 text-center mb-2">
          Bienvenido de vuelta
        </h1>
        <p className="text-forest-400 text-center text-sm mb-8">
          Ingresa para ver la tienda de tu mascota
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-forest-600 mb-1.5">
              Correo electrónico
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="tu@email.com"
              className="w-full bg-cream-50 border border-cream-200 rounded-xl px-4 py-3
                         text-forest-700 placeholder:text-forest-300
                         focus:outline-none focus:border-forest-400 focus:bg-white
                         transition-all text-sm"
            />
          </div>

          {/* Contraseña */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-sm font-medium text-forest-600">Contraseña</label>
              <Link href="/recuperar" className="text-xs text-terra hover:text-terra-500 transition-colors">
                ¿Olvidaste tu contraseña?
              </Link>
            </div>
            <div className="relative">
              <input
                type={showPass ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
                className="w-full bg-cream-50 border border-cream-200 rounded-xl px-4 py-3
                           text-forest-700 placeholder:text-forest-300
                           focus:outline-none focus:border-forest-400 focus:bg-white
                           transition-all text-sm pr-11"
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-forest-300
                           hover:text-forest-500 transition-colors"
              >
                {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="btn-terra w-full py-3.5 text-base mt-2 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                </svg>
                Ingresando...
              </span>
            ) : (
              <>
                Iniciar sesión
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Demo links */}
        <div className="mt-6 pt-6 border-t border-cream-200 flex flex-col gap-2 text-sm text-center">
          <p className="text-forest-400">
            ¿No tienes cuenta?{" "}
            <Link href="/registro" className="text-terra font-semibold hover:text-terra-500 transition-colors">
              Regístrate gratis
            </Link>
          </p>
          <div className="flex justify-center gap-4 text-xs text-forest-300">
            <Link href="/dashboard" className="hover:text-terra transition-colors">
              Ver demo dashboard →
            </Link>
            <Link href="/admin" className="hover:text-terra transition-colors">
              Ver demo admin →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
