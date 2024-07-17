import { onMounted, Ref, ref } from 'vue'

// to achieve shared state between instances, we need to move the variable outside the composite function
const state: { key: string; value: Ref<Option<number | string> | string | number | null> }[] = []

export default function useSelectState(key: string) {
  let storageItem = state.find((item) => item.key === key)
  if (storageItem === undefined) {
    storageItem = { key: key, value: ref(null) }
    state.push(storageItem)
  }

  const storageSelected = storageItem.value

  onMounted(() => {
    const data = localStorage.getItem(key)
    if (data === null) {
      storageSelected.value = null
    } else {
      storageSelected.value = isJSON(data) ? JSON.parse(data) : data
    }
  })

  function storageSave(payload: Object | string | number) {
    typeof payload === 'object'
      ? localStorage.setItem(key, JSON.stringify(payload))
      : localStorage.setItem(key, String(payload))
  }

  function storageClear() {
    localStorage.removeItem(key)
  }

  return { storageSelected, storageSave, storageClear }
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
