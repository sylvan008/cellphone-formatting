class AbstractObserver {
  constructor(value) {
    this._listeners = new Set();
  }

  addListener(listener) {
    this._listeners.add(listener);
  }

  removeListener(listener) {
    this._listeners.delete(listener);
  }

  _notify(payload) {
    this._listeners.forEach((listener) => listener(payload));
  }
}

export {
  AbstractObserver,
};
