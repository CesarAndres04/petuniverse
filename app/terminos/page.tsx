import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";

export const metadata = { title: "Términos y Condiciones — PetUniverse" };

export default function TerminosPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-cream-50 pt-20">
        <div className="section-wrapper py-16 max-w-3xl mx-auto">
          <h1 className="text-3xl font-display font-bold text-forest-700 mb-2">
            Términos y Condiciones
          </h1>
          <p className="text-forest-400 text-sm mb-10">Última actualización: 1 de enero de 2026</p>

          <div className="prose prose-sm max-w-none space-y-8">
            {[
              {
                title: "1. Aceptación de los términos",
                body: "Al acceder y utilizar la plataforma PetUniverse (petuniverse.mx), el usuario acepta estar sujeto a los presentes Términos y Condiciones. Si no está de acuerdo con alguna de estas condiciones, le rogamos que no utilice nuestros servicios.",
              },
              {
                title: "2. Descripción del servicio",
                body: "PetUniverse es una plataforma de comercio electrónico especializada en productos para mascotas. Ofrecemos recomendaciones personalizadas basadas en el perfil de cada mascota registrada por el usuario.",
              },
              {
                title: "3. Registro de cuenta",
                body: "Para acceder a funcionalidades avanzadas, el usuario debe crear una cuenta con información veraz y actualizada. El usuario es responsable de mantener la confidencialidad de sus credenciales de acceso.",
              },
              {
                title: "4. Compras y pagos",
                body: "Todos los precios están expresados en pesos mexicanos (MXN) e incluyen IVA. PetUniverse se reserva el derecho de modificar precios sin previo aviso. El pago se procesa al momento de confirmar el pedido.",
              },
              {
                title: "5. Política de devoluciones",
                body: "El usuario tiene 30 días calendario desde la fecha de entrega para solicitar devoluciones de productos en perfecto estado y sin abrir. Productos de higiene o alimentación abiertos no son elegibles por razones de salubridad.",
              },
              {
                title: "6. Propiedad intelectual",
                body: "Todo el contenido de PetUniverse, incluyendo textos, imágenes, logos y código fuente, es propiedad de PetUniverse S.A. de C.V. Queda prohibida su reproducción sin autorización expresa.",
              },
              {
                title: "7. Limitación de responsabilidad",
                body: "PetUniverse no se hace responsable por daños indirectos derivados del uso de los productos adquiridos. Recomendamos siempre consultar con un veterinario antes de cambiar la dieta o medicación de su mascota.",
              },
              {
                title: "8. Modificaciones",
                body: "PetUniverse se reserva el derecho de modificar estos términos en cualquier momento. Los cambios serán notificados mediante correo electrónico registrado o aviso prominente en la plataforma.",
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
