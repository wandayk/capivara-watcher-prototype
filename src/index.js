#!/usr/bin/env node
'use strict';

const path = require('path');
const Watcher = require('./watcher');

const EVENTS = {
  add: '➕ added',
  change: '✏️  changed',
  unlink: '🗑️  removed',
  addDir: '📁 directory added',
  unlinkDir: '📁 directory removed',
};

function formatTimestamp() {
  return new Date().toISOString();
}

function main() {
  const args = process.argv.slice(2);

  if (args.length === 0 || args.includes('--help') || args.includes('-h')) {
    console.log('Usage: capivara-watcher <path> [path2 ...]');
    console.log('');
    console.log('Options:');
    console.log('  -h, --help     Show this help message');
    console.log('');
    console.log('Example:');
    console.log('  capivara-watcher ./src');
    process.exit(args.includes('--help') || args.includes('-h') ? 0 : 1);
  }

  const watchPaths = args.map((p) => path.resolve(p));

  console.log(`👀 Watching: ${watchPaths.join(', ')}`);
  console.log('Press Ctrl+C to stop.\n');

  const watcher = new Watcher(watchPaths);

  watcher.on('ready', () => {
    console.log(`[${formatTimestamp()}] Ready. Watching for changes...\n`);
  });

  Object.keys(EVENTS).forEach((event) => {
    watcher.on(event, (filePath) => {
      console.log(`[${formatTimestamp()}] ${EVENTS[event]}: ${filePath}`);
    });
  });

  watcher.on('error', (err) => {
    console.error(`[${formatTimestamp()}] ❌ Error: ${err.message}`);
  });

  watcher.start();

  process.on('SIGINT', async () => {
    console.log('\nStopping watcher...');
    await watcher.stop();
    process.exit(0);
  });
}

main();
