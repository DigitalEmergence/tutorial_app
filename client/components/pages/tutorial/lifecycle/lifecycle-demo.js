import { createComponent$ } from "../../../../../shared/element.js";

createComponent$('lifecycle-demo', (el, pageState) => {
    let count = 0;
    
    el.define$({
        template$: () => `
            <div class="lifecycle-demo">
                <h3>Interactive Counter Demo</h3>
                <div class="counter-display">
                    <span class="count">${count}</span>
                </div>
                <div class="demo-controls">
                    <button class="increment-btn">Increment</button>
                    <button class="reset-btn">Reset</button>
                </div>
                <div class="lifecycle-status">
                    <div class="status-item init">onInit$: <span>✓ Complete</span></div>
                    <div class="status-item render">onRender$: <span>✓ Complete</span></div>
                    <div class="status-item hydrate">onHydrate$: <span>⏳ Loading...</span></div>
                </div>
            </div>
        `,
        style$: () => `
            [component] .lifecycle-demo {
                background: #f8fafc;
                border: 2px solid #e2e8f0;
                border-radius: 8px;
                padding: 2rem;
                text-align: center;
            }
            [component] .counter-display {
                margin: 1.5rem 0;
            }
            [component] .count {
                font-size: 3rem;
                font-weight: bold;
                color: #667eea;
                background: white;
                padding: 1rem 2rem;
                border-radius: 8px;
                border: 2px solid #e2e8f0;
                display: inline-block;
                min-width: 100px;
            }
            [component] .demo-controls {
                margin: 1.5rem 0;
                display: flex;
                gap: 1rem;
                justify-content: center;
            }
            [component] .demo-controls button {
                padding: 0.75rem 1.5rem;
                border: none;
                border-radius: 6px;
                font-size: 1rem;
                cursor: pointer;
                transition: all 0.2s ease;
            }
            [component] .increment-btn {
                background: #48bb78;
                color: white;
            }
            [component] .increment-btn:hover {
                background: #38a169;
            }
            [component] .reset-btn {
                background: #ed8936;
                color: white;
            }
            [component] .reset-btn:hover {
                background: #dd6b20;
            }
            [component] .lifecycle-status {
                margin-top: 2rem;
                text-align: left;
                background: white;
                padding: 1rem;
                border-radius: 6px;
                border: 1px solid #e2e8f0;
            }
            [component] .status-item {
                margin: 0.5rem 0;
                font-family: monospace;
                font-size: 0.9rem;
            }
            [component] .status-item span {
                font-weight: bold;
            }
            [component] .init span {
                color: #48bb78;
            }
            [component] .render span {
                color: #4299e1;
            }
            [component] .hydrate span {
                color: #ed8936;
            }
            [component] .hydrate.complete span {
                color: #48bb78;
            }
        `,
        onInit$: async () => {
            console.log('🚀 lifecycle-demo onInit$ called');
            // Only log on client side
            if (typeof document !== 'undefined') {
                logLifecycleEvent('onInit$ - Component initialized, initial state set');
            }
        },
        onRender$: async () => {
            console.log('🎨 lifecycle-demo onRender$ called');
            // Only log on client side
            if (typeof document !== 'undefined') {
                logLifecycleEvent('onRender$ - Template rendered, DOM elements created');
            }
            
            // Update the counter display
            const countElement = el.querySelector('.count');
            if (countElement) {
                countElement.textContent = count;
            }
        },
        onHydrate$: async () => {
            console.log('⚡ lifecycle-demo onHydrate$ called');
            logLifecycleEvent('onHydrate$ - Event listeners added, component fully interactive');
            
            // Update hydrate status
            const hydrateStatus = el.querySelector('.hydrate');
            if (hydrateStatus) {
                hydrateStatus.classList.add('complete');
                hydrateStatus.querySelector('span').textContent = '✓ Complete';
            }
            
            // Add event listeners
            const incrementBtn = el.querySelector('.increment-btn');
            const resetBtn = el.querySelector('.reset-btn');
            
            if (incrementBtn) {
                incrementBtn.addEventListener('click', () => {
                    count++;
                    const countElement = el.querySelector('.count');
                    if (countElement) {
                        countElement.textContent = count;
                    }
                    logLifecycleEvent(`Counter incremented to ${count}`);
                });
            }
            
            if (resetBtn) {
                resetBtn.addEventListener('click', () => {
                    count = 0;
                    const countElement = el.querySelector('.count');
                    if (countElement) {
                        countElement.textContent = count;
                    }
                    logLifecycleEvent('Counter reset to 0');
                });
            }
        }
    });
    
    function logLifecycleEvent(message) {
        // Only run on client side where document is available
        if (typeof document !== 'undefined') {
            const logContainer = document.getElementById('lifecycle-log');
            if (logContainer) {
                const logEntries = logContainer.querySelector('.log-entries');
                if (logEntries) {
                    const entry = document.createElement('div');
                    entry.className = 'log-entry';
                    entry.innerHTML = `<span class="timestamp">${new Date().toLocaleTimeString()}</span> ${message}`;
                    logEntries.appendChild(entry);
                    logEntries.scrollTop = logEntries.scrollHeight;
                }
            }
        }
    }
});
