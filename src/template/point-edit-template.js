import { FORM_TYPES } from '../const.js';
import { formatStringToDateTime } from '../utils/point.js';
import he from 'he';

const buttonTitle = {
  CANCEL_DEFAULT: 'Cancel',
  DELETE_DEFAULT: 'Delete',
  DELETE_IN_PROGRESS: 'Deleting...',
  SAVE_DEFAULT: 'Save',
  SAVE_IN_PROGRESS: 'Saving...',
};

const createSaveButtonTemplate = ({ isSaving, isDisabled }) => {
  const label = isSaving ? buttonTitle.SAVE_IN_PROGRESS : buttonTitle.SAVE_DEFAULT;
  return `<button class="event__save-btn btn btn--blue" type="submit" ${isDisabled ? 'disabled' : ''}>${label}</button>`;};

const createResetButtonTemplate = ({ pointType, isDeleting, isDisabled }) => {
  let label;
  if (pointType === FORM_TYPES.CREATING) {
    label = buttonTitle.CANCEL_DEFAULT;
    return `<button class="event__reset-btn btn" type="reset"><span ${isDisabled ? 'disabled' : ''}>${label}</span></button>`;
  }
  else {
    label = isDeleting ? buttonTitle.DELETE_IN_PROGRESS : buttonTitle.DELETE_DEFAULT;
    return `<button class="event__reset-btn btn" type="reset" ${isDisabled ? 'disabled' : '' }>${label}</button>`;
  }
};

const createRollupButtonTemplate = (isDisabled) =>
  `<button class="event__rollup-btn" type="button"><span class="visually-hidden" ${isDisabled ? 'disabled' : ''}>Open event</span></button>`;

const createPointEditControlsTemplate = ({
  pointType,
  isSaving,
  isDeleting,
  isDisabled,
}) => `${createSaveButtonTemplate({ isSaving, isDisabled })}
${createResetButtonTemplate({ pointType, isDeleting, isDisabled })} ${pointType === FORM_TYPES.EDITING ? createRollupButtonTemplate(isDisabled) : ''}`;

const createPointCitiesOptionsTemplate = ({ pointDestination, isDisabled }) =>
  `<datalist id="destination-list-1" ${isDisabled ? 'disabled' : ''}>
            ${pointDestination.map(({ name }) => `<option value="${name}"></option>`).join('')}
        </div>`;

const createPointPhotosTemplate = (pointDestination) =>
  pointDestination.pictures && pointDestination.pictures.length
    ? `<div class="event__photos-tape">
              ${pointDestination.pictures.map((picture) => `<img class="event__photo" src="${picture.src}" alt="${picture.description}">` ).join('')}
          </div>`
    : '';

const createPointTypesTemplate = ({ pointOffers, currentType, isDisabled }) =>
  pointOffers
    .map(
      ({ type }) =>
        `<div class="event__type-item">
                    <input id="event-type-${type}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type}" ${
  currentType === type ? 'checked' : ''} ${isDisabled ? 'disabled' : ''}>
                    <label class="event__type-label  event__type-label--${type}" for="event-type-${type}-1">${type}</label>        </div>`) .join('');

const createPointOffersTemplate = ({ offersId, currentOffers }) => {
  const offerItems = currentOffers
    .map((offer) => {
      const isChecked = offersId.includes(offer.id) ? 'checked' : '';
      return `<div class="event__offer-selector">
                <input class="event__offer-checkbox  visually-hidden" id="${offer.id}" type="checkbox" name="event-offer-luggage" ${isChecked}>
                <label class="event__offer-label" for="${offer.id}">
                    <span class="event__offer-title">${offer.title}</span>
                    &plus;&euro;&nbsp;
                    <span class="event__offer-price">${offer.price}</span>
                </label>
            </div>`;
    })
    .join('');

  return `<div class="event__available-offers">${offerItems}</div>`;
};

const createPointEditTemplate = ({ state, pointDestination, pointOffers, pointType }) => {
  const { point, isDisabled, isSaving, isDeleting } = state;
  const { basePrice, dateFrom, dateTo, type } = point;

  const currentDestination = pointDestination.find(
    (destination) => destination.id === point.destination
  );
  const currentOffers = pointOffers.find((offer) => offer.type === type).offers;

  return `<li class="trip-events__item">
            <form class="event event--edit" action="#" method="post">
                <header class="event__header">
                    <div class="event__type-wrapper">
                        <label class="event__type  event__type-btn" for="event-type-toggle-1">
                            <span class="visually-hidden">Choose event type</span>
                            <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
                        </label>
                        <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox" ${isDisabled ? 'disabled' : ''
}>
                        <div class="event__type-list">
                            <fieldset class="event__type-group">
                                <legend class="visually-hidden">Event type</legend>
                                ${createPointTypesTemplate({ pointOffers, type, isDisabled })}
                            </fieldset>
                        </div>
                    </div>
                    <div class="event__field-group  event__field-group--destination">
                        <label class="event__label  event__type-output" for="event-destination-1">
                            ${type}
                        </label>
                        <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${currentDestination ? he.encode(currentDestination.name) : ''}" list="destination-list-1" ${isDisabled ? 'disabled' : ''}>
                        ${createPointCitiesOptionsTemplate({ pointDestination, isDisabled })}
                    </div>
                    <div class="event__field-group  event__field-group--time">
                        <label class="visually-hidden" for="event-start-time-1">From</label>
                        <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${
  point.dateFrom ? formatStringToDateTime(dateFrom) : ''}" ${isDisabled ? 'disabled' : ''}>
                        &mdash;
                        <label class="visually-hidden" for="event-end-time-1">To</label>
                        <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${
  point.dateTo ? formatStringToDateTime(dateTo) : ''}" ${isDisabled ? 'disabled' : ''}>
                    </div>
                    <div class="event__field-group  event__field-group--price">
                        <label class="event__label" for="event-price-1">
                            <span class="visually-hidden">Price</span>
                            &euro;
                        </label>
                        <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value=${he.encode(
    String(basePrice))} ${isDisabled ? 'disabled' : ''}>
                    </div>
     ${createPointEditControlsTemplate({pointType,isDisabled,isSaving,isDeleting,})}
                </header>
                <section class="event__details">
                ${currentOffers.length ? `<section class="event__section  event__section--offers">
                <h3 class="event__section-title  event__section-title--offers">Offers</h3>
                ${createPointOffersTemplate({ offersId: point.offers, currentOffers })}
            </section>` : ''}
            ${
  currentDestination
    ? `${
      currentDestination.description.length || currentDestination.pictures.length
        ? `<section class="event__section  event__section--destination">
                    <h3 class="event__section-title  event__section-title--destination">Destination</h3>
                    <p class="event__destination-description">${currentDestination.description}</p>
                    ${createPointPhotosTemplate(currentDestination)}` : '' }
                </section>` : ''}
                </section>
            </form>
        </li>`;
};

export { createPointEditTemplate };
