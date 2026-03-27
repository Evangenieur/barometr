import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
});

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://barometr.app';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'Barometr — Observatoire mondial des équilibres socio-économiques',
  description:
    'Explorez et comparez les pays du monde sur des dimensions sociales, économiques et environnementales grâce à des scores météo lisibles.',
  openGraph: {
    title: 'Barometr',
    description: 'Observatoire mondial des équilibres socio-économiques',
    type: 'website',
    images: [`${basePath}/og-image.png`],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Barometr',
    description: 'Observatoire mondial des équilibres socio-économiques',
    images: [`${basePath}/og-image.png`],
  },
};

export default function RootLayout({ children }: { readonly children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <head>
        <link
          rel="preload"
          href={`${basePath}/geo/world-countries.geojson`}
          as="fetch"
          crossOrigin="anonymous"
        />
      </head>
      <body className="bg-void text-text-primary font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
