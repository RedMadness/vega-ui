export interface Props {
  label?: string
  readonly?: boolean
  placeholder?: string
  modelValue?: string | number | null
  cursorType?: string
  fontSize?: string
  fontWeight?: string
  fontColor?: string
  placeholderColor?: string
  backgroundColor?: string
  hoverBorderColor?: string
  focusBorderColor?: string
  borderColor?: string
  borderRadius?: string
  padding?: string
  width?: string
  height?: string
  textAlign?: string
  delayDebounce?: number
}

export const VegaInputProps: Partial<Props> = {
  label: '',
  readonly: false,
  placeholder: '',
  modelValue: '',
  cursorType: 'inherit',
  fontSize: 'inherit',
  fontWeight: 'inherit',
  fontColor: 'var(--vega-text-color)',
  placeholderColor: 'var(--vega-gray)',
  backgroundColor: 'none',
  borderColor: 'var(--vega-border-color)',
  hoverBorderColor: 'var(--vega-border-color)',
  focusBorderColor: 'var(--vega-border-color)',
  borderRadius: '4px',
  padding: '10px 5px',
  width: '100%',
  height: '40px',
  textAlign: 'left',
  delayDebounce: 300,
}
