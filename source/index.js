import { PhoneInputPresenter } from './presenter/presenter.js';
import { PhoneInputModel } from './model/phone-input-model.js';
import { InputPhone } from './view/input--phone-number.js';

const DATA_TEL_INPUT = '[data-tel-input]';

function initFormatPhoneNumber() {
  const inputElements = document.querySelectorAll(DATA_TEL_INPUT);
  for (let i = 0; i < inputElements.length; i++) {
    const inputElement = inputElements[i];
    new PhoneInputPresenter(
      new InputPhone(inputElement),
      new PhoneInputModel(inputElement.value),
    )
    .initPhoneInputMask();
  }
}

initFormatPhoneNumber();
