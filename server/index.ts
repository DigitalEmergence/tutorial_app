import type { ServerContext } from "../shared/jsphere.d.ts";
import { renderDocument$ } from "../shared/element.js";
import "../shared/dependencies.js";

export async function onGET(ctx: ServerContext): Promise<Response> {
    try {
        const pathname = ctx.request.url.pathname;
        console.log('Requested pathname:', pathname);
        
        // Route tutorial pages - handle both /tutorial/lesson and /lesson patterns
        if (pathname.startsWith('/tutorial/')) {
            const lesson = pathname.split('/')[2] || 'welcome';
            const validLessons = ['welcome', 'lifecycle', 'state', 'communication', 'server', 'advanced'];
            
            if (validLessons.includes(lesson)) {
                console.log('Serving tutorial lesson:', lesson);
                const document = await renderDocument$({ 
                    file: `/tutorial_app/client/components/pages/tutorial/${lesson}/${lesson}.html` 
                }, ctx) as Element;
                
                return ctx.response.html('<!doctype html>' + document.outerHTML);
            }
        }
        
        // Handle direct lesson access (e.g., /welcome, /lifecycle, /state)
        const requestedFile = pathname === '/' ? 'index' : pathname.split('/')[1] || 'index';
        const tutorialLessons = ['welcome', 'lifecycle', 'state', 'communication', 'server', 'advanced'];
        
        if (tutorialLessons.includes(requestedFile)) {
            console.log('Serving tutorial lesson directly:', requestedFile);
            const document = await renderDocument$({ 
                file: `/tutorial_app/client/components/pages/tutorial/${requestedFile}/${requestedFile}.html` 
            }, ctx) as Element;
            
            return ctx.response.html('<!doctype html>' + document.outerHTML);
        }
        
        // Default to index page or other pages
        console.log('Serving page:', requestedFile);
        const document = await renderDocument$({ 
            file: `/tutorial_app/client/components/pages/${requestedFile}/${requestedFile}.html` 
        }, ctx) as Element;
        
        return ctx.response.html('<!doctype html>' + document.outerHTML);
    }
    catch (e) {
        console.error('Server error:', e);
        return ctx.response.html(`
            <!DOCTYPE html>
            <html>
                <head><title>Error</title></head>
                <body>
                    <h1>Error</h1>
                    <p>${(e as Error).message}</p>
                    <p>Available routes:</p>
                    <ul>
                        <li><a href="/">/</a> - Home page</li>
                        <li><a href="/tutorial/welcome">/tutorial/welcome</a> - Tutorial Welcome</li>
                        <li><a href="/tutorial/lifecycle">/tutorial/lifecycle</a> - Component Lifecycle</li>
                        <li><a href="/tutorial/state">/tutorial/state</a> - State Management</li>
                    </ul>
                </body>
            </html>
        `);
    }
}
