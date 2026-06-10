import { useDialog } from '@bagelink/vue'
import { defineComponent, h } from 'vue'

// החלף את ה-URL הזה בשירות קביעת התורים האמיתי
export const BOOKING_URL = 'https://placeholder-booking-url.com'

export function useBooking() {
  const dialog = useDialog()

  function openBooking() {
    dialog.open({
      title: 'קביעת תור',
      dismissable: true,
      width: 'l',
      component: defineComponent({
        render() {
          return h('iframe', {
            src: BOOKING_URL,
            frameborder: '0',
            allow: 'payment',
            title: 'קביעת תור',
            style: 'width:100%; height:560px; border:none; display:block;',
          })
        },
      }),
    })
  }

  return { openBooking }
}
