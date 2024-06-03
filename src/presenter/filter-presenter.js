import FilterView from '../view/filter-view.js';
import { UPDATE_TYPES } from '../const.js';
import { filteredTypes } from '../utils/filter.js';
import { render, replace, remove } from '../framework/render.js';

export default class FilterPresenter {
  #container = null;
  #filterComponent = null;

  #pointsModel = null;
  #filterModel = null;

  #currentFilter = null;

  constructor({ container, pointsModel, filterModel }) {
    this.#container = container;
    this.#pointsModel = pointsModel;
    this.#filterModel = filterModel;

    this.#pointsModel.addObserver(this.#modelEventHandler);
    this.#filterModel.addObserver(this.#modelEventHandler);
  }

  get filters() {
    const points = this.#pointsModel.getPoints();

    return Object.entries(filteredTypes).map(([filterType, filterPoints]) => ({
      type: filterType,
      isChecked: filterType === this.#currentFilter,
      isDisabled: filterPoints(points).length === 0,
    }));
  }

  init() {
    this.#currentFilter = this.#filterModel.getFilter();

    const filters = this.filters;
    const prevFilterComponent = this.#filterComponent;

    this.#filterComponent = new FilterView({
      items: filters,
      onItemChange: this.#filterTypeChangeHandler,
    });

    if (!prevFilterComponent) {
      render(this.#filterComponent, this.#container);
      return;
    }

    replace(this.#filterComponent, prevFilterComponent);
    remove(prevFilterComponent);
  }

  #filterTypeChangeHandler = (filterType) => {
    this.#filterModel.setFilter(UPDATE_TYPES.MAJOR, filterType);
  };

  #modelEventHandler = () => {
    this.init();
  };
}
