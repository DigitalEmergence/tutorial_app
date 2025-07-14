import { createComponent$, observe$ } from "../../../../../shared/element.js";

createComponent$('reactive-demo', (el, pageState) => {
    // Create reactive state using observe$
    const [state, watchState] = observe$({
        name: 'Element.js',
        count: 0,
        items: ['Apple', 'Banana', 'Cherry']
    });
    
    el.define$({
        template$: () => `
            <div class="reactive-demo">
                <h3>Reactive State Demo</h3>
                
                <div class="demo-section">
                    <h4>String State</h4>
                    <input type="text" class="name-input" placeholder="Enter name">
                    <p>Hello, <span class="name-display">${state.name}</span>!</p>
                </div>
                
                <div class="demo-section">
                    <h4>Number State</h4>
                    <div class="counter-controls">
                        <button class="decrement">-</button>
                        <span class="count-display">${state.count}</span>
                        <button class="increment">+</button>
                    </div>
                </div>
                
                <div class="demo-section">
                    <h4>Array State</h4>
                    <div class="array-controls">
                        <input type="text" class="item-input" placeholder="Add item">
                        <button class="add-item">Add</button>
                    </div>
                    <ul class="items-list">
                        ${state.items.map((item, index) => 
                            `<li>${item} <button class="remove-item" data-index="${index}">×</button></li>`
                        ).join('')}
                    </ul>
                </div>
                
                <div class="state-display">
                    <h4>Current State:</h4>
                    <pre class="state-json">${JSON.stringify(state, null, 2)}</pre>
                </div>
            </div>
        `,
        style$: () => `
            [component] .reactive-demo {
                background: #f8fafc;
                border: 2px solid #e2e8f0;
                border-radius: 8px;
                padding: 2rem;
            }
            [component] .demo-section {
                margin: 1.5rem 0;
                padding: 1rem;
                background: white;
                border-radius: 6px;
                border: 1px solid #e2e8f0;
            }
            [component] .demo-section h4 {
                margin: 0 0 1rem 0;
                color: #2d3748;
            }
            [component] input {
                padding: 0.5rem;
                border: 1px solid #cbd5e0;
                border-radius: 4px;
                margin-right: 0.5rem;
            }
            [component] button {
                padding: 0.5rem 1rem;
                border: none;
                border-radius: 4px;
                cursor: pointer;
                margin: 0 0.25rem;
                transition: background-color 0.2s;
            }
            [component] .increment, .add-item {
                background: #48bb78;
                color: white;
            }
            [component] .increment:hover, .add-item:hover {
                background: #38a169;
            }
            [component] .decrement {
                background: #ed8936;
                color: white;
            }
            [component] .decrement:hover {
                background: #dd6b20;
            }
            [component] .remove-item {
                background: #e53e3e;
                color: white;
                font-size: 0.8rem;
                padding: 0.25rem 0.5rem;
            }
            [component] .remove-item:hover {
                background: #c53030;
            }
            [component] .counter-controls {
                display: flex;
                align-items: center;
                gap: 1rem;
            }
            [component] .count-display {
                font-size: 1.5rem;
                font-weight: bold;
                color: #667eea;
                min-width: 3rem;
                text-align: center;
            }
            [component] .name-display {
                font-weight: bold;
                color: #667eea;
            }
            [component] .items-list {
                list-style: none;
                padding: 0;
                margin: 1rem 0 0 0;
            }
            [component] .items-list li {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 0.5rem;
                margin: 0.25rem 0;
                background: #f7fafc;
                border-radius: 4px;
            }
            [component] .state-display {
                margin-top: 2rem;
                padding: 1rem;
                background: #2d3748;
                color: white;
                border-radius: 6px;
            }
            [component] .state-display h4 {
                margin: 0 0 1rem 0;
                color: white;
            }
            [component] .state-json {
                background: #1a202c;
                padding: 1rem;
                border-radius: 4px;
                overflow-x: auto;
                font-size: 0.9rem;
                margin: 0;
            }
        `,
        onInit$: async () => {
            // Watch for state changes and update UI
            watchState((target, key, value) => {
                updateDisplay();
            });
        },
        onHydrate$: async () => {
            // Name input
            const nameInput = el.querySelector('.name-input');
            if (nameInput) {
                nameInput.value = state.name;
                nameInput.addEventListener('input', (e) => {
                    state.name = e.target.value;
                });
            }
            
            // Counter controls
            const incrementBtn = el.querySelector('.increment');
            const decrementBtn = el.querySelector('.decrement');
            
            if (incrementBtn) {
                incrementBtn.addEventListener('click', () => {
                    state.count++;
                });
            }
            
            if (decrementBtn) {
                decrementBtn.addEventListener('click', () => {
                    state.count--;
                });
            }
            
            // Array controls
            const itemInput = el.querySelector('.item-input');
            const addBtn = el.querySelector('.add-item');
            
            if (addBtn && itemInput) {
                addBtn.addEventListener('click', () => {
                    const value = itemInput.value.trim();
                    if (value) {
                        state.items.push(value);
                        itemInput.value = '';
                    }
                });
                
                itemInput.addEventListener('keypress', (e) => {
                    if (e.key === 'Enter') {
                        addBtn.click();
                    }
                });
            }
            
            // Remove item buttons (delegated event handling)
            el.addEventListener('click', (e) => {
                if (e.target.classList.contains('remove-item')) {
                    const index = parseInt(e.target.dataset.index);
                    state.items.splice(index, 1);
                }
            });
        }
    });
    
    function updateDisplay() {
        // Update name display
        const nameDisplay = el.querySelector('.name-display');
        if (nameDisplay) {
            nameDisplay.textContent = state.name;
        }
        
        // Update count display
        const countDisplay = el.querySelector('.count-display');
        if (countDisplay) {
            countDisplay.textContent = state.count;
        }
        
        // Update items list
        const itemsList = el.querySelector('.items-list');
        if (itemsList) {
            itemsList.innerHTML = state.items.map((item, index) => 
                `<li>${item} <button class="remove-item" data-index="${index}">×</button></li>`
            ).join('');
        }
        
        // Update state JSON display
        const stateJson = el.querySelector('.state-json');
        if (stateJson) {
            stateJson.textContent = JSON.stringify(state, null, 2);
        }
    }
});
