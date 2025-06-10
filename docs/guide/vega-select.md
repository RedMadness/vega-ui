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

| Prop Name                      | Type                       | Default Value                      | Description                                                    |
|--------------------------------|----------------------------|------------------------------------|----------------------------------------------------------------|
| `background-color`             | `string`                   | `"none"`                           | Background color of the input field.                           |
| `background-color-dropdown`    | `string`                   | `'transparent'`                    | Background color of the dropdown.                              |
| `border-color`                 | `string`                   | `"var(--vega-border-color)"`       | Color of the input border.                                     |
| `border-color-dropdown`        | `string`                   | `'var(--vega-border-color)'`       | Border color of the dropdown.                                  |
| `border-radius`                | `string`                   | `"4px"`                            | Border radius of the input field.                              |
| `border-radius-dropdown`       | `string`                   | `'4px'`                            | Border radius of the dropdown container.                       |
| `clearable`                    | `boolean`                  | `true`                             | Whether to show a clear button in the input field.             |
| `delay-debounce`               | `number`                   | `300`                              | Delay in milliseconds for debouncing input events.             |
| `dropdown-auto-position`       | `boolean`                  | `false`                            | Automatically positions the dropdown based on available space. |
| `dropdown-close-no-select`     | `boolean`                  | `true`                             | Closes the dropdown when an option is selected.                |
| `dropdown-item-height`         | `number`                   | `34`                               | Height of each dropdown item in pixels.                        |
| `dropdown-item-selected-color` | `string`                   | `var(--vega-primary)`              | Color of the selected dropdown item.                           |
| `dropdown-scrollbar-color`     | `string`                   | `'var(--vega-border-color)'`       | Scrollbar color for the dropdown.                              |
| `dropdown-z-index`             | `number`                   | `1`                                | Z-index of the dropdown menu.                                  |
| `filters`                      | `object`                   |                                    | Optional filters for remote data fetching.                     |
| `font-color`                   | `string`                   | `"var(--vega-text-color)"`         | Text color of the input field.                                 |
| `font-size`                    | `string`                   | `"inherit"`                        | Font size of the input text.                                   |
| `font-size-dropdown`           | `string`                   | `'inherit'`                        | Font size of the text in the dropdown.                         |
| `focus-border-color`           | `string`                   | `"var(--vega-border-color)"`       | Border color when the input is focused.                        |
| `hide-empty-dropdown`          | `boolean`                  | `false`                            | Hides the dropdown when there are no options available.        |
| `hover-border-color`           | `string`                   | `"var(--vega-border-color)"`       | Border color when the input is hovered.                        |
| `hover-color-dropdown`         | `string`                   | `'transparent'`                    | Background color of the option when hovered.                   |
| `infinite-scroll`              | `boolean`                  | `false`                            | Enables infinite scrolling for the dropdown options.           |
| `label`                        | `string`                   | `''`                               | Label displayed above the input field.                         |
| `label-field`                  | `string`                   | `'label'`                          | Field in the option object that contains the display label.    |
| `model-value`                  | `string`, `number`, `null` | `""`                               | Value bound to the input via v-model.                          |
| `no-options-message`           | `string`                   | `'No options available'`           | Message shown when there are no options to display.            |
| `not-empty`                    | `boolean`                  | `false`                            | Selects the first option by default if set to true.            |
| `option-padding-dropdown`      | `string`                   | `'8px 12px'`                       | Padding inside each dropdown option.                           |
| `options`                      | `array`                    | `[]`                               | Array of selectable options (can be objects or primitives).    |
| `padding`                      | `string`                   | `"10px"`                           | Padding inside the input field.                                |
| `placeholder`                  | `string`                   | `""`                               | Placeholder text displayed when the input is empty.            |
| `placeholder-color`            | `string`                   | `"var(--vega-gray)"`               | Color of the placeholder text.                                 |
| `readonly`                     | `boolean`                  | `false`                            | Makes the input field read-only if set to true.                |
| `remote-handler`               | `function`                 |                                    | Function to fetch options remotely based on query parameters.  |
| `response-handler`             | `function`                 | `(response) => response.data.data` | Function to process the remote API response.                   |
| `search-persist`               | `boolean`                  | `false`                            | Retains search input value when reopening the dropdown.        |
| `search-query-key`             | `string`                   | `search`                           | Key used for search queries in remote requests.                |
| `searchable`                   | `boolean`                  | `false`                            | Allows user to filter options by typing in the input field.    |
| `text-align`                   | `string`                   | `"left"`                           | Text alignment within the input field.                         |
| `text-color-dropdown`          | `string`                   | `'inherit'`                        | Text color of the options in the dropdown.                     |
| `tooltip-field`                | `string`                   |                                    | Optional field in the option object for tooltip text.          |
| `transition-duration-dropdown` | `string`                   | `'0.3s'`                           | Duration of transition effects in the dropdown.                |
| `value-field`                  | `string`                   | `'value'`                          | Field in the option object that contains the value to submit.  |
| `width`                        | `string`                   | `"100%"`                           | Width of the input field.                                      |
| `height`                       | `string`                   | `"auto"`                           | Height of the input field.                                     |

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