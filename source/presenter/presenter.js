import { editNumber, formatPhoneNumber, isNotDecimalSymbol } from '../format-number/format-number.js';
import { BACKSPACE, DELETE } from '../constant/char-keys.js';

class PhoneInputPresenter {
  constructor(inputComponent, phoneInputModel) {
    this._inputComponent = inputComponent;
    this._phoneInputModel = phoneInputModel;

    this._onInitFormatPhoneNumber = this._onInitFormatPhoneNumber.bind(this);
    this._onPhoneInputHandler = this._onPhoneInputHandler.bind(this);
    this._onPhoneKeyDownHandler = this._onPhoneKeyDownHandler.bind(this);
  }

  initPhoneInputMask() {
    document.addEventListener('DOMContentLoaded', this._onInitFormatPhoneNumber);
  }

  _onInitFormatPhoneNumber() {
    this._inputComponent.setInputHandler(this._onPhoneInputHandler);
    this._inputComponent.setKeydownHandler(this._onPhoneKeyDownHandler);
    this._phoneInputModel.addListener(this._inputComponent.updateInputValue);
  }

  _onPhoneInputHandler(value, eventData) {
    const newValue = this._isEditingMode()
      ? editNumber(value, eventData)
      : formatPhoneNumber(value);
    this._setCursor();
    this._updateValue(newValue);
  }

  _onPhoneKeyDownHandler(event) {
    if (this._isEditingMode() && this._phoneInputModel.getValue().length > 1) {
      this._preventRemoveServiceSymbol(event);
    }
    this._updateValue(event.target.value);
  }

  _updateValue(value) {
    this._phoneInputModel.updateValue(value);
  }

  _preventRemoveServiceSymbol(event) {
    const { keyCode } = event;
    let symToClear;
    switch (keyCode) {
      case BACKSPACE:
        symToClear = this._getCurrentSymbol(-1);
        break;
      case DELETE:
        symToClear = this._getCurrentSymbol();
        break;
    }
    if (symToClear && isNotDecimalSymbol(symToClear)) {
      event.preventDefault();
    }
  }

  _getCurrentSymbol(indexModifier = 0) {
    const currentSymbolIndex = this._inputComponent.getElement().selectionStart + indexModifier;
    const value = this._phoneInputModel.getValue()
    return value[currentSymbolIndex];
  }

  _isEditingMode() {
    const selectionStart = this._inputComponent.getElement().selectionStart;
    return selectionStart < this._phoneInputModel.getValue().length;
  }

  _setCursor() {
    const inputElement = this._inputComponent.getElement();
    const oldSelectionStart = inputElement.selectionStart;
    inputElement.selectionStart = oldSelectionStart;
    inputElement.selectionEnd = oldSelectionStart;
  }
}

export {
  PhoneInputPresenter,
};
