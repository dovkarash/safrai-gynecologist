<script setup lang="ts">
import { Btn } from '@bagelink/vue'
import { onMounted, onUnmounted, ref } from 'vue'

const compassRef = ref<HTMLElement | null>(null)
const needleRef = ref<HTMLElement | null>(null)

let raf = 0
let target = 0
let current = 0
let active = false

const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v))

const getAngleDeg = (x: number, y: number) => {
  const el = compassRef.value
  if (!el) return 0
  const r = el.getBoundingClientRect()
  const dx = x - (r.left + r.width / 2)
  const dy = y - (r.top + r.height / 2)
  return (Math.atan2(dy, dx) * 180) / Math.PI + 90 // 0° = up
}

const setTargetFrom = (x: number, y: number) => {
  active = true
  compassRef.value?.classList.remove('idle')
  target = clamp(getAngleDeg(x, y), -40, 40)
}

const onMove = (e: MouseEvent | TouchEvent) => {
  const p = e instanceof TouchEvent ? e.touches?.[0] : (e as MouseEvent)

  if (!p) return
  setTargetFrom(p.clientX, p.clientY)
}

const onLeave = () => {
  active = false
  target = Math.random() * 10 - 5
  window.setTimeout(() => {
    if (!active) compassRef.value?.classList.add('idle')
  }, 450)
}

const loop = () => {
  current += (target - current) * 0.1
  if (needleRef.value) needleRef.value.style.transform = `rotate(${current.toFixed(2)}deg)`
  raf = requestAnimationFrame(loop)
}

onMounted(() => {
  const el = compassRef.value
  if (!el) return

  el.addEventListener('mousemove', onMove, { passive: true })
  el.addEventListener('mouseleave', onLeave, { passive: true })
  el.addEventListener('touchstart', onMove, { passive: true })
  el.addEventListener('touchmove', onMove, { passive: true })
  el.addEventListener('touchend', onLeave, { passive: true })

  raf = requestAnimationFrame(loop)
})

onUnmounted(() => {
  const el = compassRef.value
  if (el) {
    el.removeEventListener('mousemove', onMove)
    el.removeEventListener('mouseleave', onLeave)
    el.removeEventListener('touchstart', onMove)
    el.removeEventListener('touchmove', onMove)
    el.removeEventListener('touchend', onLeave)
  }
  cancelAnimationFrame(raf)
})
</script>

<template>
  <div class="txt-center flex justify-content-center flex-column gap-1 h-100vh pb-5">
    <div
      ref="compassRef"
      class="relative grid shadow-txt user-select-none aspect-ratio-1 idle min-w250px"
    >
      <div class="border round absolute bg-gray opacity-2 alpha-10 inset"></div>
      <div
        class="absolute inset-2 bg-gray-30 alpha-10 round overflow-hidden border border-gray"
      ></div>

      <div
        ref="needleRef"
        class="needle absolute inset grid align-items-center justify-content-center"
      >
        <div class="relative flex justify-content-center needleWrap h-90p">
          <div class="absolute border-start h100p border-white opacity-2"></div>

          <svg class="h-100p w-100p" viewBox="0 0 40 200" aria-hidden="true">
            <polygon points="20,0 30,100 10,100" fill="var(--bgl-blue)" />
            <polygon points="20,200 30,100 10,100" fill="var(--bgl-red)" />
          </svg>
        </div>
      </div>

      <div
        class="cap h-30px aspect-ratio-1 bg-white absolute round border shadow m-auto inset"
      ></div>
    </div>

    <p class="txt120 bold line-height-1">404</p>
    <p class="txt30">הדף לא נמצא.</p>
    <p class="txt16 light">בואו נחזיר אתכם למסלול.</p>
    <Btn class="border border-gray" href="/">חזרה לעמוד הבית</Btn>
  </div>
</template>

<style scoped>
.needle {
  will-change: transform;
}

.idle .needle {
  animation: idleDrift 3.8s ease-in-out infinite;
}

@keyframes idleDrift {
  0% {
    transform: rotate(-6deg);
  }
  50% {
    transform: rotate(7deg);
  }
  100% {
    transform: rotate(-6deg);
  }
}

@media (prefers-reduced-motion: reduce) {
  .idle .needle {
    animation: none;
  }
  .btn {
    transition: none;
  }
}
</style>
