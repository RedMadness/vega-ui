import type { VegaSelectProps } from './VegaSelectProps'

export interface VegaSelectStorageProps extends VegaSelectProps {
  /**
   * Storage key
   */
  storageKey: string

  /**
   * Default value
   */
  default?: string | null | Array<string | number | Record<string, unknown>>
}