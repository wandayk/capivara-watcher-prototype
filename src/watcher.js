'use strict';

const chokidar = require('chokidar');
const EventEmitter = require('events');

/**
 * Capivara Watcher - monitors file system changes in a directory.
 */
class Watcher extends EventEmitter {
  /**
   * @param {string|string[]} paths - Path(s) to watch
   * @param {object} [options] - Chokidar options
   */
  constructor(paths, options = {}) {
    super();
    this._paths = paths;
    this._options = options;
    this._watcher = null;
  }

  /**
   * Start watching.
   * Emits 'add', 'change', 'unlink', 'addDir', 'unlinkDir', 'error', 'ready'.
   */
  start() {
    this._watcher = chokidar.watch(this._paths, {
      persistent: true,
      ignoreInitial: false,
      ...this._options,
    });

    const forwardEvents = ['add', 'change', 'unlink', 'addDir', 'unlinkDir', 'error', 'ready'];
    forwardEvents.forEach((event) => {
      this._watcher.on(event, (...args) => this.emit(event, ...args));
    });

    return this;
  }

  /**
   * Stop watching and clean up resources.
   * @returns {Promise<void>}
   */
  async stop() {
    if (this._watcher) {
      await this._watcher.close();
      this._watcher = null;
    }
  }

  /**
   * Returns true if the watcher is currently active.
   * @returns {boolean}
   */
  isWatching() {
    return this._watcher !== null;
  }
}

module.exports = Watcher;
