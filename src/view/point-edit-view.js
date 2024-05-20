import { createPointEditTemplate } from '../template/point-edit-template.js';
import AbstractView from '../framework/view/abstract-view.js';

import { BLANK_POINT } from '../const.js';

export default class EditPointView extends AbstractView {
  #point = null;
  #pointDestination = null;
  #pointOffers = null;
  #onSubmitClick = null;
  #onResetClick = null;

  constructor({ point = BLANK_POINT, pointDestination, pointOffers, onSubmitClick, onResetClick }) {
    super();
    this.#point = point;
    this.#pointDestination = pointDestination;
    this.#pointOffers = pointOffers;
    this.#onSubmitClick = onSubmitClick;
    this.#onResetClick = onResetClick;

    this.element.querySelector('form').addEventListener('submit', this.#formSubmitHandler);

    this.element
      .querySelector('.event__rollup-btn')
      .addEventListener('click', this.#resetButtonClickHandler);
  }

  get template() {
    return createPointEditTemplate({
      point: this.#point,
      pointDestination: this.#pointDestination,
      pointOffers: this.#pointOffers,
    });
  }

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this.#onSubmitClick();
  };

  #resetButtonClickHandler = (evt) => {
    evt.preventDefault();
    this.#onResetClick();
  };
}
