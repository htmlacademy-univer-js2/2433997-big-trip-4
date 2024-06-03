import AbstractView from '../framework/view/abstract-view.js';
import { createNewEventTemplate } from '../template/new-event-template.js';

export default class NewEventView extends AbstractView {
  #handleClick = null;

  constructor({ onClick }) {
    super();

    this.#handleClick = onClick;
    this.element.addEventListener('click', this.#clickHandler);
  }

  get template() {
    return createNewEventTemplate();
  }

  setDisabled = (isDisabled) => {
    this.element.disabled = isDisabled;
  };

  #clickHandler = (evt) => {
    evt.preventDefault();
    this.#handleClick();
  };
}
