import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { Button } from '@/components/ui/button';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { Header } from '@/components/header';
import { Hero } from '@/components/hero';
import { Members } from '@/components/member';
import { Events } from '@/components/events';

export default function HomePage() {
  const t = useTranslations('HomePage');

  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-blue-50/20 to-background">
      {/* Header */}
      < Header />

      {/* Hero Section */}
      <Hero />

      {/* Members Section */}
      <Members />

      { /* Additional sections like Events, About, Contact can be added here */ }

      < Events />

      {/* Footer */}
      <footer className="bg-gradient-to-br from-slate-900 via-primary to-slate-900 text-white py-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-accent rounded-full blur-3xl"></div>
        </div>
        <div className="container mx-auto px-4 text-center relative">
          <p className="text-accent text-lg font-medium">{t('footer')}</p>
          <div className="mt-4 flex items-center justify-center gap-2">
            <div className="w-12 h-0.5 bg-gradient-to-r from-transparent to-accent"></div>
            <p className="text-white/60 text-sm">Romanian Cultural Center</p>
            <div className="w-12 h-0.5 bg-gradient-to-l from-transparent to-accent"></div>
          </div>
        </div>
      </footer>
    </main>
  );
}
