import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { Button } from '@/components/ui/button';
import LanguageSwitcher from '@/components/LanguageSwitcher';

export default function HomePage() {
  const t = useTranslations('HomePage');

  return (
    <main className="min-h-screen bg-ice">
      {/* Header */}
      <header className="bg-navy text-white shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">{t('title')}</h1>
            <LanguageSwitcher />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-bold text-navy mb-6">
            {t('welcome')}
          </h2>
          <p className="text-xl text-gray-700 mb-8">
            {t('description')}
          </p>
          <div className="flex gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-navy hover:bg-navy/90 text-white"
            >
              {t('getStarted')}
            </Button>
            <Link href="/about">
              <Button 
                variant="outline" 
                size="lg"
                className="border-navy text-navy hover:bg-navy hover:text-white"
              >
                {t('learnMore')}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-lg shadow-md border-t-4 border-navy">
            <h3 className="text-2xl font-bold text-navy mb-4">
              {t('features.nextjs.title')}
            </h3>
            <p className="text-gray-600">
              {t('features.nextjs.description')}
            </p>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-md border-t-4 border-gold">
            <h3 className="text-2xl font-bold text-gold mb-4">
              {t('features.i18n.title')}
            </h3>
            <p className="text-gray-600">
              {t('features.i18n.description')}
            </p>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-md border-t-4 border-navy">
            <h3 className="text-2xl font-bold text-navy mb-4">
              {t('features.design.title')}
            </h3>
            <p className="text-gray-600">
              {t('features.design.description')}
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-navy text-white py-8 mt-16">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gold">{t('footer')}</p>
        </div>
      </footer>
    </main>
  );
}
