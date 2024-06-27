# Layout
Page layout component.

## Usage

Simple example:
```html
<template>
  <div style="height: 100vh">
    <VegaLayout
      :header-first="true"
      header-background="#005689"
      aside-left-width="350px"
      aside-left-border="#dcdfe6"
      aside-left-background="#fff"
      content-background="#ececec"
    >
      <template #header>
        <div></div>
      </template>
      <template #aside-left>
        <div></div>
      </template>
      <template #default>
        <VegaLoremIpsum />
      </template>
    </VegaLayout>
  </div>
</template>

<script setup>
  import { VegaLayout } from 'vega-ui'
  import 'vega-ui/dist/style.css'
</script>
```

::: info

If you want to create a full-page layout with a fixed header, you need to set `height: 100vh` for the parent DOM element.\
With this setup, only the content inside `<template #default>` will be scrollable.

:::

Example above will give you a following structure:
```
+-------------------------------------+
| HEADER                              |
|                                     |
|------------------------------------++
|       |                            ||
| ASIDE | CONTENT                    ||
|       |                            ||
|       |                            ||
|       |                            ||
|       |                            ||
|       |             scroll ------->||
+------------------------------------++
```

Layouts can be nested:
```html
<div style="height: 100vh">
  <VegaLayout
    :header-first="true"
    header-background="#005689"
    aside-left-width="350px"
    aside-left-border="#dcdfe6"
    aside-left-background="#fff"
    content-background="#ececec"
  >
    <template #header>
      <div></div>
    </template>
    <template #aside-left>
      <div></div>
    </template>
    <template #default>
      <VegaLayout
        header-border="#dcdfe6"
        aside-right-width="350px"
        aside-right-border="#dcdfe6"
      >
        <VegaLoremIpsum />
      </VegaLayout>
    </template>
  </VegaLayout>
</div>
```
Example above will give you a following structure:
```
+-----------------------------------------------------------------+
| HEADER 1                                                        |
|                                                                 |
|---------+-------------------------------------------------------|
| ASIDE 1 | HEADER 2                                    | ASIDE 2 |
|         |                                             |         |
|         |---------------------------------------------+         |
|         | CONTENT 2                                   |         |
|         |                                             |         |
|         |                                             |         |
|         |                                             |         |
|         |                                             |         |
|         |                                             |         |
|         |                                             |         |
+---------|---------------------------------------------|---------+
```

## Props
### content-background
Content background. You can pass a string in HEX, RGB format. Default value is 'none'.

Example
```html
<VegaLayout content-background="#005689" />
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

### header-first
Header must be on top of asides. Default value is 'false'.

Example
```html
<VegaLayout header-first />
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