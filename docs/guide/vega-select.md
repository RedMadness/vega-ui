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

| Prop Name                      | Type                                                                            | Default Value                      | Description                                                                                                                                                                                                                                                                                                   |
|--------------------------------|---------------------------------------------------------------------------------|------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `options`                      | `An array of options that can be either objects or primitives (string/number).` | `[]`                               | An array of options that the user can select from.                                                                                                                                                                                                                                                            |
| `value-field`                  | `string`                                                                        | `'value'`                          | The field in the option object that contains the value to be submitted.                                                                                                                                                                                                                                       |
| `label-field`                  | `string`                                                                        | `'label'`                          | The field in the option object that contains the label to be displayed.                                                                                                                                                                                                                                       |
| `tooltip-field`                | `string`                                                                        |                                    | Optional field for tooltip text associated with each option.                                                                                                                                                                                                                                                  |
| `background-color-dropdown`    | `string`                                                                        | `'transparent'`                    | Background color of the dropdown.                                                                                                                                                                                                                                                                             |
| `hover-color-dropdown`         | `string`                                                                        | `'transparent'`                    | Background color of the option when hovered.                                                                                                                                                                                                                                                                  |
| `text-color-dropdown`          | `string`                                                                        | `'inherit'`                        | Text color of the options in the dropdown.                                                                                                                                                                                                                                                                    |
| `border-color-dropdown`        | `string`                                                                        | `'var(--vega-border-color)'`       | Border color of the dropdown.                                                                                                                                                                                                                                                                                 |
| `border-radius-dropdown`       | `string`                                                                        | `'4px'`                            | Border radius of the dropdown container.                                                                                                                                                                                                                                                                      |
| `font-size-dropdown`           | `string`                                                                        | `'inherit'`                        | Font size of the text in the dropdown.                                                                                                                                                                                                                                                                        |
| `option-padding-dropdown`      | `string`                                                                        | `'8px 12px'`                       | Padding inside each dropdown option.                                                                                                                                                                                                                                                                          |
| `transition-duration-dropdown` | `string`                                                                        | `'0.3s'`                           | Duration of the transition effects within the dropdown.                                                                                                                                                                                                                                                       |
| `infinite-scroll`              | `boolean`                                                                       | `false`                            | Enables infinite scrolling for the dropdown options.                                                                                                                                                                                                                                                          |
| `no-options-message`           | `string`                                                                        | `'No options available'`           | Message displayed when there are no options to display.                                                                                                                                                                                                                                                       |
| `remote-handler`               | `function`                                                                      |                                    | A function that accepts query parameters and returns a promise with the dropdown options. For details on the response format, see [API Response Format](#api-response-format) below.                                                                                                                          |
| `response-handler`             | `function`                                                                      | `(response) => response.data.data` | Remote API response processing function.                                                                                                                                                                                                                                                                      |
| `filters`                      | `object`                                                                        |                                    | Optional filters to apply when fetching data remotely.                                                                                                                                                                                                                                                        |
| `placeholder`                  | `string`                                                                        | `""`                               | Text to display when the input is empty.                                                                                                                                                                                                                                                                      |
| `label`                        | `string`                                                                        | `''`                               | Label above the input.                                                                                                                                                                                                                                                                                        |
| `model-value`                  | `string, number, null`                                                          | `""`                               | Value bound to the input and updated via v-model.                                                                                                                                                                                                                                                             |
| `font-size`                    | `string`                                                                        | `"inherit"`                        | Font size of the input text.                                                                                                                                                                                                                                                                                  |
| `font-color`                   | `string`                                                                        | `"var(--vega-text-color)"`         | Text color of the input.                                                                                                                                                                                                                                                                                      |
| `placeholder-color`            | `string`                                                                        | `"var(--vega-gray)"`               | Color of the placeholder text.                                                                                                                                                                                                                                                                                |
| `background-color`             | `string`                                                                        | `"none"`                           | Background color of the input.                                                                                                                                                                                                                                                                                |
| `border-color`                 | `string`                                                                        | `"var(--vega-border-color)"`       | Color of the input border.                                                                                                                                                                                                                                                                                    |
| `hover-border-color`           | `string`                                                                        | `"var(--vega-border-color)"`       | Border color of the input on hover.                                                                                                                                                                                                                                                                           |
| `focus-border-color`           | `string`                                                                        | `"var(--vega-border-color)"`       | Border color of the input when focused.                                                                                                                                                                                                                                                                       |
| `border-radius`                | `string`                                                                        | `"4px"`                            | Border radius of the input field.                                                                                                                                                                                                                                                                             |
| `padding`                      | `string`                                                                        | `"10px"`                           | Padding inside the input field.                                                                                                                                                                                                                                                                               |
| `width`                        | `string`                                                                        | `"100%"`                           | Width of the input field.                                                                                                                                                                                                                                                                                     |
| `height`                       | `string`                                                                        | `"auto"`                           | Height of the input field.                                                                                                                                                                                                                                                                                    |
| `text-align`                   | `string`                                                                        | `"left"`                           | Text alignment within the input field.                                                                                                                                                                                                                                                                        |
| `delay-debounce`               | `number`                                                                        | `300`                              | Milliseconds to delay the input event for debouncing.                                                                                                                                                                                                                                                         |
| `clearable`                    | `boolean`                                                                       | `true`                             | If set to true, adds a clear button to the input field, allowing quick clearing of its content.                                                                                                                                                                                                               |
| `searchable`                   | `boolean`                                                                       | `false`                            | If set to true, allows the user to type to filter options within the dropdown. This affects whether the input field is interactive.                                                                                                                                                                           |
| `search-query-key`             | `string`                                                                        | `search`                           | The search field used in the remote queries.                                                                                                                                                                                                                                                                  |
| `search-persist`               | `boolean`                                                                       | `false`                            | When set to true, this prop ensures that the search input retains its value when the dropdown is reopened. This feature is particularly useful when you want to allow users to continue their search from where they left off, using the previously selected value as the starting point for the search query |
| `not-empty`                    | `boolean`                                                                       | `false`                            | If set to true, the first option will be selected by default. This will work if the options were passed through prop. Does not work with romoteHendler.                                                                                                                                                       |
| `hide-empty-dropdown`          | `boolean`                                                                       | `false`                            | If no options are available, the dropdown list is hidden.                                                                                                                                                                                                                                                     |
| `dropdown-scrollbar-color`     | `string`                                                                        | `'var(--vega-border-color)'`       | Scrollbar color.                                                                                                                                                                                                                                                                                              |
| `dropdown-auto-position`       | `boolean`                                                                       | `false`                            | Place the dropdown at the bottom if there is enough space. Otherwise, place it at top of the trigger element. **NOTE**: To calculate dropdown height uses height of single dropdown item. To achieve precise result u may need pass `dropdown-item-height` prop with actual item height in px.                |
| `dropdown-item-height`         | `nunber`                                                                        | `34`                               | Single dropdown item actual height.                                                                                                                                                                                                                                                                           |
| `dropdown-item-selected-color` | `string`                                                                        | `var(--vega-primary)`              | Dropdown selected item color.                                                                                                                                                                                                                                                                                 |
| `dropdown-z-index`             | `nunber`                                                                        | `1`                                | Dropdown z-index.                                                                                                                                                                                                                                                                                             |
| `dropdown-close-no-select`     | `boolean`                                                                       | `true`                             | Close dropdown on option selected.                                                                                                                                                                                                                                                                            |

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

| Event Name | Description                                                                                                                                                                  |
|------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `selected` | Emitted when the user selects a value from the dropdown. The event passes the selected value as a parameter, allowing you to handle the selection in your application logic. |
| `clear`    | Emitted when the clear button is pressed, allowing you to reset the input field or perform other cleanup actions.                                                            |


## Slots

The component provides several slots that allow for the insertion of custom content at various points within the component. These slots enable you to enhance functionality and tailor the appearance to better fit the design of your user interface.

| Slot Name    | Description                                                                                                     |
|--------------|-----------------------------------------------------------------------------------------------------------------|
| `label`      | Use this slot to insert custom label content above the input field, such as an icon or additional text.         |
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