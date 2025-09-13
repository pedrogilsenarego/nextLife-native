// shims/events.js
// a no-op EventEmitter
class EventEmitter {
    on() {}
    off() {}
    emit() {}
  }
  module.exports = EventEmitter;
  