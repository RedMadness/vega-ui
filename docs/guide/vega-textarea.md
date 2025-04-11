# VegaInput
The Auto-Resizing Textarea Component designed to automatically adjust the number of visible rows based on the content.
This feature ensures that the textarea expands or contracts to fit the text, providing a seamless user experience by eliminating the need for manual resizing or scrolling within the textarea.

Simple example:
```vue
<VegaTextarea
  label="label"
  background-color="var(--vp-custom-block-info-bg)"
  :delay-debounce="800"
  width="420px"
/>

<script setup>
  import { VegaTextarea } from 'vega-ui'
</script>

```

Code above will give you a following result:

<div>
  <vega-textarea
      label="label"
      background-color="var(--vp-custom-block-info-bg)"
      :delay-debounce="800"
      width="420px"
  />
</div>

### Props

Same as [Vega Input](./vega-input#props), except `type` and `clearable`:

### Events

Same as [Vega Input](./vega-input#events), except `clear`:

### Slots

Same as [Vega Input](./vega-input#slots), except `clear`:


<script setup>
import VegaTextarea from '../../src/components/VegaTextarea.vue'
</script>