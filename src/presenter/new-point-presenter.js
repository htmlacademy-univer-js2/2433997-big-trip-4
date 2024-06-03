import PointEditView from '../view/point-edit-view.js';
import { USER_ACTIONS, UPDATE_TYPES, FORM_TYPES } from '../const.js';
import { remove, render, RenderPosition } from '../framework/render.js';

export default class NewPointPresenter {
  #container = null;

  #destinationsModel = null;
  #offersModel = null;

  #pointNewComponent = null;

  #handleDataChange = null;
  #handleDestroy = null;

  constructor({ container, destinationsModel, offersModel, onDataChange, onDestroy }) {
    this.#container = container;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
    this.#handleDataChange = onDataChange;
    this.#handleDestroy = onDestroy;
  }

  init() {
    if (this.#pointNewComponent) {
      return;
    }

    this.#pointNewComponent = new PointEditView({
      pointDestination: this.#destinationsModel.getDestinations(),
      pointOffers: this.#offersModel.getOffers(),
      onSubmitClick: this.#formSubmitHandler,
      onResetClick: this.#resetButtonClickHandler,
      pointType: FORM_TYPES.CREATING,
    });

    render(this.#pointNewComponent, this.#container, RenderPosition.AFTERBEGIN);
    document.addEventListener('keydown', this.#escKeyDownHandler);
  }

  destroy = ({ isCanceled = true } = {}) => {
    if (!this.#pointNewComponent) {
      return;
    }

    remove(this.#pointNewComponent);
    this.#pointNewComponent = null;
    document.removeEventListener('keydown', this.#escKeyDownHandler);

    this.#handleDestroy({ isCanceled });
  };

  setSaving = () => {
    this.#pointNewComponent.updateElement({
      isDisabled: true,
      isSaving: true,
    });
  };

  setAborting = () => {
    const resetFormState = () => {
      this.#pointNewComponent.updateElement({
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      });
    };

    this.#pointNewComponent.shake(resetFormState);
  };

  #formSubmitHandler = (point) => {
    this.#handleDataChange(USER_ACTIONS.ADD_POINT, UPDATE_TYPES.MINOR, point);
  };

  #resetButtonClickHandler = () => {
    this.destroy();
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.destroy();
    }
  };
}
