'use server'

import { createClient } from '@/lib/supabase/server'

export type JoinFormState = {
  success: boolean
  error: string | null
}

export async function submitMemberApplication(
  _prevState: JoinFormState,
  formData: FormData
): Promise<JoinFormState> {
  const firstName = formData.get('firstName') as string
  const lastName = formData.get('lastName') as string
  const email = formData.get('email') as string
  const phone = (formData.get('phone') as string) || null
  const message = (formData.get('message') as string) || null

  // Basic validation
  if (!firstName || !lastName || !email) {
    return { success: false, error: 'Please fill in all required fields.' }
  }

  const supabase = await createClient()

  const { error } = await supabase.from('membership_applications').insert({
    first_name: firstName,
    last_name: lastName,
    email,
    phone,
    message,
    status: 'pending',
  })

  if (error) {
    if (error.code === '23505') {
      // unique constraint violation (duplicate email)
      return { success: false, error: 'This email has already been submitted.' }
    }
    console.error('Application insert error:', error)
    return { success: false, error: 'Something went wrong. Please try again.' }
  }

  return { success: true, error: null }
}
