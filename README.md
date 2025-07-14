# Element.js Interactive Tutorial

This is an interactive tutorial for learning Element.js, a native JavaScript
framework that runs without transpilation.

## Tutorial Structure

The tutorial is organized into progressive lessons:

1. **Welcome** (`/tutorial/welcome`) - Introduction to Element.js and basic
   component creation
2. **Lifecycle** (`/tutorial/lifecycle`) - Component lifecycle methods and
   rendering
3. **State Management** (`/tutorial/state`) - Reactive state with observe$ and
   component state$
4. **Communication** (`/tutorial/communication`) - Component communication and
   messaging (planned)
5. **Server Integration** (`/tutorial/server`) - Server-side rendering and API
   integration (planned)
6. **Advanced Features** (`/tutorial/advanced`) - Advanced patterns and best
   practices (planned)

## Features

- **Interactive Code Editor**: Write and test Element.js components directly in
  the browser
- **Live Demos**: See components in action with real-time updates
- **Progressive Learning**: Each lesson builds on the previous one
- **Server-Side Rendering**: Demonstrates both client and server capabilities
- **Reactive State Management**: Learn about observe$ and global app state

## Key Element.js Concepts Covered

### Component Creation

```javascript
createComponent$("my-component", (el) => {
    el.define$({
        template$: () => `<div>Hello World</div>`,
        style$: () => `[component] div { color: blue; }`,
        onInit$: async () => {/* initialization */},
        onRender$: async () => {/* rendering logic */},
        onHydrate$: async () => {/* client-side hydration */},
    });
});
```

### Reactive State

```javascript
const [state, watchState] = observe$({
    count: 0,
    items: [],
});

// Watch for changes
watchState((target, key, value) => {
    console.log(`${key} changed to:`, value);
});
```

### Global App State

```javascript
import { appState$ } from "./element.js";

// Persistent state across page reloads
appState$.user = { name: "John", preferences: {} };
```

## Running the Tutorial

1. Start a JSphere server or any static file server
2. Navigate to `/tutorial/welcome` to begin
3. Follow the navigation between lessons
4. Try the interactive code examples

## File Structure

```
test123/
├── client/
│   ├── components/
│   │   └── pages/
│   │       ├── index/           # Home page
│   │       └── tutorial/        # Tutorial lessons
│   │           ├── welcome/     # Lesson 1
│   │           ├── lifecycle/   # Lesson 2
│   │           └── state/       # Lesson 3
│   └── css/
│       └── global.css          # Global styles
├── server/
│   └── index.ts                # Server-side routing
└── shared/
    ├── element.js              # Element.js framework
    ├── dependencies.js         # Component registry
    └── jsphere.d.ts           # TypeScript definitions
```

## Element.js Features Demonstrated

- **No Build Step**: Components work directly in the browser
- **Server-Side Rendering**: Full SSR support with hydration
- **Component Lifecycle**: onInit$, onRender$, onHydrate$ methods
- **Reactive State**: observe$ function for reactive data
- **Scoped Styling**: Component-scoped CSS with [component] selector
- **Client/Server Code Sharing**: Same components work on both sides
- **Progressive Enhancement**: Components hydrate seamlessly
- **Built-in Routing**: URL-based navigation with history API

This tutorial showcases Element.js as a modern, native JavaScript framework that
eliminates the need for complex build tools while providing powerful features
for building interactive web applications.
