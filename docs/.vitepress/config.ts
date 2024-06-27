import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Vega UI 🌌",
  base: '/vega-ui/',
  description: "Vue 3 UI library for rapid prototyping.",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/guide/vega-layout' },
    ],

    sidebar: [
      {
        text: 'Getting Started',
        items: [
          { text: 'Install', link: '/getting-started' },
        ]
      },
      {
        text: 'Components',
        items: [
          { text: 'Layout', link: '/guide/vega-layout' },
          { text: 'Sidebar', link: '/guide/vega-sidebar' },
          { text: 'Sidebar Toggle', link: '/guide/vega-sidebar-toggle' },
          { text: 'Lorem Ipsum', link: '/guide/vega-lorem-ipsum' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/RedMadness/vega-ui' }
    ]
  }
})
