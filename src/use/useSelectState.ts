import { computed, Ref, ref } from 'vue'

// to achieve shared state between instances, we need to move the variable outside the composite function
const state: { id: string; value: Ref<Option<number | string> | string | number | null> }[] = []

export default function useSelectState(
  id: string,
  valueField: string | null = null,
  labelField: string | null = null
) {
  let storageItem = state.find((item) => item.id === id)
  if (storageItem === undefined) {
    storageItem = { id: id, value: ref(null) }
    state.push(storageItem)
  }

  const selected = storageItem.value
  const selectedText = computed(() => {
    if (selected.value === null) {
      return ''
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
    if (typeof selected.value === 'object' && valueField) {
      return selected.value[valueField]
    }

    return selected.value
  })

  const data = localStorage.getItem(id)
  if (data === null) {
    selected.value = null
  } else {
    selected.value = isJSON(data) ? JSON.parse(data) : data
  }

  function storageSave(payload: Object | string | number) {
    typeof payload === 'object'
      ? localStorage.setItem(id, JSON.stringify(payload))
      : localStorage.setItem(id, String(payload))
  }

  function storageClear() {
    localStorage.removeItem(id)
  }

  return { selected, selectedText, selectedValue, storageSave, storageClear }
}

function isJSON(payload: string) {
  try {
    JSON.parse(payload)
  } catch (e) {
    return false
  }
  return true
}

interface Option<T> {
  [key: string]: T
}
