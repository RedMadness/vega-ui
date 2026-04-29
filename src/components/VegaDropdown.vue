<template>
  <div v-click-outside="onClickOutside">
    <div
      ref="vega-dropdown-trigger"
      @mousedown="toggleOpenState"
      @focusin="open"
      @keydown="startSearch"
      @keydown.tab="close"
      @keydown.esc="close"
      @keydown.enter="onEnterPressed"
      @keydown.up.prevent="navigateOptions('up')"
      @keydown.down.prevent="navigateOptions('down')"
    >
      <slot name="trigger" />
    </div>
    <teleport to="body">
      <div
        ref="dropdown"
        class="dropdown"
        v-if="isOpen && !forceHided"
        :class="{ open: isOpen }"
        :style="floatingStyles"
        tabindex="-1"
        @keydown.tab="close"
        @keydown.esc="close"
      >
        <!-- SEARCH -->
        <div v-if="showSearch" class="vega-dropdown-search">
          <vega-input
            v-model="search"
            clearable
            @clear="search = ''"
            padding="0 10px"
            :background-color="backgroundColor"
            :font-color="textColor"
            :border-color="'none'"
            :hover-border-color="'none'"
            :focus-border-color="'none'"
          />
        </div>

        <!-- SELECTED -->
        <div v-if="showSelected && model" class="vega-dropdown-selected">
          <span class="text">{{ selectedValueLabel }}</span>
          <div class="clear-icon" @click="onClear">&#10005;</div>
        </div>

        <!-- OPTIONS -->
        <div class="vega-dropdown-options" @scroll="handleScroll">
          <div
            v-for="(option, index) in optionsList"
            :key="getOptionValue(option)"
            class="dropdown-item"
            :class="{ selected: checkSelected(option), highlighted: index === highlightedIndex }"
            @click="onSelect(option)"
          >
            <slot name="option" :option="option">
              <div>
                <vega-tooltip v-if="tooltipField" :text="getOptionTooltip(option)">
                  {{ getOptionText(option) }}
                </vega-tooltip>
                <template v-else>
                  {{ getOptionText(option) }}
                </template>
              </div>
            </slot>
            <vega-icon-check
              v-if="checkSelected(option)"
              class="check-icon"
              :color="itemSelectedColor"
            />
          </div>
          <div ref="loaderRef" />
          <div v-if="loading && isOpen" class="loading">
            <vega-loading :scale="0.6" />
          </div>
          <div v-if="!optionsList.length && !loading && isOpen" class="dropdown-no-items">
            {{ noOptionsMessage }}
          </div>
        </div>
      </div>
    </teleport>
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, ref, useTemplateRef, watch } from 'vue'
import VegaLoading from './VegaLoading.vue'
import VegaTooltip from './VegaTooltip.vue'
import vClickOutside from '../directives/clickOutside'
import VegaIconCheck from './VegaIconCheck.vue'
import { VegaDropdownDefaults, VegaDropdownProps } from '../props/VegaDropdownProps'
import { Option } from '../props/VegaSelectProps'
import { ApiResponse } from '../props/ApiResponse'
import { autoUpdate, flip, offset, shift, useFloating } from '@floating-ui/vue'
import VegaInput from './VegaInput.vue'

const props = withDefaults(defineProps<VegaDropdownProps<number | string>>(), VegaDropdownDefaults)

const emit = defineEmits(['open', 'select', 'close', 'clear'])
const model = defineModel<
  | null
  | undefined
  | string
  | number
  | Option<string | number>
  | Array<null | undefined | string | number | Option<string | number>>
  | Record<string, unknown>
>()

const dropdown = ref<HTMLElement | null>(null)
const trigger = useTemplateRef('vega-dropdown-trigger')
const { floatingStyles } = useFloating(trigger, dropdown, {
  placement: props.placement,
  whileElementsMounted: autoUpdate,
  middleware: [
    offset(props.offsetTop),
    shift(),
    flip(),
  ]
});

const search = ref('')
const loading = ref(false)
const reachedBottom = ref(false)
const reachedTop = ref(false)
const total = ref(0)
const page = ref(1)
const perPage = ref(25)
const isOpen = ref(false)
const highlightedIndex = ref(-1)

/** Is it possible to download additional options from the server? */
const hasNextPage = computed(() => optionsRemote.value?.length < total.value)

/** Options obtained by remote query. */
const optionsRemote = ref<(Option<string | number> | string | number)[]>([])

/** Final list of options */
const optionsList = computed(() => {
  return [
    ...(props.options as (Option<string | number> | string | number)[]),
    ...optionsRemote.value,
  ]
})

const forceHided = computed(() => {
  if (props.hideIfEmpty && optionsList.value.length === 0 && isOpen.value) {
    return true
  }
  return false
})

const selectedValueLabel = computed(() => {
  if (!model.value || Array.isArray(model.value))
    return '???'

  return getOptionText(model.value)
})

function toggleOpenState() {
  if (isOpen.value) {
    close()
  } else {
    open()
  }
}

function open() {
  if (isOpen.value === false && !props.disabled) {
    highlightedIndex.value = -1
    isOpen.value = true
    callApi()
    emit('open')
  }
}

function onSelect(item: Option<number | string> | string | number) {
  emit('select', item)
  if (props.closeOnSelect) {
    close()
  }
}

function onClear() {
  emit('clear')
}

function onClickOutside(event: MouseEvent)
{
  const target = event.target as HTMLElement

  // ignore click within teleported dropdown
  if (dropdown.value?.contains(target)) {
    return
  }

  if (isOpen.value === true) {
    close()
  }
}

function close() {
  if (isOpen.value === true) {
    isOpen.value = false
    resetRemote()
    emit('close')
  }
}

function resetRemote() {
  optionsRemote.value = []
  page.value = 1
}

const handleScroll = (event: Event) => {
  if (!props.infiniteScroll) return

  const target = event.target as HTMLElement

  const { scrollTop, clientHeight, scrollHeight } = target as HTMLElement
  // handleUpperBoundary(scrollTop)
  handleLowerBoundary(target)

  if (scrollTop > 0 && scrollTop + clientHeight < scrollHeight - 10) {
    resetScrollState()
  }
}

async function handleLowerBoundary(target: HTMLElement) {
  const { scrollTop, clientHeight, scrollHeight } = target

  /** @see https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollHeight#determine_if_an_element_has_been_totally_scrolled */
  const isBottomReached = Math.abs(scrollHeight - clientHeight - scrollTop) <= 1

  if (!isBottomReached || loading.value || reachedBottom.value) return
  reachedBottom.value = true

  if (hasNextPage.value && isOpen.value) {
    loading.value = true
    page.value++
    const scrollPosition = target.scrollTop
    await callApi()
    target.scrollTop = scrollPosition
  }
}

// const handleUpperBoundary = (scrollTop: number) => {
//   if (scrollTop !== 0 || loading.value || reachedTop.value) return
//
//   reachedTop.value = true
// }

function resetScrollState() {
  reachedBottom.value = reachedTop.value = false
}

function getOptionValue(option: Option<number | string> | string | number | Record<string, unknown>) {
  if (typeof option === 'object') {
    return option[props.valueField] as string
  }

  return option
}

function getOptionText(option: Option<number | string> | string | number | Record<string, unknown>) {
  if (typeof option === 'object') {
    return option[props.labelField]
  }

  return option
}

function getOptionTooltip(option: Option<number | string> | string | number) {
  if (typeof option === 'object' && props.tooltipField) {
    return String(option[props.tooltipField])
  }

  return ''
}

function checkSelected(option: Option<number | string> | string | number) {
  if (model.value === null || model.value === undefined) {
    return false
  }

  if (!Array.isArray(model.value)) {
    return getOptionValue(option) === getOptionValue(model.value)
  }

  let selected = false
  for (const modelItem of model.value) {
    if (modelItem === null || modelItem === undefined) {
      continue
    }

    if (getOptionValue(option) === getOptionValue(modelItem)) {
      selected = true
      break
    }
  }

  return selected
}

async function callApi() {
  if (props.remoteHandler) {
    loading.value = true

    await props
      .remoteHandler({
        page: page.value,
        per_page: perPage.value,
        search: search.value,
        ...props.filters,
      })
      .then((response) => {
        if (isOpen.value) {
          const data = transformResponse(response)
          optionsRemote.value = [...optionsRemote.value, ...data]
          total.value = response.data.meta?.total || 0
          highlightedIndex.value = -1
        }
      })
      .catch((error) => {
        console.error('API call failed:', error)
      })
      .finally(() => {
        loading.value = false
      })
  }
}

function transformResponse(response: ApiResponse<string | number | Option<string | number>>) {
  if (props.responseHandler) {
    return props.responseHandler(response)
  }
  return response.data.data || []
}

function navigateOptions(direction: 'up' | 'down') {
  if (!isOpen.value) return

  if (direction === 'up' && highlightedIndex.value > 0) {
    highlightedIndex.value--
  } else if (direction === 'down' && highlightedIndex.value < optionsList.value.length - 1) {
    highlightedIndex.value++
  }

  nextTick(() => {
    if (dropdown.value) {
      const highlightedElement = dropdown.value.querySelector('.highlighted') as HTMLElement
      if (highlightedElement) {
        highlightedElement.scrollIntoView({ block: 'nearest' })
      }
    }
  })
}

function onEnterPressed() {
  if (
    isOpen.value &&
    highlightedIndex.value >= 0 &&
    highlightedIndex.value < optionsList.value.length
  ) {
    onSelect(optionsList.value[highlightedIndex.value])
  } else {
    open()
  }
}

function startSearch(event: KeyboardEvent) {
  if (event.code !== 'Tab' && !isOpen.value) {
    open()
  }
}

watch(
  () => props.filters,
  () => {
    resetRemote()
    callApi()
  },
)

watch(
  () => search.value,
  () => {
    resetRemote()
    callApi()
  },
)
</script>

<style scoped>
.dropdown {
  display: flex;
  flex-direction: column;
  gap: 8px;
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.15);
  border: v-bind(borderColor) 1px solid;
  border-radius: v-bind(borderRadius);
  max-width: v-bind(maxWidth);
  min-width: v-bind(minWidth);
  z-index: v-bind(zIndex);
  box-sizing: border-box;
  opacity: 0;
  transition: opacity v-bind(transitionDuration) ease-in-out;
  color: v-bind(textColor);
  font-size: v-bind(fontSize);
  background-color: v-bind(wrapperBackgroundColor);
  padding: v-bind(wrapperPadding);
}

.vega-dropdown-selected {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: v-bind(itemSelectedColor);
  border-radius: 4px;
  padding: 2px 6px;
  .text {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: var(--vega-text-white-color);
  }
  .clear-icon {
    cursor: pointer;
    color: var(--vega-text-white-color);
  }
}

.vega-dropdown-options {
  box-sizing: border-box;
  background-color: v-bind(backgroundColor);

  max-height: v-bind(maxHeight + 'px');
  overflow: auto;
  scrollbar-color: v-bind(scrollbarColor) v-bind(backgroundColor);
  scrollbar-width: thin;
}

.dropdown-item {
  padding: v-bind(optionPadding);
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  &.selected {
    color: v-bind(itemSelectedColor);
  }
  &.highlighted {
    background-color: v-bind(hoverColor);
    color: v-bind(hoverTextColor);
  }
}

.check-icon {
  height: 14px;
  width: 14px;
}

.dropdown-no-items {
  padding: v-bind(optionPadding);
  cursor: pointer;
  background-color: v-bind(backgroundColor);
  text-align: center;
}

.dropdown-item:hover {
  background-color: v-bind(hoverColor);
  color: v-bind(hoverTextColor);
}

.dropdown.open {
  opacity: 1;
}

.loading {
  background-color: v-bind(backgroundColor);
  display: flex;
  justify-content: center;
  padding: 6px 0;
}
</style>
