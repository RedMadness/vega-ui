# Sidebar
Sidebar with state memory.

## Usage

Component out of the box provide a hide/show button.\
By default, it is places in top right corner and uses vega icon, but you can override this.\
In addition, the sidebar saves its show/hide state in local storage, so when page reloads, it will be in same state as before.

Simple example:
```html {8}
<template>
  <div style="height: 100vh">
    <VegaLayout
      header-background="#646CFF23"
      aside-left-background="#8E96AA23"
    >
      <template #aside-left>
        <VegaSidebar name="my-sidebar" title="SIDEBAR" />
      </template>
      <template #default>
        <VegaLoremIpsum />
      </template>
    </VegaLayout>
  </div>
</template>

<script setup>
  import { VegaLayout, VegaSidebar, VegaLoremIpsum } from 'vega-ui'
  import 'vega-ui/dist/style.css'
</script>
```
Demo
<div style="height: 300px">
  <VegaLayout header-background="var(--vp-custom-block-tip-bg)" aside-left-background="var(--vp-custom-block-info-bg)">
    <template #aside-left>
      <VegaSidebar name="my-sidebar" title="SIDEBAR" width="280px" />
    </template>
    <template #default>
      <VegaLoremIpsum font-size="14px" padding="0 15px" />
    </template>
  </VegaLayout>
</div>

<script setup>
  import VegaLoremIpsum from '../../src/components/VegaLoremIpsum.vue'
  import VegaSidebar from '../../src/components/VegaSidebar.vue'
  import VegaLayout from '../../src/components/VegaLayout.vue'
</script>

## Props
| Prop                                    | Type    | Default                    | Description                                                                |
|-----------------------------------------|---------|----------------------------|----------------------------------------------------------------------------|
| [name](#name)                           | String  | `vega-sidebar`             | Name of the sidebar, used as a key for storing the state in local storage. |
| [title](#title)                         | String  | `''`                       | The title of the sidebar.                                                  |
| [width](#width)                         | String  | `350px`                    | Width of the sidebar in its opened state.                                  |
| [width-min](#width-min)                 | String  | `calc(2rem * 2 + 24px)`    | Width of the sidebar in its closed state.                                  |
| [header-height](#header-height)         | String  | `80px`                     | Height of the sidebar's header.                                            |
| [header-padding](#header-padding)       | String  | `0 2rem`                   | Header padding.                                                            |
| [header-border](#header-border)         | String  | `none`                     | Header border.                                                             |
| [header-right](#header-right)           | Boolean | `false`                    | Arrange sidebar header elements in order: toggle > gap > title.            |
| [header-gap](#header-gap)               | String  | `8px`                      | Gap between toggle and title. Works only if `header-right` passed.         |
| [content-padding](#content-padding)     | String  | `0 2rem`                   | Sidebar content padding.                                                   |
| [gap](#gap)                             | String  | `16px`                     | Gap between the sidebar's header and content.                              |
| [background](#background)               | String  | `none`                     | Background of the sidebar. Accepts HEX, RGB values.                        |
| [toggle-icon-color](#toggle-icon-color) | String  | `var(--vega-border-color)` | Toggle icon color.                                                         |
| [scrollbar-color](#scrollbar-color)     | String  | `var(--vega-border-color)` | Scrollbar color                                                            |

### name
- Type: `String`
- Default: `vega-sidebar`

Name of sidebar. Used as a key to store state of sidebar in local storage. You can pass any string.

```html
<VegaSidebar name="left-sidebar-1" />
```

### title
- Type: `String`
- Default: `''`

The title of the sidebar.

```html
<VegaSidebar title="My title" />
```

### width
- Type: `String`
- Default: `350px`

Width of the sidebar in its opened state

```html
<VegaSidebar width="300px" />
```

### width-min
Width of the sidebar in its closed state.
- Type: `String`
- Default: `calc(2rem * 2 + 24px)`

```html
<VegaSidebar width-min="0" />
```

### header-height
Height of the sidebar's header.
- Type: `String`
- Default: `80px`

```html
<VegaSidebar header-height="100px" />
```

### header-padding
Header padding.
- Type: `String`
- Default: `0 2rem`

```html
<VegaSidebar header-padding="0 20px" />
```

### header-border
- Type: `String`
- Default: `none`

Header border.

```html
<VegaSidebar header-border="1px var(--vega-border-color) solid" />
```

### content-padding
Content padding.
- Type: `String`
- Default: `0 2rem`

```html
<VegaSidebar content-padding="0 20px" />
```

### gap
Gap between the sidebar's header and content.
- Type: `String`
- Default: `16px`

```html
<VegaSidebar gap="0" />
```

### background
Background of the sidebar. Accepts HEX, RGB values.
- Type: `String`
- Default: `none`

```html
<VegaSidebar background="#fff" />
```

### header-right
Arrange sidebar header elements in order: toggle > gap > title. Gap ba default is 8px and can be changed through `header-gap` prop.
- Type: `Boolean`
- Default: `false`

```html
<VegaSidebar header-right />
```

### header-gap
Gap between toggle and title. Works only if `header-right` passed.
- Type: `String`
- Default: `8px`

```html
<VegaSidebar header-gap="20px" />
```

### toggle-icon-color
- type: `String`
- Defaults: `var(--vega-border-color)`

Toggle icon color.

```html
<VegaSidebar toggle-icon-color="red" />
```

### scrollbar-color
- Type: `String`
- Default: `var(--vega-border-color)`

Scrollbar color.

```html
<VegaSidebar scrollbar-color="#638cc7" />
```

## Slots
| Slot                            | Description                            |
|---------------------------------|----------------------------------------|
| [default](#default)             | Content of the sidebar.                |
| [header](#header)               | Custom content for the sidebar header. |
| [title](#title)                 | Custom title content.                  |
| [toggle-button](#toggle-button) | Custom toggle button content.          |
| [toggle-icon](#toggle-icon)     | Custom toggle button icon.             |

### default
Sidebar content

Example
```html
<VegaSidebar>
  <div>My sidebar content</div>
</VegaSidebar>
```

### header
Header custom content.

Example
```html
<VegaSidebar>
  <template #header>
    <div>SIDEBAR HEADER</div>
  </template>
</VegaSidebar>
```

### title
Custom title.

Example
```html
<VegaSidebar>
  <template #title>
    <div>Custom title</div>
  </template>
</VegaSidebar>
```

### toggle-button
Custom toggle button.

Example
```html
<VegaSidebar>
  <template #toggle-button>
    <button>click me!</button>
  </template>
</VegaSidebar>
```

### toggle-icon
Custom toggle icon.

Example
```html
<VegaSidebar>
  <template #toggle-button-icon>
    <MyCustomIcon />
  </template>
</VegaSidebar>
```