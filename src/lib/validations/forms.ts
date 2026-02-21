import { z } from "zod"

// Contact form validation schema
export const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be less than 100 characters"),
  email: z
    .string()
    .email("Please enter a valid email address"),
  phone: z
    .string()
    .optional()
    .refine((val) => !val || /^\+?\d{8,15}$/.test(val.replace(/\s/g, "")), {
      message: "Please enter a valid phone number",
    }),
  subject: z
    .string()
    .min(3, "Subject must be at least 3 characters")
    .max(200, "Subject must be less than 200 characters"),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(2000, "Message must be less than 2000 characters"),
})

export type ContactFormData = z.infer<typeof contactFormSchema>

// Newsletter subscription validation schema
export const newsletterSchema = z.object({
  email: z
    .string()
    .email("Please enter a valid email address"),
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .optional(),
})

export type NewsletterData = z.infer<typeof newsletterSchema>

// Membership registration validation schema
export const membershipSchema = z.object({
  firstName: z
    .string()
    .min(2, "First name must be at least 2 characters")
    .max(50, "First name must be less than 50 characters"),
  lastName: z
    .string()
    .min(2, "Last name must be at least 2 characters")
    .max(50, "Last name must be less than 50 characters"),
  email: z
    .string()
    .email("Please enter a valid email address"),
  phone: z
    .string()
    .regex(/^\+?\d{8,15}$/, "Please enter a valid phone number"),
  address: z
    .string()
    .min(5, "Address must be at least 5 characters")
    .max(200, "Address must be less than 200 characters"),
  postalCode: z
    .string()
    .regex(/^\d{4}$/, "Please enter a valid Norwegian postal code"),
  city: z
    .string()
    .min(2, "City must be at least 2 characters")
    .max(100, "City must be less than 100 characters"),
  membershipType: z.enum(["individual", "family"] as const),
  agreeToTerms: z
    .boolean()
    .refine((val) => val === true, {
      message: "You must agree to the terms and conditions",
    }),
})

export type MembershipData = z.infer<typeof membershipSchema>

// Event registration validation schema
export const eventRegistrationSchema = z.object({
  eventId: z.number().int().positive(),
  firstName: z
    .string()
    .min(2, "First name must be at least 2 characters")
    .max(50, "First name must be less than 50 characters"),
  lastName: z
    .string()
    .min(2, "Last name must be at least 2 characters")
    .max(50, "Last name must be less than 50 characters"),
  email: z
    .string()
    .email("Please enter a valid email address"),
  phone: z
    .string()
    .regex(/^\+?\d{8,15}$/, "Please enter a valid phone number"),
  numberOfAttendees: z
    .number()
    .int()
    .min(1, "At least 1 attendee required")
    .max(10, "Maximum 10 attendees per registration"),
  specialRequirements: z
    .string()
    .max(500, "Special requirements must be less than 500 characters")
    .optional(),
})

export type EventRegistrationData = z.infer<typeof eventRegistrationSchema>
