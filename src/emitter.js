const emitter = {
  events: {},
  on(name, fn) {
    if (this.events[name] === undefined) this.events[name] = [];
    this.events[name].push(fn);
  },
  emit(name, ...args) {
    if (this.events[name]) this.events[name].forEach(fn => fn(...args));
  }
};
emitter.emit.bind(this);
emitter.on.bind(this);

export default emitter;
