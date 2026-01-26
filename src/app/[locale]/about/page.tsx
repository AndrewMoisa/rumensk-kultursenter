import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { Button } from '@/components/ui/button';
import LanguageSwitcher from '@/components/LanguageSwitcher';

export default function AboutPage() {
  const t = useTranslations('AboutPage');

  return (
    <main className="min-h-screen bg-ice">
      {/* Header */}
      <header className="bg-navy text-white shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <Link href="/">
              <h1 className="text-2xl font-bold cursor-pointer hover:text-gold transition-colors">
                {t('backToHome')}
              </h1>
            </Link>
            <LanguageSwitcher />
          </div>
        </div>
      </header>

      {/* Content */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold text-navy mb-6">
            {t('title')}
          </h2>
          <div className="bg-white p-8 rounded-lg shadow-md">
            <p className="text-lg text-gray-700 mb-4">
              {t('content.paragraph1')}
            </p>
            <p className="text-lg text-gray-700 mb-4">
              {t('content.paragraph2')}
            </p>
            <div className="mt-8 p-6 bg-ice rounded-lg border-l-4 border-gold">
              <h3 className="text-xl font-bold text-navy mb-3">
                {t('techStack.title')}
              </h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>{t('techStack.items.nextjs')}</li>
                <li>{t('techStack.items.i18n')}</li>
                <li>{t('techStack.items.tailwind')}</li>
                <li>{t('techStack.items.shadcn')}</li>
                <li>{t('techStack.items.typescript')}</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
