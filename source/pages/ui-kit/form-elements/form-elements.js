/* eslint-disable import/no-unresolved */
import './form-elements.scss';

import ButtonLike from 'blocks/button-like/button-like';
import Rating from 'blocks/rating/rating';
import Comment from 'blocks/comment/comment';
import Pagination from 'blocks/pagination/pagination';
import DropdownDate from 'blocks/dropdown-date/dropdown-date';

class FormElements {
  constructor(block) {
    this.blockName = 'form-elements';
    this.block = block;
    this._initialize();
  }

  _initialize() {
    this.block.querySelectorAll(`.js-${this.blockName}__like-button`)
      .forEach((buttonLike) => new ButtonLike(buttonLike));

    this.block.querySelectorAll(`.js-${this.blockName}__rate-button`)
      .forEach((rating) => new Rating(rating));

    this.block.querySelectorAll(`.js-${this.blockName}__comment`)
      .forEach((comment) => new Comment(comment));

    this.block.querySelectorAll(`.js-${this.blockName}__pagination`)
      .forEach((pagination) => new Pagination(pagination));

    this.block.querySelectorAll(`.js-${this.blockName}__dropdown-date`)
      .forEach((dropdownDate) => new DropdownDate(dropdownDate));
  }
}

function renderBlocks() {
  const blocks = document.querySelectorAll('.js-form-elements');
  blocks.forEach((block) => new FormElements(block));
}

export default renderBlocks();