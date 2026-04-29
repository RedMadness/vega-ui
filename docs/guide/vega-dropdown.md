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
  max-width="200px"
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

## Props

| Prop Name                  | Type                                | Default Value                      | Description                                                                                               |
|----------------------------|-------------------------------------|------------------------------------|-----------------------------------------------------------------------------------------------------------|
| `background-color`         | `string`                            | `'var(--vega-secondary)'`          | Background color of the options list container.                                                           |
| `border-color`             | `string`                            | `'var(--vega-border-color)'`       | Border color of the dropdown container.                                                                   |
| `border-radius`            | `string`                            | `'4px'`                            | Border radius of the dropdown container.                                                                  |
| `close-on-select`          | `boolean`                           | `true`                             | Closes dropdown after selecting an option.                                                                |
| `disabled`                 | `boolean`                           | `false`                            | Disables interaction and prevents opening the dropdown.                                                   |
| `filters`                  | `object`                            | —                                  | Additional query params passed to `remote-handler`. Triggers reload when changed.                         |
| `font-size`                | `string`                            | `'inherit'`                        | Font size applied to dropdown content.                                                                    |
| `hide-if-empty`            | `boolean`                           | `false`                            | Hides dropdown entirely if there are no options and it's opened.                                          |
| `hover-color`              | `string`                            | `'var(--vega-border-color)'`       | Background color of option on hover or keyboard navigation.                                               |
| `hover-text-color`         | `string`                            | `'inherit'`                        | Text color of option when hovered or highlighted.                                                         |
| `infinite-scroll`          | `boolean`                           | `true`                             | Enables lazy loading more options on scroll (used with `remote-handler`).                                 |
| `item-selected-color`      | `string`                            | `'var(--vega-primary)'`            | Color used for selected option text and check icon.                                                       |
| `label-field`              | `string`                            | `'description'`                    | Key used to display label when option is an object.                                                       |
| `max-width`                | `string`                            | `'300px'`                          | Maximum width of the dropdown container.                                                                  |
| `min-width`                | `string`                            | —                                  | Minimum width of the dropdown container.                                                                  |
| `max-height`               | `number`                            | `200`                              | Maximum height of options list before scrolling is enabled.                                               |
| `no-options-message`       | `string`                            | `'No options available'`           | Message shown when there are no options and not loading.                                                  |
| `offset-left`              | `number`                            | `0`                                | Horizontal offset from trigger element (used by Floating UI).                                             |
| `offset-top`               | `number`                            | `8`                                | Vertical offset from trigger element (used by Floating UI).                                               |
| `option-padding`           | `string`                            | `'8px 12px'`                       | Padding applied to each option.                                                                           |
| `options`                  | `Array<object \| string \| number>` | `[]`                               | Static list of selectable options. Merged with remote data if provided.                                   |
| `placement`                | `DropdownPlacement`                 | `'bottom'` *(Floating UI default)* | Preferred dropdown placement relative to trigger (e.g. `top`, `bottom-start`, etc.).                      |
| `remote-handler`           | `function`                          | —                                  | Async function for fetching options. Receives `{ page, per_page, search, ...filters }`.                   |
| `response-handler`         | `function`                          | `(res) => res.data.data`           | Transforms API response into options array.                                                               |
| `scrollbar-color`          | `string`                            | `'var(--vega-border-color)'`       | Scrollbar color inside dropdown (Firefox-compatible).                                                     |
| `show-search`              | `boolean`                           | `false`                            | Displays search input inside dropdown. Triggers remote fetch on input change.                             |
| `show-selected`            | `boolean`                           | `false`                            | Displays selected value as a separate block at the top with a clear button.                               |
| `text-color`               | `string`                            | `'var(--vega-text-color)'`         | Default text color of options.                                                                            |
| `tooltip-field`            | `string`                            | —                                  | Key for tooltip text (shown via `vega-tooltip` if provided).                                              |
| `transition-duration`      | `string`                            | `'0.3s'`                           | Duration of dropdown fade-in/out animation.                                                               |
| `value-field`              | `string`                            | `'id'`                             | Key used as unique value when option is an object.                                                        |
| `wrapper-background-color` | `string`                            | `'var(--vega-border-color)'`       | Background color of the outer dropdown wrapper (includes search and selected sections).                   |
| `wrapper-padding`          | `string`                            | —                                  | Padding for the outer dropdown wrapper.                                                                   |
| `z-index`                  | `number`                            | `1`                                | Controls stacking order of the dropdown.                                                                  |

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

| Slot Name | Slot Props           | Description                                                                                                                                                               |
|-----------|----------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `option`  | `{ option: Object }` | Slot for inserting custom content for each option within the dropdown list                                                                                                |
| `trigger` | `-`                  | Slot for inserting custom content used to trigger the dropdown. This slot is typically used for custom buttons or toggle elements that control the dropdown's visibility. |


