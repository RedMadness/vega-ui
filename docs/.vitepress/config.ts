import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Vega UI 🌌",
  base: '/vega-ui/',
  description: "Vue 3 UI library for rapid prototyping.",
  cleanUrls: true,
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/getting-started' },
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
          {
            text: 'Layout',
            link: '/guide/vega-layout',
          },
          { text: 'Sidebar', link: '/guide/vega-sidebar', items: [
              { text: 'Sidebar Toggle', link: '/guide/vega-sidebar-toggle' },
            ] },
          { text: 'Lorem Ipsum', link: '/guide/vega-lorem-ipsum' },
          { text: 'Input', link: '/guide/vega-input' },
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/RedMadness/vega-ui' }
    ],

    outline: {
      level: [2, 3]
    },

    search: {
      provider: 'local'
    }
  }
})
