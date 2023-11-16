import { AdminInterface } from './admin'

export interface ApiResponseDataInterface {
  error?: boolean
  msg?: string
  data?: any
  adminInfo?: AdminInterface
  imageUrl?: string
  pdfUrl?: string
  audioUrl?: string
  imagesUrl?: string[]
}
