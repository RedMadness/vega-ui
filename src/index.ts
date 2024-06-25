import type { App } from 'vue'

// Import all the components here, there are more elegant ways to do this but this is the simplest
import VegaLayout from './components/VegaLayout.vue'
import VegaLoremIpsum from './components/VegaLoremIpsum.vue'
import VegaSidebar from './components/VegaSidebar.vue'
import VegaSidebarToggle from './components/VegaSidebarToggle.vue'
import VegaIconArrow from './components/VegaIconArrow.vue'
import useSidebarState from './use/useSidebarState.ts'

export {
  VegaLayout,
  VegaLoremIpsum,
  VegaSidebar,
  VegaSidebarToggle,
  VegaIconArrow,
  useSidebarState,
}

export default {
  install: (app: App) => {
    app.component('VegaLayout', VegaLayout)
    app.component('VegaLoremIpsum', VegaLoremIpsum)
    app.component('VegaSidebar', VegaSidebar)
    app.component('VegaSidebarToggle', VegaSidebarToggle)
    app.component('VegaIconArrow', VegaIconArrow)
  },
}
