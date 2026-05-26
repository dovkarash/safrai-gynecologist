<script lang="ts" setup>
import { BagelForm, Btn, Card, PasswordInput, TextInput } from '@bagelink/vue'
import { ref } from 'vue'

const email = ref('')
const errorMessage = ref('')
const isLoading = ref(false)

async function handleLogin(data: any) {
  try {
    isLoading.value = true
    errorMessage.value = ''

    // Simulate login logic - replace with actual authentication
    // For demo purposes, let's simulate different scenarios
    if (data.email === 'test@test.com' && data.password === 'wrong') {
      throw new Error('Invalid email or password')
    }

    if (!data.email || !data.password) {
      throw new Error('Please fill in all fields')
    }

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Here you would typically redirect or handle successful login
    console.log('Login successful!')
  } catch (error: any) {
    errorMessage.value = error?.response?.data?.message || error?.message || 'Login error occurred'
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="flex justify-content-center relative z-1 fill loginCard">
    <Card
      class="grid grid-wrap-5 color-black txt-center w700 overflow-hidden p-0 bg-white m_mx-1 m_grid-wrap-1 shadow"
    >
      <div class="bg-primary grid-span-2 flex m_none">
        <img class="h-100" src="/src/assets/bg.png" alt="" />
      </div>

      <BagelForm
        class="grid-span-3 px-4 pb-4 pt-2 m_px-2 m_pb-3 m_pt-2 m_grid-span-1"
        @submit="handleLogin"
      >
        <img height="60" src="@/assets/logo.svg" alt="" />
        <h1 class="txt20 bold">Login</h1>

        <TextInput
          v-model="email"
          name="email"
          type="email"
          label="Email"
          autocomplete="email"
          required
        />
        <PasswordInput name="password" label="Password" required />

        <!-- Error Alert -->
        <div
          v-if="errorMessage"
          class="txt14 color-red bg-red-light p-05 mt-1 rounded border-red txt-center"
        >
          {{ errorMessage }}
        </div>

        <Btn
          thin
          flat
          class="txt-12 mt-075 underline"
          value="Forgot Password"
          :to="`/forgot-password?email=${email}`"
        />
        <Btn
          type="submit"
          class="w-100 mt-1"
          value="Login"
          :loading="isLoading"
          :disabled="isLoading"
        />
        <Btn
          outline
          flat
          color="black"
          class="w-100 mt-1"
          value="Signup"
          to="/signup"
          :disabled="isLoading"
        />
      </BagelForm>
      <div class="w-100 login-side" />
    </Card>
  </div>
</template>
