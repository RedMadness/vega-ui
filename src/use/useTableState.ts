import { ref, Ref } from 'vue'
import { Column } from '../components/VegaTable.vue'
import useSelectState from './useSelectState'

type TableState = {
  id: string
  value: Ref<Record<string, Record<string, unknown> | null>>
}

const state: TableState[] = []

export default function useTableState(
  id: string,
  columns: Column<Record<string, unknown>>[]
) {
  let tableState = state.find((item) => item.id === id)

  if (!tableState) {
    const initial: Record<string, Record<string, unknown> | null> = {}

    columns
      .filter(c => c.filter?.key)
      .forEach(column => {
        const key = column.filter!.key
        const value = useSelectState(`${id}-${key}`).selected.value

        if (
          value !== null &&
          typeof value === 'object' &&
          !Array.isArray(value)
        ) {
          initial[key] = value
        }
      })

    tableState = {
      id,
      value: ref(initial)
    }

    state.push(tableState)
  }

  const tableFilters = tableState.value

  function storageSave() {
    Object
      .entries(tableFilters.value)
      .forEach(([key, value]) => {
        if (value === null) {
          useSelectState(`${id}-${key}`).storageClear()
          return
        }

        useSelectState(`${id}-${key}`).storageSave(value)
      })
  }

  return { tableFilters, storageSave }
}