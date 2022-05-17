import { AbstractObserver } from '../observer/observer.js';

class PhoneInputModel extends AbstractObserver {
  constructor(value) {
    super();

    this._value = value;
  }

  getValue() {
    return this._value;
  }

  updateValue(newValue) {
    this._value = newValue;
    this._notify(this._value);
  }
}

export {
  PhoneInputModel,
};
