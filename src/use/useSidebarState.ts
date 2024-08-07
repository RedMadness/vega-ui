import { onMounted, Ref, ref, watch } from 'vue'

// to achieve shared state between instances, we need to move the variable outside the composite function
const state: { key: string; value: Ref<boolean> }[] = []

export default function useSidebarState(key: string) {
  let value = state.find((item) => item.key === key)
  if (value === undefined) {
    value = { key: key, value: ref(false) }
    state.push(value)
  }

  const show = value.value

  onMounted(() => {
    show.value = localStorage.getItem(key) === '1'
  })

  const toggle = () => {
    show.value = !show.value
  }

  watch(show, () => localStorage.setItem(key, show.value ? '1' : '0'))
  return { show, toggle }
}
