# VegaCheckbox
Customizable Checkbox Input Component

This component provides a customizable checkbox input with support for custom colors, size, label positioning, and more. It works seamlessly with `v-model` and is styled using CSS variables for easy theming.

## Basic Example

```vue
<template>
  <vega-checkbox
    v-model="isChecked"
    label="I agree to the terms"
    checked-color="var(--vp-custom-block-success-bg)"
    border-color="var(--vega-gray)"
    checkbox-size="20px"
    label-position="right"
    label-gap="10px"
  />
</template>

<script setup>
import { ref } from 'vue'
import VegaCheckbox from 'vega-ui'

const isChecked = ref(false)
</script>
```

## Props

| Prop name         | Type                        | Default                    | Description                                                                          |
|-------------------|-----------------------------|----------------------------|--------------------------------------------------------------------------------------|
| `model-value`     | boolean \| string \| number | —                          | Current value of the checkbox. Used with `v-model`.                                  |
| `checked-value`   | boolean \| string \| number | `true`                     | Value considered as "checked".                                                       |
| `unchecked-value` | boolean \| string \| number | `false`                    | Value considered as "unchecked".                                                     |
| `checked-color`   | string                      | `var(--vega-primary)`      | Background and border color when the checkbox is checked.                            |
| `border-color`    | string                      | `var(--vega-border-color)` | Border color in unchecked state.                                                     |
| `label`           | string                      | `""`                       | Label text displayed next to the checkbox.                                           |
| `label-position`  | string                      | `"right"`                  | Position of the label relative to the checkbox: `top`, `bottom`, `left`, or `right`. |
| `label-gap`       | string                      | `"6px"`                    | Gap between the checkbox and the label.                                              |
| `checkbox-size`   | string                      | `"16px"`                   | Size of the checkbox.                                                                |
| `readonly`        | boolean                     | `false`                    | If `true`, disables interaction with the checkbox.                                   |

---

## Events

| Event Name           | Description                                      |
|----------------------|--------------------------------------------------|
| update:modelValue    | Emitted when the checkbox value changes.         |

---

## Slots

The component does not use any named slots directly, but allows customization through props and CSS.