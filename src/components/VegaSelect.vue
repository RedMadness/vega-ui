<template>
  <div class="select-container">
    <slot name="label"></slot>
    <vega-input
      v-model="inputModel"
      :label="label"
      :placeholder="dynamicPlaceholder"
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
      @clickWrapper="handleInputClick"
      @focus="handleFocus"
      @blur="handleBlur"
      @clear="handleInputClear"
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
      :items="adaptedOptions"
      :value-field="valueField"
      :label-field="labelField"
      :isOpen="dropdownOpen"
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
      @close="closeDropdown"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, watch, onMounted } from 'vue'
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
  staticOptions?: Array<Option<T> | string | number>
}

const props = withDefaults(defineProps<Props<number | string>>(), {
  searchable: false,
  valueField: 'value',
  labelField: 'label',

  placeholder: 'Select value',
  label: '',
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

const { staticOptions } = props

const dynamicPlaceholder = ref(props.placeholder)

const loadOptions = () => {
  if (staticOptions && staticOptions.length > 0) {
    options.value = staticOptions.map(createOption)
  }
}

const createOption = (
  option: Option<string | number> | number | string
): Option<string | number> => {
  if (typeof option === 'object') {
    return {
      [props.valueField]: option[props.valueField] ?? '[Undefined value]',
      [props.labelField]: option[props.labelField] ?? '[Undefined label]',
      isPrimitive: 0,
    }
  } else {
    return { value: option, label: String(option), isPrimitive: 1 }
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

const handleInputClear = () => {
  inputModel.value = ''
  displayValue.value = ''
  dynamicPlaceholder.value = props.placeholder
  emits('update:modelValue', '')
}

const closeDropdown = () => {
  dropdownOpen.value = false
  options.value = []
  loadOptions()
}

const toggleDropdown = () => {
  dropdownOpen.value = !dropdownOpen.value
}

const handleFocus = () => {
  isFocused.value = true
  const previousValue = inputModel.value
  dynamicPlaceholder.value = displayValue.value || props.placeholder
  updateInputModel()
  if (inputModel.value === previousValue) {
    callApi()
  }
}

const handleBlur = () => {
  isFocused.value = false
  dropdownOpen.value = false
  updateInputModel()
  if (!inputModel.value) {
    dynamicPlaceholder.value = props.placeholder
  }
}

const handleInputClick = () => {
  toggleDropdown()
}

const selectItem = (item: Option<number | string> & { isPrimitive: number }) => {
  selected.value = item.value
  displayValue.value = `${item[props.labelField]}`

  if (item.isPrimitive === 1) {
    emits('update:modelValue', item.value)
  } else {
    emits('update:modelValue', item)
  }

  if (props.searchable) {
    searchQuery.value = ''
  }
  handleBlur()
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
  if (
    isFocused.value &&
    props.searchable &&
    newVal !== oldVal &&
    (!staticOptions || staticOptions.length === 0)
  ) {
    options.value = []
    page.value = 1
    callApi()
  }
})

watch([() => props.staticOptions, () => props.remoteHandler], loadOptions)

onMounted(loadOptions)
</script>

<style scoped>
.select-container {
  position: relative;
}
</style>
