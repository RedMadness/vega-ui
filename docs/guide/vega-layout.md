# Layout
Page layout component.

## Usage

Simple example:
```html
<template>
  <div style="height: 400px">
    <VegaLayout
      header-first
      header-background="#646CFF23"
      aside-left-width="80px"
      aside-left-background="#8E96AA23"
    >
      <VegaLoremIpsum font-size="14px" padding="0 15px" />
    </VegaLayout>
  </div>
</template>

<script setup>
  import { VegaLayout } from 'vega-ui'
  import 'vega-ui/dist/style.css'
</script>
```

Code above will give you a following result:

<div style="height: 400px">
  <VegaLayout
    header-first
    header-background="var(--vp-custom-block-tip-bg)"
    aside-left-width="80px"
    aside-left-background="var(--vp-custom-block-info-bg)"
  >
    <VegaLoremIpsum font-size="14px" padding="0 15px" />
  </VegaLayout>
</div>


::: info

To achieve the effect that only the part in the `default` slot is scrollable, you need to set a fixed height for the parent DOM element.\
For example, if you want to create a full-page layout you can to set `height: 100vh` for the parent `<div>`.

:::

Layouts can be nested:
```html
<template>
  <div style="height: 400px">
    <VegaLayout
      header-first
      header-height="50px"
      header-background="#646CFF23"
      header-border="#8E96AA23"
      aside-left-width="80px"
      aside-left-background="#8E96AA23"
      aside-left-border="#8E96AA23"
    >
      <VegaLayout
        header-background="#646CFF23"
        header-height="50px"
        aside-right-width="80px"
        aside-right-background="#8E96AA23"
        aside-right-border="#8E96AA23"
      >
        <VegaLoremIpsum font-size="14px" padding="0 15px" />
      </VegaLayout>
    </VegaLayout>
  </div>
</template>

<script setup>
  import { VegaLayout } from 'vega-ui'
  import 'vega-ui/dist/style.css'
</script>
```
Example above will give you a following structure:

<div style="height: 400px">
  <VegaLayout
    header-first
    header-background="var(--vp-custom-block-tip-bg)"
    header-border="var(--vp-custom-block-info-bg)"
    header-height="50px"
    aside-left-width="80px"
    aside-left-background="var(--vp-custom-block-info-bg)"
    aside-left-border="var(--vp-custom-block-info-bg)"
  >
    <VegaLayout
      header-background="var(--vp-custom-block-tip-bg)"
      header-height="50px"
      aside-right-width="80px"
      aside-right-background="var(--vp-custom-block-info-bg)"
      aside-right-border="var(--vp-custom-block-info-bg)"
    >
      <VegaLoremIpsum font-size="14px" padding="0 15px" />
    </VegaLayout>
  </VegaLayout>
</div>

## Props
| Prop                  | Type   | Default                    | Description                                                                                           |
|-----------------------|--------|----------------------------|-------------------------------------------------------------------------------------------------------|
| `content-background`  | String | 'none'                     | Background color of the content area. Accepts HEX, RGB values.                                        |
| `header-first`        | Boolean| 'false'                    | Determines if the header should be on top of asides.                                                  |
| `header-height`       | String | '80px'                     | Height of the header. Accepts a valid CSS value.                                                      |
| `header-border`       | String | 'none'                     | Color of the header border. Accepts HEX, RGB values.                                                  |
| `header-background`   | String | 'none'                     | Background color of the header. Accepts HEX, RGB values.                                              |
| `header-shadow`       | String | 'none'                     | CSS box-shadow value for the header. [box-shadow](https://developer.mozilla.org/ru/docs/Web/CSS/box-shadow)                                                                 |
| `header-padding`      | String | '2rem'                     | Left and right padding of the header. Accepts a valid CSS value.                                      |
| `aside-left-width`    | String | 'initial'                  | Width of the left aside. Accepts a valid CSS value.                                                   |
| `aside-left-border`   | String | 'none'                     | Border color of the left aside. Accepts HEX, RGB values.                                              |
| `aside-left-background` | String | 'none'                   | Background color of the left aside. Accepts HEX, RGB values.                                          |
| `aside-right-width`   | String | 'initial'                  | Width of the right aside. Accepts a valid CSS value.                                                  |
| `aside-right-border`  | String | 'none'                     | Border color of the right aside. Accepts HEX, RGB values.                                             |
| `aside-right-background` | String | 'none'                  | Background color of the right aside. Accepts HEX, RGB values.                                         |


Example content-background:
```html
<VegaLayout content-background="#005689" />
```


Example header-first:
```html
<!-- Не уверен в описании -->
<VegaLayout header-first />
```

Example header-height:
```html
<VegaLayout header-height="100px" />
```

Example header-border:
```html
<VegaLayout header-border="#005689" />
```

Example header-background:
```html
<VegaLayout header-background="#fff" />
```

Example header-shadow:
```html
<VegaLayout header-shadow="0 10px 20px #0000000d" />
```

Example header-padding:
```html
<VegaLayout header-padding="40px" />
```

Example aside-left-width:
```html
<VegaLayout aside-left-width="200px" />
```

Example aside-left-border:
```html
<VegaLayout aside-left-border="#005689" />
```

Example aside-left-background:
```html
<VegaLayout aside-left-background="#fff" />
```

Example aside-right-width:
```html
<VegaLayout aside-right-width="350px" />
```

Example aside-right-border:
```html
<VegaLayout aside-right-border="#005689" />
```

Example aside-right-background:
```html
<VegaLayout aside-right-background="#fff" />
```

## Slots
| Slot         | Description                   |
|--------------|-------------------------------|
| `header`     | Custom content for the header.|
| `aside-left` | Custom content for the left aside. |
| `aside-right`| Custom content for the right aside. |
| `default`    | Main content of the page.     |


Example header:
```html
<VegaLayout>
  <template #header>
    <div>Hello World!</div>
  </template>
</VegaLayout>
```

Example aside-left:
```html
<VegaLayout>
  <template #aside-left>
    <ul>
      <li>Coffee</li>
      <li>Tea</li>
      <li>Milk</li>
    </ul>
  </template>
</VegaLayout>
```

Example aside-right:
```html
<VegaLayout>
  <template #aside-right>
    <ul>
      <li>Neil Armstrong</li>
      <li>Alan Bean</li>
      <li>Peter Conrad</li>
      <li>Edgar Mitchell</li>
      <li>Alan Shepard</li>
    </ul>
  </template>
</VegaLayout>
```

Example default:
```html
<VegaLayout>
  <div>Bunch of awesome content</div>
</VegaLayout>
```

<script setup>
import VegaLayout from '../../src/components/VegaLayout.vue'
import VegaLoremIpsum from '../../src/components/VegaLoremIpsum.vue'
</script>