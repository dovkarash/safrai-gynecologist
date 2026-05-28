import { useModal } from '@bagelink/vue'
import { h } from 'vue'

// החלף את ה-URL הזה בשירות קביעת התורים האמיתי
export const BOOKING_URL = 'https://placeholder-booking-url.com'

export function useBooking() {
  const modal = useModal()

  function openBooking() {
    modal.showModal(
      {
        title: 'קביעת תור',
        dismissable: true,
        width: '700px',
      },
      {
        default: () =>
          h('iframe', {
            src: BOOKING_URL,
            frameborder: '0',
            allow: 'payment',
            title: 'קביעת תור',
            style: 'width:100%; height:560px; border:none; display:block;',
          }),
      },
    )
  }

  return { openBooking }
}
