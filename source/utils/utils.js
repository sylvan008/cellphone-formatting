import { BACKSPACE, DELETE } from '../constant/char-keys.js';
const deleteKeys = [BACKSPACE, DELETE];

function isRemoveKeyPressed(keyCode) {
  return deleteKeys.includes(keyCode);
}

export {
  isRemoveKeyPressed,
};
