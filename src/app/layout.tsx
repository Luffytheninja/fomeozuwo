import type { Metadata } from 'next';
import { Inter, Cormorant_Garamond } from 'next/font/google';
import './globals.css';
import { SmoothScroll } from '@/components/SmoothScroll';
import { Navbar } from '@/components/Navbar';

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
    'The private archive of Enifome Ozuwo (EOE). Visual Artist working across painting and photography, exploring light, memory, and spatial narratives.',
  keywords: [
    'Enifome Ozuwo',
    'EOE art',
    'Lagos contemporary artist',
    'oil paintings Lagos',
    'fine art photography Nigeria',
    'private art archive',
    'contemporary African painter'
  ],
  metadataBase: new URL('https://eoe.brand'),
  openGraph: {
    title: 'EOE | Private Archive',
    description: 'The private archive of Enifome Ozuwo (EOE). Visual Artist working across painting and photography.',
    type: 'website',
    url: 'https://eoe.brand',
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
    description: 'The private archive of Enifome Ozuwo (EOE). Visual Artist working across painting and photography.',
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
        className={`${inter.variable} ${cormorant.variable} antialiased text-foreground bg-background selection:bg-foreground selection:text-background font-sans`}
      >
        <Navbar />
        <SmoothScroll>
          <main>{children}</main>
        </SmoothScroll>
      </body>
    </html>
  );
}
