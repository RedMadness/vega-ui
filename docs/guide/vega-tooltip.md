# VegaTooltip
The VegaTooltip component provides a simple way to display a text tooltip when hovering over an element. It dynamically positions the tooltip near the cursor to enhance user interaction and display relevant information.

Simple example:
```vue

<template>
  <vega-tooltip text="This is a tooltip message">
    Hover over me
  </vega-tooltip>
</template>

<script setup>
  import { VegaTooltip } from 'vega-ui'
</script>

```

## Props

| Prop Name | Type   | Default | Description                        |
|-----------|--------|---------|------------------------------------|
| `text`    | String | None    | The text displayed in the tooltip. |
