# Storybook Documentation

This project uses Storybook for component documentation and visual testing.

## What is Storybook?

Storybook is an open-source tool for building UI components and pages in isolation. It streamlines UI development, testing, and documentation.

## Running Storybook

To start the Storybook development server:

```bash
npm run storybook
```

This will start Storybook on `http://localhost:6006`

## Building Storybook

To build a static version of Storybook:

```bash
npm run build-storybook
```

The static build will be created in the `storybook-static` folder.

## Available Stories

### UI Components
- **Button** - All button variants, sizes, and states
- **Card** - Card component with header, content, and footer
- **Badge** - Badge variants for status indicators
- **Input** - Input field variations and patterns
- **Skeleton** - Loading state skeletons

### Feature Components
Stories for main feature components can be added as needed.

## Creating New Stories

To create a new story for a component:

1. Create a `ComponentName.stories.tsx` file next to your component
2. Import the component and Storybook types
3. Define the meta configuration
4. Export story variations

### Example:

```typescript
import type { Meta, StoryObj } from '@storybook/react'
import { YourComponent } from './YourComponent'

const meta = {
  title: 'Category/YourComponent',
  component: YourComponent,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof YourComponent>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    // Your component props
  },
}
```

## Features

- **Interactive Controls** - Modify component props in real-time
- **Accessibility Testing** - Built-in a11y addon
- **Documentation** - Auto-generated documentation from prop types
- **Visual Testing** - Compare component states visually
- **Next.js Integration** - Full support for Next.js features

## Configuration

Storybook configuration files:
- `.storybook/main.ts` - Main Storybook configuration
- `.storybook/preview.ts` - Global settings for stories

## Addons

This project includes:
- `@storybook/addon-a11y` - Accessibility testing
- `@storybook/addon-docs` - Documentation
- `@storybook/addon-vitest` - Component testing
- `@chromatic-com/storybook` - Visual regression testing

## Best Practices

1. **Keep stories simple** - Each story should demonstrate one variant or use case
2. **Use controls** - Make stories interactive with Storybook controls
3. **Document edge cases** - Show error states, loading states, etc.
4. **Add descriptions** - Use JSDoc comments for better documentation
5. **Test accessibility** - Use the a11y addon to check accessibility issues

## Next Steps

Consider adding:
- Stories for all major components
- Interaction tests with Vitest
- Visual regression tests with Chromatic
- Custom decorators for common patterns (e.g., internationalization wrapper)
