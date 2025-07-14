import { createComponent$, observe$ } from "../../../../../shared/element.js";

createComponent$('interactive-counter', (el, pageState) => {
    el.define$({
        template$: () => `
            <div class="counter-demo">
                <h3>Interactive Counter Demo</h3>
                <div class="counter-display">
                    <span class="count-value">0</span>
                </div>
                <div class="counter-controls">
                    <button class="btn-decrement">-</button>
                    <button class="btn-reset">Reset</button>
                    <button class="btn-increment">+</button>
                </div>
                <p class="counter-info">This demonstrates Element.js reactive state management!</p>
            </div>
        `,
        style$: () => `
            [component] .counter-demo {
                background: rgba(255, 255, 255, 0.1);
                border-radius: 12px;
                padding: 2rem;
                text-align: center;
                margin: 1rem 0;
            }
            [component] .counter-demo h3 {
                margin: 0 0 1.5rem 0;
                color: #667eea;
                font-size: 1.2rem;
            }
            [component] .counter-display {
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                border-radius: 50%;
                width: 120px;
                height: 120px;
                display: flex;
                align-items: center;
                justify-content: center;
                margin: 0 auto 2rem auto;
                box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
            }
            [component] .count-value {
                font-size: 2.5rem;
                font-weight: bold;
                color: white;
                text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
            }
            [component] .counter-controls {
                display: flex;
                gap: 1rem;
                justify-content: center;
                margin-bottom: 1rem;
            }
            [component] .counter-controls button {
                background: #667eea;
                color: white;
                border: none;
                border-radius: 8px;
                padding: 0.75rem 1.5rem;
                font-size: 1.1rem;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.2s ease;
                min-width: 60px;
            }
            [component] .counter-controls button:hover {
                background: #5a67d8;
                transform: translateY(-2px);
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
            }
            [component] .counter-controls button:active {
                transform: translateY(0);
            }
            [component] .btn-reset {
                background: #e53e3e !important;
            }
            [component] .btn-reset:hover {
                background: #c53030 !important;
            }
            [component] .counter-info {
                color: #cbd5e0;
                font-style: italic;
                margin: 0;
            }
        `,
        onInit$: async () => {
            // Create reactive state using Element.js observe$
            const [state, watch] = observe$({
                count: 0
            });
            
            // Store state on the element for access in other methods
            el.counterState = state;
            el.counterWatch = watch;
        },
        onHydrate$: async () => {
            const countDisplay = el.querySelector('.count-value');
            const incrementBtn = el.querySelector('.btn-increment');
            const decrementBtn = el.querySelector('.btn-decrement');
            const resetBtn = el.querySelector('.btn-reset');
            
            // Watch for state changes and update the display
            el.counterWatch((state, key, value) => {
                if (key === 'count') {
                    countDisplay.textContent = state.count;
                    
                    // Add some visual feedback
                    countDisplay.style.transform = 'scale(1.2)';
                    setTimeout(() => {
                        countDisplay.style.transform = 'scale(1)';
                    }, 150);
                }
            });
            
            // Add event listeners
            incrementBtn.addEventListener('click', () => {
                el.counterState.count++;
            });
            
            decrementBtn.addEventListener('click', () => {
                el.counterState.count--;
            });
            
            resetBtn.addEventListener('click', () => {
                el.counterState.count = 0;
            });
            
            // Initialize display
            countDisplay.textContent = el.counterState.count;
        }
    });
});
