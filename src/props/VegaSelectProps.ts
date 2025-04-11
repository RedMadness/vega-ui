export interface ApiResponse<T> {
  data: {
    data: T[]
    meta: {
      total: number
    }
  }
}
export interface Option<T> {
  [key: string]: T
}
export interface Props<T> {
  label?: string
  searchable?: boolean
  searchQueryKey?: string
  searchPersist?: boolean
  valueField?: string
  labelField?: string
  tooltipField?: string
  placeholder?: string
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
  clearable?: boolean
  notEmpty?: boolean
  backgroundColorDropdown?: string
  hoverColorDropdown?: string
  textColorDropdown?: string
  hoverTextColorDropdown?: string
  borderColorDropdown?: string
  borderRadiusDropdown?: string
  fontSizeDropdown?: string
  optionPaddingDropdown?: string
  transitionDurationDropdown?: string
  infiniteScroll?: boolean
  noOptionsMessage?: string
  remoteHandler?: (
    params: object,
  ) => Promise<ApiResponse<Option<string | number> | string | number>>
  responseHandler?: (
    response: ApiResponse<Option<string | number> | string | number>,
  ) => Array<Option<T> | string | number>
  options?: Array<Option<T> | string | number>
  hideEmptyDropdown?: boolean
  dropdownScrollbarColor?: string
  dropdownItemHeight?: number
  dropdownAutoPosition?: boolean
  dropdownZIndex?: number
  dropdownItemSelectedColor?: string
  dropdownCloseOnSelect?: boolean
}

export const VegaSelectProps = {
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
}
