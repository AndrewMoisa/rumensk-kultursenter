# Form Components & Validation

This directory contains ready-to-use form components with full validation using React Hook Form and Zod.

## 📦 Installed Dependencies

- `react-hook-form` - Form state management
- `zod` - Schema validation
- `@hookform/resolvers` - Zod resolver for React Hook Form

## 🎯 Available Form Schemas

Located in `/src/lib/validations/forms.ts`:

### 1. Contact Form Schema
```typescript
import { contactFormSchema, ContactFormData } from '@/lib/validations/forms'
```
Fields: name, email, phone (optional), subject, message

### 2. Newsletter Schema
```typescript
import { newsletterSchema, NewsletterData } from '@/lib/validations/forms'
```
Fields: email, name (optional)

### 3. Membership Schema
```typescript
import { membershipSchema, MembershipData } from '@/lib/validations/forms'
```
Fields: firstName, lastName, email, phone, address, postalCode, city, membershipType, agreeToTerms

### 4. Event Registration Schema
```typescript
import { eventRegistrationSchema, EventRegistrationData } from '@/lib/validations/forms'
```
Fields: eventId, firstName, lastName, email, phone, numberOfAttendees, specialRequirements (optional)

## 🚀 Usage Examples

### Contact Form Component

Already created and ready to use:

```tsx
import { ContactForm } from '@/components/forms/ContactForm'

export default function ContactPage() {
  return (
    <div className="max-w-2xl mx-auto p-8">
      <h1>Contact Us</h1>
      <ContactForm 
        onSuccess={() => console.log('Form submitted!')}
        locale="en"
      />
    </div>
  )
}
```

### Custom Form Example

```tsx
"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { newsletterSchema, NewsletterData } from "@/lib/validations/forms"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function NewsletterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<NewsletterData>({
    resolver: zodResolver(newsletterSchema),
  })

  const onSubmit = async (data: NewsletterData) => {
    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (!response.ok) throw new Error('Failed to subscribe')
      
      alert('Successfully subscribed!')
      reset()
    } catch (error) {
      console.error('Subscription error:', error)
      alert('Failed to subscribe. Please try again.')
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex gap-2">
      <Input
        type="email"
        placeholder="your.email@example.com"
        {...register("email")}
        className={errors.email ? "border-red-500" : ""}
      />
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "..." : "Subscribe"}
      </Button>
      {errors.email && (
        <p className="text-sm text-red-500">{errors.email.message}</p>
      )}
    </form>
  )
}
```

## 📝 Creating API Routes

When ready to handle form submissions, create API routes:

### Example: Contact Form API Route

Create `/src/app/api/contact/route.ts`:

```typescript
import { NextRequest, NextResponse } from 'next/server'
import { contactFormSchema } from '@/lib/validations/forms'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate the data
    const validatedData = contactFormSchema.parse(body)
    
    // TODO: Send email using your preferred service
    // - Resend
    // - SendGrid
    // - Nodemailer
    // - etc.
    
    console.log('Contact form submission:', validatedData)
    
    return NextResponse.json({ 
      success: true,
      message: 'Form submitted successfully'
    })
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to submit form' },
      { status: 400 }
    )
  }
}
```

## 🌍 Internationalization

To add i18n support to forms:

1. Add form-related translations to your message files:

```json
{
  "ContactForm": {
    "name": "Name",
    "email": "Email",
    "phone": "Phone",
    "subject": "Subject",
    "message": "Message",
    "submit": "Send Message",
    "sending": "Sending...",
    "success": "Message sent successfully!",
    "error": "Failed to send message",
    "required": "This field is required",
    "invalidEmail": "Please enter a valid email address"
  }
}
```

2. Update form component to use translations:

```tsx
import { useTranslations } from 'next-intl'

export function ContactForm() {
  const t = useTranslations('ContactForm')
  
  return (
    <form>
      <label>{t('name')}</label>
      {/* ... */}
    </form>
  )
}
```

## 📧 Email Service Integration

Popular options for sending emails:

### Resend (Recommended)
```bash
npm install resend
```

### SendGrid
```bash
npm install @sendgrid/mail
```

### Nodemailer
```bash
npm install nodemailer
```

## ✅ Form Validation Features

All schemas include:
- Type safety with TypeScript
- Client-side validation
- Server-side validation ready
- Custom error messages
- Optional fields support
- Regex patterns for specific fields (phone, postal code)

## 🎨 Styling

Forms use your existing Shadcn UI components:
- `Button` from `@/components/ui/button`
- `Input` from `@/components/ui/input`
- `Card` from `@/components/ui/card`

Error states are styled with Tailwind CSS.

## 🔒 Security Best Practices

1. **Always validate on the server** - Don't trust client-side validation alone
2. **Rate limiting** - Add rate limiting to prevent spam
3. **CSRF protection** - Next.js provides this by default for API routes
4. **Sanitize inputs** - Especially if displaying user-submitted content
5. **Environment variables** - Store API keys securely in `.env.local`

## 📚 Additional Resources

- [React Hook Form Docs](https://react-hook-form.com/)
- [Zod Documentation](https://zod.dev/)
- [Next.js API Routes](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)
