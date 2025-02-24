# @blinkx/editor

> **⚠️ ACTIVE DEVELOPMENT / BETA**: This package is currently in active development and beta testing. For questions, support, or to report issues, please reach out to:
> - Jonathan / RicheTechGuy
> - GitHub: [@JonathanRiche](https://github.com/JonathanRiche)

A powerful visual editor built with GrapesJS and Monaco Editor, available for both Svelte and Solid.js.

## Installation

For Svelte:
```bash
bun install @blinkx/editor svelte
# or
npm install @blinkx/editor svelte
```

For Solid.js:
```bash
bun install @blinkx/editor solid-js
# or
npm install @blinkx/editor solid-js
```

## Important Configuration Notes

### Vite Users
If you're using Vite with the Solid.js version, you must add the following to your `vite.config.ts` to prevent initialization issues in production builds:

```typescript
export default defineConfig({
  resolve: {
    dedupe: ['solid-js']
  }
  // ... other config options
});
```

### CSS Imports
The package includes required styles that can be imported in two ways:

```typescript
// Option 1: Direct CSS import
import '@blinkx/editor/css/editor.css';

// Option 2: Styles are automatically included when using framework components
import { Editor } from '@blinkx/editor/solid'; // or /svelte
```

## Usage

### Core Editor
```typescript
import { configureEditor } from '@blinkx/editor';

const editor = configureEditor({
  container: '#editor',
  // other options
});
```

### Svelte Component
```svelte
<script>
import { Editor } from '@blinkx/editor/svelte';
</script>

<Editor theme="light" />
```

### Solid Component
```typescript
import { Editor } from '@blinkx/editor/solid';

function App() {
  return <Editor theme="light" />;
}
```

## Component Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| theme | 'light' \| 'dark' | 'light' | Editor theme selection |
| config | EditorConfig | {} | Additional editor configuration |

## TypeScript Support

The package includes TypeScript declarations. You can import types as follows:

```typescript
import type { VisualEditor, EditorConfig } from '@blinkx/editor';
```

## Asset Handling

The package handles all required assets (images, fonts, etc.) internally. You don't need any additional configuration for asset loading.

## Browser Support

This package requires a modern browser environment with support for:
- ES6+ features
- Web Workers (for Monaco Editor)
## Known Issues

1. Monaco Editor requires proper web worker setup in your build environment.
2. In development mode, you might see web worker-related console warnings which don't affect functionality.

## Contributing

For bug reports and feature requests, please open an issue on the GitHub repository.

## License

[License Type] - see LICENSE file for details
