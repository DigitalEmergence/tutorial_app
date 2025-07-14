import { createComponent$ } from "../../../../../shared/element.js";

createComponent$('state', (el, pageState) => {
    el.define$({
        onInit$: async () => {
            console.log('State tutorial page initialized');
        },
        
        onRender$: async () => {
            // Initialize child components
            for (const id in el.children$) {
                const child = el.children$[id];
                if (Array.isArray(child)) {
                    child.forEach(async (child) => await child.init$());
                } else {
                    await child.init$();
                }
            }
        },
        
        onHydrate$: async () => {
            console.log('State tutorial page hydrated');
        }
    });
});
