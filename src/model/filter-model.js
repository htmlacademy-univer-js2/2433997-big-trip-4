import Observable from '../framework/observable.js';
import { FILTER_TYPES } from '../const.js';

export default class FilterModel extends Observable {
  #filter = FILTER_TYPES.EVERYTHING;

  getFilter() {
    return this.#filter;
  }

  setFilter(updateType, update) {
    this.#filter = update;
    this._notify(updateType, update);
  }
}
