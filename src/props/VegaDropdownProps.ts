import { Option } from './VegaSelectProps'
import { ApiResponse } from './ApiResponse'

export interface VegaDropdownProps<T> {
  options?: Array<Option<T> | string | number>
  valueField?: string
  labelField?: string
  tooltipField?: string
  backgroundColor?: string
  hoverColor?: string
  textColor?: string
  hoverTextColor?: string
  borderColor?: string
  borderRadius?: string
  fontSize?: string
  optionPadding?: string
  transitionDuration?: string
  infiniteScroll?: boolean
  noOptionsMessage?: string
  remoteHandler?: (
    params: object,
  ) => Promise<ApiResponse<Option<string | number> | string | number>>
  responseHandler?: (
    response: ApiResponse<Option<string | number> | string | number>,
  ) => Array<Option<T> | string | number>
  filters?: object
  width?: string
  offsetLeft?: number
  offsetTop?: number
  zIndex?: number
  hideIfEmpty?: boolean
  scrollbarColor?: string
  itemHeight?: number
  autoPosition?: boolean
  itemSelectedColor?: string
  closeOnSelect?: boolean
  disabled?: boolean
}

export const VegaDropdownDefaults = {
  options: () => [],
  valueField: 'value',
  labelField: 'label',
  backgroundColor: 'var(--vega-secondary)',
  hoverColor: 'ver(--vega-primary)',
  textColor: 'inherit',
  hoverTextColor: 'inherit',
  borderColor: 'var(--vega-border-color)',
  borderRadius: '4px',
  fontSize: 'inherit',
  optionPadding: '8px 12px',
  transitionDuration: '0.3s',
  infiniteScroll: false,
  noOptionsMessage: 'No options available',
  width: '300px',
  offsetLeft: 0,
  offsetTop: 8,
  zIndex: 1,
  scrollbarColor: 'var(--vega-border-color)',
  itemHeight: 34,
  autoPosition: false,
  itemSelectedColor: 'var(--vega-primary)',
  closeOnSelect: true,
  disabled: false,
}