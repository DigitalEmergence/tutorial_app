import { createComponent$, navigateTo$ } from "../../../../../shared/element.js";

createComponent$('tutorial-nav', (el, pageState) => {
    el.define$({
        template$: () => `
            <nav class="tutorial-nav">
                <div class="nav-brand">
                    <h2>Element.js Tutorial</h2>
                </div>
                <div class="nav-lessons">
                    <a href="/tutorial/welcome" class="nav-lesson ${el.getAttribute('data-current') === 'welcome' ? 'active' : ''}" data-lesson="welcome">
                        <span class="lesson-number">1</span>
                        <span class="lesson-title">Welcome</span>
                    </a>
                    <a href="/tutorial/lifecycle" class="nav-lesson ${el.getAttribute('data-current') === 'lifecycle' ? 'active' : ''}" data-lesson="lifecycle">
                        <span class="lesson-number">2</span>
                        <span class="lesson-title">Lifecycle</span>
                    </a>
                    <a href="/tutorial/state" class="nav-lesson ${el.getAttribute('data-current') === 'state' ? 'active' : ''}" data-lesson="state">
                        <span class="lesson-number">3</span>
                        <span class="lesson-title">State</span>
                    </a>
                </div>
            </nav>
        `,
        style$: () => `
            [component] .tutorial-nav {
                background: rgba(255, 255, 255, 0.1);
                backdrop-filter: blur(10px);
                border-bottom: 1px solid rgba(255, 255, 255, 0.2);
                padding: 1rem 2rem;
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 2rem;
            }
            [component] .nav-brand h2 {
                margin: 0;
                color: #667eea;
                font-size: 1.5rem;
            }
            [component] .nav-lessons {
                display: flex;
                gap: 1rem;
            }
            [component] .nav-lesson {
                display: flex;
                align-items: center;
                gap: 0.5rem;
                padding: 0.5rem 1rem;
                border-radius: 6px;
                text-decoration: none;
                color: #cbd5e0;
                transition: all 0.3s ease;
                border: 1px solid transparent;
                cursor: pointer;
            }
            [component] .nav-lesson:hover {
                background: rgba(255, 255, 255, 0.1);
                color: white;
            }
            [component] .nav-lesson.active {
                background: #667eea;
                color: white;
                border-color: #5a67d8;
            }
            [component] .lesson-number {
                background: rgba(255, 255, 255, 0.2);
                width: 24px;
                height: 24px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 0.8rem;
                font-weight: bold;
            }
            [component] .nav-lesson.active .lesson-number {
                background: rgba(255, 255, 255, 0.3);
            }
        `,
        onHydrate$: async () => {
            // Add click handlers to navigation links
            const navLinks = el.querySelectorAll('.nav-lesson');
            navLinks.forEach(link => {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    const href = link.getAttribute('href');
                    const lesson = link.getAttribute('data-lesson');
                    
                    // Update active state
                    navLinks.forEach(l => l.classList.remove('active'));
                    link.classList.add('active');
                    
                    // Navigate to the lesson
                    console.log(`Navigating to ${lesson} lesson at ${href}`);
                    
                    // For now, just show an alert since we don't have the other pages set up
                    if (lesson !== 'welcome') {
                        alert(`${lesson.charAt(0).toUpperCase() + lesson.slice(1)} lesson coming soon!`);
                    } else {
                        // Reload current page
                        window.location.reload();
                    }
                });
            });
        }
    });
});
