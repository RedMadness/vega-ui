<template>
  <vega-select
    v-model="selected"
    v-bind="props"
    @clear="onClear"
    @selected="onSelect"
    @update:model-value="localStorageSave"
  >
    <template #clear-icon>
      <slot name="clear-icon"></slot>
    </template>
    <template #label v-if="$slots.label || label">
      <slot name="label"></slot>
    </template>
    <template #postfix>
      <slot name="postfix"></slot>
    </template>
    <template #prefix>
      <slot name="prefix"></slot>
    </template>
  </vega-select>
</template>

<script lang="ts" setup>
import useSelectState from '../use/useSelectState'
import VegaSelect from './VegaSelect.vue'
import { VegaSelectStorageProps } from '../props/VegaSelectStorageProps'
import { VegaSelectDefaults } from '../props/VegaSelectProps'

const props = withDefaults(defineProps<VegaSelectStorageProps>(), {
  ...VegaSelectDefaults,
  default: null,
})

const emits = defineEmits(['selected', 'clear', 'changed'])
const { selected } = useSelectState(props.storageKey, null, null, props.default)

const onClear = () => {
  emitClear()
}

function onSelect(item: Record<string, unknown> | string | number) {
  emitSelected(item)
}

function localStorageSave(
  payload:
    | Record<string, unknown>
    | string
    | number
    | null
    | undefined
    | Array<string | number | Record<string, unknown>>,
) {
  emits('changed', payload)
}

function emitSelected(payload: Record<string, unknown> | string | number) {
  emits('selected', payload)
}

function emitClear() {
  emits('clear')
}
</script>

<style scoped></style>
