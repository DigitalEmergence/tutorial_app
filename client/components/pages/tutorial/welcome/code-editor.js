import { createComponent$ } from "../../../../../shared/element.js";

createComponent$('code-editor', (el, pageState) => {
    el.define$({
        template$: () => `
            <div class="code-editor">
                <div class="editor-header">
                    <h3>Try it yourself!</h3>
                    <button class="run-btn">Run Code</button>
                </div>
                <div class="editor-content">
                    <textarea class="code-input" placeholder="Write your Element.js component here...">
import { createComponent$ } from '/tutorial_app/shared/element.js';

createComponent$('my-component', (el, pageState) => {
    el.define$({
        template$: () => \`
            <div class="my-component">
                <h3>Hello from my component!</h3>
                <p>This is a custom Element.js component.</p>
            </div>
        \`,
        style$: () => \`
            [component] .my-component {
                padding: 1rem;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                border-radius: 8px;
                color: white;
                text-align: center;
            }
        \`
    });
});
                    </textarea>
                    <div class="preview-area">
                        <h4>Preview:</h4>
                        <div class="preview-content" el-is="my-component" el-id="preview-component"></div>
                    </div>
                </div>
            </div>
        `,
        style$: () => `
            [component] .code-editor {
                background: rgba(0, 0, 0, 0.3);
                border-radius: 8px;
                padding: 1.5rem;
                margin: 2rem 0;
            }
            [component] .editor-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 1rem;
            }
            [component] .editor-header h3 {
                margin: 0;
                color: #667eea;
            }
            [component] .run-btn {
                background: #667eea;
                color: white;
                border: none;
                padding: 0.5rem 1rem;
                border-radius: 4px;
                cursor: pointer;
                transition: background 0.3s ease;
            }
            [component] .run-btn:hover {
                background: #5a67d8;
            }
            [component] .editor-content {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 1rem;
            }
            [component] .code-input {
                background: #1a202c;
                color: #e2e8f0;
                border: 1px solid #4a5568;
                border-radius: 4px;
                padding: 1rem;
                font-family: 'Courier New', monospace;
                font-size: 0.9rem;
                line-height: 1.4;
                resize: vertical;
                min-height: 300px;
            }
            [component] .preview-area {
                background: #2d3748;
                border-radius: 4px;
                padding: 1rem;
            }
            [component] .preview-area h4 {
                margin: 0 0 1rem 0;
                color: #cbd5e0;
                font-size: 1rem;
            }
            [component] .preview-content {
                min-height: 200px;
                background: rgba(255, 255, 255, 0.05);
                border-radius: 4px;
                padding: 1rem;
            }
        `,
        onHydrate$: () => {
            const runBtn = el.querySelector('.run-btn');
            const codeInput = el.querySelector('.code-input');
            const previewContent = el.querySelector('.preview-content');
            
            // Set initial code from data attribute
            const initialCode = el.getAttribute('data-initial-code');
            if (initialCode && codeInput) {
                codeInput.value = initialCode;
            }
            
            let componentCounter = 0;
            
            runBtn.addEventListener('click', () => {
                try {
                    const code = codeInput.value;
                    componentCounter++;
                    
                    // Clear previous preview
                    previewContent.innerHTML = '<div style="color: #cbd5e0;">Running code...</div>';
                    
                    // Create a unique component name to avoid conflicts
                    const uniqueName = `custom_component_${componentCounter}`;
                    
                    // Replace the component name in the code
                    const modifiedCode = code.replace(
                        /createComponent\$\(['"]([^'"]+)['"]/, 
                        `createComponent$('${uniqueName}'`
                    );
                    
                    // Create and execute the script
                    const script = document.createElement('script');
                    script.type = 'module';
                    script.textContent = modifiedCode;
                    
                    // Add error handling
                    script.onerror = (error) => {
                        console.error('Script execution error:', error);
                        previewContent.innerHTML = `
                            <div style="color: #f56565; padding: 1rem; background: rgba(245, 101, 101, 0.1); border-radius: 4px;">
                                <strong>Error:</strong> Failed to execute code
                                <br><small>Check the console for more details.</small>
                            </div>
                        `;
                    };
                    
                    document.head.appendChild(script);
                    
                    // Create the preview element and initialize it
                    setTimeout(() => {
                        try {
                            previewContent.innerHTML = `<div el-is="${uniqueName}" el-id="preview-${componentCounter}"></div>`;
                            const componentEl = previewContent.querySelector(`[el-is="${uniqueName}"]`);
                            
                            if (componentEl) {
                                // Import the element.js functions we need
                                import('../../../../../shared/element.js').then(module => {
                                    // Initialize the component manually
                                    const initElementAsComponent = window.initElementAsComponent || function(el, state) {
                                        // Basic initialization if the function isn't available
                                        if (el.init$) {
                                            el.init$({});
                                        }
                                    };
                                    
                                    // Set up the component
                                    componentEl.setAttribute('el-component-state', '-1');
                                    initElementAsComponent(componentEl, {});
                                    
                                    if (componentEl.init$) {
                                        componentEl.init$({}).catch(err => {
                                            console.error('Component initialization error:', err);
                                            previewContent.innerHTML = `
                                                <div style="color: #f56565; padding: 1rem; background: rgba(245, 101, 101, 0.1); border-radius: 4px;">
                                                    <strong>Error:</strong> Component failed to initialize
                                                    <br><small>${err.message}</small>
                                                </div>
                                            `;
                                        });
                                    }
                                });
                            }
                        } catch (error) {
                            console.error('Component creation error:', error);
                            previewContent.innerHTML = `
                                <div style="color: #f56565; padding: 1rem; background: rgba(245, 101, 101, 0.1); border-radius: 4px;">
                                    <strong>Error:</strong> ${error.message}
                                    <br><small>Check your component syntax.</small>
                                </div>
                            `;
                        }
                        
                        // Clean up the script
                        document.head.removeChild(script);
                    }, 100);
                    
                } catch (error) {
                    console.error('Code execution error:', error);
                    previewContent.innerHTML = `
                        <div style="color: #f56565; padding: 1rem; background: rgba(245, 101, 101, 0.1); border-radius: 4px;">
                            <strong>Error:</strong> ${error.message}
                            <br><small>Check the console for more details.</small>
                        </div>
                    `;
                }
            });
            
            // Show a simple demo initially
            previewContent.innerHTML = `
                <div style="padding: 1rem; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 8px; color: white; text-align: center;">
                    <h3>Hello from Element.js!</h3>
                    <p>Click "Run Code" to see your component in action!</p>
                </div>
            `;
        }
    });
});
