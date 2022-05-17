import { replaceDecimalRegexp } from '../constant/regexp.js';

const FORMATTED_NUMBER_LENGTH = 18;
const OTHER_NUMBER_LENGTH = 16;
const PLUS_SYMBOL = '+';
const START_SYMBOL = 0;
const SEVEN_SYMBOL = '7';
const EIGHT_SYMBOL = '8';
const NINE_SYMBOL = '9';
const startsNumbers = [SEVEN_SYMBOL, EIGHT_SYMBOL, NINE_SYMBOL];


const defaultOptions = {
  eventData: '',
  isEditing: false,
};

function formatPhoneNumber(inputNumbersValue, options = defaultOptions) {
  const { eventData, isEditing } = options;
  const inputNumber = getDecimalOnly(inputNumbersValue);

  if (isPhoneStartsWithStartDecimal(inputNumber)) {
    return formatRussianPhoneNumber(inputNumber);
  }
  return formatOtherPhoneNumber(inputNumber);
}

function editNumber(inputNumbersValue, eventData) {
  if (isNotDecimalSymbol(eventData)) {
    return getDecimalOnly(inputNumbersValue);
  }
  return inputNumbersValue;
}

function getDecimalOnly(inputNumbersValue) {
  return inputNumbersValue.replace(replaceDecimalRegexp, '');
}

function isNotDecimalSymbol(value) {
  replaceDecimalRegexp.lastIndex = 0;
  return value && replaceDecimalRegexp.test(value);
}

function isPhoneStartsWithStartDecimal(inputNumber) {
  return startsNumbers.includes(inputNumber[START_SYMBOL]);
}

function formatRussianPhoneNumber(inputNumber) {
  inputNumber = prependFirstSymbol(inputNumber);
  let formattedNumber = getStartsNumber(inputNumber);
  if (inputNumber.length > 1) {
    formattedNumber += ' (' + inputNumber.substring(1, 4);
  }
  if (inputNumber.length > 4) {
    formattedNumber += ') ' + inputNumber.substring(4, 7);
  }
  if (inputNumber.length > 7) {
    formattedNumber += '-' + inputNumber.substring(7, 9);
  }
  if (inputNumber.length > 9) {
    formattedNumber += '-' + inputNumber.substring(9);
  }
  return cutMaxNumberLength(formattedNumber);
}

function formatOtherPhoneNumber(inputNumber) {
  return PLUS_SYMBOL + inputNumber
    .substring(0, OTHER_NUMBER_LENGTH);
}

function prependFirstSymbol(inputNumber) {
  if (inputNumber[START_SYMBOL] === NINE_SYMBOL) {
    return SEVEN_SYMBOL + inputNumber;
  }
  return inputNumber;
}

function getStartsNumber(inputNumber) {
  const startSymbol = inputNumber[START_SYMBOL];
  if (startSymbol === EIGHT_SYMBOL) {
    return startSymbol;
  }
  return appendPlusSymbol(startSymbol);
}

function appendPlusSymbol(startSymbol) {
  return PLUS_SYMBOL + startSymbol;
}

function cutMaxNumberLength(formattedNumber) {
  return formattedNumber.substring(0, FORMATTED_NUMBER_LENGTH);
}

export {
  editNumber,
  formatPhoneNumber,
  isNotDecimalSymbol,
};
