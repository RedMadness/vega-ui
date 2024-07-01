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

| Prop                                              | Type    | Default   | Description                                                                                                 |
|:--------------------------------------------------|---------|:----------|-------------------------------------------------------------------------------------------------------------|
| [content-background](#content-background)         | String  | 'none'    | Background color of the content area. Accepts HEX, RGB values.                                              |
| [header-first](#header-first)                     | Boolean | 'false'   | Determines if the header should be on top of asides.                                                        |
| [header-height](#header-height)                   | String  | '80px'    | Height of the header. Accepts a valid CSS value.                                                            |
| [header-border](#header-border)                   | String  | 'none'    | Color of the header border. Accepts HEX, RGB values.                                                        |
| [header-background](#header-background)           | String  | 'none'    | Background color of the header. Accepts HEX, RGB values.                                                    |
| [header-shadow](#header-shadow)                   | String  | 'none'    | CSS box-shadow value for the header. [box-shadow](https://developer.mozilla.org/ru/docs/Web/CSS/box-shadow) |
| [header-padding](#header-padding)                 | String  | '2rem'    | Left and right padding of the header. Accepts a valid CSS value.                                            |
| [aside-left-width](#aside-left-width)             | String  | 'initial' | Width of the left aside. Accepts a valid CSS value.                                                         |
| [aside-left-border](#aside-left-border)           | String  | 'none'    | Border color of the left aside. Accepts HEX, RGB values.                                                    |
| [aside-left-background](#aside-left-background)   | String  | 'none'    | Background color of the left aside. Accepts HEX, RGB values.                                                |
| [aside-right-width](#aside-right-width)           | String  | 'initial' | Width of the right aside. Accepts a valid CSS value.                                                        |
| [aside-right-border](#aside-right-border)         | String  | 'none'    | Border color of the right aside. Accepts HEX, RGB values.                                                   |
| [aside-right-background](#aside-right-background) | String  | 'none'    | Background color of the right aside. Accepts HEX, RGB values.                                               |

### content-background
- Type: `String`
- Default: `none`

Background color of the content area. Accepts HEX, RGB values.
```html
<VegaLayout content-background="#005689" />
```

### header-first
- Type: `Boolean`
- Default: `false`

Determines if the header should be on top of asides.
```html{3,16}
<div style="height: 200px">
  <VegaLayout
    :header-first="headerFirstExample"
    aside-left-width="80px"
    aside-right-width="80px"
  >
    <VegaLoremIpsum font-size="14px" padding="0 15px" />
  </VegaLayout>
</div>

<script setup>
  import VegaLayout from '../../src/components/VegaLayout.vue'
  import VegaLoremIpsum from '../../src/components/VegaLoremIpsum.vue'
  import { ref } from 'vue'

  const headerFirstExample = ref(false)
</script>
```

Demo:

<button style="border: #2A2A35 1px solid; padding: 5px 10px" @click="headerFirstExample = !headerFirstExample">Header first: {{ headerFirstExample }}</button>

<div style="height: 200px">
  <VegaLayout
    :header-first="headerFirstExample"
    header-background="var(--vp-custom-block-tip-bg)"
    header-border="var(--vp-custom-block-info-bg)"
    header-height="50px"
    aside-left-width="80px"
    aside-left-background="var(--vp-custom-block-info-bg)"
    aside-left-border="var(--vp-custom-block-info-bg)"
    aside-right-width="80px"
    aside-right-background="var(--vp-custom-block-info-bg)"
    aside-right-border="var(--vp-custom-block-info-bg)"
  >
    <VegaLoremIpsum font-size="14px" padding="0 15px" />
  </VegaLayout>
</div>

### header-height
Height of the header. Accepts a valid CSS value.
- Type: `String`
- Default: `80px`

```html
<VegaLayout header-height="100px" />
```

### header-border
- Type: `String`
- Default: `none`

Color of the header border. Accepts HEX, RGB values.

```html
<VegaLayout header-border="#005689" />
```

### header-background
- Type: `String`
- Default: `none`

Background color of the header. Accepts HEX, RGB values.

```html
<VegaLayout header-background="#fff" />
```

### header-shadow
- Type: `String`
- Default: `none`

CSS box-shadow value for the header. [box-shadow](https://developer.mozilla.org/ru/docs/Web/CSS/box-shadow)

```html
<VegaLayout header-shadow="0 10px 20px #0000000d" />
```

### header-padding
- Type: `String`
- Default: `2rem`

Left and right padding of the header. Accepts a valid CSS value.

```html
<VegaLayout header-padding="40px" />
```

### aside-left-width
- Type: `String`
- Default: `initial`

Width of the left aside. Accepts a valid CSS value.

```html
<VegaLayout aside-left-width="200px" />
```

### aside-left-border
- Type: `String`
- Default: `none`

Border color of the left aside. Accepts HEX, RGB values.

```html
<VegaLayout aside-left-border="#005689" />
```

### aside-left-background
- Type: `String`
- Default: `none`

Background color of the left aside. Accepts HEX, RGB values.

```html
<VegaLayout aside-left-background="#fff" />
```

### aside-right-width
- Type: `String`
- Default: `initial`

Width of the right aside. Accepts a valid CSS value.

```html
<VegaLayout aside-right-width="350px" />
```

### aside-right-border
- Type: `String`
- Default: `none`

Border color of the right aside. Accepts HEX, RGB values.

```html
<VegaLayout aside-right-border="#005689" />
```

### aside-right-background
- Type: `String`
- Default: `none`

Background color of the right aside. Accepts HEX, RGB values.

```html
<VegaLayout aside-right-background="#fff" />
```

## Slots
| Slot                        | Description                         |
|-----------------------------|-------------------------------------|
| [header](#header)           | Custom content for the header.      |
| [aside-left](#aside-left)   | Custom content for the left aside.  |
| [aside-right](#aside-right) | Custom content for the right aside. |
| [default](#default)         | Main content of the page.           |

### header
Custom content for the header.

```html
<VegaLayout>
  <template #header>
    <div>Hello World!</div>
  </template>
</VegaLayout>
```
### aside-left
Custom content for the left aside.

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
### aside-right
Custom content for the right aside.

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
### default
Main content of the page.

```html
<VegaLayout>
  <div>Bunch of awesome content</div>
</VegaLayout>
```

<script setup>
import VegaLayout from '../../src/components/VegaLayout.vue'
import VegaLoremIpsum from '../../src/components/VegaLoremIpsum.vue'
import { ref } from 'vue'

const headerFirstExample = ref(false)
</script>