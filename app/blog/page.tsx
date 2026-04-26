import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";

export const metadata = { title: "Blog — PetUniverse" };

const POSTS = [
  {
    slug: "guia-alergias-perros",
    title: "Guía completa: alergias alimentarias en perros",
    excerpt: "Aprende a identificar síntomas, hacer pruebas de eliminación y elegir la dieta correcta para tu perro con alergias.",
    category: "Nutrición",
    emoji: "🥗",
    date: "15 Abr 2026",
    readTime: "8 min",
  },
  {
    slug: "ansiedad-pirotecnia-gatos",
    title: "Cómo ayudar a tu gato durante los fuegos artificiales",
    excerpt: "Estrategias respaldadas por veterinarios para reducir el estrés y la ansiedad en gatos durante celebraciones con pirotecnia.",
    category: "Bienestar",
    emoji: "🎆",
    date: "10 Abr 2026",
    readTime: "5 min",
  },
  {
    slug: "omega3-beneficios-mascotas",
    title: "Los sorprendentes beneficios del Omega-3 para perros y gatos",
    excerpt: "Desde una piel más brillante hasta articulaciones más sanas: por qué el aceite de salmón es un suplemento esencial.",
    category: "Salud",
    emoji: "🐟",
    date: "3 Abr 2026",
    readTime: "6 min",
  },
  {
    slug: "juguetes-perros-activos",
    title: "Los mejores juguetes para perros con alto nivel de energía",
    excerpt: "Selección curada de juguetes interactivos y resistentes para mantener entretenidos a los perros más activos.",
    category: "Juguetes",
    emoji: "🎾",
    date: "28 Mar 2026",
    readTime: "4 min",
  },
  {
    slug: "adopcion-responsable",
    title: "Adopción responsable: lo que nadie te cuenta el primer año",
    excerpt: "Una guía honesta sobre los retos y alegrías de adoptar una mascota, con consejos prácticos para los primeros 12 meses.",
    category: "Adopción",
    emoji: "❤️",
    date: "20 Mar 2026",
    readTime: "10 min",
  },
  {
    slug: "grooming-casa",
    title: "Grooming en casa: guía paso a paso para principiantes",
    excerpt: "Todo lo que necesitas saber para mantener a tu mascota limpia e impecable sin salir de casa.",
    category: "Grooming",
    emoji: "✂️",
    date: "12 Mar 2026",
    readTime: "7 min",
  },
];

export default function BlogPage() {
  const [featured, ...rest] = POSTS;

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-cream-50 pt-20">
        <div className="section-wrapper py-16">
          <div className="text-center mb-12">
            <span className="category-badge bg-terra-50 text-terra-600 mb-3 inline-block">
              Blog PetUniverse
            </span>
            <h1 className="text-4xl font-display font-bold text-forest-700 mb-3">
              Consejos para el bienestar
              <br />
              <span className="text-gradient-forest">de tu mascota</span>
            </h1>
          </div>

          {/* Artículo destacado */}
          <div className="bg-white rounded-3xl border border-cream-200 shadow-card-base overflow-hidden mb-10">
            <div className="grid md:grid-cols-2">
              <div className="h-64 md:h-auto gradient-hero flex items-center justify-center">
                <span className="text-8xl">{featured.emoji}</span>
              </div>
              <div className="p-8 flex flex-col justify-center">
                <span className="category-badge bg-terra-50 text-terra-600 mb-3 self-start">
                  {featured.category}
                </span>
                <h2 className="font-display font-bold text-forest-700 text-2xl mb-3 leading-snug">
                  {featured.title}
                </h2>
                <p className="text-forest-400 text-sm leading-relaxed mb-5">
                  {featured.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <div className="text-xs text-forest-400">
                    {featured.date} · {featured.readTime} lectura
                  </div>
                  <button className="btn-primary text-sm">Leer artículo</button>
                </div>
              </div>
            </div>
          </div>

          {/* Grid de artículos */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {rest.map((post) => (
              <div
                key={post.slug}
                className="bg-white rounded-3xl border border-cream-200 shadow-card-base overflow-hidden
                           hover:border-forest-200 hover:shadow-card-hover transition-all duration-300 group"
              >
                <div className="h-40 gradient-hero flex items-center justify-center">
                  <span className="text-6xl group-hover:scale-110 transition-transform duration-300">
                    {post.emoji}
                  </span>
                </div>
                <div className="p-5">
                  <span className="category-badge bg-cream-200 text-forest-500 mb-2 inline-block">
                    {post.category}
                  </span>
                  <h3 className="font-semibold text-forest-700 leading-snug mb-2">{post.title}</h3>
                  <p className="text-xs text-forest-400 leading-relaxed mb-4">{post.excerpt}</p>
                  <div className="flex items-center justify-between text-xs text-forest-400">
                    <span>{post.date} · {post.readTime}</span>
                    <button className="text-terra font-medium hover:text-terra-500">Leer →</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
