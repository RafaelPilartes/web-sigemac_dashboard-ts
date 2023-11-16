import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

type ToastType = 'error' | 'success' | 'info'

export function showToast(typo: ToastType, description: string) {
  toast[typo](description, {
    position: toast.POSITION.TOP_RIGHT
  })
}
export function showToastRight(typo: ToastType, description: string) {
  toast[typo](description, {
    position: toast.POSITION.BOTTOM_RIGHT
  })
}
