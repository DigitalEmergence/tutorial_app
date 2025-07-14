import { createComponent$ } from "../../../../shared/element.js";

createComponent$('index', (el, pageState) => {
    let intervalId;
    
    el.define$({
        onInit$: async () => {
            // Initialize the datetime display
            updateDateTime();
            // Set up interval to update every second
            intervalId = setInterval(updateDateTime, 1000);
        },
        onHydrate$: async () => {
            // Restart interval after hydration
            updateDateTime();
            if (intervalId) clearInterval(intervalId);
            intervalId = setInterval(updateDateTime, 1000);
        }
    });
    
    function updateDateTime() {
        const datetimeElement = el.querySelector('#datetime');
        if (datetimeElement) {
            const date = new Date();
            datetimeElement.innerHTML = date.toLocaleString();
        }
    }
});
