class AbstractComponent {
  constructor() {
    if (new.target === AbstractComponent) {
      throw new Error('Can\'t instantiate AbstractComponent, only concrete one.');
    }

    this._element = null;
    this._callback = {};
  }

  getElement() {
    return this._element;
  }
}

export {
  AbstractComponent,
};
