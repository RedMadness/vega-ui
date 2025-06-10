# VegaDropdown
The VegaDropdown component offers a flexible dropdown interface, enabling users to select options from a dynamic list. It is highly customizable, supporting various styling options through props such as background color, text color, border properties, and more. The component can operate with static options provided directly via props or fetch options dynamically using a remote handler function, ideal for scenarios where options are dependent on external data.

Simple example:
```vue
<vega-dropdown
  :options="['Option 1', 'Option 2', 'Option 3']"
  value-field="id"
  label-field="name"
  background-color="#ffffff"
  hover-color="#f2f2f2"
  text-color="#333333"
  border-color="#cccccc"
  border-radius="8px"
  font-size="16px"
  option-padding="12px 15px"
  transition-duration="0.2s"
  infinite-scroll="true"
  width="200px"
  :remote-handler="() => {}"
>
  <template #trigger>
    <button>Click to Open</button>
  </template>
</vega-dropdown>

<script setup>
  import { VegaDropdown } from 'vega-ui'
</script>


```

## Props

| Prop Name             | Type                                | Default Value                      | Description                                                                                                                 |
|-----------------------|-------------------------------------|------------------------------------|-----------------------------------------------------------------------------------------------------------------------------|
| `auto-position`       | `boolean`                           | `false`                            | Automatically places dropdown above/below depending on available space. Uses `item-height` for accurate height calculation. |
| `background-color`    | `string`                            | `'transparent'`                    | Background color of the dropdown menu.                                                                                      |
| `border-color`        | `string`                            | `'var(--vega-border-color)'`       | Border color of the dropdown container.                                                                                     |
| `border-radius`       | `string`                            | `'4px'`                            | Border radius of the dropdown container.                                                                                    |
| `close-on-select`     | `boolean`                           | `true`                             | Closes dropdown after selecting an option.                                                                                  |
| `disabled`            | `boolean`                           | `false`                            | Disables interaction with the dropdown if true.                                                                             |
| `filters`             | `object`                            |                                    | Optional filters to apply when fetching remote data.                                                                        |
| `font-size`           | `string`                            | `'inherit'`                        | Font size used inside the dropdown.                                                                                         |
| `hide-if-empty`       | `boolean`                           | `false`                            | Hides the dropdown if no options are available.                                                                             |
| `hover-color`         | `string`                            | `'transparent'`                    | Background color of an option when hovered.                                                                                 |
| `infinite-scroll`     | `boolean`                           | `false`                            | Enables infinite scroll for loading more dropdown options.                                                                  |
| `item-height`         | `number`                            | `34`                               | Height of a single dropdown item (in pixels).                                                                               |
| `item-selected-color` | `string`                            | `var(--vega-primary)`              | Background color of the selected dropdown item.                                                                             |
| `label-field`         | `string`                            | `'label'`                          | Key in the option object representing the label to display.                                                                 |
| `no-options-message`  | `string`                            | `'No options available'`           | Message displayed when there are no options to show.                                                                        |
| `offset-left`         | `string`                            | `0`                                | Horizontal offset from the trigger element.                                                                                 |
| `offset-top`          | `string`                            | `8px`                              | Vertical offset from the trigger element.                                                                                   |
| `option-padding`      | `string`                            | `'8px 12px'`                       | Padding applied to each dropdown option.                                                                                    |
| `options`             | `Array<object \| string \| number>` | `[]`                               | List of options available for selection. Can be primitives or objects.                                                      |
| `remote-handler`      | `function`                          |                                    | Function that fetches remote data based on query parameters and returns a promise with options.                             |
| `response-handler`    | `function`                          | `(response) => response.data.data` | Function to process remote API responses.                                                                                   |
| `scrollbar-color`     | `string`                            | `'var(--vega-border-color)'`       | Color of the scrollbar inside the dropdown.                                                                                 |
| `text-color`          | `string`                            | `'inherit'`                        | Text color for dropdown options.                                                                                            |
| `tooltip-field`       | `string`                            |                                    | Optional key in the option object for tooltip text.                                                                         |
| `transition-duration` | `string`                            | `'0.3s'`                           | Duration of transition animations within the dropdown.                                                                      |
| `value-field`         | `string`                            | `'value'`                          | Key in the option object representing the value to be submitted.                                                            |
| `width`               | `string`                            | `100%`                             | Width of the dropdown in CSS format.                                                                                        |
| `z-index`             | `number`                            | `1`                                | Z-index of the dropdown element.                                                                                            |

### API Response Format

The `remote-handler` function should expect the following response format from the server:

```json
{
  "data": [
    { "id": 1, "name": "Option 1" },
    { "id": 2, "name": "Option 2" }
  ],
  "meta": {
    "total": 2
  }
}
```

### Events

The component emits the following events:

| Event Name | Description                                                                                                 |
|------------|-------------------------------------------------------------------------------------------------------------|
| `open`     | Emitted when the dropdown is opened.                                                                        |
| `select`   | Emitted when an option is selected from the dropdown. This event passes the selected option as a parameter. |
| `close`    | Emitted when the dropdown is closed.                                                                        |


### Slots

The component provides slots that allow for the insertion of custom content at various points within the component.

| Slot Name | Description                                                                                                                                                               |
|-----------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `trigger` | Slot for inserting custom content used to trigger the dropdown. This slot is typically used for custom buttons or toggle elements that control the dropdown's visibility. |


