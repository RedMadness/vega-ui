# VegaSelectStorage

The VegaSelect component is a versatile tool that merges a dropdown list with a searchable input field. It allows users to select from predefined or dynamically loaded options, tailored for a variety of applications. Key features include customizable styling, support for infinite scrolling, and the ability to enable or disable user input through the searchable property.


Simple example:
```vue
<VegaSelectStorage
  :options="options"
  value-field="id"
  label-field="title"
  storage-key="vega-select-demo"
>
</VegaSelectStorage>

<script setup>
  import { VegaSelectStorage, useSelectState } from 'vega-ui'

  const value = useSelectState('vega-select-demo').selected
  const options = ref([
    { id: 1, title: 'one' },
    { id: 2, title: '2S' },
  ])

</script>
```

## Props
Same as [Vega Select](./vega-select#props), except:

| Prop Name     | Type     | Default Value | Description                                                                                                                                      |
|---------------|----------|---------------|--------------------------------------------------------------------------------------------------------------------------------------------------|
| `storage-key` | `String` |               | Required key used for storing the selected value in the browser's localStorage. This allows the component to maintain state across page reloads. |


## Events

Same as [Vega Select](./vega-select#events), except:

| Event Name | Description                                                                      |
|------------|----------------------------------------------------------------------------------|
| `changed`  | Emitted when the selected value is changed. Passes the raw value as a parameter. |


## Slots

Same as [Vega Select](./vega-select#slots)
