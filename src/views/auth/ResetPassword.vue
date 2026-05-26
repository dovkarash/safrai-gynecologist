<script lang="ts" setup>
import { Btn, Card, PasswordInput, TextInput } from '@bagelink/vue'
</script>

<template>
  <div class="flex justify-content-center relative z-1 fill loginCard">
    <Card
      class="grid grid-wrap-5 color-black txt-center w700 overflow-hidden p-0 bg-white m_mx-1 m_grid-wrap-1"
    >
      <div class="bg-primary grid-span-2 flex m_none">
        <img class="h-100" src="/src/assets/bg.png" alt="" />
      </div>
      <form class="grid-span-3 px-4 pb-4 pt-2 m_px-2 m_pb-3 m_pt-2 m_grid-span-1" @submit.prevent>
        <img height="60" src="@/assets/logo.svg" alt="" />
        <h1 class="txt20 bold">Reset Password</h1>

        <TextInput v-show="false" type="email" label="email" autocomplete="email" />
        <PasswordInput class="mb-05" label="New Password" autocomplete="new-password" />
        <PasswordInput label="Confirm Password" autocomplete="new-password" />

        <Btn type="submit" class="w-100 mt-2" value="Submit" />
      </form>
      <div class="w-100 login-side" />
    </Card>
  </div>
</template>
