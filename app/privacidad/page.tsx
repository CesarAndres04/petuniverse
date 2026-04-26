import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";

export const metadata = { title: "Política de Privacidad — PetUniverse" };

export default function PrivacidadPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-cream-50 pt-20">
        <div className="section-wrapper py-16 max-w-3xl mx-auto">
          <h1 className="text-3xl font-display font-bold text-forest-700 mb-2">
            Política de Privacidad
          </h1>
          <p className="text-forest-400 text-sm mb-10">Última actualización: 1 de enero de 2026</p>

          <div className="space-y-6">
            {[
              {
                title: "Datos que recopilamos",
                body: "Recopilamos información que usted nos proporciona directamente al crear una cuenta: nombre, correo electrónico, contraseña cifrada, y datos de su mascota (nombre, especie, raza, alergias). También recopilamos datos de uso y preferencias para mejorar nuestras recomendaciones.",
              },
              {
                title: "Cómo usamos sus datos",
                body: "Utilizamos sus datos para: (1) procesar pedidos y enviar confirmaciones, (2) generar recomendaciones personalizadas basadas en el perfil de su mascota, (3) mejorar nuestros algoritmos de personalización, y (4) enviar comunicaciones de marketing solo con su consentimiento.",
              },
              {
                title: "Compartición de datos",
                body: "No vendemos ni alquilamos sus datos personales. Compartimos información únicamente con: paqueterías para entrega de pedidos, procesadores de pago (Stripe) para transacciones seguras, y proveedores de infraestructura cloud bajo acuerdos de confidencialidad.",
              },
              {
                title: "Seguridad",
                body: "Implementamos medidas técnicas y organizativas para proteger sus datos: cifrado TLS en tránsito, hashing bcrypt de contraseñas, acceso con privilegio mínimo y auditorías de seguridad periódicas.",
              },
              {
                title: "Sus derechos",
                body: "Conforme a la LFPDPPP, usted tiene derechos ARCO (Acceso, Rectificación, Cancelación y Oposición). Para ejercerlos, envíe un correo a privacidad@petuniverse.mx con su solicitud y una identificación oficial.",
              },
              {
                title: "Cookies",
                body: "Usamos cookies esenciales para el funcionamiento del carrito y sesión, y cookies analíticas (con su consentimiento) para mejorar la experiencia. Consulte nuestra Política de Cookies en /cookies.",
              },
              {
                title: "Contacto",
                body: "Para cualquier consulta sobre privacidad: privacidad@petuniverse.mx · Av. Insurgentes Sur 1602, CDMX · Responsable: PetUniverse S.A. de C.V.",
              },
            ].map((s) => (
              <div key={s.title} className="bg-white rounded-2xl border border-cream-200 p-6">
                <h2 className="font-semibold text-forest-700 mb-3">{s.title}</h2>
                <p className="text-sm text-forest-500 leading-relaxed">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
