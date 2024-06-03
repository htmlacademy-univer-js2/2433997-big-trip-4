import PointView from '../view/point-view.js';
import PointEditView from '../view/point-edit-view.js';
import { MODES, USER_ACTIONS, UPDATE_TYPES } from '../const.js';
import { majorDifferenceTest } from '../utils/point.js';
import { render, replace, remove } from '../framework/render.js';

export default class PointPresenter {
  #container = null;

  #destinationsModel = null;
  #offersModel = null;

  #handleDataChange = null;
  #handleModeChange = null;

  #pointComponent = null;
  #editPointComponent = null;
  #point = null;
  #mode = MODES.DEFAULT;

  constructor({ container, destinationsModel, offersModel, onDataChange, onModeChange }) {
    this.#container = container;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
    this.#handleDataChange = onDataChange;
    this.#handleModeChange = onModeChange;
  }

  init(point) {
    this.#point = point;

    const prevPointComponent = this.#pointComponent;
    const prevEditPointComponent = this.#editPointComponent;

    this.#pointComponent = new PointView({
      point: this.#point,
      pointDestination: this.#destinationsModel.getById(point.destination),
      pointOffers: this.#offersModel.getByType(point.type),
      onEditClick: this.#pointEditClickHandler,
      onFavoriteClick: this.#favoriteClickHandler,
    });

    this.#editPointComponent = new PointEditView({
      point: this.#point,
      pointDestination: this.#destinationsModel.getDestinations(),
      pointOffers: this.#offersModel.getOffers(),
      onSubmitClick: this.#formSubmitHandler,
      onResetClick: this.#resetButtonClickHandler,
      onDeleteClick: this.#deleteButtonClickHandler,
    });

    if (!prevPointComponent || !prevEditPointComponent) {
      render(this.#pointComponent, this.#container);
      return;
    }

    if (this.#mode === MODES.DEFAULT) {
      replace(this.#pointComponent, prevPointComponent);
    }

    if (this.#mode === MODES.EDITING) {
      replace(this.#editPointComponent, prevEditPointComponent);
    }

    remove(prevPointComponent);
    remove(prevEditPointComponent);
  }

  resetView = () => {
    if (this.#mode !== MODES.DEFAULT) {
      this.#editPointComponent.reset(this.#point);
      this.#replaceFormToPoint();
    }
  };

  destroy = () => {
    remove(this.#pointComponent);
    remove(this.#editPointComponent);
  };

  setSaving = () => {
    if (this.#mode === MODES.EDITING) {
      this.#editPointComponent.updateElement({
        isDisabled: true,
        isSaving: true,
      });
    }
  };

  setDeleting = () => {
    this.#editPointComponent.updateElement({
      isDisabled: true,
      isDeleting: true,
    });
  };

  setAborting = () => {
    if (this.#mode === MODES.DEFAULT) {
      this.#pointComponent.shake();
      return;
    }

    if (this.#mode === MODES.EDITING) {
      const resetFormState = () => {
        this.#editPointComponent.updateElement({
          isDisabled: false,
          isSaving: false,
          isDeleting: false,
        });
      };

      this.#editPointComponent.shake(resetFormState);
    }
  };

  #replacePointToForm = () => {
    if (!this.#editPointComponent._state.isSaving) {
      replace(this.#editPointComponent, this.#pointComponent);
      document.addEventListener('keydown', this.#escKeyDownHandler);
      this.#handleModeChange();
      this.#mode = MODES.EDITING;
    }
  };

  #replaceFormToPoint = () => {
    replace(this.#pointComponent, this.#editPointComponent);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
    this.#mode = MODES.DEFAULT;
  };

  #deleteButtonClickHandler = (point) => {
    this.#handleDataChange(USER_ACTIONS.DELETE_POINT, UPDATE_TYPES.MINOR, point);
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' && !this.#editPointComponent._state.isDisabled) {
      evt.preventDefault();
      this.#editPointComponent.reset(this.#point);
      this.#replaceFormToPoint();
    }
  };

  #pointEditClickHandler = () => {
    this.#replacePointToForm();
  };

  #favoriteClickHandler = () => {
    this.#handleDataChange(USER_ACTIONS.UPDATE_POINT, UPDATE_TYPES.PATCH, {
      ...this.#point,
      isFavorite: !this.#point.isFavorite,
    });
  };

  #formSubmitHandler = async (updatedPoint) => {
    const isMinor = majorDifferenceTest(updatedPoint, this.#point);

    await this.#handleDataChange(
      USER_ACTIONS.UPDATE_POINT,
      isMinor ? UPDATE_TYPES.MINOR : UPDATE_TYPES.PATCH,
      updatedPoint
    );

    if (!this.#editPointComponent._state.isDisabled) {
      this.#replaceFormToPoint();
    }
  };

  #resetButtonClickHandler = () => {
    if (
      !this.#editPointComponent._state.isDisabled ||
      this.#editPointComponent._state.isSavingCompleted
    ) {
      this.#editPointComponent.reset(this.#point);
      this.#replaceFormToPoint();
    }
  };
}
