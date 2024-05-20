import AbstractView from '../framework/view/abstract-view.js';
import { createSortTemplate } from '../template/sort-template.js';
import { SORT_TYPE, ENABLED_SORT_TYPE } from '../const.js';

export default class SortView extends AbstractView {
  #items = null;
  #onItemChange = null;

  constructor({ sortType, onItemChange }) {
    super();

    this.#items = Object.values(SORT_TYPE).map((type) => ({
      type,
      isChecked: type === sortType,
      isDisabled: !ENABLED_SORT_TYPE[type],
    }));

    this.#onItemChange = onItemChange;

    this.element.addEventListener('change', this.#itemChangeHandler);
  }

  get template() {
    return createSortTemplate({
      items: this.#items,
    });
  }

  #itemChangeHandler = (evt) => {
    evt.preventDefault();
    this.#onItemChange(evt.target.dataset.sortType);
  };
}
