import { createFilterTemplate } from '../template/filter-template.js';
import AbstractView from '../framework/view/abstract-view.js';

export default class FilterView extends AbstractView {
  #filters = null;
  #handleFilterTypeChange = null;

  constructor({ items, onItemChange }) {
    super();

    this.#filters = items;
    this.#handleFilterTypeChange = onItemChange;

    this.element.addEventListener('change', this.#filterTypeChangeHandler);
  }

  get template() {
    return createFilterTemplate({
      filters: this.#filters,
    });
  }

  #filterTypeChangeHandler = (evt) => {
    evt.preventDefault();
    this.#handleFilterTypeChange(evt.target.value);
  };
}
