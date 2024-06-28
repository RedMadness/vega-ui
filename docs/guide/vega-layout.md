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
### content-background
Content background. You can pass a string in HEX, RGB format. Default value is 'none'.

Example
```html
<VegaLayout content-background="#005689" />
```

### header-first
Header must be on top of asides. Default value is 'false'.

Example
```html
<VegaLayout header-first />
```

### header-height
Header height. You can pass a string with valid css value. Default value is '80px'.

Example
```html
<VegaLayout header-height="100px" />
```

### header-border
Header border color. You can pass a string in HEX, RGB format. Default value is 'none'.

Example
```html
<VegaLayout header-border="#005689" />
```

### header-background
Header background color. You can pass a string in HEX, RGB format. Default value is 'none'.

Example
```html
<VegaLayout header-background="#fff" />
```

### header-shadow
Header shadow. You can pass any valid css [box-shadow](https://developer.mozilla.org/ru/docs/Web/CSS/box-shadow) value as string. Default value is 'none'.

Example
```html
<VegaLayout header-shadow="0 10px 20px #0000000d" />
```

### header-padding
Header left and right padding. You can pass a string with valid css value. Default value is '2rem'.

Example
```html
<VegaLayout header-padding="40px" />
```

### aside-left-width
Left aside width. You can pass a string with valid css value. Default value is 'initial'.

Example
```html
<VegaLayout aside-left-width="200px" />
```

### aside-left-border
Left aside border color. You can pass a string in HEX, RGB format. Default value is 'none'.

Example
```html
<VegaLayout aside-left-border="#005689" />
```
### aside-left-background
Left aside background. You can pass a string in HEX, RGB format. Default value is 'none'.

Example
```html
<VegaLayout aside-left-background="#fff" />
```

### aside-right-width
Right aside width. You can pass a string with valid css value. Default value is 'initial'.

Example
```html
<VegaLayout aside-right-width="350px" />
```

### aside-right-border
Right aside border color. You can pass a string in HEX, RGB format. Default value is 'none'.

Example
```html
<VegaLayout aside-right-border="#005689" />
```
### aside-right-background
Right aside background. You can pass a string in HEX, RGB format. Default value is 'none'.

Example
```html
<VegaLayout aside-right-background="#fff" />
```

## Slots
### header
Header custom content

Example
```html
<VegaLayout>
  <template #header>
    <div>Hello World!</div>
  </template>
</VegaLayout>
```
### aside-left
Left aside custom content

Example
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
Right aside custom content

Example
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
Content on page

Example
```html
<VegaLayout>
  <div>Bunch of awesome content</div>
</VegaLayout>
```

<script setup>
import VegaLayout from '../../src/components/VegaLayout.vue'
import VegaLoremIpsum from '../../src/components/VegaLoremIpsum.vue'
</script>