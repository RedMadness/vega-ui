<template>
  <div class="select-container">
    <slot name="label"></slot>
    <vega-input
      v-model="inputModel"
      label="label"
      :placeholder="placeholder"
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
      @clickWrapper="handleInputClick"
      @focus="handleFocus"
      @blur="handleBlur"
    >
      <template v-slot:prefix>
        <slot name="prefix"></slot>
      </template>
      <template v-slot:postfix>
        <slot name="postfix"></slot>
      </template>
    </vega-input>
    <!-- dropdown -->
    <!-- TODO add props for dropdown from select -->
    <vega-dropdown
      :items="adaptedOptions"
      :isOpen="dropdownOpen"
      :backgroundColorDropdown="backgroundColorDropdown"
      :hover-color-dropdown="hoverColorDropdown"
      @load-more-items="loadMoreItems"
      @select="selectItem"
      @close="closeDropdown"
      :value-field="valueField"
      :label-field="labelField"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, watch } from 'vue'
import VegaInput from './VegaInput.vue'
import VegaDropdown from './VegaDropdown.vue'

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

  remoteHandler?: (params: any) => Promise<ApiResponse<Option<string | number> | string | number>>
}

const props = withDefaults(defineProps<Props<number | string>>(), {
  searchable: false,
  valueField: 'value',
  labelField: 'label',

  placeholder: 'select',
})

const emits = defineEmits(['update:modelValue'])

const searchQuery = ref('')
const displayValue = ref('')
const inputModel = ref('')
const isFocused = ref(false)
const selected = ref<number | string | null>(null)
const dropdownOpen = ref(false)

const loading = ref(false)
const total = ref(0)
const page = ref(1)
const perPage = ref(25)

const options = ref<(Option<string | number> | string | number)[]>([])

const createOption = (option: Option<string | number> | number | string) => {
  if (typeof option === 'object') {
    return {
      [props.valueField]: option[props.valueField] ?? '[Undefined value]',
      [props.labelField]: option[props.labelField] ?? '[Undefined label]',
    }
  } else {
    return { value: option, label: String(option) }
  }
}

const adaptedOptions = computed(() => options.value.map(createOption))

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
        const newOptions = response.data.data ?? []
        options.value = [...options.value, ...newOptions]

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

const updateInputModel = () => {
  inputModel.value = isFocused.value && props.searchable ? searchQuery.value : displayValue.value
}

const closeDropdown = () => {
  dropdownOpen.value = false
  options.value = []
}

const toggleDropdown = () => {
  dropdownOpen.value = !dropdownOpen.value
}

const handleFocus = () => {
  isFocused.value = true
  const previousValue = inputModel.value
  updateInputModel()
  if (inputModel.value === previousValue) {
    callApi()
  }
}

const handleBlur = () => {
  isFocused.value = false
  dropdownOpen.value = false
  updateInputModel()
  if (!searchQuery.value || !props.searchable) {
    inputModel.value = displayValue.value
  }
}

const handleInputClick = () => {
  toggleDropdown()
}

const selectItem = (item: Option<number | string>) => {
  selected.value = item[props.valueField]
  displayValue.value = `${item[props.labelField]}`

  if (props.searchable) {
    searchQuery.value = ''
  }
  handleBlur()
  emits('update:modelValue', item)
}

const loadMoreItems = () => {
  if (total.value > page.value * perPage.value) {
    page.value += 1
    callApi()
  }
}

watch(searchQuery, (newVal) => {
  if (isFocused.value && props.searchable) {
    inputModel.value = newVal
  }
})

watch(inputModel, (newVal, oldVal) => {
  if (isFocused.value && props.searchable && newVal !== oldVal) {
    options.value = []
    page.value = 1
    callApi()
  }
})
</script>

<style scoped>
.select-container {
  position: relative;
}
</style>
