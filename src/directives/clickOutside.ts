import { DirectiveBinding } from 'vue'

interface IHTMLElementClickOutside extends HTMLElement {
  clickOutsideEvent?(event: MouseEvent): void
}

const vClickOutside = {
  beforeMount(el: IHTMLElementClickOutside, binding: DirectiveBinding) {
    el.clickOutsideEvent = (event: Event) => {
      const target = event.target as HTMLElement
      if (el !== target && !el.contains(target)) {
        binding.value(event)
      }
    }
    document.body.addEventListener('click', el.clickOutsideEvent)
  },
  unmounted(el: IHTMLElementClickOutside) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    document.body.removeEventListener('click', el.clickOutsideEvent)
  },
}

export default vClickOutside
