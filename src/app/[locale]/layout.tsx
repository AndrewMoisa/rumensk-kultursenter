import type { Metadata, Viewport } from "next";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { StructuredData } from '@/components/StructuredData';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import "../globals.css";

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL('https://rumensk-kultursenter.no'),
  title: {
    default: "Rumensk Kultursenter | Sandnes",
    template: "%s | Rumensk Kultursenter"
  },
  description: "Connecting the Romanian diaspora in Norway through cultural events, language courses, and community programs. Join us in celebrating our rich heritage while building bridges between cultures.",
  keywords: ["Romanian cultural center", "Norway", "Romanian community", "cultural events", "language courses", "Romanian diaspora", "Sandnes", "Rogaland"],
  authors: [{ name: "Rumensk Kultursenter" }],
  creator: "Rumensk Kultursenter",
  publisher: "Rumensk Kultursenter",
  alternates: {
    canonical: '/',
    languages: {
      'no': '/no',
      'en': '/en',
      'ro': '/ro',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'no_NO',
    alternateLocale: ['en_US', 'ro_RO'],
    url: 'https://rumensk-kultursenter.no',
    siteName: 'Rumensk Kultursenter',
    title: 'Rumensk Kultursenter | Sandnes',
    description: 'Connecting the Romanian diaspora in Norway through cultural events, language courses, and community programs.',
    images: [
      {
        url: '/images/logo/logov2.png',
        width: 1200,
        height: 630,
        alt: 'Rumensk Kultursenter Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rumensk Kultursenter | Sandnes',
    description: 'Connecting the Romanian diaspora in Norway through cultural events, language courses, and community programs.',
    images: ['/images/logo/logov2.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // Add Google Search Console verification code here when available
    // google: 'your-verification-code',
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/images/favicon.ico', type: 'image/x-icon' },
    ],
    shortcut: '/favicon.ico',
    apple: '/images/logo/logov2.png',
  },
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  
  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className="antialiased">
        <StructuredData />
        <ErrorBoundary>
          <NextIntlClientProvider messages={messages}>
            {children}
          </NextIntlClientProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
