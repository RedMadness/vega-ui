import { Ref, ref } from 'vue'

// to achieve shared state between instances, we need to move the variable outside the composite function
const state: { key: string, value: Ref<boolean> }[] = []

export default function useSidebarState(key: string) {
  let value = state.find(item => item.key === key)
  if (value === undefined) {
    value = { key: key, value: ref(localStorage.getItem(key) === '1')}
    state.push(value)
  }

  const show = value.value
  const toggle = () => {
    show.value = !show.value
    localStorage.setItem(key, show.value ? '1' : '0')
  }
  return { show, toggle }
}