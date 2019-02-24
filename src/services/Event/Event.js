class Event {
  constructor() {
    this.listeners = {};
  }

  addListener(name, callback) {
    if (!this.listeners[name]) {
      this.listeners[name] = new Set();
    }

    this.listeners[name].add(callback);
  }

  removeListener(name, callback) {
    if (this.listeners[name]) {
      this.listeners[name].delete(callback);
    }
  }

  trigger(name, ...args) {
    if (this.listeners[name]) {
      this.listeners[name].forEach(callback => callback(...args));
    }
  }
}

let event = new Event();
export default event;
