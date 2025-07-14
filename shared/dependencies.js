import { registerDependencies$, registerServerDependencies$ } from './element.js';

registerDependencies$({
    'index': '/tutorial_app/client/components/pages/index/index.js',
    'welcome': '/tutorial_app/client/components/pages/tutorial/welcome/welcome.js',
    'lifecycle': '/tutorial_app/client/components/pages/tutorial/lifecycle/lifecycle.js',
    'state': '/tutorial_app/client/components/pages/tutorial/state/state.js',
    'tutorial-welcome': '/tutorial_app/client/components/pages/tutorial/welcome/tutorial-welcome.js',
    'tutorial-lifecycle': '/tutorial_app/client/components/pages/tutorial/lifecycle/tutorial-lifecycle.js',
    'tutorial-state': '/tutorial_app/client/components/pages/tutorial/state/tutorial-state.js',
    'tutorial-nav': '/tutorial_app/client/components/pages/tutorial/welcome/tutorial-nav.js',
    'code-editor': '/tutorial_app/client/components/pages/tutorial/welcome/code-editor.js',
    'hello-world': '/tutorial_app/client/components/pages/tutorial/welcome/hello-world.js',
    'tutorial-button': '/tutorial_app/client/components/pages/tutorial/welcome/tutorial-button.js',
    'interactive-counter': '/tutorial_app/client/components/pages/tutorial/welcome/interactive-counter.js',
    'lifecycle-demo': '/tutorial_app/client/components/pages/tutorial/lifecycle/lifecycle-demo.js',
    'reactive-demo': '/tutorial_app/client/components/pages/tutorial/state/reactive-demo.js',
    'todo-demo': '/tutorial_app/client/components/pages/tutorial/state/todo-demo.js'
})

registerServerDependencies$({
})
