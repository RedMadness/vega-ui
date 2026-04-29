import { Option } from './VegaSelectProps'
import { ApiResponse } from './ApiResponse'

export type DropdownPlacement =
  | 'top' | 'top-start' | 'top-end'
  | 'bottom' | 'bottom-start' | 'bottom-end'
  | 'left' | 'left-start' | 'left-end'
  | 'right' | 'right-start' | 'right-end'

export interface VegaDropdownProps<T> {
  /**
   * Background color of the options list container
   * @default 'var(--vega-secondary)'
   */
  backgroundColor?: string

  /**
   * Border color of the dropdown container
   * @default 'var(--vega-border-color)'
   */
  borderColor?: string

  /**
   * Border radius of the dropdown container
   * @default '4px'
   */
  borderRadius?: string

  /**
   * Closes dropdown after selecting an option
   * @default true
   */
  closeOnSelect?: boolean

  /**
   * Disables interaction and prevents opening the dropdown
   * @default false
   */
  disabled?: boolean

  /**
   * Additional query params passed to remoteHandler. Triggers reload when changed
   */
  filters?: object

  /**
   * Font size applied to dropdown content
   * @default 'inherit'
   */
  fontSize?: string

  /**
   * Hides dropdown entirely if there are no options and it's opened
   * @default false
   */
  hideIfEmpty?: boolean

  /**
   * Background color of option on hover or keyboard navigation
   * @default 'var(--vega-border-color)'
   */
  hoverColor?: string

  /**
   * Text color of option when hovered or highlighted
   * @default 'inherit'
   */
  hoverTextColor?: string

  /**
   * Enables lazy loading more options on scroll (used with remoteHandler)
   * @default true
   */
  infiniteScroll?: boolean

  /**
   * Color used for selected option text and check icon
   * @default 'var(--vega-primary)'
   */
  itemSelectedColor?: string

  /**
   * Key used to display label when option is an object
   * @default 'description'
   */
  labelField?: string

  /**
   * Maximum height of options list before scrolling is enabled
   * @default 200
   */
  maxHeight?: number

  /**
   * Maximum width of the dropdown container
   * @default '300px'
   */
  maxWidth?: string

  /**
   * Minimum width of the dropdown container
   */
  minWidth?: string

  /**
   * Message shown when there are no options and not loading
   * @default 'No options available'
   */
  noOptionsMessage?: string

  /**
   * Horizontal offset from trigger element
   * @default 0
   */
  offsetLeft?: number

  /**
   * Vertical offset from trigger element
   * @default 8
   */
  offsetTop?: number

  /**
   * Padding applied to each option
   * @default '8px 12px'
   */
  optionPadding?: string

  /**
   * Static list of selectable options. Merged with remote data if provided
   * @see Option
   */
  options?: Array<Option<T> | string | number>

  /**
   * Preferred dropdown placement relative to trigger (Floating UI)
   * @see DropdownPlacement
   */
  placement?: DropdownPlacement

  /**
   * Async function for fetching options
   * Receives { page, per_page, search, ...filters }
   * @see ApiResponse
   */
  remoteHandler?: (
    params: object,
  ) => Promise<ApiResponse<Option<string | number> | string | number>>

  /**
   * Transforms API response into options array
   * @see ApiResponse
   * @see Option
   */
  responseHandler?: (
    response: ApiResponse<Option<string | number> | string | number>,
  ) => Array<Option<T> | string | number>

  /**
   * Scrollbar color inside dropdown (Firefox-compatible)
   * @default 'var(--vega-border-color)'
   */
  scrollbarColor?: string

  /**
   * Displays search input inside dropdown
   * @default false
   */
  showSearch?: boolean

  /**
   * Displays selected value block with clear button
   * @default false
   */
  showSelected?: boolean

  /**
   * Default text color of options
   * @default 'var(--vega-text-color)'
   */
  textColor?: string

  /**
   * Key for tooltip text (shown via tooltip component if provided)
   */
  tooltipField?: string

  /**
   * Duration of dropdown fade-in/out animation
   * @default '0.3s'
   */
  transitionDuration?: string

  /**
   * Key used as unique value when option is an object
   * @default 'id'
   */
  valueField?: string

  /**
   * Background color of the outer dropdown wrapper
   * @default 'var(--vega-border-color)'
   */
  wrapperBackgroundColor?: string

  /**
   * Padding for the outer dropdown wrapper
   */
  wrapperPadding?: string

  /**
   * Controls stacking order of the dropdown
   * @default 1
   */
  zIndex?: number
}

export const VegaDropdownDefaults = {
  options: () => [],
  valueField: 'id',
  labelField: 'description',
  backgroundColor: 'var(--vega-secondary)',
  hoverColor: 'var(--vega-border-color)',
  textColor: 'var(--vega-text-color)',
  hoverTextColor: 'inherit',
  borderColor: 'var(--vega-border-color)',
  borderRadius: '4px',
  fontSize: 'inherit',
  optionPadding: '8px 12px',
  transitionDuration: '0.3s',
  infiniteScroll: true,
  noOptionsMessage: 'No options available',
  maxWidth: '300px',
  offsetLeft: 0,
  offsetTop: 8,
  zIndex: 1,
  scrollbarColor: 'var(--vega-border-color)',
  itemSelectedColor: 'var(--vega-primary)',
  closeOnSelect: true,
  disabled: false,
  maxHeight: 200,
  showSearch: false,
  showSelected: false,
  wrapperBackgroundColor: 'var(--vega-border-color)',
  wrapperPadding: undefined,
}