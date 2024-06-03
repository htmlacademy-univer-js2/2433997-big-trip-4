import AbstractView from '../framework/view/abstract-view.js';
import { createPointTemplate } from '../template/point-template.js';

export default class PointView extends AbstractView {
  #point = null;
  #pointDestination = null;
  #pointOffers = null;
  #onEditClick = null;
  #onFavoriteClick = null;

  constructor({ point, pointDestination, pointOffers, onEditClick, onFavoriteClick }) {
    super();

    this.#point = point;
    this.#pointDestination = pointDestination;
    this.#pointOffers = pointOffers;
    this.#onEditClick = onEditClick;
    this.#onFavoriteClick = onFavoriteClick;

    this.element
      .querySelector('.event__rollup-btn')
      .addEventListener('click', this.#editClickHandler);

    this.element
      .querySelector('.event__favorite-btn')
      .addEventListener('click', this.#favoriteClickHandler);
  }

  get template() {
    return createPointTemplate({
      point: this.#point,
      pointDestination: this.#pointDestination,
      pointOffers: this.#pointOffers,
    });
  }

  #editClickHandler = (evt) => {
    evt.preventDefault();

    const disabledResetButton = document.querySelector('.event__reset-btn[disabled]');
    const disabledSavingButton = document.querySelector('.event__save-btn[disabled]');

    if (!disabledResetButton && !disabledSavingButton) {
      this.#onEditClick();
    }
  };

  #favoriteClickHandler = (evt) => {
    evt.preventDefault();
    this.#onFavoriteClick();
  };
}
