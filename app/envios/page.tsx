import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";

export const metadata = { title: "Envíos — PetUniverse" };

const ZONES = [
  { zone: "CDMX y Área Metro", time: "1–2 días hábiles", carrier: "Fedex / Proximo", cost: "Gratis +$800 / $89" },
  { zone: "Guadalajara y Monterrey", time: "2–3 días hábiles", carrier: "Fedex", cost: "Gratis +$800 / $89" },
  { zone: "Resto de México", time: "3–5 días hábiles", carrier: "DHL / Estafeta", cost: "Gratis +$800 / $109" },
  { zone: "Zonas remotas", time: "5–7 días hábiles", carrier: "Estafeta", cost: "$149" },
];

export default function EnviosPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-cream-50 pt-20">
        <div className="section-wrapper py-16 max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <span className="category-badge bg-forest-50 text-forest-600 mb-3 inline-block">
              Información de envíos
            </span>
            <h1 className="text-4xl font-display font-bold text-forest-700 mb-3">
              Política de <span className="text-gradient-forest">envíos</span>
            </h1>
          </div>

          {/* Envío gratis banner */}
          <div className="bg-gradient-to-r from-forest to-forest-600 rounded-3xl p-8 text-white text-center mb-10">
            <p className="text-4xl mb-3">🚚</p>
            <h2 className="font-display font-bold text-2xl mb-2">Envío GRATIS</h2>
            <p className="text-forest-100">En todos los pedidos mayores a <strong>$800 MXN</strong></p>
          </div>

          {/* Tabla de zonas */}
          <div className="bg-white rounded-2xl border border-cream-200 overflow-hidden mb-8">
            <div className="p-5 border-b border-cream-200">
              <h2 className="font-semibold text-forest-700">Tiempos y costos por zona</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-cream-100 bg-cream-50">
                    <th className="text-left p-4 text-forest-500 font-medium">Zona</th>
                    <th className="text-left p-4 text-forest-500 font-medium">Tiempo estimado</th>
                    <th className="text-left p-4 text-forest-500 font-medium hidden sm:table-cell">Paquetería</th>
                    <th className="text-right p-4 text-forest-500 font-medium">Costo</th>
                  </tr>
                </thead>
                <tbody>
                  {ZONES.map((z) => (
                    <tr key={z.zone} className="border-b border-cream-100">
                      <td className="p-4 font-medium text-forest-700">{z.zone}</td>
                      <td className="p-4 text-forest-500">{z.time}</td>
                      <td className="p-4 text-forest-400 hidden sm:table-cell">{z.carrier}</td>
                      <td className="p-4 text-right font-semibold text-forest-700">{z.cost}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Notas */}
          <div className="space-y-4">
            {[
              { title: "Procesamiento del pedido", body: "Los pedidos realizados antes de las 2pm (hora CDMX) de lunes a viernes se procesan el mismo día. Los pedidos de fin de semana se procesan el lunes siguiente." },
              { title: "Rastreo en tiempo real", body: "Recibirás un correo con tu número de guía al momento de que tu pedido sea recolectado. Puedes rastrearlo en /rastrear o directamente en la web de la paquetería." },
              { title: "Dirección incorrecta", body: "Asegúrate de ingresar correctamente tu dirección al momento de la compra. PetUniverse no se hace responsable por pedidos extraviados por error en la dirección proporcionada." },
            ].map((n) => (
              <div key={n.title} className="bg-white rounded-2xl border border-cream-200 p-6">
                <h3 className="font-semibold text-forest-700 mb-2">{n.title}</h3>
                <p className="text-sm text-forest-400 leading-relaxed">{n.body}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
