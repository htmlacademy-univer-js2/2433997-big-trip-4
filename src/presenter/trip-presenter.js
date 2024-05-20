import PointPresenter from './point-presenter.js';
import PointListView from '../view/points-list-view.js';
import NoPointView from '../view/no-point-view.js';
import SortView from '../view/sort-view.js';
import { render, remove, replace } from '../framework/render.js';
import { SORT_TYPE } from '../const.js';
import { sort } from '../utils/sort.js';
import { updateItem } from '../utils/common.js';

export default class TripPresenter {
  #tripContainer = null;
  #pointListComponent = new PointListView();
  #sortComponent = null;

  #pointsModel = null;
  #destinationsModel = null;
  #offersModel = null;

  #currentSortType = SORT_TYPE.DAY;

  #tripPoints = [];
  #pointPresenters = new Map();

  constructor({ tripContainer, destinationsModel, offersModel, pointsModel }) {
    this.#tripContainer = tripContainer;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
    this.#pointsModel = pointsModel;

    this.#tripPoints = sort[SORT_TYPE.DAY]([...this.#pointsModel.points]);
  }

  init() {
    this.#renderTrip();
  }

  #renderPoint = (point) => {
    const pointPresenter = new PointPresenter({
      container: this.#pointListComponent.element,
      destinationsModel: this.#destinationsModel,
      offersModel: this.#offersModel,
      onDataChange: this.#pointChangeHandler,
      onModeChange: this.#modeChangeHandler,
    });

    pointPresenter.init(point);

    this.#pointPresenters.set(point.id, pointPresenter);
  };

  #sortPoints = (sortType) => {
    this.#currentSortType = sortType;
    this.#tripPoints = sort[this.#currentSortType](this.#tripPoints);
  };

  #renderPoints = () => {
    this.#tripPoints.forEach((point) => {
      this.#renderPoint(point);
    });
  };

  #clearPoints = () => {
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();
  };

  #renderSort = () => {
    const prevSortComponent = this.#sortComponent;

    this.#sortComponent = new SortView({
      sortType: this.#currentSortType,
      onItemChange: this.#sortTypeChangeHandler,
    });

    if (prevSortComponent) {
      replace(this.#sortComponent, prevSortComponent);
      remove(prevSortComponent);
    } else {
      render(this.#sortComponent, this.#tripContainer);
    }
  };

  #renderPointContainer = () => {
    this.#pointListComponent = new PointListView();
    render(this.#pointListComponent, this.#tripContainer);
  };

  #renderTrip = () => {
    if (this.#tripPoints.length === 0) {
      render(new NoPointView(), this.#tripContainer);
      return;
    }

    this.#renderSort();
    this.#renderPointContainer();
    this.#renderPoints();
  };

  #pointChangeHandler = (updatedPoint) => {
    this.#tripPoints = updateItem(this.#tripPoints, updatedPoint);
    this.#pointPresenters.get(updatedPoint.id).init(updatedPoint);
  };

  #modeChangeHandler = () => {
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };

  #sortTypeChangeHandler = (sortType) => {
    this.#sortPoints(sortType);
    this.#clearPoints();
    this.#renderSort();
    this.#renderPoints();
  };
}
