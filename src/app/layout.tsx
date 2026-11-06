import type { Metadata, Viewport } from 'next';
import { Inter, Cormorant_Garamond } from 'next/font/google';
import './globals.css';
import { SmoothScroll } from '@/components/SmoothScroll';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

const cormorant = Cormorant_Garamond({
  variable: '--font-cormorant',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
});

export const metadata: Metadata = {
  title: {
    template: '%s | EOE — Private Archive',
    default: 'EOE — Private Archive',
  },
  description:
    'The documented private collection of Ozuwo Enifome — paintings, photography and mixed media acquired directly from the studio across four artists, presented with gallery catalogues and provenance records.',
  keywords: [
    'Ozuwo Enifome',
    'EOE art',
    'Lagos contemporary artist',
    'oil paintings Lagos',
    'fine art photography Nigeria',
    'private art archive',
    'contemporary African painter'
  ],
  metadataBase: new URL('https://fomeozuwo.vercel.app'),
  alternates: {
    canonical: 'https://fomeozuwo.vercel.app',
  },
  openGraph: {
    title: 'EOE — Private Archive',
    description: 'The documented private collection of Ozuwo Enifome. Paintings, photography and mixed media — four artists, five gallery catalogues.',
    type: 'website',
    url: 'https://fomeozuwo.vercel.app',
    locale: 'en_NG',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'EOE — Private Archive',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'EOE — Private Archive',
    description: 'The documented private collection of Ozuwo Enifome. Paintings, photography and mixed media — four artists, five gallery catalogues.',
    images: ['/og-image.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${cormorant.variable} antialiased text-foreground bg-background selection:bg-foreground selection:text-background font-sans w-full overflow-x-hidden relative min-h-screen`}
      >
        <Navbar />
        <SmoothScroll>
          <main>{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
