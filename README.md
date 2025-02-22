# @blinkx/editor

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
