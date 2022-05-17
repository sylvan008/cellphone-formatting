import { AbstractComponent } from '../abstract-component/abstract-component.js';
import { CallbackType } from '../constant/callback-type.js';
import {isRemoveKeyPressed} from '../utils/utils.js';

class InputPhone extends AbstractComponent {
  constructor(element) {
    super();

    this._element = element;
    this._inputNumberHandler = this._inputNumberHandler.bind(this);
    this.updateInputValue = this.updateInputValue.bind(this);
    this._inputKeydownHandler = this._inputKeydownHandler.bind(this);
  }

  setInputHandler(callback) {
    this._callback[CallbackType.INPUT_NUMBER] = callback;
    this._element.addEventListener('input', this._inputNumberHandler);
  }

  _inputNumberHandler(event) {
    this._callback[CallbackType.INPUT_NUMBER](event.target.value, event.data);
  }

  setKeydownHandler(callback) {
    this._callback[CallbackType.INPUT_REMOVE_KEYDOWN] = callback;
    this._element.addEventListener('keydown', this._inputKeydownHandler);
  }

  _inputKeydownHandler(event) {
    if (isRemoveKeyPressed(event.keyCode)) {
      this._callback[CallbackType.INPUT_REMOVE_KEYDOWN](event);
    }
  }

  updateInputValue(newValue) {
    this._element.value = newValue;
  }
}

export {
  InputPhone,
};
