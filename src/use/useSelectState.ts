import { computed, Ref, ref } from 'vue'

// to achieve shared state between instances, we need to move the variable outside the composite function
const state = new Map<
  string,
  Ref<
    | Record<string, unknown>
    | string
    | number
    | null
    | Array<string | number | Record<string, unknown>>
  >
>()

export default function useSelectState(
  id: string,
  valueField: string | null = null,
  labelField: string | null = null,
  defaultValue: string | null | Array<string | number | Record<string, unknown>> = null,
) {
  let currentState = state.get(id)

  if (!currentState) {
    const initial = localStorage.getItem(id)

    currentState = ref(
      initial === null
        ? defaultValue
        : (isJSON(initial) ? JSON.parse(initial) : initial)
    )

    state.set(id, currentState)
  }

  if (!currentState) {
    throw new Error(`State for ${id} not initialized`)
  }

  const selected = computed({
    get() {
      return currentState.value ?? null
    },
    set(value): void {
      if (value === null || value === undefined) {
        currentState.value = null
        storageClear()
        return
      }
      currentState.value = value
      storageSave(value)
    }
  })

  const selectedText = computed(() => {
    const value = selected.value
    if (value === null) {
      return ''
    }

    if (Array.isArray(value)) {
      return value
        .map(function (item) {
          if (typeof item === 'object' && labelField) {
            return String(item[labelField])
          }
          return String(item)
        })
        .toString()
    }
    if (typeof value === 'object' && labelField) {
      return String(value[labelField])
    }

    return String(value === undefined ? '' : value)
  })

  const selectedValue = computed(() => {
    const value = selected.value

    if (value === null) {
      return null
    }
    if (Array.isArray(value)) {
      return value.map((item) => {
        if (typeof item === 'object' && valueField) {
          return item[valueField]
        }

        return item
      })
    }
    if (typeof value === 'object' && valueField) {
      return value[valueField]
    }

    return value
  })

  function storageSave(payload: object | string | number) {
    if (typeof payload === 'object' || Array.isArray(payload)) {
      localStorage.setItem(id, JSON.stringify(payload))
    } else {
      localStorage.setItem(id, String(payload))
    }
  }

  function storageClear() {
    localStorage.removeItem(id)
  }

  return { selected, selectedText, selectedValue, storageSave, storageClear }
}

function isJSON(payload: string) {
  try {
    JSON.parse(payload)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (e) {
    return false
  }
  return true
}
