<script setup lang="ts">
import { Btn, Card, TextInput } from '@bagelink/vue'
import { onMounted, ref } from 'vue'
import { useArticles } from '@/composables/useArticles'
import { useMedia } from '@/composables/useMedia'
import { useContact, type ContactForm } from '@/composables/useContact'
import { useBooking } from '@/composables/useBooking'
import Topnav from '@/components/Topnav.vue'

const { articles, fetchArticles } = useArticles()
const { media, fetchMedia } = useMedia()
const { submitting, success, error, submitContact } = useContact()
const { openBooking } = useBooking()

const form = ref<ContactForm>({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  message: '',
})

async function handleSubmit() {
  await submitContact({ ...form.value })
  if (success.value) {
    form.value = { firstName: '', lastName: '', email: '', phone: '', message: '' }
  }
}

onMounted(() => {
  fetchArticles()
  fetchMedia()
})
</script>

<template>
  <div>
    <Topnav />
    <!-- כפתור קביעת תור ב-Hero — ישמש לאחר בניית הדף המלא -->
    <Btn value="קביעת תור" @click="openBooking" />

    <p v-for="article in articles" :key="article._id">{{ article.name }}</p>
    <p v-for="m in media" :key="m._id">{{ m.name }} <img :src="m.image.imageURL" alt="" /></p>

    <Card class="mt-1">
      <p class="bold txt-20 mb-1">צור קשר</p>
      <div class="flex gap-1 m_flex-wrap">
        <TextInput v-model="form.firstName" label="שם פרטי" placeholder="ישראל" />
        <TextInput v-model="form.lastName" label="שם משפחה" placeholder="ישראלי" />
      </div>
      <div class="flex gap-1 m_flex-wrap">
        <TextInput
          v-model="form.email"
          type="email"
          label="אימייל"
          placeholder="israel@example.com"
        />
        <TextInput v-model="form.phone" type="tel" label="טלפון" placeholder="050-0000000" />
      </div>
      <TextInput
        v-model="form.message"
        multiline
        label="הודעה"
        placeholder="כתוב את הודעתך כאן..."
        class="mb-1"
      />
      <div class="flex gap-1 align-center">
        <Btn value="שלח" :loading="submitting" @click="handleSubmit" />
        <p v-if="success" class="txtgreen txt-14">✓ הודעתך נשלחה בהצלחה!</p>
        <p v-if="error" class="txtred txt-14">{{ error }}</p>
      </div>
    </Card>
  </div>
</template>
