import { createComponent$ } from "../../../../../shared/element.js";

createComponent$('hello-world', (el, pageState) => {
    el.define$({
        template$: () => `
            <div class="greeting">
                <h2>Hello, Element.js!</h2>
                <p>Welcome to the future of web development</p>
            </div>
        `,
        style$: () => `
            [component] .greeting {
                padding: 20px;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                border-radius: 8px;
                text-align: center;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            }
            [component] .greeting h2 {
                margin: 0 0 10px 0;
                font-size: 1.5rem;
            }
            [component] .greeting p {
                margin: 0;
                opacity: 0.9;
            }
        `,
        onInit$: async () => {
            console.log('Hello World component initialized!');
        }
    });
});
