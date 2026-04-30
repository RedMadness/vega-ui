import { ApiResponse } from './ApiResponse'
import { DropdownPlacement } from './VegaDropdownProps'

export interface VegaSelectProps {
  /**
   * Background color of the input field
   * @default 'var(--vega-secondary)'
   */
  backgroundColor?: string

  /**
   * Background color of the dropdown
   * @default 'var(--vega-secondary)'
   */
  backgroundColorDropdown?: string

  /**
   * Border color of the input field
   * @default 'var(--vega-border-color)'
   */
  borderColor?: string

  /**
   * Border color of the dropdown
   * @default 'var(--vega-border-color)'
   */
  borderColorDropdown?: string

  /**
   * Border radius of the input field
   * @default '4px'
   */
  borderRadius?: string

  /**
   * Border radius of the dropdown container
   * @default '4px'
   */
  borderRadiusDropdown?: string

  /**
   * Shows clear button inside input
   * @default true
   */
  clearable?: boolean

  /**
   * Debounce delay for input/search updates (ms)
   * @default 600
   */
  delayDebounce?: number

  /**
   * Enables automatic dropdown repositioning
   * @default false
   */
  dropdownAutoPosition?: boolean

  /**
   * Closes dropdown after selection
   * @default true
   */
  dropdownCloseOnSelect?: boolean

  /**
   * Height of dropdown option (not used internally in select logic)
   * @default 34
   */
  dropdownItemHeight?: number

  /**
   * Color of selected dropdown option
   * @default 'var(--vega-primary)'
   */
  dropdownItemSelectedColor?: string

  /**
   * Maximum width of dropdown
   */
  dropdownMaxWidth?: string

  /**
   * Minimum width of dropdown
   */
  dropdownMinWidth?: string

  /**
   * Dropdown placement relative to trigger
   * @default 'bottom-start'
   * @see DropdownPlacement
   */
  dropdownPlacement?: DropdownPlacement

  /**
   * Scrollbar color of dropdown
   * @default 'var(--vega-border-color)'
   */
  dropdownScrollbarColor?: string

  /**
   * Z-index of dropdown
   * @default 1
   */
  dropdownZIndex?: number

  /**
   * Font color of input text
   * @default 'var(--vega-text-color)'
   */
  fontColor?: string

  /**
   * Font size of input text
   * @default 'inherit'
   */
  fontSize?: string

  /**
   * Font size inside dropdown
   * @default 'inherit'
   */
  fontSizeDropdown?: string

  /**
   * Font weight of input text
   */
  fontWeight?: string

  /**
   * Border color when input is focused
   * @default 'var(--vega-border-color)'
   */
  focusBorderColor?: string

  /**
   * Hides dropdown when no options available
   * @default false
   */
  hideEmptyDropdown?: boolean

  /**
   * Height of input field
   * @default 'auto'
   */
  height?: string

  /**
   * Border color on hover
   * @default 'var(--vega-border-color)'
   */
  hoverBorderColor?: string

  /**
   * Background color of dropdown option on hover
   * @default 'var(--vega-primary)'
   */
  hoverColorDropdown?: string

  /**
   * Text color of dropdown option on hover
   */
  hoverTextColorDropdown?: string

  /**
   * Enables infinite scroll (delegated to dropdown)
   * @default false
   */
  infiniteScroll?: boolean

  /**
   * Label displayed above input
   * @default ''
   */
  label?: string

  /**
   * Field used for displaying option label
   * @default 'label'
   */
  labelField?: string

  /**
   * Message shown when no options available
   * @default 'No options available'
   */
  noOptionsMessage?: string

  /**
   * Automatically selects first option if model is empty
   * @default false
   */
  notEmpty?: boolean

  /**
   * Padding inside dropdown option
   * @default '8px 12px'
   */
  optionPaddingDropdown?: string

  /**
   * Available options list
   * @see Option
   */
  options?: Array<Record<string, unknown> | string | number>

  /**
   * Padding inside input field
   * @default '10px'
   */
  padding?: string

  /**
   * Placeholder text
   * @default 'Select value'
   */
  placeholder?: string

  /**
   * Placeholder text color
   * @default 'var(--vega-gray)'
   */
  placeholderColor?: string

  /**
   * Makes input read-only
   * @default false
   */
  readonly?: boolean

  /**
   * Async function for fetching options
   * @see ApiResponse
   */
  remoteHandler?: (
    params: object,
  ) => Promise<ApiResponse<Record<string, unknown>>>

  /**
   * Transforms API response into options
   * @see ApiResponse
   * @see Option
   */
  responseHandler?: (
    response: ApiResponse<Record<string, unknown> | string | number>,
  ) => Array<Record<string, unknown> | string | number>

  /**
   * Keeps search value after dropdown reopen
   * @default false
   */
  searchPersist?: boolean

  /**
   * Key used for search query in API requests
   * @default 'search'
   */
  searchQueryKey?: string

  /**
   * Enables typing/search inside input
   * @default false
   */
  searchable?: boolean

  /**
   * Text alignment inside input
   * @default 'left'
   */
  textAlign?: string

  /**
   * Text color of dropdown options
   */
  textColorDropdown?: string

  /**
   * Tooltip field for option
   */
  tooltipField?: string

  /**
   * Dropdown animation duration
   * @default '0.3s'
   */
  transitionDurationDropdown?: string

  /**
   * Field used as option value
   * @default 'value'
   */
  valueField?: string

  /**
   * Width of input field
   * @default '100%'
   */
  width?: string
}

export const VegaSelectDefaults = {
  options: () => [],
  searchable: false,
  searchPersist: false,
  valueField: 'value',
  labelField: 'label',
  backgroundColor: 'var(--vega-secondary)',
  backgroundColorDropdown: 'var(--vega-secondary)',
  hoverColorDropdown: 'var(--vega-primary)',
  delayDebounce: 600,
  clearable: true,
  notEmpty: false,
  placeholder: 'Select value',
  label: '',
  searchQueryKey: 'search',
  dropdownScrollbarColor: 'var(--vega-border-color)',
  dropdownItemHeight: 34,
  dropdownAutoPosition: false,
  dropdownZIndex: 1,
  dropdownItemSelectedColor: 'var(--vega-primary)',
  dropdownCloseOnSelect: true,
  readonly: false,
  dropdownMaxWidth: undefined,
  dropdownPlacement: 'bottom-start' as DropdownPlacement,
}