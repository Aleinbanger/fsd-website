import 'air-datepicker';

class DropdownDate {
  constructor(wrapper) {
    this.blockName = 'dropdown-date';
    this.block = wrapper.querySelector(`.js-${this.blockName}`);
    this._initialize();
    this._bindEventListeners();
  }

  _initialize() {
    this.input = this.block.querySelector(`.js-${this.blockName}__input`);
    this.secInput = this.block.querySelector(`.js-${this.blockName}__input-sec`);
    this.icons = this.block.querySelectorAll(`.js-${this.blockName}__icon`);
    this.state = {
      active: Boolean(this.block.dataset.active),
      startAt: this.block.dataset.startAt,
      endAt: this.block.dataset.endAt,
      minDate: this.block.dataset.minDate,
    };
    this._renderDatepicker();
    this._renderState();
    this._selectDate(this.state.startAt, this.state.endAt);
  }

  _renderDatepicker() {
    const options = {
      classes: `${this.blockName}__datepicker`,
      offset: 5,
      prevHtml: '<i class="material-icons">arrow_back</i>',
      nextHtml: '<i class="material-icons">arrow_forward</i>',
      navTitles: {
        days: 'MM yyyy',
      },
      dateFormat: 'd M',
      disableNavWhenOutOfRange: false,
      range: true,
      multipleDatesSeparator: ' \u2013 ',
      clearButton: true,
      onShow: (dp, animationCompleted) => {
        if (!animationCompleted) {
          dp.$datepicker.find('.datepicker--buttons').append(this.$acceptBtn);
        }
      },
    };
    if (this.state.minDate === 'today') {
      options.minDate = new Date();
    } else if (this.state.minDate) {
      options.minDate = new Date(this.state.minDate);
    }
    if (this.secInput) {
      options.dateFormat = 'dd.mm.yyyy';
      options.onSelect = (formattedDate) => {
        $(this.input).find('input').val(formattedDate.split(' \u2013 ')[0]);
        $(this.secInput).find('input').val(formattedDate.split(' \u2013 ')[1]);
      };
    }

    this.$acceptBtn = $('<span>', {
      class: 'datepicker--button',
      'data-action': 'hide',
      text: 'Применить',
    });
    this.$datepicker = $(this.input).find('input').datepicker(options);
  }

  _bindEventListeners() {
    this.input.addEventListener('focusin', () => this._handleInputFocus());
    this.handleOutsideClick = (event) => this._handleOutsideClick(event);

    this.$acceptBtn.on('click', () => this._handleAcceptButtonClick());
    if (this.secInput) {
      $(this.secInput).find('input').on('click', () => this._handleSecInputClick());
    }
  }

  _handleInputFocus() {
    if (!this.state.active) {
      this.state.active = this.$datepicker.data('datepicker').visible;
      this._renderState();
    }
  }

  _handleOutsideClick(event) {
    const input = this.input.querySelector('input');
    const datepicker = document.querySelector('.datepicker');
    const isClickInsideFstInput = input.contains(event.target);
    const isClickInsideSecInput = this.secInput
      ? this.secInput.querySelector('input').contains(event.target) : false;
    const isClickInside = isClickInsideFstInput || isClickInsideSecInput
      || datepicker.contains(event.target);
    if (!isClickInside && this.state.active) {
      this.state.active = this.$datepicker.data('datepicker').visible;
      this._renderState();
    }
  }

  _handleAcceptButtonClick() {
    this.$datepicker.data('datepicker').visible = false;
    this.state.active = this.$datepicker.data('datepicker').visible;
    this._renderState();
  }

  _handleSecInputClick() {
    this.$datepicker.data('datepicker').visible = true;
    this.state.active = this.$datepicker.data('datepicker').visible;
    this._renderState();
  }

  _renderState() {
    if (this.state.active) {
      document.addEventListener('click', this.handleOutsideClick);
      this.$datepicker.data('datepicker').show();
      this.input.classList.add(`${this.blockName}__input_active`);
      this.icons.forEach((icon) => icon.classList.add(`${this.blockName}__icon_active`));
      if (this.secInput) {
        this.secInput.classList.add(`${this.blockName}__input_active`);
      }
    } else {
      document.removeEventListener('click', this.handleOutsideClick);
      this.$datepicker.data('datepicker').hide();
      this.input.classList.remove(`${this.blockName}__input_active`);
      this.icons.forEach((icon) => icon.classList.remove(`${this.blockName}__icon_active`));
      if (this.secInput) {
        this.secInput.classList.remove(`${this.blockName}__input_active`);
      }
    }
    this.state.selectedDates = this.$datepicker.data('datepicker').selectedDates;
    this.input.querySelector('input').dispatchEvent(new Event('change', { bubbles: true }));
  }

  _selectDate(from, to) {
    if (from) {
      const date = [];
      date.push(new Date(from));
      if (to) {
        date.push(new Date(to));
      }
      this.$datepicker.data('datepicker').selectDate(date);
    }
  }
}

export default DropdownDate;
