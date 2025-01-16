# LSP Code Sample Component

Show your code. Exactly how you see it in editor.

This React component renders a code sample expressed as a specific
object. The code is semantically highlighted.

Requires Node.js 21 in case the React component will be ran at server side (due to `Object.groupBy`).

## Installation

```bash
npm i lsp-code-sample
```

## Usage

The code sample component is a *server component*.
However, the copy button needs interactivity and therefore it is
a client component. You can substitute the button for your own if
you have different requirements.

### Customizing

The component ships with a stylesheet:

```js
import 'lsp-code-sample/style.css';
```

The class names are not mangled, so you can quite easily enhance the style.
This comes in handy especially for defining custom token types.

