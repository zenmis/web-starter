## Installation

```bash
npx degit zenmis/web-starter <project-name>
```

## Development

```bash
npm i
npm run dev
```

## Production preview

```bash
npm run build
npm run preivew
```

## Build only the frontend

Ensure your application's entry point uses `createRoot` for rendering.

```javascript
import { createRoot } from 'react-dom/client'
import App from './App'

createRoot(document.getElementById('root')!).render(
  <App />
)
```

Build `src`.

```bash
npm run build:src
```

Deploy the `dist/src` directory to a static web server or hosting service.

## Build as a library

Develop your library code in the `lib` directory and build it.

```bash
npm run build:lib
```

Configure `package.json` for Publishing.

```json
{
  "name": "",
  "version": "1.0.0",
  "type": "module",
  "main": "dist/lib/index.js",
  "scripts": {
    "build:lib": "vite build -c vite.lib.config.ts",
    "prepublishOnly": "npm run build:lib"
  },
  "files": [
    "dist/lib"
  ],
  "author": "",
  "license": "",
  "description": "",
  "keywords": [],
  "homepage": "",
  "repository": "",
  "dependencies": {},
  "peerDependencies": {},
  "devDependencies": {}
}
```

Publish to `npm`.

```bash
npm publish
```
