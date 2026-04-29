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

## Props

| Prop Name                      | Type                       | Default Value                      | Description                                                                 |
|--------------------------------|----------------------------|------------------------------------|-----------------------------------------------------------------------------|
| `background-color`             | `string`                   | `'var(--vega-secondary)'`          | Background color of the input field.                                        |
| `background-color-dropdown`    | `string`                   | `'var(--vega-secondary)'`          | Background color of the dropdown container.                                 |
| `border-color`                 | `string`                   | `'var(--vega-border-color)'`       | Border color of the input field.                                            |
| `border-color-dropdown`        | `string`                   | `'var(--vega-border-color)'`       | Border color of the dropdown container.                                     |
| `border-radius`                | `string`                   | `'4px'`                            | Border radius of the input field.                                           |
| `border-radius-dropdown`       | `string`                   | `'4px'`                            | Border radius of the dropdown container.                                    |
| `clearable`                    | `boolean`                  | `true`                             | Shows clear button inside the input.                                        |
| `delay-debounce`               | `number`                   | `600`                              | Debounce delay for input/search updates (ms).                               |
| `dropdown-auto-position`       | `boolean`                  | `false`                            | Enables automatic dropdown repositioning.                                   |
| `dropdown-close-on-select`     | `boolean`                  | `true`                             | Closes dropdown after selecting an option.                                  |
| `dropdown-item-height`         | `number`                   | `34`                               | Height of each dropdown item (not actively used in logic).                  |
| `dropdown-item-selected-color` | `string`                   | `'var(--vega-primary)'`            | Color of selected dropdown option.                                          |
| `dropdown-max-width`           | `string`                   | —                                  | Maximum width of the dropdown.                                              |
| `dropdown-min-width`           | `string`                   | —                                  | Minimum width of the dropdown.                                              |
| `dropdown-placement`           | `string`                   | `'bottom-start'`                   | Dropdown placement relative to trigger element.                             |
| `dropdown-scrollbar-color`     | `string`                   | `'var(--vega-border-color)'`       | Scrollbar color of the dropdown.                                            |
| `dropdown-z-index`             | `number`                   | `1`                                | Z-index of the dropdown container.                                          |
| `filters`                      | `object`                   | —                                  | Additional params passed to remote handler (merged with search query).      |
| `focus-border-color`           | `string`                   | `'var(--vega-border-color)'`       | Border color when input is focused.                                         |
| `font-color`                   | `string`                   | `'var(--vega-text-color)'`         | Text color of the input field.                                              |
| `font-size`                    | `string`                   | `'inherit'`                        | Font size of the input field.                                               |
| `font-size-dropdown`           | `string`                   | `'inherit'`                        | Font size inside dropdown.                                                  |
| `font-weight`                  | `string`                   | —                                  | Font weight of the input text.                                              |
| `height`                       | `string`                   | `'auto'`                           | Height of the input field.                                                  |
| `hide-empty-dropdown`          | `boolean`                  | `false`                            | Hides dropdown when there are no options.                                   |
| `hover-border-color`           | `string`                   | `'var(--vega-border-color)'`       | Border color on hover.                                                      |
| `hover-color-dropdown`         | `string`                   | `'var(--vega-primary)'`            | Background color of option on hover.                                        |
| `hover-text-color-dropdown`    | `string`                   | —                                  | Text color of option on hover.                                              |
| `infinite-scroll`              | `boolean`                  | `false`                            | Enables infinite scroll for dropdown (requires remote handler).             |
| `label`                        | `string`                   | `''`                               | Label displayed above the input.                                            |
| `label-field`                  | `string`                   | `'label'`                          | Field used to display option label.                                         |
| `no-options-message`           | `string`                   | `'No options available'`           | Message shown when no options are available.                                |
| `not-empty`                    | `boolean`                  | `false`                            | Automatically selects first option if model is empty.                       |
| `option-padding-dropdown`      | `string`                   | `'8px 12px'`                       | Padding inside dropdown options.                                            |
| `options`                      | `array`                    | `[]`                               | List of selectable options.                                                 |
| `padding`                      | `string`                   | `'10px'`                           | Padding inside input field.                                                 |
| `placeholder`                  | `string`                   | `'Select value'`                   | Placeholder text.                                                           |
| `placeholder-color`            | `string`                   | `'var(--vega-gray)'`               | Color of placeholder text.                                                  |
| `readonly`                     | `boolean`                  | `false`                            | Makes input read-only and disables dropdown interaction.                    |
| `remote-handler`               | `function`                 | —                                  | Async function to fetch options from server.                                |
| `response-handler`             | `function`                 | `(res) => res.data.data`           | Transforms API response into options.                                       |
| `search-persist`               | `boolean`                  | `false`                            | Keeps search value after reopening dropdown.                                |
| `search-query-key`             | `string`                   | `'search'`                         | Key used for search query in API requests.                                  |
| `searchable`                   | `boolean`                  | `false`                            | Enables typing/search inside input.                                         |
| `text-align`                   | `string`                   | `'left'`                           | Text alignment inside input field.                                          |
| `text-color-dropdown`          | `string`                   | —                                  | Text color of dropdown options.                                             |
| `tooltip-field`                | `string`                   | —                                  | Field used for tooltip text in options.                                     |
| `transition-duration-dropdown` | `string`                   | `'0.3s'`                           | Duration of dropdown animation.                                             |
| `value-field`                  | `string`                   | `'value'`                          | Field used as option value.                                                 |
| `width`                        | `string`                   | `'100%'`                           | Width of the input field.                                                   |
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

| Slot Name    | Slot Props           | Description                                                                                                     |
|--------------|----------------------|-----------------------------------------------------------------------------------------------------------------|
| `label`      | `-`                  | Use this slot to insert custom label content above the input field, such as an icon or additional text.         |
| `trigger`    | `-`                  | Used to insert custom trigger content, such as a button or input field, that opens the dropdown.                |
| `clear-icon` | `-`                  | Slot for adding a custom icon for the clear action in the input component.                                      |
| `prefix`     | `-`                  | Slot for adding content before the input field content, typically used for icons or labels.                     |
| `postfix`    | `-`                  | Slot for adding content after the input field content. Includes dynamic adjustment when the dropdown is opened. |
| `option`     | `{ option: Object }` | Slot for inserting custom content for each option within the dropdown list                                      |

<script setup>
import VegaSelect from '../../src/components/VegaSelect.vue'
import { ref } from 'vue'

const value = ref('')
const options = ref([
  { id: 1, title: 'one' },
  { id: 2, title: '2S' },
])
</script>