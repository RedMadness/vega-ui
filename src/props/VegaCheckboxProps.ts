/**
 * Types for the VegaCheckbox component.
 */
export interface VegaCheckboxProps {
  /**
   * Current value of the checkbox.
   */
  modelValue?: boolean | string | number

  /**
   * Value to emit when the checkbox is checked.
   * @default true
   */
  checkedValue?: boolean | string | number

  /**
   * Value to emit when the checkbox is unchecked.
   * @default false
   */
  uncheckedValue?: boolean | string | number

  /**
   * Background and checkmark color when checkbox is checked.
   * @default var(--vega-primary)
   */
  checkedColor?: string

  /**
   * Border color of the checkbox.
   * @default var(--vega-border-color)
   */
  borderColor?: string

  /**
   * Label text displayed next to the checkbox.
   */
  label?: string

  /**
   * Position of the label relative to the checkbox.
   * @default 'right'
   */
  labelPosition?: 'top' | 'bottom' | 'left' | 'right'

  /**
   * Gap between checkbox and label.
   * @default '6px'
   */
  labelGap?: string

  /**
   * Size of the checkbox.
   * @default '16px'
   */
  checkboxSize?: string

  /**
   * Disables the checkbox and prevents user interaction.
   * @default false
   */
  readonly?: boolean
}

export const VegaCheckboxDefaults: Omit<VegaCheckboxProps, 'modelValue'> = {
  checkedValue: true,
  uncheckedValue: false,
  checkedColor: 'var(--vega-primary)',
  borderColor: 'var(--vega-border-color)',
  labelPosition: 'right',
  labelGap: '6px',
  checkboxSize: '16px',
  readonly: false,
}