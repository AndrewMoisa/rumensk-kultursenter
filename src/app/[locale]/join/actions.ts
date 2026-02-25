'use server'

import { createClient } from '@/lib/supabase/server'
import { membershipSchema } from '@/lib/validations/forms'

export type JoinFormState = {
  success: boolean
  error: string | null
  fieldErrors?: Record<string, string[]>
}

export async function submitMemberApplication(
  _prevState: JoinFormState,
  formData: FormData
): Promise<JoinFormState> {
  const raw = {
    firstName: formData.get('firstName') as string,
    lastName: formData.get('lastName') as string,
    email: formData.get('email') as string,
    phone: (formData.get('phone') as string) || '',
    message: (formData.get('message') as string) || '',
  }

  const result = membershipSchema.safeParse(raw)

  if (!result.success) {
    const fieldErrors: Record<string, string[]> = {}
    for (const issue of result.error.issues) {
      const field = issue.path[0] as string
      if (!fieldErrors[field]) fieldErrors[field] = []
      fieldErrors[field].push(issue.message)
    }
    return { success: false, error: null, fieldErrors }
  }

  const { firstName, lastName, email, phone, message } = result.data

  const supabase = await createClient()

  const { error } = await supabase.from('membership_applications').insert({
    first_name: firstName,
    last_name: lastName,
    email,
    phone: phone || null,
    message: message || null,
    status: 'pending',
  })

  if (error) {
    if (error.code === '23505') {
      return { success: false, error: 'This email has already been submitted.' }
    }
    console.error('Application insert error:', error)
    return { success: false, error: 'Something went wrong. Please try again.' }
  }

  return { success: true, error: null }
}
