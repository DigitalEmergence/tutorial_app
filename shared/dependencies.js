import { registerDependencies$, registerServerDependencies$ } from './element.js';

registerDependencies$({
    'index': '/test123/client/components/pages/index/index.js',
    'welcome': '/test123/client/components/pages/tutorial/welcome/welcome.js',
    'lifecycle': '/test123/client/components/pages/tutorial/lifecycle/lifecycle.js',
    'state': '/test123/client/components/pages/tutorial/state/state.js',
    'tutorial-welcome': '/test123/client/components/pages/tutorial/welcome/tutorial-welcome.js',
    'tutorial-lifecycle': '/test123/client/components/pages/tutorial/lifecycle/tutorial-lifecycle.js',
    'tutorial-state': '/test123/client/components/pages/tutorial/state/tutorial-state.js',
    'tutorial-nav': '/test123/client/components/pages/tutorial/welcome/tutorial-nav.js',
    'code-editor': '/test123/client/components/pages/tutorial/welcome/code-editor.js',
    'hello-world': '/test123/client/components/pages/tutorial/welcome/hello-world.js',
    'tutorial-button': '/test123/client/components/pages/tutorial/welcome/tutorial-button.js',
    'interactive-counter': '/test123/client/components/pages/tutorial/welcome/interactive-counter.js',
    'lifecycle-demo': '/test123/client/components/pages/tutorial/lifecycle/lifecycle-demo.js',
    'reactive-demo': '/test123/client/components/pages/tutorial/state/reactive-demo.js',
    'todo-demo': '/test123/client/components/pages/tutorial/state/todo-demo.js'
})

registerServerDependencies$({
})
