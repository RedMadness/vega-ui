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
    <template #label>
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
import useSelectState from '../use/useSelectState.ts'
import VegaSelect from './VegaSelect.vue'
import { Option, Props, VegaSelectProps } from '../props/VegaSelectProps.ts'

const props = withDefaults(
  defineProps<Props<number | string> & { storageKey: string }>(),
  VegaSelectProps,
)

const emits = defineEmits(['selected', 'clear', 'changed'])
const storage = useSelectState(props.storageKey)
const selected = storage.selected

const onClear = () => {
  localStorageClear()
  emitClear()
}

function onSelect(item: Option<number | string> | string | number) {
  emitSelected(item)
}

function localStorageSave(payload: Option<number | string | null> | string | number | null) {
  if (payload) {
    storage.storageSave(payload)
  }
  emits('changed', payload)
}

function localStorageClear() {
  storage.storageClear()
}

function emitSelected(payload: Option<number | string> | string | number) {
  emits('selected', payload)
}

function emitClear() {
  emits('clear')
}
</script>

<style scoped></style>
