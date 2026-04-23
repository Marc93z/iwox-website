import type { Metadata, Viewport } from 'next';
import { Inter, Orbitron } from 'next/font/google';
import './globals.css';

import ParticleCanvas from '@/components/layout/ParticleCanvas';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import StickyWhatsApp from '@/components/layout/StickyWhatsApp';
import { LocaleProvider } from '@/lib/i18n/LocaleContext';

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
});

const orbitron = Orbitron({
  subsets: ['latin'],
  weight: ['500', '700', '900'],
  variable: '--font-orbitron',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://iwox.ai'),
  title: 'iwox.ai — Bots WhatsApp pour commerçants & e-commerce',
  description:
    "Nous installons votre vendeur WhatsApp qui ne dort jamais : catalogue, panier, checkout, relances — 100% dans WhatsApp. Bots sur-mesure pour fleuristes, e-commerce et PME.",
  openGraph: {
    title: 'iwox.ai — Bots WhatsApp pour commerçants & e-commerce',
    description:
      "Votre vendeur WhatsApp qui ne dort jamais. Catalogue, panier, checkout — 100% dans WhatsApp.",
    url: 'https://iwox.ai',
    siteName: 'iwox.ai',
    type: 'website',
    locale: 'fr_FR',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'iwox.ai — Bots WhatsApp',
    description: 'Votre vendeur WhatsApp qui ne dort jamais.',
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#050710',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${inter.variable} ${orbitron.variable}`}>
      <body>
        <LocaleProvider>
          <ParticleCanvas />
          <Navbar />
          <main>{children}</main>
          <Footer />
          <StickyWhatsApp />
        </LocaleProvider>
      </body>
    </html>
  );
}
