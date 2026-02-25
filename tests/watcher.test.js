'use strict';

const fs = require('fs');
const path = require('path');
const os = require('os');
const Watcher = require('../src/watcher');

function tmpDir() {
  return fs.mkdtempSync(path.join(os.tmpdir(), 'capivara-test-'));
}

describe('Watcher', () => {
  let watcher;
  let dir;

  beforeEach(() => {
    dir = tmpDir();
  });

  afterEach(async () => {
    if (watcher) {
      await watcher.stop();
      watcher = null;
    }
    fs.rmSync(dir, { recursive: true, force: true });
  });

  test('isWatching() returns false before start', () => {
    watcher = new Watcher(dir);
    expect(watcher.isWatching()).toBe(false);
  });

  test('isWatching() returns true after start', () => {
    watcher = new Watcher(dir);
    watcher.start();
    expect(watcher.isWatching()).toBe(true);
  });

  test('isWatching() returns false after stop', async () => {
    watcher = new Watcher(dir);
    watcher.start();
    await watcher.stop();
    expect(watcher.isWatching()).toBe(false);
  });

  test('emits ready event', (done) => {
    watcher = new Watcher(dir);
    watcher.on('ready', done);
    watcher.start();
  });

  test('emits add event when a file is created', (done) => {
    const filePath = path.join(dir, 'hello.txt');

    watcher = new Watcher(dir);
    watcher.on('ready', () => {
      fs.writeFileSync(filePath, 'hello');
    });
    watcher.on('add', (p) => {
      if (p === filePath) done();
    });
    watcher.start();
  }, 5000);

  test('emits change event when a file is modified', (done) => {
    const filePath = path.join(dir, 'watch.txt');
    fs.writeFileSync(filePath, 'initial');

    watcher = new Watcher(dir, { ignoreInitial: true });
    watcher.on('ready', () => {
      fs.writeFileSync(filePath, 'updated');
    });
    watcher.on('change', (p) => {
      if (p === filePath) done();
    });
    watcher.start();
  }, 5000);

  test('emits unlink event when a file is deleted', (done) => {
    const filePath = path.join(dir, 'delete-me.txt');
    fs.writeFileSync(filePath, 'bye');

    watcher = new Watcher(dir, { ignoreInitial: true });
    watcher.on('ready', () => {
      fs.unlinkSync(filePath);
    });
    watcher.on('unlink', (p) => {
      if (p === filePath) done();
    });
    watcher.start();
  }, 5000);

  test('start() returns the watcher instance for chaining', () => {
    watcher = new Watcher(dir);
    const result = watcher.start();
    expect(result).toBe(watcher);
  });
});
