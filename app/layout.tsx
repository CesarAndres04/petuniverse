import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import WelcomeModal from "@/components/landing/WelcomeModal";

// ─── Tipografías ──────────────────────────────────────────────
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

// ─── SEO / Metadatos ──────────────────────────────────────────
export const metadata: Metadata = {
  title: {
    default: "PetUniverse — La tienda de lujo para tu mascota",
    template: "%s | PetUniverse",
  },
  description:
    "Plataforma eCommerce premium para amantes de las mascotas. Productos curados, perfiles personalizados y recomendaciones inteligentes para el bienestar de tu compañero.",
  keywords: ["mascotas", "premium", "ecommerce", "perros", "gatos", "tienda online"],
  authors: [{ name: "PetUniverse" }],
  creator: "PetUniverse",
  openGraph: {
    type: "website",
    locale: "es_MX",
    url: "https://petuniverse.mx",
    siteName: "PetUniverse",
    title: "PetUniverse — La tienda de lujo para tu mascota",
    description:
      "Productos premium curados para el bienestar de tu mascota. Con perfiles personalizados y recomendaciones inteligentes.",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "PetUniverse — La tienda de lujo para tu mascota",
    description: "Productos premium curados para el bienestar de tu mascota.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#4A7C59",
  width: "device-width",
  initialScale: 1,
};

// ─── Layout raíz ─────────────────────────────────────────────
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${inter.variable} ${playfair.variable}`}>
      <body className="min-h-screen bg-cream antialiased">
        {children}
        <WelcomeModal />
      </body>
    </html>
  );
}
