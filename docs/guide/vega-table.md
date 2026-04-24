# VegaTable
Customizable Data Table Component with Pagination, Sorting, and Remote Data Support

This component provides a fully-featured data table with support for local or remote data, sorting, pagination, conditional row styling, summary rows, and extensive theming via CSS variables.

## Basic Example

```vue
<template>
  <vega-table
    :columns="columns"
    :remote-handler="fetchUsers"
    :row-class-name="getRowClass"
    :summary="summaryData"
    row-key="id"
    pagination-per-page="25"
  >
    <!-- Custom rendering for the "email" column -->
    <template #column-email="{ row }">
      <a :href="`mailto:${row.email}`">{{ row.email }}</a>
    </template>
  </vega-table>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import VegaTable, { Column } from 'vega-ui'

type User = {
  id: number
  name: string
  email: string
  status: 'active' | 'inactive'
  balance: number
}

const columns: Column<User>[] = [
  { key: 'name', label: 'Name', sortable: true },
  { key: 'email', label: 'Email', sortable: true },
  { key: 'status', label: 'Status' },
  { key: 'balance', label: 'Balance', sortable: true, width: 120 },
]

const fetchUsers = async (params: object) => {
  const response = await api.get('/users', { params })
  return response.data // ApiResponse<User>
}

const getRowClass = (row: User) => {
  if (row.status === 'inactive') return 'row-disabled'
  if (row.balance < 0) return 'row-negative'
  return ''
}

const summaryData = {
  balance: '12,450.00', // keyed by column.key
}
</script>

<style scoped>
:deep(.row-disabled) {
  opacity: 0.6;
}
:deep(.row-negative) {
  color: var(--vega-error);
  font-weight: 600;
}
</style>
```

## Props

| Prop name                             | Type                                                          | Default                              | Description                                                                                                                           |
|---------------------------------------|---------------------------------------------------------------|--------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------|
| `data`                                | `Row[]`                                                       | `[]`                                 | Local data array to display. If `remoteHandler` is provided, this data is merged with remote data.                                    |
| `columns`                             | `Column<Row>[]`                                               | —                                    | **Required.** Array of column definitions. See [Column Interface](#column-interface) below.                                           |
| `headerBackground`                    | `string`                                                      | `var(--vega-primary)`                | Background color of the table header.                                                                                                 |
| `headerTextColor`                     | `string`                                                      | `var(--vega-text-white-color)`       | Text color of the table header.                                                                                                       |
| `headerCellPadding`                   | `string`                                                      | `"20px"`                             | Padding inside header cells.                                                                                                          |
| `headerCellMinWidth`                  | `number`                                                      | `"200"`                              | Minimum width of header cells.                                                                                                        |
| `headerSticky`                        | `boolean`                                                     | `true`                               | If `true`, the header sticks to the top of the container on scroll.                                                                   |
| `headerHeight`                        | `string`                                                      | `"auto"`                             | Height of the header row.                                                                                                             |
| `width`                               | `string`                                                      | `"auto"`                             | Width of the table container.                                                                                                         |
| `height`                              | `string`                                                      | `"100%"`                             | Height of the table container. Note: wrapper height is calculated as `height - 65px` to account for pagination.                       |
| `border`                              | `string`                                                      | `1px solid var(--vega-border-color)` | Border style for the outer table container.                                                                                           |
| `cellBorder`                          | `string`                                                      | `1px solid var(--vega-border-color)` | Border style for individual cells (`th`, `td`).                                                                                       |
| `bodyBackground`                      | `string`                                                      | `"var(--vega-secondary)"`            | Background color of the table body (`tbody`).                                                                                         |
| `bodyTextColor`                       | `string`                                                      | `var(--vega-text-color)`             | Text color of the table body.                                                                                                         |
| `bodyCellPadding`                     | `string`                                                      | `"20px"`                             | Padding inside body cells.                                                                                                            |
| `rowKey`                              | `string`                                                      | `"id"`                               | Property name to use as unique key for rows. Falls back to array index if not found or not primitive.                                 |
| `rowClassName`                        | `(row: Row) => string \| string[] \| Record<string, boolean>` | `undefined`                          | Function that returns CSS class(es) for a row based on its data. Useful for conditional highlighting.                                 |
| `rowHoverBackgroundColor`             | `string`                                                      | `var(--vega-border-color)`           | Background color applied to a row on hover.                                                                                           |
| `remoteHandler`                       | `(params: object) => Promise<ApiResponse<Row>>`               | `undefined`                          | **For remote data.** Function that fetches data from API. Receives pagination, sorting, and filters as params.                        |
| `responseHandler`                     | `(response: ApiResponse<Row>) => void`                        | `undefined`                          | Callback executed after successful remote fetch, before data is assigned. Useful for logging or side-effects.                         |
| `sortDefaultKey`                      | `string`                                                      | `undefined`                          | Column key to sort by on initial load.                                                                                                |
| `sortDefaultDesc`                     | `boolean`                                                     | `false`                              | If `true`, default sort order is descending.                                                                                          |
| `filters`                             | `Record<string, unknown>`                                     | `undefined`                          | Additional filters to send with remote requests. Changing filters resets pagination to page 1.                                        |
| `paginationPerPage`                   | `number`                                                      | `25`                                 | Number of items per page in pagination.                                                                                               |
| `paginationBorderColor`               | `string`                                                      | `var(--vega-border-color)`           | Border color of pagination buttons.                                                                                                   |
| `paginationBackgroundColor`           | `string`                                                      | `var(--vega-secondary)`              | Background color of the pagination container.                                                                                         |
| `paginationItemBackgroundColor`       | `string`                                                      | `var(--vega-border-color)`           | Background color of inactive pagination buttons.                                                                                      |
| `paginationItemActiveBackgroundColor` | `string`                                                      | `var(--vega-primary)`                | Background color of the active/current page button.                                                                                   |
| `paginationItemTextColor`             | `string`                                                      | `var(--vega-text-color)`             | Text color of inactive pagination buttons.                                                                                            |
| `paginationItemActiveTextColor`       | `string`                                                      | `var(--vega-text-white-color)`       | Text color of the active page button.                                                                                                 |
| `emptyDataMessage`                    | `string`                                                      | `"No data found."`                   | Message displayed when table has no data and is not loading.                                                                          |
| `summary`                             | `Record<string, string \| number>`                            | `undefined`                          | Object with summary values. Keys must match `column.key`. Values are displayed in the footer row.                                     |
| `summaryBackgroundColor`              | `string`                                                      | `var(--vega-secondary)`              | Background color of the summary/footer row.                                                                                           |
| `summaryTextColor`                    | `string`                                                      | `var(--vega-text-color)`             | Text color of the summary/footer row.                                                                                                 |
| `summaryFirstColumnText`              | `string`                                                      | `undefined`                          | Custom text for the first column of the summary row (e.g., "Total:", "Sum:"). Overrides value from `summary` object for first column. |

# Column Interface

```ts
export interface Column<T> {
  key: keyof T             // Unique identifier for the column, used for sorting and data access
  label: string            // Text displayed in the header cell
  sortable?: boolean       // If true, shows sort icon and enables sorting by this column
  sortBy?: string          // Optional custom key to use for sorting (e.g., API field name)
  width?: number           // Optional CSS width value for the column in px
  fixed?: 'left' | 'right' // Fixes the column to the left or right side of the table.
}
```

# Slots

| Slot Name              | Slot Props     | Description                                                                                                                                              |
|------------------------|----------------|----------------------------------------------------------------------------------------------------------------------------------------------------------|
| `column-${column.key}` | `{ row: Row }` | Custom content for a specific column cell. Use the column's `key` to name the slot (e.g., `#column-email`). The `row` object is provided as a slot prop. |

# Exposed Methods

| Method    | Signature    | Description                                                                             |
|-----------|--------------|-----------------------------------------------------------------------------------------|
| `refresh` | `() => void` | Manually triggers data reload via `remoteHandler`. Useful for external refresh buttons. |

