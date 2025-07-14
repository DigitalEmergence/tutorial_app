import { createComponent$, appState$ } from "../../../../../shared/element.js";

createComponent$('todo-demo', (el, pageState) => {
    // Initialize todos in global app state if not exists
    if (!appState$.todos) {
        appState$.todos = [
            { id: 1, text: 'Learn Element.js basics', completed: true },
            { id: 2, text: 'Build a todo app', completed: false },
            { id: 3, text: 'Master state management', completed: false }
        ];
        appState$.nextId = 4;
    }
    
    el.define$({
        template$: () => `
            <div class="todo-demo">
                <h3>Interactive Todo List</h3>
                <p class="demo-description">This todo list uses global appState$ for persistence across page reloads!</p>
                
                <div class="todo-input-section">
                    <input type="text" class="todo-input" placeholder="Add a new todo..." maxlength="100">
                    <button class="add-todo-btn">Add Todo</button>
                </div>
                
                <div class="todo-stats">
                    <span class="total-count">Total: ${appState$.todos.length}</span>
                    <span class="completed-count">Completed: ${appState$.todos.filter(t => t.completed).length}</span>
                    <span class="remaining-count">Remaining: ${appState$.todos.filter(t => !t.completed).length}</span>
                </div>
                
                <div class="todo-filters">
                    <button class="filter-btn active" data-filter="all">All</button>
                    <button class="filter-btn" data-filter="active">Active</button>
                    <button class="filter-btn" data-filter="completed">Completed</button>
                </div>
                
                <ul class="todo-list">
                    ${renderTodos('all')}
                </ul>
                
                <div class="todo-actions">
                    <button class="clear-completed-btn">Clear Completed</button>
                    <button class="toggle-all-btn">Toggle All</button>
                </div>
            </div>
        `,
        style$: () => `
            [component] .todo-demo {
                background: white;
                border: 2px solid #e2e8f0;
                border-radius: 8px;
                padding: 2rem;
                max-width: 600px;
                margin: 0 auto;
            }
            [component] .demo-description {
                color: #718096;
                font-style: italic;
                margin-bottom: 1.5rem;
            }
            [component] .todo-input-section {
                display: flex;
                gap: 0.5rem;
                margin-bottom: 1.5rem;
            }
            [component] .todo-input {
                flex: 1;
                padding: 0.75rem;
                border: 2px solid #e2e8f0;
                border-radius: 6px;
                font-size: 1rem;
            }
            [component] .todo-input:focus {
                outline: none;
                border-color: #667eea;
            }
            [component] .add-todo-btn {
                padding: 0.75rem 1.5rem;
                background: #667eea;
                color: white;
                border: none;
                border-radius: 6px;
                cursor: pointer;
                font-weight: 500;
            }
            [component] .add-todo-btn:hover {
                background: #5a67d8;
            }
            [component] .todo-stats {
                display: flex;
                gap: 1rem;
                margin-bottom: 1rem;
                font-size: 0.9rem;
                color: #718096;
            }
            [component] .todo-filters {
                display: flex;
                gap: 0.5rem;
                margin-bottom: 1.5rem;
            }
            [component] .filter-btn {
                padding: 0.5rem 1rem;
                border: 1px solid #e2e8f0;
                background: white;
                border-radius: 4px;
                cursor: pointer;
                transition: all 0.2s;
            }
            [component] .filter-btn:hover {
                background: #f7fafc;
            }
            [component] .filter-btn.active {
                background: #667eea;
                color: white;
                border-color: #667eea;
            }
            [component] .todo-list {
                list-style: none;
                padding: 0;
                margin: 0 0 1.5rem 0;
                min-height: 200px;
            }
            [component] .todo-item {
                display: flex;
                align-items: center;
                gap: 0.75rem;
                padding: 0.75rem;
                border: 1px solid #e2e8f0;
                border-radius: 6px;
                margin-bottom: 0.5rem;
                background: white;
                transition: all 0.2s;
            }
            [component] .todo-item:hover {
                background: #f7fafc;
            }
            [component] .todo-item.completed {
                opacity: 0.6;
                background: #f0fff4;
            }
            [component] .todo-checkbox {
                width: 18px;
                height: 18px;
                cursor: pointer;
            }
            [component] .todo-text {
                flex: 1;
                font-size: 1rem;
            }
            [component] .todo-item.completed .todo-text {
                text-decoration: line-through;
                color: #718096;
            }
            [component] .delete-todo-btn {
                background: #e53e3e;
                color: white;
                border: none;
                border-radius: 4px;
                padding: 0.25rem 0.5rem;
                cursor: pointer;
                font-size: 0.8rem;
            }
            [component] .delete-todo-btn:hover {
                background: #c53030;
            }
            [component] .todo-actions {
                display: flex;
                gap: 0.5rem;
                justify-content: center;
            }
            [component] .clear-completed-btn, .toggle-all-btn {
                padding: 0.5rem 1rem;
                border: 1px solid #e2e8f0;
                background: white;
                border-radius: 4px;
                cursor: pointer;
                font-size: 0.9rem;
            }
            [component] .clear-completed-btn:hover, .toggle-all-btn:hover {
                background: #f7fafc;
            }
            [component] .empty-state {
                text-align: center;
                color: #a0aec0;
                font-style: italic;
                padding: 2rem;
            }
        `,
        onInit$: async () => {
            // Watch for changes to appState$.todos
            if (appState$.__root__ && appState$.__root__.watchEffect) {
                appState$.__root__.watchEffect((target, key, value) => {
                    if (key === 'todos' || key === 'mutated') {
                        updateTodoDisplay();
                    }
                }, (target, key, value) => target === appState$);
            }
        },
        onHydrate$: async () => {
            const todoInput = el.querySelector('.todo-input');
            const addBtn = el.querySelector('.add-todo-btn');
            
            // Add todo functionality
            const addTodo = () => {
                const text = todoInput.value.trim();
                if (text) {
                    appState$.todos.push({
                        id: appState$.nextId++,
                        text: text,
                        completed: false
                    });
                    todoInput.value = '';
                }
            };
            
            addBtn.addEventListener('click', addTodo);
            todoInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    addTodo();
                }
            });
            
            // Filter functionality
            el.addEventListener('click', (e) => {
                if (e.target.classList.contains('filter-btn')) {
                    // Update active filter
                    el.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
                    e.target.classList.add('active');
                    
                    // Update display
                    const filter = e.target.dataset.filter;
                    updateTodoList(filter);
                }
                
                // Toggle todo completion
                if (e.target.classList.contains('todo-checkbox')) {
                    const todoId = parseInt(e.target.dataset.id);
                    const todo = appState$.todos.find(t => t.id === todoId);
                    if (todo) {
                        todo.completed = !todo.completed;
                    }
                }
                
                // Delete todo
                if (e.target.classList.contains('delete-todo-btn')) {
                    const todoId = parseInt(e.target.dataset.id);
                    const index = appState$.todos.findIndex(t => t.id === todoId);
                    if (index !== -1) {
                        appState$.todos.splice(index, 1);
                    }
                }
                
                // Clear completed
                if (e.target.classList.contains('clear-completed-btn')) {
                    appState$.todos = appState$.todos.filter(t => !t.completed);
                }
                
                // Toggle all
                if (e.target.classList.contains('toggle-all-btn')) {
                    const allCompleted = appState$.todos.every(t => t.completed);
                    appState$.todos.forEach(t => t.completed = !allCompleted);
                }
            });
        }
    });
    
    function renderTodos(filter = 'all') {
        let filteredTodos = appState$.todos;
        
        if (filter === 'active') {
            filteredTodos = appState$.todos.filter(t => !t.completed);
        } else if (filter === 'completed') {
            filteredTodos = appState$.todos.filter(t => t.completed);
        }
        
        if (filteredTodos.length === 0) {
            return '<li class="empty-state">No todos to display</li>';
        }
        
        return filteredTodos.map(todo => `
            <li class="todo-item ${todo.completed ? 'completed' : ''}">
                <input type="checkbox" class="todo-checkbox" data-id="${todo.id}" ${todo.completed ? 'checked' : ''}>
                <span class="todo-text">${todo.text}</span>
                <button class="delete-todo-btn" data-id="${todo.id}">Delete</button>
            </li>
        `).join('');
    }
    
    function updateTodoDisplay() {
        // Update stats
        const totalCount = el.querySelector('.total-count');
        const completedCount = el.querySelector('.completed-count');
        const remainingCount = el.querySelector('.remaining-count');
        
        if (totalCount) totalCount.textContent = `Total: ${appState$.todos.length}`;
        if (completedCount) completedCount.textContent = `Completed: ${appState$.todos.filter(t => t.completed).length}`;
        if (remainingCount) remainingCount.textContent = `Remaining: ${appState$.todos.filter(t => !t.completed).length}`;
        
        // Update list with current filter
        const activeFilter = el.querySelector('.filter-btn.active');
        const filter = activeFilter ? activeFilter.dataset.filter : 'all';
        updateTodoList(filter);
    }
    
    function updateTodoList(filter) {
        const todoList = el.querySelector('.todo-list');
        if (todoList) {
            todoList.innerHTML = renderTodos(filter);
        }
    }
});
