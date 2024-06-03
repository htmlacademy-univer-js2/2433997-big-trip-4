import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import { createPointEditTemplate } from '../template/point-edit-template.js';
import { DEFAULT_POINT, FORM_TYPES } from '../const.js';
import 'flatpickr/dist/flatpickr.min.css';
import flatpickr from 'flatpickr';

export default class PointEditView extends AbstractStatefulView {
  #pointDestination = null;
  #pointOffers = null;
  #handleSubmitClick = null;
  #handleResetClick = null;
  #handleDeleteClick = null;
  #datepickerFrom = null;
  #datepickerTo = null;
  #pointType;

  constructor({
    point = DEFAULT_POINT,
    pointDestination,
    pointOffers,
    pointType = FORM_TYPES.EDITING,
    onSubmitClick,
    onResetClick,
    onDeleteClick,
  }) {
    super();
    this.#pointDestination = pointDestination;
    this.#pointOffers = pointOffers;
    this.#handleSubmitClick = onSubmitClick;
    this.#handleResetClick = onResetClick;
    this.#handleDeleteClick = onDeleteClick;
    this.#pointType = pointType;

    this._setState(PointEditView.generatePointToState({ point }));
    this._restoreHandlers();
  }

  get template() {
    return createPointEditTemplate({
      state: this._state,
      pointDestination: this.#pointDestination,
      pointOffers: this.#pointOffers,
      pointType: this.#pointType,
    });
  }

  reset = (point) => this.updateElement({ point });

  removeElement = () => {
    super.removeElement();

    if (this.#datepickerFrom) {
      this.#datepickerFrom.destroy();
      this.#datepickerFrom = null;
    }

    if (this.#datepickerTo) {
      this.#datepickerTo.destroy();
      this.#datepickerTo = null;
    }
  };

  _restoreHandlers = () => {
    if (this.#pointType === FORM_TYPES.EDITING) {
      this.element
        .querySelector('.event__rollup-btn')
        .addEventListener('click', this.#rollupButtonClickHandler);

      this.element
        .querySelector('.event__reset-btn')
        .addEventListener('click', this.#deleteButtonClickHandler);
    }

    if (this.#pointType === FORM_TYPES.CREATING) {
      this.element
        .querySelector('.event__reset-btn')
        .addEventListener('click', this.#resetButtonClickHandler);
    }

    this.element.querySelector('form').addEventListener('submit', this.#formSubmitHandler);

    this.element
      .querySelector('.event__type-group')
      .addEventListener('change', this.#typeChangeHandler);

    this.element
      .querySelector('.event__input--destination')
      .addEventListener('change', this.#destinationChangeHandler);

    this.element
      .querySelector('.event__available-offers')
      ?.addEventListener('change', this.#offerChangeHandler);

    this.element
      .querySelector('.event__input--price')
      .addEventListener('change', this.#priceChangeHandler);

    this.#setDatepickers();
  };

  #formSubmitHandler = async (evt) => {
    evt.preventDefault();

    await this.#handleSubmitClick(PointEditView.generateStateToPoint(this._state));

    this._setState({
      isSavingCompleted: true,
    });
  };

  #rollupButtonClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleResetClick();
  };

  #resetButtonClickHandler = (evt) => {
    const disabledSavingButton = document.querySelector('.event__save-btn[disabled]');
    evt.preventDefault();

    if (!disabledSavingButton) {
      this.#handleResetClick();
    }
  };

  #deleteButtonClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleDeleteClick(PointEditView.generateStateToPoint(this._state));
  };

  #typeChangeHandler = (evt) => {
    this.updateElement({
      point: {
        ...this._state.point,
        type: evt.target.value,
        offers: [],
      },
    });
  };

  #destinationChangeHandler = (evt) => {
    const selectedDestination = this.#pointDestination.find(
      (destination) => destination.name === evt.target.value
    );
    const selectedDestinationId = selectedDestination ? selectedDestination.id : null;

    this.updateElement({
      point: {
        ...this._state.point,
        destination: selectedDestinationId,
      },
    });
  };

  #offerChangeHandler = () => {
    const checkedBoxes = Array.from(
      this.element.querySelectorAll('.event__offer-checkbox:checked')
    );

    this._setState({
      point: {
        ...this._state.point,
        offers: checkedBoxes.map((element) => element.id),
      },
    });
  };

  #priceChangeHandler = (evt) => {
    this._setState({
      point: {
        ...this._state.point,
        basePrice: evt.target.value,
      },
    });
  };

  #dateFromOpenHandler = () => {
    const today = new Date();
    this.#datepickerFrom.setDate(today);
  };

  #dateFromCloseHandler = ([userDate]) => {
    this._setState({
      point: {
        ...this._state.point,
        dateFrom: userDate,
      },
    });

    this.#datepickerTo.set('minDate', this._state.point.dateFrom);
  };

  #dateToCloseHandler = ([userDate]) => {
    this._setState({
      point: {
        ...this._state.point,
        dateTo: userDate,
      },
    });

    this.#datepickerFrom.set('maxDate', this._state.point.dateTo);
  };

  #setDatepickers = () => {
    const [dateFromElement, dateToElement] = this.element.querySelectorAll('.event__input--time');
    const commonConfig = {
      dateFormat: 'd/m/y H:i',
      enableTime: true,
      allowInput: true,
      locale: {
        firstDayOfWeek: 1,
      },
      time_24hr: true,
    };

    this.#datepickerFrom = flatpickr(dateFromElement, {
      ...commonConfig,
      defaultDate: this._state.point.dateFrom,
      onClose: this.#dateFromCloseHandler,
      onOpen: () => {
        this.#dateFromOpenHandler();
      },

      maxDate: this._state.point.dateTo,
    });

    this.#datepickerTo = flatpickr(dateToElement, {
      ...commonConfig,
      defaultDate: this._state.point.dateTo,
      onClose: this.#dateToCloseHandler,
      maxDate: this._state.point.dateFrom,
    });
  };

  static generatePointToState = ({
    point,
    isDisabled = false,
    isSaving = false,
    isDeleting = false,
    isSavingCompleted = false,
  }) => ({
    point,
    isDisabled,
    isSaving,
    isDeleting,
    isSavingCompleted,
  });

  static generateStateToPoint = (state) => state.point;
}
