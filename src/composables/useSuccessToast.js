import { watch, nextTick } from 'vue'
import { useRoute } from 'vue-router'
import { toast } from 'vue3-toastify'

export function useSuccessToast() {
  const route = useRoute()

  watch(
    () => route.query.success,
    async (message) => {
      if (message) {
        toast.success(message, {
          onClose: () => { // Clean URL
            const url = new URL(window.location)
            url.searchParams.delete('success')
            window.history.replaceState({}, '', url)
          }
        })        
      }
    },
    { immediate: true }
  )
}