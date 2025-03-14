import { computed, Ref, ref } from 'vue'

// to achieve shared state between instances, we need to move the variable outside the composite function
const state: { id: string; value: Ref<Option<number | string> | string | number | null | Array<string | number | Option<string | number>>> }[] = []

export default function useSelectState(
  id: string,
  valueField: string | null = null,
  labelField: string | null = null,
  defaultValue: string | null | Array<string | number | Option<string | number>> = null,
) {
  let storageItem = state.find((item) => item.id === id)
  if (storageItem === undefined) {
    storageItem = { id: id, value: ref(defaultValue) }
    state.push(storageItem)
  }

  const selected = storageItem.value
  const selectedText = computed(() => {
    if (selected.value === null) {
      return ''
    }
    if (Array.isArray(selected.value)) {
      return selected.value.map(function(item) {
        if (typeof item === 'object' && labelField) {
          return String(item[labelField])
        }
        return String(item)
      }).toString();
    }
    if (typeof selected.value === 'object' && labelField) {
      return String(selected.value[labelField])
    }

    return String(selected.value === undefined ? '' : selected.value)
  })
  const selectedValue = computed(() => {
    if (selected.value === null) {
      return null
    }
    if (Array.isArray(selected.value)) {
      return selected.value.map(item => {
        if (typeof item === 'object' && valueField) {
          return item[valueField]
        }

        return item
      })
    }
    if (typeof selected.value === 'object' && valueField) {
      return selected.value[valueField]
    }

    return selected.value
  })

  const data = localStorage.getItem(id)
  if (data === null) {
    selected.value = defaultValue
  } else {
    selected.value = isJSON(data) ? JSON.parse(data) : data
  }

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

interface Option<T> {
  [key: string]: T
}
