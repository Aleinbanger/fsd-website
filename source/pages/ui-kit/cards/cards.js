/* eslint-disable import/no-unresolved */
import './cards.scss';

import CardRoom from 'blocks/card-room/card-room';

class Cards {
  constructor(block) {
    this.blockName = 'cards';
    this.block = block;
    this._initialize();
  }

  _initialize() {
    this.block.querySelectorAll(`.js-${this.blockName}__card-room`)
      .forEach((cardRoom) => new CardRoom(cardRoom));
  }
}

function renderBlocks() {
  const blocks = document.querySelectorAll('.js-cards');
  blocks.forEach((block) => new Cards(block));
}

export default renderBlocks();