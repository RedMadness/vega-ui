import type { VegaSelectProps, Option } from './VegaSelectProps'

export interface VegaSelectStorageProps<TValue = string | number> extends VegaSelectProps<TValue> {
  /**
   * Storage key
   */
  storageKey: string

  /**
   * Default value
   */
  default?: string | null | Array<string | number | Option<string | number>>
}