import { ref } from 'vue'
import { useBagelDB } from '@/plugin/bagelDB'

export interface ContactForm {
  firstName: string
  lastName: string
  email: string
  phone: string
  message: string
}

export function useContact() {
  const bagel = useBagelDB()
  const submitting = ref(false)
  const success = ref(false)
  const error = ref<string | null>(null)

  async function submitContact(form: ContactForm) {
    submitting.value = true
    success.value = false
    error.value = null
    try {
      await bagel.collection('contact').post(form)
      success.value = true
    } catch (e: any) {
      error.value = e?.message ?? 'Failed to send message'
    } finally {
      submitting.value = false
    }
  }

  return { submitting, success, error, submitContact }
}
