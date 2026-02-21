"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { contactFormSchema, type ContactFormData } from "@/lib/validations/forms"

interface ContactFormProps {
  onSuccess?: () => void
  locale?: string
}

/**
 * Ready-to-use Contact Form Component
 * 
 * Features:
 * - Full validation with Zod
 * - Loading states
 * - Error handling
 * - Success feedback
 * - Internationalization ready
 * 
 * Usage:
 * <ContactForm onSuccess={() => console.log('Form submitted!')} />
 */
export function ContactForm({ onSuccess, locale = 'en' }: ContactFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  })

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      // TODO: Replace with your API endpoint
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, locale }),
      })

      if (!response.ok) throw new Error('Failed to submit form')

      setSubmitStatus('success')
      reset()
      onSuccess?.()
    } catch (error) {
      console.error('Form submission error:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Name Field */}
      <div className="space-y-2">
        <label htmlFor="name" className="text-sm font-medium text-foreground">
          Name <span className="text-red-500">*</span>
        </label>
        <Input
          id="name"
          {...register("name")}
          className={errors.name ? "border-red-500" : ""}
          placeholder="Your full name"
        />
        {errors.name && (
          <p className="text-sm text-red-500">{errors.name.message}</p>
        )}
      </div>

      {/* Email Field */}
      <div className="space-y-2">
        <label htmlFor="email" className="text-sm font-medium text-foreground">
          Email <span className="text-red-500">*</span>
        </label>
        <Input
          id="email"
          type="email"
          {...register("email")}
          className={errors.email ? "border-red-500" : ""}
          placeholder="your.email@example.com"
        />
        {errors.email && (
          <p className="text-sm text-red-500">{errors.email.message}</p>
        )}
      </div>

      {/* Phone Field */}
      <div className="space-y-2">
        <label htmlFor="phone" className="text-sm font-medium text-foreground">
          Phone (optional)
        </label>
        <Input
          id="phone"
          type="tel"
          {...register("phone")}
          className={errors.phone ? "border-red-500" : ""}
          placeholder="+47 123 45 678"
        />
        {errors.phone && (
          <p className="text-sm text-red-500">{errors.phone.message}</p>
        )}
      </div>

      {/* Subject Field */}
      <div className="space-y-2">
        <label htmlFor="subject" className="text-sm font-medium text-foreground">
          Subject <span className="text-red-500">*</span>
        </label>
        <Input
          id="subject"
          {...register("subject")}
          className={errors.subject ? "border-red-500" : ""}
          placeholder="What is this about?"
        />
        {errors.subject && (
          <p className="text-sm text-red-500">{errors.subject.message}</p>
        )}
      </div>

      {/* Message Field */}
      <div className="space-y-2">
        <label htmlFor="message" className="text-sm font-medium text-foreground">
          Message <span className="text-red-500">*</span>
        </label>
        <textarea
          id="message"
          {...register("message")}
          rows={5}
          className={`flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${
            errors.message ? "border-red-500" : ""
          }`}
          placeholder="Tell us more..."
        />
        {errors.message && (
          <p className="text-sm text-red-500">{errors.message.message}</p>
        )}
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-primary hover:bg-primary/90"
      >
        {isSubmitting ? "Sending..." : "Send Message"}
      </Button>

      {/* Status Messages */}
      {submitStatus === 'success' && (
        <div className="rounded-md bg-green-50 p-4 text-sm text-green-800">
          ✓ Message sent successfully! We&apos;ll get back to you soon.
        </div>
      )}
      {submitStatus === 'error' && (
        <div className="rounded-md bg-red-50 p-4 text-sm text-red-800">
          ✗ Failed to send message. Please try again or contact us directly.
        </div>
      )}
    </form>
  )
}
