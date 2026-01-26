# Next.js 15 i18n Starter Template 🌍

A modern, production-ready starter template for building internationalized web applications with **Next.js 15**, **React 19**, and **next-intl**. Features a beautiful UI built with **Tailwind CSS** and **Shadcn UI**, complete with type safety and best practices baked in.

## ✨ Features

- 🚀 **Next.js 15** with App Router and React 19
- 🌐 **Full Internationalization** (i18n) with `next-intl` v4+
- 🎨 **Custom Design System** - Navy, Gold, and Ice color palette
- 🧩 **Shadcn UI Components** - Built on Radix UI primitives
- 💅 **Tailwind CSS** - Utility-first styling with custom configuration
- 🔒 **TypeScript** - Full type safety with strict mode
- 📱 **Responsive Design** - Mobile-first approach
- 🌓 **Dark Mode Ready** - CSS variables configured for theme switching
- 🗂️ **Localized Routes** - Different paths per language (e.g., `/about`, `/om`, `/despre`)
- 🎯 **Best Practices** - Clean architecture and maintainable code structure

## 🌍 Supported Languages

- **English** (en) 🇬🇧
- **Norwegian** (no) 🇳🇴 - Default locale
- **Romanian** (ro) 🇷🇴

Easily add more languages by creating new JSON files in the `messages/` directory.

## 📦 Tech Stack

| Technology | Purpose |
|------------|---------|
| [Next.js 15](https://nextjs.org/) | React framework with App Router |
| [React 19](https://react.dev/) | UI library |
| [next-intl](https://next-intl-docs.vercel.app/) | Internationalization |
| [TypeScript](https://www.typescriptlang.org/) | Type safety |
| [Tailwind CSS](https://tailwindcss.com/) | Styling |
| [Shadcn UI](https://ui.shadcn.com/) | Component library |
| [Radix UI](https://www.radix-ui.com/) | Accessible primitives |
| [Lucide React](https://lucide.dev/) | Icons |

## 🚀 Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm, yarn, or pnpm

### Installation

1. **Clone or use this template:**
   ```bash
   git clone <your-repo-url>
   cd nextjs15-i18n-starter
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
nextjs15-i18n-starter/
├── messages/              # Translation files
│   ├── en.json           # English translations
│   ├── no.json           # Norwegian translations
│   └── ro.json           # Romanian translations
├── src/
│   ├── app/
│   │   ├── globals.css   # Global styles & CSS variables
│   │   └── [locale]/     # Locale-based routes
│   │       ├── layout.tsx    # Root layout with i18n provider
│   │       ├── page.tsx      # Home page
│   │       └── about/
│   │           └── page.tsx  # About page
│   ├── components/
│   │   ├── LanguageSwitcher.tsx  # Language selector
│   │   └── ui/           # Shadcn UI components
│   │       ├── button.tsx
│   │       └── select.tsx
│   ├── i18n/
│   │   ├── request.ts    # i18n request configuration
│   │   └── routing.ts    # Routing & navigation setup
│   ├── lib/
│   │   └── utils.ts      # Utility functions (cn, etc.)
│   └── middleware.ts     # Locale detection & routing
├── components.json       # Shadcn UI configuration
├── next.config.mjs       # Next.js configuration with i18n plugin
├── tailwind.config.ts    # Tailwind with custom colors
└── tsconfig.json         # TypeScript configuration
```

## 🎨 Custom Color Palette

The template includes a custom color system designed for professional applications:

```typescript
colors: {
  navy: '#002147',    // Primary brand color
  gold: '#C5A059',    // Accent/highlight color
  ice: '#F0F4F8',     // Light background color
}
```

Each color includes full shade variants (50-900) for flexible design options.

## 🌐 Adding Translations

### 1. Add a new language

Create a new JSON file in `messages/`:
```bash
messages/
  ├── en.json
  ├── no.json
  ├── ro.json
  └── fr.json  # New French translations
```

### 2. Update routing configuration

Edit [`src/i18n/routing.ts`](src/i18n/routing.ts):
```typescript
export const routing = defineRouting({
  locales: ['no', 'en', 'ro', 'fr'],  // Add 'fr'
  defaultLocale: 'no',
  pathnames: {
    '/': '/',
    '/about': {
      en: '/about',
      no: '/om',
      ro: '/despre',
      fr: '/a-propos'  // Add French route
    }
  }
});
```

### 3. Update middleware matcher

Edit [`src/middleware.ts`](src/middleware.ts):
```typescript
export const config = {
  matcher: ['/', '/(no|en|ro|fr)/:path*']  // Add 'fr'
};
```

### 4. Update LanguageSwitcher

Add the language option in [`src/components/LanguageSwitcher.tsx`](src/components/LanguageSwitcher.tsx):
```typescript
const languages = [
  { code: 'no', name: 'Norsk', flag: '🇳🇴' },
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'ro', name: 'Română', flag: '🇷🇴' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },  // Add French
];
```

## 🔧 Configuration

### TypeScript Paths

The project uses path aliases for cleaner imports:
```typescript
import { Button } from '@/components/ui/button';
import { routing } from '@/i18n/routing';
```

### Tailwind CSS

Custom configuration in [`tailwind.config.ts`](tailwind.config.ts) includes:
- Custom color palette (Navy, Gold, Ice)
- CSS variable-based theming
- Shadcn UI integration
- Dark mode support

### Next.js

The [`next.config.mjs`](next.config.mjs) integrates the `next-intl` plugin:
```javascript
import createNextIntlPlugin from 'next-intl/plugin';
const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');
```

## 📝 Usage Examples

### Using translations in components

```typescript
import { useTranslations } from 'next-intl';

export default function MyComponent() {
  const t = useTranslations('HomePage');
  return <h1>{t('welcome')}</h1>;
}
```

### Localized navigation

```typescript
import { Link } from '@/i18n/routing';

export default function Navigation() {
  return (
    <nav>
      <Link href="/">Home</Link>
      <Link href="/about">About</Link>
    </nav>
  );
}
```

### Programmatic navigation

```typescript
'use client';

import { useRouter } from '@/i18n/routing';

export default function MyComponent() {
  const router = useRouter();
  
  const handleClick = () => {
    router.push('/about');  // Automatically localized
  };
  
  return <button onClick={handleClick}>Go to About</button>;
}
```

## 🏗️ Building for Production

```bash
# Build the application
npm run build

# Start production server
npm start
```

The build process:
1. Generates static params for all locales
2. Optimizes translations
3. Creates production bundles
4. Enables React Strict Mode

## 🧪 Development Commands

```bash
npm run dev     # Start development server
npm run build   # Build for production
npm start       # Start production server
npm run lint    # Run ESLint
```

## 🎯 Key Features Explained

### Localized Pathnames

Different languages can have different URLs:
- English: `/about`
- Norwegian: `/om`
- Romanian: `/despre`

This improves SEO and user experience for each locale.

### Automatic Locale Detection

The middleware automatically:
1. Detects user's preferred language
2. Redirects to appropriate locale
3. Validates locale parameters
4. Falls back to default locale if invalid

### Type-Safe Translations

Full TypeScript support ensures:
- Translation keys are validated
- No runtime errors from missing translations
- Autocomplete in your IDE

### Server & Client Components

The template demonstrates:
- Server-side translation loading
- Client-side language switching
- Optimal performance patterns

## 🎨 Customization

### Change Color Palette

Edit [`tailwind.config.ts`](tailwind.config.ts) to update colors:
```typescript
colors: {
  navy: '#YOUR_PRIMARY_COLOR',
  gold: '#YOUR_ACCENT_COLOR',
  ice: '#YOUR_BACKGROUND_COLOR',
}
```

### Add Shadcn UI Components

```bash
npx shadcn-ui@latest add [component-name]
```

### Modify Default Locale

Change in [`src/i18n/routing.ts`](src/i18n/routing.ts):
```typescript
defaultLocale: 'en',  // Set your preferred default
```

## 📚 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [next-intl Documentation](https://next-intl-docs.vercel.app/)
- [Shadcn UI Documentation](https://ui.shadcn.com/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the issues page.

## ⭐ Show Your Support

If this starter template helped you, please consider giving it a star!

---

**Built with ❤️ using Next.js 15**