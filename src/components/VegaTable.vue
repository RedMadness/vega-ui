<template>
  <div class="vega-table-wrapper">
    <div class="vega-table-container" :class="{ 'scroll-locked': loading }">
      <table :class="{ loading }">
        <thead :class="{ 'vega-table-header-sticky': headerSticky }">
          <tr>
            <th
              v-for="column in columns"
              :key="column.key"
              :style="{ minWidth: column.width ? column.width : '' }"
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
            <td v-for="column in columns" :key="column.key">
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
  width?: string
}

export interface TableProps {
  data?: Row[]
  columns: Column<Row>[]
  headerBackground?: string
  headerTextColor?: string
  headerCellPadding?: string
  headerCellMinWidth?: string
  headerSticky?: boolean
  headerHeight?: string
  width?: string
  height?: string
  border?: string
  cellBorder?: string
  bodyBackground?: string
  bodyTextColor?: string
  bodyCellPadding?: string
  rowKey?: string
  /**
   * Function to determine the CSS class of a row based on its data.
   * @param row - row data
   * @returns string | string[] | Record<string, boolean>
   */
  rowClassName?: (row: Row) => string | string[] | Record<string, boolean>
  rowHoverBackgroundColor?: string
  remoteHandler?: (params: object) => Promise<ApiResponse<Row>>
  responseHandler?: (response: ApiResponse<Row>) => void
  sortDefaultKey?: string
  sortDefaultDesc?: boolean
  filters?: Record<string, unknown>
  paginationPerPage?: number
  paginationBorderColor?: string
  paginationBackgroundColor?: string
  paginationItemBackgroundColor?: string
  paginationItemActiveBackgroundColor?: string
  paginationItemTextColor?: string
  paginationItemActiveTextColor?: string
  emptyDataMessage?: string
  summary?: Record<string, string | number>
  summaryBackgroundColor?: string
  summaryTextColor?: string
  summaryFirstColumnText?: string
}

const props = withDefaults(defineProps<TableProps>(), {
  data: () => [],
  headerBackground: 'var(--vega-primary)',
  headerTextColor: 'var(--vega-text-white-color)',
  headerCellPadding: '20px',
  headerCellMinWidth: '200px',
  headerSticky: true,
  headerHeight: 'auto',
  width: 'auto',
  height: '100%',
  border: '1px solid var(--vega-border-color)',
  cellBorder: '1px solid var(--vega-border-color)',
  bodyBackground: 'none',
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

const remoteData = ref<Row[]>([])
const loading = ref(false)
const sortBy = ref(props.sortDefaultKey)
const sortDesc = ref(props.sortDefaultDesc)
const total = ref(1)
const pageCurrent = ref(1)

const combinedData = computed(() => {
  return [
    ...props.data,
    ...remoteData.value
  ]
})

function fetchData() {
  if (!props.remoteHandler) {
    return
  }

  loading.value = true

  props.remoteHandler({
    page: pageCurrent.value,
    sort_by: sortBy.value,
    sort_desc: sortDesc.value ? 1 : 0,
    ...props.filters,
  }).then(response => {
    if (props.responseHandler) {
      props.responseHandler(response)
    }
    remoteData.value = response.data.data
    total.value = response.data.meta.total
  }).finally(() => {
    loading.value = false
  })
}

const handleSortChange = (column: Column<Row>) => {
  const prop = column.sortBy ?? column.key

  // reset sorting if the button is pressed a third time
  if (sortBy.value === prop && !sortDesc.value) {
    sortBy.value = ''
    sortDesc.value = false
  } else {
    sortBy.value = prop
    sortDesc.value = !sortDesc.value
  }

  fetchData()
}

function getRowKey(row: Row, index: number): string|number {
  const key = row[props.rowKey]

  return typeof key === 'string' || typeof key === 'number'
    ? key
    : index
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
  background-color: v-bind(headerBackground);
  color: v-bind(headerTextColor);
  box-sizing: border-box;
  height: v-bind(headerHeight);
}

tbody {
  color: v-bind(bodyTextColor);
  & tr:hover {
    background-color: v-bind(rowHoverBackgroundColor);
  }
}

tfoot {
  background-color: v-bind(summaryBackgroundColor);
  color: v-bind(summaryTextColor);
  box-sizing: border-box;
  position: sticky;
  bottom: 0;
}

.vega-table-header-sticky {
  position: sticky;
  top: 0;
}

tr {
  transition: background-color 0.3s ease; /* Плавный переход */
}

th {
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
