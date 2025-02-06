# VegaSelect

The VegaSelect component is a versatile tool that merges a dropdown list with a searchable input field. It allows users to select from predefined or dynamically loaded options, tailored for a variety of applications. Key features include customizable styling, support for infinite scrolling, and the ability to enable or disable user input through the searchable property.


Simple example:
```vue
selected: <code>{{ value }}</code>
<VegaSelect
  v-model="value"
  :options="options"
  value-field="id"
  label-field="title"
>
</VegaSelect>

<script setup>
  import { VegaSelect } from 'vega-ui'
  const value = ref('')

  const options = ref([
    { id: 1, title: 'one' },
    { id: 2, title: '2S' },
  ])

</script>
```

Code above will give you a following result:

<div style="height: 80px">
  selected: <code v-if="value">{{ value }}</code>
  <VegaSelect
    value-field="id"
    label-field="title"
    v-model="value"
    :options="options"
    background-color="#2a2a35"
    background-color-dropdown="#2a2a35"
    hover-color-dropdown="#638cc7"
    >
  </VegaSelect>
</div>

## Props

| Prop Name                    | Type                                                                            | Default Value                | Description                                                                                                                                                                          |
|------------------------------|---------------------------------------------------------------------------------|------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `options`                    | `An array of options that can be either objects or primitives (string/number).` | `[]`                         | An array of options that the user can select from.                                                                                                                                   |
| `valueField`                 | `string`                                                                        | `'value'`                    | The field in the option object that contains the value to be submitted.                                                                                                              |
| `labelField`                 | `string`                                                                        | `'label'`                    | The field in the option object that contains the label to be displayed.                                                                                                              |
| `tooltipField`               | `string`                                                                        |                              | Optional field for tooltip text associated with each option.                                                                                                                         |
| `backgroundColorDropdown`    | `string`                                                                        | `'transparent'`              | Background color of the dropdown.                                                                                                                                                    |
| `hoverColorDropdown`         | `string`                                                                        | `'transparent'`              | Background color of the option when hovered.                                                                                                                                         |
| `textColorDropdown`          | `string`                                                                        | `'inherit'`                  | Text color of the options in the dropdown.                                                                                                                                           |
| `borderColorDropdown`        | `string`                                                                        | `'var(--vega-border-color)'` | Border color of the dropdown.                                                                                                                                                        |
| `borderRadiusDropdown`       | `string`                                                                        | `'4px'`                      | Border radius of the dropdown container.                                                                                                                                             |
| `fontSizeDropdown`           | `string`                                                                        | `'inherit'`                  | Font size of the text in the dropdown.                                                                                                                                               |
| `optionPaddingDropdown`      | `string`                                                                        | `'8px 12px'`                 | Padding inside each dropdown option.                                                                                                                                                 |
| `transitionDurationDropdown` | `string`                                                                        | `'0.3s'`                     | Duration of the transition effects within the dropdown.                                                                                                                              |
| `infiniteScroll`             | `boolean`                                                                       | `false`                      | Enables infinite scrolling for the dropdown options.                                                                                                                                 |
| `noOptionsMessage`           | `string`                                                                        | `'No options available'`     | Message displayed when there are no options to display.                                                                                                                              |
| `remoteHandler`              | `function`                                                                      |                              | A function that accepts query parameters and returns a promise with the dropdown options. For details on the response format, see [API Response Format](#api-response-format) below. |
| `filters`                    | `object`                                                                        |                              | Optional filters to apply when fetching data remotely.                                                                                                                               |
| `placeholder`                | `String`                                                                        | `""`                         | Text to display when the input is empty.                                                                                                                                             |
| `label`                      | `String`                                                                        | `''`                         | Label above the input.                                                                                                                                                               |
| `modelValue`                 | `String, Number, null`                                                          | `""`                         | Value bound to the input and updated via v-model.                                                                                                                                    |
| `fontSize`                   | `String`                                                                        | `"inherit"`                  | Font size of the input text.                                                                                                                                                         |
| `fontColor`                  | `String`                                                                        | `"var(--vega-text-color)"`   | Text color of the input.                                                                                                                                                             |
| `placeholderColor`           | `String`                                                                        | `"var(--vega-gray)"`         | Color of the placeholder text.                                                                                                                                                       |
| `backgroundColor`            | `String`                                                                        | `"none"`                     | Background color of the input.                                                                                                                                                       |
| `borderColor`                | `String`                                                                        | `"var(--vega-border-color)"` | Color of the input border.                                                                                                                                                           |
| `hoverBorderColor`           | `String`                                                                        | `"var(--vega-border-color)"` | Border color of the input on hover.                                                                                                                                                  |
| `focusBorderColor`           | `String`                                                                        | `"var(--vega-border-color)"` | Border color of the input when focused.                                                                                                                                              |
| `borderRadius`               | `String`                                                                        | `"4px"`                      | Border radius of the input field.                                                                                                                                                    |
| `padding`                    | `String`                                                                        | `"10px"`                     | Padding inside the input field.                                                                                                                                                      |
| `width`                      | `String`                                                                        | `"100%"`                     | Width of the input field.                                                                                                                                                            |
| `height`                     | `String`                                                                        | `"auto"`                     | Height of the input field.                                                                                                                                                           |
| `textAlign`                  | `String`                                                                        | `"left"`                     | Text alignment within the input field.                                                                                                                                               |
| `delayDebounce`              | `Number`                                                                        | `300`                        | Milliseconds to delay the input event for debouncing.                                                                                                                                |
| `clearable`                  | `Boolean`                                                                       | `true`                       | If set to true, adds a clear button to the input field, allowing quick clearing of its content.                                                                                      | |
| `searchable`                 | `Boolean`                                                                       | `false`                      | If set to true, allows the user to type to filter options within the dropdown. This affects whether the input field is interactive.                                                  |
| `search-query-key`           | `String`                                                                        | `search`                     | The search field used in the remote queries.                                                                                                                                         |
| `notEmpty`                   | `Boolean`                                                                       | `false`                      | If set to true, the first option will be selected by default. This will work if the options were passed through prop. Does not work with romoteHendler.                              |


### API Response Format

The `remoteHandler` function should expect the following response format from the server:

```json
{
  "data": {
    "data": [
      { "id": 1, "name": "Option 1" },
      { "id": 2, "name": "Option 2" }
    ],
    "meta": {
      "total": 2
    }
  }
}
```

## Events

The component emits the following events:

| Event Name | Description                                                                     |
|------------|---------------------------------------------------------------------------------|
| `selected` | Emitted when the user selects a value. Passes the current value as a parameter. |
| `clear`    | Emitted when clear button is pressed.                                           |


## Slots

The component provides several slots that allow for the insertion of custom content at various points within the component. These slots enable you to enhance functionality and tailor the appearance to better fit the design of your user interface.

| Slot Name    | Description                                                                                                     |
|--------------|-----------------------------------------------------------------------------------------------------------------|
| `label`      | Allows insertion of custom label content above the input field.                                                 |
| `trigger`    | Used to insert custom trigger content, such as a button or input field, that opens the dropdown.                |
| `clear-icon` | Slot for adding a custom icon for the clear action in the input component.                                      |
| `prefix`     | Slot for adding content before the input field content, typically used for icons or labels.                     |
| `postfix`    | Slot for adding content after the input field content. Includes dynamic adjustment when the dropdown is opened. |

<script setup>
import VegaSelect from '../../src/components/VegaSelect.vue'
import { ref } from 'vue'

const value = ref('')
const options = ref([
  { id: 1, title: 'one' },
  { id: 2, title: '2S' },
])
</script>