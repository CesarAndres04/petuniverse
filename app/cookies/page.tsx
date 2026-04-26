import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";

export const metadata = { title: "Política de Cookies — PetUniverse" };

const COOKIES = [
  { name: "petuniverse-cart", type: "Esencial", duration: "30 días", purpose: "Almacena los artículos del carrito de compras entre sesiones" },
  { name: "next-auth.session-token", type: "Esencial", duration: "30 días", purpose: "Mantiene la sesión de usuario autenticado" },
  { name: "__ga", type: "Analítica", duration: "2 años", purpose: "Google Analytics — análisis de tráfico anónimo (requiere consentimiento)" },
  { name: "petuniverse-preferences", type: "Funcional", duration: "90 días", purpose: "Recuerda preferencias de filtros y ordenamiento del catálogo" },
];

export default function CookiesPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-cream-50 pt-20">
        <div className="section-wrapper py-16 max-w-3xl mx-auto">
          <h1 className="text-3xl font-display font-bold text-forest-700 mb-2">
            Política de Cookies
          </h1>
          <p className="text-forest-400 text-sm mb-10">Última actualización: 1 de enero de 2026</p>

          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-cream-200 p-6">
              <h2 className="font-semibold text-forest-700 mb-3">¿Qué son las cookies?</h2>
              <p className="text-sm text-forest-500 leading-relaxed">
                Las cookies son pequeños archivos de texto que se almacenan en su dispositivo cuando
                visita nuestro sitio. Nos ayudan a recordar sus preferencias, mantener su sesión
                activa y mejorar la experiencia de usuario.
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-cream-200 overflow-hidden">
              <div className="p-5 border-b border-cream-100">
                <h2 className="font-semibold text-forest-700">Cookies que utilizamos</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-cream-100 bg-cream-50">
                      <th className="text-left p-4 text-forest-500 font-medium">Cookie</th>
                      <th className="text-left p-4 text-forest-500 font-medium">Tipo</th>
                      <th className="text-left p-4 text-forest-500 font-medium hidden sm:table-cell">Duración</th>
                      <th className="text-left p-4 text-forest-500 font-medium hidden md:table-cell">Propósito</th>
                    </tr>
                  </thead>
                  <tbody>
                    {COOKIES.map((c) => (
                      <tr key={c.name} className="border-b border-cream-100">
                        <td className="p-4 font-mono text-xs text-forest-600">{c.name}</td>
                        <td className="p-4">
                          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                            c.type === "Esencial" ? "bg-forest-50 text-forest-600" :
                            c.type === "Analítica" ? "bg-amber-50 text-amber-600" :
                            "bg-blue-50 text-blue-600"
                          }`}>
                            {c.type}
                          </span>
                        </td>
                        <td className="p-4 text-forest-400 hidden sm:table-cell">{c.duration}</td>
                        <td className="p-4 text-forest-400 text-xs hidden md:table-cell">{c.purpose}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-cream-200 p-6">
              <h2 className="font-semibold text-forest-700 mb-3">Control de cookies</h2>
              <p className="text-sm text-forest-500 leading-relaxed mb-3">
                Puede configurar su navegador para rechazar cookies. Sin embargo, desactivar las
                cookies esenciales puede afectar el funcionamiento del carrito y la sesión.
              </p>
              <p className="text-sm text-forest-500 leading-relaxed">
                Las cookies analíticas (no esenciales) solo se activan con su consentimiento
                explícito mediante el banner de cookies que aparece en su primera visita.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
