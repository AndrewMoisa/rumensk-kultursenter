'use server'

import { createClient } from '@/lib/supabase/server'
import { contactFormSchema } from '@/lib/validations/forms'

export type ContactFormState = {
  success: boolean
  error: string | null
  fieldErrors?: Record<string, string[]>
}

export async function submitContactMessage(
  _prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const raw = {
    name: formData.get('name') as string,
    email: formData.get('email') as string,
    subject: (formData.get('subject') as string) || '',
    message: formData.get('message') as string,
  }

  const result = contactFormSchema.safeParse(raw)

  if (!result.success) {
    const fieldErrors: Record<string, string[]> = {}
    for (const issue of result.error.issues) {
      const field = issue.path[0] as string
      if (!fieldErrors[field]) fieldErrors[field] = []
      fieldErrors[field].push(issue.message)
    }
    return { success: false, error: null, fieldErrors }
  }

  const { name, email, subject, message } = result.data

  const supabase = await createClient()

  const { error } = await supabase.from('contact_messages').insert({
    name,
    email,
    subject: subject || null,
    message,
  })

  if (error) {
    console.error('Contact insert error:', error)
    return { success: false, error: 'Something went wrong. Please try again.' }
  }

  return { success: true, error: null }
}
