import SortView from '../view/sort-view.js';
import PointListView from '../view/points-list-view.js';
import NotificationView from '../view/notification-view.js';
import PreloaderView from '../view/preloader-view.js';
import ErrorView from '../view/error-view.js';
import PointPresenter from './point-presenter.js';
import NewPointPresenter from './new-point-presenter.js';
import {
  SORT_TYPES,
  ON_SORT_TYPES,
  USER_ACTIONS,
  UPDATE_TYPES,
  FILTER_TYPES,
  BLOCKING_TIME,
} from '../const.js';
import { sortedTypes } from '../utils/sort.js';
import { filteredTypes } from '../utils/filter.js';
import { render, remove, replace, RenderPosition } from '../framework/render.js';
import UiBlocker from '../framework/ui-blocker/ui-blocker.js';

export default class TripPresenter {
  #tripContainer = null;

  #pointListComponent = new PointListView();
  #sortComponent = null;
  #errorComponent = new ErrorView();
  #notificationComponent = null;
  #preloaderComponent = null;

  #uiBlocker = new UiBlocker({
    lowerLimit: BLOCKING_TIME.MIN,
    upperLimit: BLOCKING_TIME.MAX,
  });

  #destinationsModel = null;
  #offersModel = null;
  #pointsModel = null;
  #filterModel = null;

  #pointPresenters = new Map();
  #newPointPresenter = null;
  #newEventPresenter = null;

  #currentSortType = SORT_TYPES.DAY;
  #isCreating = false;
  #isPreloading = true;
  #isPreloadingError = false;
  #isError = false;

  constructor({
    tripContainer,
    destinationsModel,
    offersModel,
    pointsModel,
    filterModel,
    newEventPresenter,
  }) {
    this.#tripContainer = tripContainer;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
    this.#pointsModel = pointsModel;
    this.#filterModel = filterModel;
    this.#newEventPresenter = newEventPresenter;

    this.#newPointPresenter = new NewPointPresenter({
      container: this.#pointListComponent.element,
      destinationsModel: this.#destinationsModel,
      offersModel: this.#offersModel,
      onDataChange: this.#pointActionHandler,
      onDestroy: this.#newPointDestroyHandler,
    });
    this.#pointsModel.addObserver(this.#modelEventHandler);
    this.#filterModel.addObserver(this.#modelEventHandler);
  }

  get points() {
    const filterType = this.#filterModel.getFilter();
    const filteredPoints = filteredTypes[filterType](this.#pointsModel.getPoints());

    return sortedTypes[this.#currentSortType](filteredPoints);
  }

  init() {
    this.#renderTrip();
  }

  newPointButtonClickHandler = () => {
    this.#isCreating = true;
    this.#currentSortType = SORT_TYPES.DAY;
    this.#filterModel.setFilter(UPDATE_TYPES.MAJOR, FILTER_TYPES.EVERYTHING);
    this.#newEventPresenter.disableButton();
    this.#newPointPresenter.init();
  };

  #renderPoint = (point) => {
    const pointPresenter = new PointPresenter({
      container: this.#pointListComponent.element,
      destinationsModel: this.#destinationsModel,
      offersModel: this.#offersModel,
      onDataChange: this.#pointActionHandler,
      onModeChange: this.#modeChangeHandler,
    });

    pointPresenter.init(point);
    this.#pointPresenters.set(point.id, pointPresenter);
  };

  #renderPoints = () => {
    this.points.forEach((point) => {
      this.#renderPoint(point);
    });
  };

  #renderPreloading = ({ isLoading, isLoadingError }) => {
    this.#preloaderComponent = new PreloaderView({ isLoading, isLoadingError });
    render(this.#preloaderComponent, this.#tripContainer, RenderPosition.AFTERBEGIN);
  };

  #clearPoints = () => {
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();
    this.#newPointPresenter.destroy();
  };

  #renderSort = () => {
    const prevSortComponent = this.#sortComponent;

    const sortTypes = Object.values(SORT_TYPES).map((type) => ({
      type,
      isChecked: type === this.#currentSortType,
      isDisabled: !ON_SORT_TYPES[type],
    }));

    this.#sortComponent = new SortView({
      items: sortTypes,
      onItemChange: this.#sortTypeChangeHandler,
    });

    if (prevSortComponent) {
      replace(this.#sortComponent, prevSortComponent);
      remove(prevSortComponent);
    } else {
      render(this.#sortComponent, this.#tripContainer);
    }
  };

  #renderNotification() {
    this.#notificationComponent = new NotificationView({
      filterType: this.#filterModel.getFilter(),
    });
    render(this.#notificationComponent, this.#tripContainer);
  }

  #renderPointContainer = () => {
    render(this.#pointListComponent, this.#tripContainer);
  };

  #renderTrip = () => {
    const isLoading = this.#isPreloading;
    const isLoadingError = this.#isPreloadingError;

    if (this.#isPreloading) {
      this.#renderPreloading({ isLoading, isLoadingError });
      this.#newEventPresenter.disableButton();
      return;
    }

    this.#newEventPresenter.enableButton();


    if (this.#isError) {
      this.#renderError();
      this.#clearTrip({ resetSortType: true });
      this.#newEventPresenter.disableButton();
      return;
    }

    if (this.points.length === 0 && !this.#isCreating) {
      this.#renderNotification();
      return;
    }

    this.#renderSort();
    this.#renderPointContainer();
    this.#renderPoints();
  };

  #renderError = () => {
    render(this.#errorComponent, this.#tripContainer, RenderPosition.AFTERBEGIN);
  };

  #clearTrip = ({ resetSortType = false } = {}) => {
    this.#clearPoints();
    remove(this.#notificationComponent);
    remove(this.#sortComponent);
    this.#sortComponent = null;
    remove(this.#preloaderComponent);

    if (resetSortType) {
      this.#currentSortType = SORT_TYPES.DAY;
    }
  };

  #pointActionHandler = async (actionType, updateType, update) => {
    this.#uiBlocker.block();
    switch (actionType) {
      case USER_ACTIONS.UPDATE_POINT:
        this.#pointPresenters.get(update.id).setSaving();
        try {
          await this.#pointsModel.update(updateType, update);
        } catch {
          this.#pointPresenters.get(update.id).setAborting();
        }
        break;

      case USER_ACTIONS.DELETE_POINT:
        this.#pointPresenters.get(update.id).setDeleting();
        try {
          await this.#pointsModel.delete(updateType, update);
        } catch {
          this.#pointPresenters.get(update.id).setAborting();
        }
        break;

      case USER_ACTIONS.ADD_POINT:
        this.#newPointPresenter.setSaving();
        try {
          await this.#pointsModel.add(updateType, update);
        } catch {
          this.#newPointPresenter.setAborting();
        }
        break;
    }
    this.#uiBlocker.unblock();
  };

  #modelEventHandler = (updateType, data) => {
    switch (updateType) {
      case UPDATE_TYPES.PATCH:
        this.#pointPresenters?.get(data.id)?.init(data);
        break;

      case UPDATE_TYPES.MINOR:
        this.#clearTrip();
        this.#renderTrip();
        break;

      case UPDATE_TYPES.MAJOR:
        this.#clearTrip({ resetSortType: true });
        this.#renderTrip();
        break;

      case UPDATE_TYPES.INIT:
        if (data.isError) {
          this.#isPreloading = false;
          this.#isError = true;
          this.#renderTrip();
          break;
        } else {
          this.#isPreloading = false;
          this.#isError = false;
          remove(this.#preloaderComponent);
          this.#renderTrip();
          break;
        }
    }
  };

  #modeChangeHandler = () => {
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
    this.#newPointPresenter.destroy();
  };

  #newPointDestroyHandler = ({ isCanceled }) => {
    this.#isCreating = false;
    this.#newEventPresenter.enableButton();
    if (!this.points.length && isCanceled) {
      this.#clearTrip();
      this.#renderTrip();
    }
  };

  #sortTypeChangeHandler = (sortType) => {
    this.#currentSortType = sortType;
    this.#clearPoints();
    this.#renderSort();
    this.#renderPoints();
  };
}
