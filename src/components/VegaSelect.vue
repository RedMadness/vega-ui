<template>
  <div class="select-container">
    <slot name="label"></slot>
    <vega-input
      v-model="inputModel"
      :label="label"
      :placeholder="placeholderCurrent"
      :readonly="!searchable"
      :font-size="fontSize"
      :font-color="fontColor"
      :placeholder-color="placeholderColor"
      :background-color="backgroundColor"
      :hover-border-color="hoverBorderColor"
      :focus-border-color="focusBorderColor"
      :border-color="borderColor"
      :border-radius="borderRadius"
      :padding="padding"
      :width="width"
      :height="height"
      :text-align="textAlign"
      :delay-debounce="delayDebounce"
      :clearable="true"
      @click="handleInputClick"
      @focus="handleFocus"
      @blur="handleBlur"
      @clear="handleInputClear"
      @input="onSearch"
    >
      <template v-slot:clear-icon>
        <slot name="clear-icon"></slot>
      </template>
      <template v-slot:prefix>
        <slot name="prefix"></slot>
      </template>
      <template v-slot:postfix>
        <slot name="postfix">
          <VegaIconArrow :rotate="dropdownOpen ? '180deg' : '0deg'" />
        </slot>
      </template>
    </vega-input>
    <!-- dropdown -->
    <vega-dropdown
      :options="optionsList"
      :value-field="valueField"
      :label-field="labelField"
      :is-open="dropdownOpen"
      :backgroundColorDropdown="backgroundColorDropdown"
      :hover-color-dropdown="hoverColorDropdown"
      :text-color-dropdown="textColorDropdown"
      :border-color-dropdown="borderColorDropdown"
      :border-radius-dropdown="borderRadiusDropdown"
      :font-size-dropdown="fontSizeDropdown"
      :option-padding-dropdown="optionPaddingDropdown"
      :transitionDuration-dropdown="transitionDurationDropdown"
      :infinite-scroll="infiniteScroll"
      @load-more-items="loadMoreItems"
      @select="selectItem"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue'
import VegaInput from './VegaInput.vue'
import VegaDropdown from './VegaDropdown.vue'
import VegaIconArrow from './VegaIconArrow.vue'

interface ApiResponse<T> {
  data: {
    data: T[]
    meta: {
      total: number
    }
  }
}

export interface Option<T> {
  [key: string]: T
}
export interface Props<T> {
  label?: string
  searchable?: boolean
  valueField?: keyof Option<T>
  labelField?: keyof Option<T>
  placeholder?: string
  fontSize?: string
  fontColor?: string
  placeholderColor?: string
  backgroundColor?: string
  hoverBorderColor?: string
  focusBorderColor?: string
  borderColor?: string
  borderRadius?: string
  padding?: string
  width?: string
  height?: string
  textAlign?: string
  delayDebounce?: number
  isOpen?: boolean

  backgroundColorDropdown?: string
  hoverColorDropdown?: string
  textColorDropdown?: string
  borderColorDropdown?: string
  borderRadiusDropdown?: string
  fontSizeDropdown?: string
  optionPaddingDropdown?: string
  transitionDurationDropdown?: string
  infiniteScroll?: boolean

  remoteHandler?: (params: any) => Promise<ApiResponse<Option<string | number> | string | number>>
  options?: Array<Option<T> | string | number>

  modelValue?: Option<T> | string | number
}

const props = withDefaults(defineProps<Props<number | string>>(), {
  options: () => [],
  searchable: false,
  valueField: 'value',
  labelField: 'label',
  backgroundColor: 'var(--vega-secondary)',
  backgroundColorDropdown: 'var(--vega-secondary)',
  hoverColorDropdown: 'var(--vega-primary)',

  placeholder: 'Select value',
  label: '',
  modelValue: undefined,
})

const emits = defineEmits(['update:modelValue'])

const search = ref('')
const inputModel = ref<string | number | null>(null)
const isFocused = ref(false)
const selected = ref<string | number | null | Option<string | number>>(null)
const dropdownOpen = ref(false)

const loading = ref(false)
const total = ref(0)
const page = ref(1)
const perPage = ref(25)

/** The list of options passed through props. */
const optionsStatic = ref(props.options)
/** Options obtained by remote query. */
const optionsRemote = ref<(Option<string | number> | string | number)[]>([])

const placeholderCurrent = ref(props.placeholder)

const selectedText = computed(() => {
  if (selected.value === null) {
    return ''
  }
  if (typeof selected.value === 'object') {
    return String(selected.value[props.labelField])
  }

  return String(selected.value)
})

const selectedValue = computed(() => {
  if (selected.value === null) {
    return null
  }
  if (typeof selected.value === 'object') {
    return selected.value[props.valueField]
  }

  return selected.value
})

const optionsList = computed(() => {
  return [
    ...(optionsStatic.value as (Option<string | number> | string | number)[]),
    ...optionsRemote.value,
  ]
})

const handleBlur = () => {
  reset()
  updateInputModel()
  if (!inputModel.value) {
    placeholderCurrent.value = props.placeholder
  }
}

const handleFocus = () => {
  isFocused.value = true
  placeholderCurrent.value = selectedText.value || props.placeholder
  updateInputModel()
  callApi()
}

const updateInputModel = () => {
  inputModel.value = isFocused.value && props.searchable ? search.value : selectedText.value
}

function callApi() {
  if (props.remoteHandler) {
    loading.value = true
    props
      .remoteHandler({
        search: inputModel.value,
        page: page.value,
        per_page: perPage.value,
      })
      .then((response) => {
        optionsRemote.value = response.data.data || []
        total.value = response.data.meta?.total || 0
      })
      .catch((error) => {
        console.error('API call failed:', error)
      })
      .finally(() => {
        loading.value = false
      })
  }
}

const handleInputClear = () => {
  inputModel.value = ''
  placeholderCurrent.value = props.placeholder
  emits('update:modelValue', null)
}

const toggleDropdown = () => {
  dropdownOpen.value = !dropdownOpen.value
}

const handleInputClick = () => {
  toggleDropdown()
}

const selectItem = (item: Option<number | string> | string | number) => {
  selected.value = item
  emits('update:modelValue', selectedValue.value)
  reset()
}

const loadMoreItems = () => {
  if (total.value > page.value * perPage.value) {
    page.value += 1
    callApi()
  }
}

function onSearch(event: Event) {
  const element = event.target as HTMLInputElement
  search.value = element.value
}

onMounted(() => {
  inputModel.value =
    typeof props.modelValue === 'object' && props.modelValue !== null
      ? (props.modelValue[props.labelField] as string) || ''
      : `${props.modelValue || ''}`
})

function reset() {
  isFocused.value = false
  dropdownOpen.value = false
  optionsRemote.value = []
  page.value = 1
  search.value = ''
}
</script>

<style scoped>
.select-container {
  position: relative;
}
</style>
