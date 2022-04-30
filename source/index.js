(function() {
  const DATA_TEL_INPUT = '[data-tel-input]';
  const BACKSPACE = 8;
  const DELETE = 46;
  const OTHER_NUMBER_LENGTH = 16;
  const FORMATTED_NUMBER_LENGTH = 18;
  const START_SYMBOL = 0;
  const PLUS_SYMBOL = '+';
  const SEVEN_SYMBOL = '7';
  const EIGHT_SYMBOL = '8';
  const NINE_SYMBOL = '9';
  const replaceDecimalRegexp = /\D/g;
  const startsNumbers = [SEVEN_SYMBOL, EIGHT_SYMBOL, NINE_SYMBOL];
  const deleteKeys = [BACKSPACE, DELETE];

  class PhoneInputMask {
    constructor(inputElement) {
      this._inputElement = inputElement;
      this._value = '';
      this._inputNumberValue = '';

      this._updateValue();
      this._updateInputNumbersValue();

      this._onInitFormatPhoneNumber = this._onInitFormatPhoneNumber.bind(this);
      this._onPhoneInput = this._onPhoneInput.bind(this);
      this._onPhoneKeyDown = this._onPhoneKeyDown.bind(this);
    }

    _updateValue() {
      this._value = this._inputElement.value;
    }

    _updateInputNumbersValue() {
      this._inputNumberValue = this._inputElement.value.replace(replaceDecimalRegexp, '');
    }

    initPhoneInputMask() {
      document.addEventListener('DOMContentLoaded', this._onInitFormatPhoneNumber);
    }

    _onInitFormatPhoneNumber() {
      this._inputElement.addEventListener('input', this._onPhoneInput);
      this._inputElement.addEventListener('keydown', this._onPhoneKeyDown);
    }

    _onPhoneInput(event) {
      const { data } = event;
      this._updateValue();
      this._updateInputNumbersValue();

      this._allowPlusSymbol(data);

      if (this._isInputIsNotAtEndString()) {
        if (this._isStartsWithNotPlusSymbol()) {
          this._setPlusSymbolAtInputElement();
        }
        if (this._isNotDecimalSymbol(data)) {
          this._setInputValue(this._inputNumberValue);
        }
        this._setInputValue(this._cutMaxNumberLength(this._value));
        return;
      }

      this._formatPhoneNumber();
    }

    _isNotDecimalSymbol(value) {
      return value && replaceDecimalRegexp.test(value);
    }

    _onPhoneKeyDown (event) {
      const { keyCode } = event;
      this._updateValue();
      this._updateInputNumbersValue();
      if (this._isRemoveKeyPressed(keyCode) && this._inputNumberValue.length > 1) {
        this._preventRemoveServiceSymbol(event);
      }
    }

    _isRemoveKeyPressed(keyCode) {
      return deleteKeys.includes(keyCode);
    }

    _preventRemoveServiceSymbol(event) {
      const { keyCode } = event;
      let symToClear;
      switch (keyCode) {
        case BACKSPACE:
          symToClear = this._getPreviousSymbol();
          break;
        case DELETE:
          symToClear = this._getCurrentSymbol();
          break;
      }
      if (symToClear && this._isNotDecimalSymbol(symToClear)) {
        event.preventDefault();
      }
    }

    _getCurrentSymbol() {
      return this._value[this._inputElement.selectionStart];
    }

    _getPreviousSymbol() {
      return this._value[this._inputElement.selectionStart - 1];
    }

    _allowPlusSymbol(data) {
      if (this._isEmptyInputNumberValue()) {
        this._appendPlusIfDataPlus(data);
      }
    }

    _isEmptyInputNumberValue() {
      return this._inputNumberValue === '';
    }

    _appendPlusIfDataPlus(data) {
      if (data === PLUS_SYMBOL) {
        this._setInputValue(PLUS_SYMBOL);
      }
    }

    _isInputIsNotAtEndString() {
      const selectionStart = this._inputElement.selectionStart;
      return selectionStart < this._value.length;
    }

    _isStartsWithNotPlusSymbol() {
      return this._value[START_SYMBOL] !== PLUS_SYMBOL;
    }

    _setPlusSymbolAtInputElement() {
      if (this._inputNumberValue[START_SYMBOL] === EIGHT_SYMBOL) {
        return;
      }
      this._setInputValue(PLUS_SYMBOL + this._value);
      const oldSelectionStart = this._inputElement.selectionStart;
      const nextSelectionStart = oldSelectionStart + 1;
      this._inputElement.selectionStart = nextSelectionStart;
      this._inputElement.selectionEnd = nextSelectionStart;
    }

    _setInputValue(value) {
      this._inputElement.value = value;
      this._updateValue();
    }

    _formatPhoneNumber() {
      if (this._isPhoneStartsWithStartDecimal()) {
        this._setInputValue(this._formatRussianPhoneNumber());
      } else {
        this._setInputValue(this._formatOtherPhoneNumber());
      }
    }

    _isPhoneStartsWithStartDecimal() {
      return startsNumbers.includes(this._inputNumberValue[START_SYMBOL]);
    }

    _formatRussianPhoneNumber() {
      this._prependFirstSymbol();
      let formattedNumber = this._getStartsNumber();
      if (this._inputNumberValue.length > 1) {
        formattedNumber += ' (' + this._inputNumberValue.substring(1, 4);
      }
      if (this._inputNumberValue.length > 4) {
        formattedNumber += ') ' + this._inputNumberValue.substring(4, 7);
      }
      if (this._inputNumberValue.length > 7) {
        formattedNumber += '-' + this._inputNumberValue.substring(7, 9);
      }
      if (this._inputNumberValue.length > 9) {
        formattedNumber += '-' + this._inputNumberValue.substring(9);
      }
      return this._cutMaxNumberLength(formattedNumber);
    }

    _formatOtherPhoneNumber() {
      return PLUS_SYMBOL + this._inputNumberValue
      .substring(0, OTHER_NUMBER_LENGTH);
    }

    _prependFirstSymbol() {
      if (this._inputNumberValue[START_SYMBOL] === NINE_SYMBOL) {
        this._inputNumberValue = SEVEN_SYMBOL + this._inputNumberValue;
      }
    }

    _cutMaxNumberLength(formattedNumber) {
      return formattedNumber.substring(0, FORMATTED_NUMBER_LENGTH);
    }

    _getStartsNumber() {
      const startSymbol = this._inputNumberValue[START_SYMBOL];
      if (startSymbol === EIGHT_SYMBOL) {
        return startSymbol;
      }
      return this._appendPlusSymbol(startSymbol);
    }

    _appendPlusSymbol(value) {
      return PLUS_SYMBOL + value;
    }
  }

  function initFormatPhoneNumber() {
    const inputElements = document.querySelectorAll(DATA_TEL_INPUT);
    for (let i = 0; i < inputElements.length; i++) {
      new PhoneInputMask(inputElements[i]).initPhoneInputMask();
    }
  }

  initFormatPhoneNumber();

})();
