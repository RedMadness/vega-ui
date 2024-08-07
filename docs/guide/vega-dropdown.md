# VegaDropdown
The VegaDropdown component offers a flexible dropdown interface, enabling users to select options from a dynamic list. It is highly customizable, supporting various styling options through props such as background color, text color, border properties, and more. The component can operate with static options provided directly via props or fetch options dynamically using a remote handler function, ideal for scenarios where options are dependent on external data.

Simple example:
```vue
<vega-dropdown
  :options="['Option 1', 'Option 2', 'Option 3']"
  value-field="id"
  label-field="name"
  background-color-dropdown="#ffffff"
  hover-color-dropdown="#f2f2f2"
  text-color-dropdown="#333333"
  border-color-dropdown="#cccccc"
  border-radius-dropdown="8px"
  font-size-dropdown="16px"
  option-padding-dropdown="12px 15px"
  transition-duration-dropdown="0.2s"
  infinite-scroll="true"
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


