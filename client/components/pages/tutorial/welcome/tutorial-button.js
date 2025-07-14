import { createComponent$ } from "../../../../../shared/element.js";

createComponent$('tutorial-button', (el, pageState) => {
    el.define$({
        template$: () => {
            return `<span class="button-content">${el.textContent}</span>`;
        },
        style$: () => `
            [component] {
                display: inline-block;
                padding: 12px 24px;
                border: none;
                border-radius: 6px;
                font-size: 1rem;
                font-weight: 500;
                text-decoration: none;
                cursor: pointer;
                transition: all 0.2s ease;
                background: #667eea;
                color: white;
            }
            [component]:hover {
                background: #5a67d8;
                transform: translateY(-1px);
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
            }
            [component][data-variant="primary"] {
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            }
            [component][data-variant="primary"]:hover {
                background: linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%);
            }
            [component] .button-content {
                display: block;
            }
        `,
        onHydrate$: async () => {
            el.addEventListener('click', (e) => {
                e.preventDefault();
                const href = el.getAttribute('data-href');
                if (href && href !== '#') {
                    window.location.href = href;
                }
            });
        }
    });
});
