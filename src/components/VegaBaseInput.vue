<template>
  <div class="autocomplete">
    <input
        type="text"
        v-model="searchQuery"
        @focus="showResults = true"
        @blur="hideResults"
        class="search-input"
        placeholder="Search..."
    >
    <ul v-show="showResults" class="results-list">
      <li v-for="item in options" :key="item.value" @click="selectItem(item)">
        <slot name="item" :item="item">
          {{ item.label }}
        </slot>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';

interface Item {
  value: number;
  label: string;
}

// Разрешаем null как начальное значение для modelValue
const props = defineProps({
  options: Array as () => Item[],
  modelValue: Object as () => Item | null
});

const emit = defineEmits(['update:modelValue', 'search']);
const searchQuery = ref<string>(props.modelValue ? props.modelValue.label : '');
const showResults = ref(false);

// Наблюдаем за изменениями в modelValue
watch(() => props.modelValue, (newValue) => {
  if (newValue) {
    searchQuery.value = newValue.label;
  } else {
    searchQuery.value = '';
  }
});

// Наблюдаем за изменениями в searchQuery
watch(() => searchQuery.value, (newValue) => {
  if (newValue) {
    emit('search', newValue);
  }
});

// Обработка выбора элемента списка
function selectItem(item: Item) {
  emit('update:modelValue', item);
  searchQuery.value = item.label;
  showResults.value = false;
}

// Задержка для обработки клика на элемент списка
function hideResults() {
  setTimeout(() => {
    showResults.value = false;
  }, 200);
}
</script>

<style scoped>
.autocomplete {
  position: relative;
  width: 100%;
}

.search-input {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
}

.results-list {
  position: absolute;
  left: 0;
  top: 30px;
  width: 100%;
  background: white;
  border: 1px solid #ccc;
  list-style: none;
  margin: 0;
  padding: 0;
  max-height: 200px;
  overflow-y: auto;
}

.results-list li {
  padding: 8px;
  cursor: pointer;
}

.results-list li:hover {
  background-color: #f0f0f0;
}
</style>
