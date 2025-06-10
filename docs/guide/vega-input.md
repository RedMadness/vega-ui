# VegaInput
Customizable Input Component.
This component provides a versatile input field with slots for labels and optional prefix or postfix content. It supports various styling options through props like font size, color, placeholder attributes, and more.
By default, it uses a text input type, but you can specify other types as needed. The component also includes a debounce mechanism on input to limit the frequency of events, with a default delay of 300 milliseconds.

Simple example:
```vue
<vega-input
  placeholder="Placeholder"
  label="label"
  background-color="var(--vp-custom-block-info-bg)"
  placeholder-color="gray"
  :delay-debounce="800"
  width="420px"
/>

<script setup>
  import { VegaInput } from 'vega-ui'
</script>

```

Code above will give you a following result:

<div style="height: 80px">
  <vega-input
      placeholder="Placeholder"
      label="label"
      background-color="var(--vp-custom-block-info-bg)"
      placeholder-color="gray"
      :delay-debounce="800"
      width="420px"
    />
</div>

### Props

Here are the props available for the component. Each prop allows you to customize the input field in various ways, enhancing its functionality and style.

| Prop name            | Type                       | Default                      | Description                                                                                     |
|----------------------|----------------------------|------------------------------|-------------------------------------------------------------------------------------------------|
| `background-color`   | `string`                   | `"none"`                     | Background color of the input.                                                                  |
| `border-color`       | `string`                   | `"var(--vega-border-color)"` | Color of the input border.                                                                      |
| `border-radius`      | `string`                   | `"4px"`                      | Border radius of the input field.                                                               |
| `clearable`          | `boolean`                  | `true`                       | If set to true, adds a clear button to the input field, allowing quick clearing of its content. |
| `delay-debounce`     | `number`                   | `300`                        | Milliseconds to delay the input event for debouncing.                                           |
| `font-color`         | `string`                   | `"var(--vega-text-color)"`   | Text color of the input.                                                                        |
| `font-size`          | `string`                   | `"inherit"`                  | Font size of the input text.                                                                    |
| `focus-border-color` | `string`                   | `"var(--vega-border-color)"` | Border color of the input when focused.                                                         |
| `height`             | `string`                   | `"auto"`                     | Height of the input field.                                                                      |
| `hover-border-color` | `string`                   | `"var(--vega-border-color)"` | Border color of the input on hover.                                                             |
| `label`              | `string`                   | `""`                         | Label above the input.                                                                          |
| `max`                | `number`                   | ``                           | Max value for numeric type input.                                                               |
| `min`                | `number`                   | ``                           | Min value for numeric type input.                                                               |
| `model-value`        | `string \| number \| null` | `""`                         | Value bound to the input and updated via v-model.                                               |
| `padding`            | `string`                   | `"10px"`                     | Padding inside the input field.                                                                 |
| `placeholder`        | `string`                   | `""`                         | Text to display when the input is empty.                                                        |
| `placeholder-color`  | `string`                   | `"var(--vega-gray)"`         | Color of the placeholder text.                                                                  |
| `readonly`           | `boolean`                  | `false`                      | If set to true, the input field will be read-only, preventing user modifications.               |
| `text-align`         | `string`                   | `"left"`                     | Text alignment within the input field.                                                          |
| `type`               | `string`                   | `"text"`                     | Specifies the type of input (`text`, `date`, `email`, `number`, `url`).                         |
| `width`              | `string`                   | `"100%"`                     | Width of the input field.                                                                       |

### Events

The component emits the following events:

| Event Name          | Description                                                     |
|---------------------|-----------------------------------------------------------------|
| `focus`             | Emitted when the input field gains focus.                       |
| `blur`              | Emitted when the input field loses focus.                       |
| `update:modelValue` | Emitted with the current value of the input when it changes.    |
| `clear`             | Emitted when the input field is cleared using the clear button. |

### Slots

The component provides slots that allow for the insertion of custom content at various points within the component.

| Slot Name | Description                                             |
|-----------|---------------------------------------------------------|
| `label`   | Slot for inserting a custom label above the input.      |
| `prefix`  | Slot for adding content before the input field.         |
| `postfix` | Slot for adding content after the input field.          |
| `clear`   | Slot for inserting custom content for the clear button. |


<script setup>
import VegaInput from '../../src/components/VegaInput.vue'
</script>