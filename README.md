# capivara-watcher-prototype

A simple file system watcher prototype that monitors directories for changes and reports events in real time.

## Features

- Watches one or more directories for file system changes
- Reports `add`, `change`, `unlink`, `addDir`, and `unlinkDir` events
- Timestamped console output with emoji indicators
- Simple CLI interface

## Installation

```bash
npm install
```

## Usage

### CLI

```bash
node src/index.js <path> [path2 ...]
```

Example:

```bash
node src/index.js ./src ./tests
```

Output:

```
👀 Watching: /project/src, /project/tests
Press Ctrl+C to stop.

[2026-02-25T00:00:00.000Z] Ready. Watching for changes...

[2026-02-25T00:00:01.000Z] ➕ added: /project/src/new-file.js
[2026-02-25T00:00:02.000Z] ✏️  changed: /project/src/new-file.js
[2026-02-25T00:00:03.000Z] 🗑️  removed: /project/src/new-file.js
```

### Programmatic API

```js
const Watcher = require('./src/watcher');

const watcher = new Watcher('./src');

watcher.on('ready', () => console.log('Ready'));
watcher.on('add', (path) => console.log('Added:', path));
watcher.on('change', (path) => console.log('Changed:', path));
watcher.on('unlink', (path) => console.log('Removed:', path));
watcher.on('error', (err) => console.error('Error:', err));

watcher.start();

// Later:
await watcher.stop();
```

## API

### `new Watcher(paths, [options])`

- **`paths`** `{string|string[]}` — Path(s) to watch.
- **`options`** `{object}` — Optional [chokidar options](https://github.com/paulmillr/chokidar#api).

### `watcher.start()`

Start watching. Returns `this` for chaining.

### `watcher.stop()`

Stop watching and clean up. Returns a `Promise<void>`.

### `watcher.isWatching()`

Returns `true` if the watcher is currently active.

### Events

| Event       | Arguments | Description           |
|-------------|-----------|-----------------------|
| `ready`     | —         | Initial scan complete |
| `add`       | `path`    | File was added        |
| `change`    | `path`    | File was changed      |
| `unlink`    | `path`    | File was removed      |
| `addDir`    | `path`    | Directory was added   |
| `unlinkDir` | `path`    | Directory was removed |
| `error`     | `Error`   | An error occurred     |

## Tests

```bash
npm test
```
