<template>
  <div class="vega-table-wrapper">
    <div class="vega-table-container" :class="{ 'scroll-locked': loading }" @scroll="handleScroll">
      <table :class="{ loading }">
        <thead>
          <tr>
            <th
              v-for="column in columns"
              :key="column.key"
              :class="{
                'vega-table-header-sticky': headerSticky,
                ...getStickyClasses(column)
              }"
              :style="getStickyStyles(column)"
            >
              <div class="header-cell-container">
                <div>{{ column.label }}</div>
                <vega-icon-sort
                  v-if="column.sortable"
                  :asc="sortDesc"
                  :active="sortBy === (column.sortBy ?? column.key)"
                  @click="handleSortChange(column)"
                />
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(row, index) in combinedData"
            :key="getRowKey(row, index)"
            :class="getRowClass(row)"
          >
            <td
              v-for="column in columns"
              :key="column.key"
              :class="getStickyClasses(column)"
              :style="getStickyStyles(column)"
            >
              <slot
                :name="`column-${column.key}`"
                :row="row"
              >
                {{ useGetPropertyByPath(row, column.key) }}
              </slot>
            </td>
          </tr>
        </tbody>
        <tfoot v-if="summary && combinedData.length">
          <tr class="vega-table-summary-row">
            <td
              v-for="(column, index) in columns"
              :key="'summary-' + column.key"
              :class="getStickyClasses(column)"
              :style="getStickyStyles(column)"
            >
              {{ getSummaryValue(column.key, index) }}
            </td>
          </tr>
        </tfoot>
      </table>
      <div
        v-if="!combinedData.length && !loading"
        class="vega-table-no-data"
      >
        {{ emptyDataMessage }}
      </div>

      <div v-if="loading" class="vega-table-loading-overlay">
        <vega-loading />
      </div>
    </div>
    <vega-pagination
      v-model="pageCurrent"
      :total="total"
      :per-page="paginationPerPage"
      :border-color="paginationBorderColor"
      :background-color="paginationBackgroundColor"
      :item-background-color="paginationItemBackgroundColor"
      :item-active-background-color="paginationItemActiveBackgroundColor"
      :item-text-color="paginationItemTextColor"
      :item-active-text-color="paginationItemActiveTextColor"
      @page-changed="fetchData"
    />
  </div>
</template>

<script setup lang="ts">

import { ApiResponse } from '../props/ApiResponse'
import { computed, onMounted, ref, watch } from 'vue'
import useGetPropertyByPath from '../use/useGetPropertyByPath'
import VegaIconSort from './VegaIconSort.vue'
import VegaLoading from './VegaLoading.vue'
import VegaPagination from './VegaPagination.vue'

type Row = Record<string, unknown>

export interface Column<T> {
  key: keyof T
  label: string
  sortable?: boolean
  sortBy?: string
  width?: number
  fixed?: 'left' | 'right'
}

export interface TableProps {
  /**
   * Local data array to display. If `remoteHandler` is provided,
   * this data is merged with remote data.
   * @default []
   */
  data?: Row[]

  /**
   * **Required.** Array of column definitions.
   * See {@link Column} interface for structure details.
   */
  columns: Column<Row>[]

  /**
   * Header background color.
   * @default 'var(--vega-primary)'
   */
  headerBackground?: string

  /**
   * Header text color.
   * @default 'var(--vega-text-white-color)'
   */
  headerTextColor?: string

  /**
   * Padding inside header cells.
   * @default '20px'
   */
  headerCellPadding?: string

  /**
   * Minimum width of header cells.
   * @default 200
   */
  headerCellMinWidth?: number

  /**
   * Stick header to top on scroll.
   * @default true
   */
  headerSticky?: boolean

  /**
   * Header row height.
   * @default 'auto'
   */
  headerHeight?: string

  /**
   * Table container width.
   * @default 'auto'
   */
  width?: string

  /**
   * Table container height. Wrapper height = `height - 65px` (pagination).
   * @default '100%'
   */
  height?: string

  /**
   * Outer table border style.
   * @default '1px solid var(--vega-border-color)'
   */
  border?: string

  /**
   * Individual cell border style.
   * @default '1px solid var(--vega-border-color)'
   */
  cellBorder?: string

  /**
   * Table body background color.
   * @default 'var(--vega-secondary)'
   */
  bodyBackground?: string

  /**
   * Table body text color.
   * @default 'var(--vega-text-color)'
   */
  bodyTextColor?: string

  /**
   * Padding inside body cells.
   * @default '20px'
   */
  bodyCellPadding?: string

  /**
   * Property name for unique row key. Falls back to index if not found.
   * @default 'id'
   */
  rowKey?: string
  /**
   * Function to determine the CSS class of a row based on its data.
   * @param row - row data
   * @returns string | string[] | Record<string, boolean>
   */
  rowClassName?: (row: Row) => string | string[] | Record<string, boolean>

  /**
   * Row background color on hover.
   * @default 'var(--vega-border-color)'
   */
  rowHoverBackgroundColor?: string

  /**
   * **For remote data.** Fetches data from API with pagination, sorting, and filters.
   * @see ApiResponse
   */
  remoteHandler?: (params: object) => Promise<ApiResponse<Row>>

  /**
   * Callback after successful remote fetch, before data assignment.
   */
  responseHandler?: (response: ApiResponse<Row>) => void

  /**
   * Column key for initial sort.
   */
  sortDefaultKey?: string

  /**
   * Default to descending sort order.
   * @default false
   */
  sortDefaultDesc?: boolean

  /**
   * Additional filters for remote requests. Changing filters resets to page 1.
   */
  filters?: Record<string, unknown>

  /**
   * Items per page in pagination.
   * @default 25
   */
  paginationPerPage?: number

  /**
   * Pagination buttons border color.
   * @default 'var(--vega-border-color)'
   */
  paginationBorderColor?: string

  /**
   * Pagination container background.
   * @default 'var(--vega-secondary)'
   */
  paginationBackgroundColor?: string

  /**
   * Inactive pagination button background.
   * @default 'var(--vega-border-color)'
   */
  paginationItemBackgroundColor?: string

  /**
   * Active page button background.
   * @default 'var(--vega-primary)'
   */
  paginationItemActiveBackgroundColor?: string

  /**
   * Inactive pagination button text color.
   * @default 'var(--vega-text-color)'
   */
  paginationItemTextColor?: string

  /**
   * Active page button text color.
   * @default 'var(--vega-text-white-color)'
   */
  paginationItemActiveTextColor?: string

  /**
   * Message when table has no data and is not loading.
   * @default 'No data found.'
   */
  emptyDataMessage?: string

  /**
   * Summary values object. Keys match `column.key`, values shown in footer.
   */
  summary?: Record<string, string | number>

  /**
   * Summary row background color.
   * @default 'var(--vega-secondary)'
   */
  summaryBackgroundColor?: string

  /**
   * Summary row text color.
   * @default 'var(--vega-text-color)'
   */
  summaryTextColor?: string

  /**
   * Custom text for first summary column (e.g., "Total:"). Overrides `summary` for first column.
   */
  summaryFirstColumnText?: string
}

const props = withDefaults(defineProps<TableProps>(), {
  data: () => [],
  headerBackground: 'var(--vega-primary)',
  headerTextColor: 'var(--vega-text-white-color)',
  headerCellPadding: '20px',
  headerCellMinWidth: 200,
  headerSticky: true,
  headerHeight: 'auto',
  width: 'auto',
  height: '100%',
  border: '1px solid var(--vega-border-color)',
  cellBorder: '1px solid var(--vega-border-color)',
  bodyBackground: 'var(--vega-secondary)',
  bodyTextColor: 'var(--vega-text-color)',
  bodyCellPadding: '20px',
  rowHoverBackgroundColor: 'var(--vega-border-color)',
  rowKey: 'id',
  rowClassName: undefined,
  remoteHandler: undefined,
  sortDefaultKey: undefined,
  sortDefaultDesc: false,
  filters: undefined,
  paginationPerPage: 25,
  paginationBorderColor: 'var(--vega-border-color)',
  paginationBackgroundColor: 'var(--vega-secondary)',
  paginationItemBackgroundColor: 'var(--vega-border-color)',
  paginationItemActiveBackgroundColor: 'var(--vega-primary)',
  paginationItemTextColor: 'var(--vega-text-color)',
  paginationItemActiveTextColor: 'var(--vega-text-white-color)',
  emptyDataMessage: 'No data found.',
  summary: undefined,
  summaryBackgroundColor: 'var(--vega-secondary)',
  summaryTextColor: 'var(--vega-text-color)',
  summaryFirstColumnText: undefined,
})

defineExpose({ refresh: fetchData })

// State
const remoteData = ref<Row[]>([])
const loading = ref(false)
const sortBy = ref(props.sortDefaultKey)
const sortDesc = ref(props.sortDefaultDesc)
const total = ref(1)
const pageCurrent = ref(1)
const isAtLeftEdge = ref(true)
const isAtRightEdge = ref(false)

// Combined local and remote data
const combinedData = computed(() => [...props.data, ...remoteData.value])

function fetchData() {
  if (!props.remoteHandler) return

  loading.value = true

  props.remoteHandler({
    page: pageCurrent.value,
    sort_by: sortBy.value,
    sort_desc: sortDesc.value ? 1 : 0,
    ...props.filters,
  }).then(response => {
    // Allow external hook to process response
    props.responseHandler?.(response)

    remoteData.value = response.data.data
    total.value = response.data.meta.total
  }).finally(() => {
    loading.value = false
  })
}

// Toggle sorting state: asc -> desc -> none
const handleSortChange = (column: Column<Row>) => {
  const key = column.sortBy ?? column.key

  if (sortBy.value !== key) {
    sortBy.value = key
    sortDesc.value = false
  } else if (!sortDesc.value) {
    sortDesc.value = true
  } else {
    sortBy.value = ''
    sortDesc.value = false
  }

  fetchData()
}

function getRowKey(row: Row, index: number): string|number {
  const key = row[props.rowKey]

  return (typeof key === 'string' || typeof key === 'number') ? key : index
}

function getRowClass(row: Row): string | string[] | Record<string, boolean> | undefined {
  if (!props.rowClassName) {
    return undefined
  }

  return props.rowClassName(row)
}

function getSummaryValue(columnKey: string, index: number): string {
  if (!props.summary) return ''

  if (index === 0 && props.summaryFirstColumnText) {
    return props.summaryFirstColumnText
  }

  const value = props.summary[columnKey]

  if (value === undefined || value === null) return '-'

  return String(value)
}

// Returns classes for sticky columns (used in both th and td)
function getStickyClasses(column: Column<Row>) {
  return {
    'vega-table-sticky-right': column.fixed === 'right',
    'vega-table-sticky-left': column.fixed === 'left',
    'vega-table-sticky-shadow-right':
      column.fixed === 'right' &&
      !isAtRightEdge.value &&
      isFirstRightSticky(column.key as string),

    'vega-table-sticky-shadow-left':
      column.fixed === 'left' &&
      !isAtLeftEdge.value &&
      isLastLeftSticky(column.key as string),
  }
}

function getStickyStyles(column: Column<Row>) {
  return {
    minWidth: getColumnWidth(column) + 'px',
    left: column.fixed === 'left'
      ? `${leftStickyOffsets.value[column.key as string]}px`
      : undefined,
    right: column.fixed === 'right'
      ? `${rightStickyOffsets.value[column.key as string]}px`
      : undefined,
  }
}

function getColumnWidth(column: Column<Row>): number {
  return column.width || props.headerCellMinWidth
}

// Generic offset calculator for sticky columns
function calculateOffsets(columns: Column<Row>[], direction: 'left' | 'right') {
  const offsets: Record<string, number> = {}
  let cumulative = 0

  const list = direction === 'right'
    ? [...columns].reverse()
    : columns

  for (const column of list) {
    if (column.fixed === direction) {
      offsets[column.key as string] = cumulative
      cumulative += getColumnWidth(column)
    }
  }

  return offsets
}

const leftStickyOffsets = computed(() =>
  calculateOffsets(props.columns, 'left')
)

const rightStickyOffsets = computed(() =>
  calculateOffsets(props.columns, 'right')
)

// Check if column is the last left-fixed column (for shadow effect)
const isLastLeftSticky = (key: string) => {
  const leftColumns = props.columns.filter(c => c.fixed === 'left')
  return leftColumns.length > 0 && leftColumns[leftColumns.length - 1].key === key
}

// Check if column is the first right-fixed column (for shadow effect)
const isFirstRightSticky = (key: string) => {
  const rightColumns = props.columns.filter(c => c.fixed === 'right')
  return rightColumns.length > 0 && rightColumns[0].key === key
}

// Track scroll position for shadow effects on sticky columns
// Using tolerance of 1px to handle floating-point scroll precision issues
function handleScroll(event: Event) {
  const el = event.currentTarget as HTMLElement

  isAtLeftEdge.value = el.scrollLeft <= 1
  isAtRightEdge.value = el.scrollLeft + el.clientWidth >= el.scrollWidth - 1
}

watch(
  () => props.filters,
  () => {
    pageCurrent.value = 1
    fetchData()
  },
  { deep: true },
)

function init() {
  fetchData()
}

onMounted(init)

</script>

<style scoped>
.vega-table-wrapper {
  height: calc(v-bind(height) - 65px);
}

.vega-table-container {
  position: relative;
  overflow-x: auto;
  width: v-bind(width);
  height: v-bind(height);
  background-color: v-bind(bodyBackground);
  scrollbar-width: thin;

  &.scroll-locked {
    overflow: hidden;
  }
}

table {
  border-collapse: separate;
  border-spacing: 0;
  border: v-bind(border);
  width: v-bind(width);
  box-sizing: border-box;
  &.loading {
    opacity: 0.4;
  }
}

thead {
  box-sizing: border-box;
  height: v-bind(headerHeight);
}

tfoot {
  background-color: v-bind(summaryBackgroundColor);
  color: v-bind(summaryTextColor);
  box-sizing: border-box;
  position: sticky;
  bottom: 0;
}

tbody tr,
tfoot tr {
  color: v-bind(bodyTextColor);
  background-color: v-bind(bodyBackground);
  transition: background-color 0.3s ease;
  &:hover {
    background-color: v-bind(rowHoverBackgroundColor);
  }
}

th {
  color: v-bind(headerTextColor);
  background-color: v-bind(headerBackground);
  box-sizing: border-box;
  border: v-bind(cellBorder);
  padding: v-bind(headerCellPadding);
  text-align: left;
  min-width: v-bind(headerCellMinWidth);
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  &:first-child {
    padding-left: 32px;
  }
  .header-cell-container {
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: space-between;
  }
  &.vega-table-sticky-right {
    position: sticky;
    z-index: 1;
    right: 0;
  }
  &.vega-table-sticky-left {
    position: sticky;
    z-index: 1;
    left: 0;
  }
  &.vega-table-header-sticky {
    position: sticky;
    top: 0;
  }
}

td {
  box-sizing: border-box;
  border: v-bind(cellBorder);
  padding: v-bind(bodyCellPadding);
  vertical-align: top;
  text-align: left;
  &:first-child {
    padding-left: 32px;
  }
  &.vega-table-sticky-right {
    background-color: inherit;
    position: sticky;
    right: 0;
  }
  &.vega-table-sticky-left {
    background-color: inherit;
    position: sticky;
    left: 0;
  }
}

.vega-table-sticky-shadow-right::before {
  content: '';
  position: absolute;
  left: -10px;
  top: 0;
  bottom: 0;
  width: 10px;
  color: rgb(101, 101, 101);
  box-shadow: inset -10px 0 10px -10px rgba(0, 0, 0, .15);
  pointer-events: none;
  z-index: 1;
}

.vega-table-sticky-shadow-left::before {
  content: '';
  position: absolute;
  right: -10px;
  top: 0;
  bottom: 0;
  width: 10px;
  color: rgb(101, 101, 101);
  box-shadow: inset 10px 0 10px -10px rgba(0, 0, 0, .15);
  pointer-events: none;
  z-index: 1;
}

.vega-table-loading-overlay {
  inset: 0;
  position: absolute;
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  pointer-events: auto;
  z-index: 999;
}

.vega-table-no-data {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  opacity: 0.5;
}
</style>
