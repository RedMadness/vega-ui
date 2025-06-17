import { VegaTextareaProps } from './VegaTextareaProps'

export interface VegaInputProps extends VegaTextareaProps {
  type?: 'text' | 'password' | 'date' | 'email' | 'number' | 'url'
  clearable?: boolean
  min?: number
  max?: number
}