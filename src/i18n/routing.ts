import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ['no', 'en', 'ro'],

  // Used when no locale matches
  defaultLocale: 'no',

  // The `pathnames` property is optional. If not provided, the pathnames
  // will be the same for all locales.
  pathnames: {
    '/': '/',
    '/about': {
      en: '/about',
      no: '/om',
      ro: '/despre'
    }
  }
});

// Lightweight wrappers around Next.js' navigation APIs
// that will consider the routing configuration
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
