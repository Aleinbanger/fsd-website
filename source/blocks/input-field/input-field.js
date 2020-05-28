import './input-field.scss';

import Inputmask from 'inputmask';

class InputField {
  constructor(block) {
    this.blockName = 'input-field';
    this.block = block;
    this._initialize();
  }

  _initialize() {
    this.field = this.block.querySelector(`.js-${this.blockName}__field`);
    this._applyMask();
  }

  _applyMask() {
    Inputmask().mask(this.field);
  }
}

function renderBlocks() {
  const blocks = document.querySelectorAll('.js-input-field');
  blocks.forEach((block) => new InputField(block));
}

export default renderBlocks();
