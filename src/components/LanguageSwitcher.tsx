'use client';

import { useParams } from 'next/navigation';
import { useRouter, usePathname } from '@/i18n/routing';
import { Globe, ChevronDown } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';
import { Button } from './ui/button';

const languages = [
  { code: 'no', name: 'Norsk', flag: '🇳🇴' },
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'ro', name: 'Română', flag: '🇷🇴' },
] as const;

export default function LanguageSwitcher() {
  const params = useParams();
  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = params.locale as string;

  const handleLanguageChange = (newLocale: string) => {
    router.replace(
      { pathname: pathname || '/' },
      { locale: newLocale as 'no' | 'en' | 'ro' }
    );
  };

  const currentLang = languages.find(lang => lang.code === currentLocale);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-2 hover:bg-accent/20" aria-label="Change language">
          <Globe className="w-4 h-4 text-accent" aria-hidden="true" />
          <span className="hidden sm:inline text-sm uppercase">{currentLang?.code}</span>
          <ChevronDown className="w-3 h-3" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => handleLanguageChange(lang.code)}
            className={currentLocale === lang.code ? "bg-accent/20 text-accent" : ""}
          >
            <span className="flex items-center gap-2">
              <span>{lang.flag}</span>
              <span>{lang.name}</span>
            </span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}