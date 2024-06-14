import type { App } from 'vue'

// Import all the components here, there are more elegant ways to do this but this is the simplest
import VegaLayout from "./components/VegaLayout.vue";
import VegaLoremIpsum from "./components/VegaLoremIpsum.vue";

export { VegaLayout, VegaLoremIpsum };

export default {
    install: (app: App) => {
        app.component('VegaLayout', VegaLayout);
        app.component('VegaLoremIpsum', VegaLoremIpsum);
    }
};