import AbstractView from '../framework/view/abstract-view.js';
import { createSortTemplate } from '../template/sort-template.js';

export default class SortView extends AbstractView {
  #items = null;
  #handleSortTypeChange = null;

  constructor({ items, onItemChange }) {
    super();

    this.#items = items;
    this.#handleSortTypeChange = onItemChange;

    this.element.addEventListener('change', this.#sortTypeChangeHandler);
  }

  get template() {
    return createSortTemplate({
      items: this.#items,
    });
  }

  #sortTypeChangeHandler = (evt) => {
    evt.preventDefault();
    this.#handleSortTypeChange(evt.target.dataset.sortType);
  };
}
