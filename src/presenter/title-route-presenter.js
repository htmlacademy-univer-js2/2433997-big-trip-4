import TitleRouteView from '../view/title-route-view.js';
import { render, replace, remove, RenderPosition } from '../framework/render.js';

export default class TitleRoutePresenter {
  #container = null;
  #tripInfoComponent = null;
  #pointsModel = null;
  #destinationsModel = null;
  #offersModel = null;

  constructor({ container, pointsModel, destinationsModel, offersModel }) {
    this.#container = container;
    this.#pointsModel = pointsModel;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
  }

  get points() {
    return this.#pointsModel.getPoints();
  }

  get destinations() {
    return this.#destinationsModel.getDestinations();
  }

  get offers() {
    return this.#offersModel.getOffers();
  }

  init() {
    this.#renderTripInfo();
    this.#pointsModel.addObserver(this.#modelEventHandler);
  }

  #renderTripInfo = () => {
    const prevTripInfoComponent = this.#tripInfoComponent;
    const destinations = this.destinations;
    const offers = this.offers;
    const points = this.points;

    this.#tripInfoComponent = new TitleRouteView({
      destinations,
      offers,
      points,
    });

    if (!prevTripInfoComponent) {
      render(this.#tripInfoComponent, this.#container, RenderPosition.AFTERBEGIN);
      return;
    }

    replace(this.#tripInfoComponent, prevTripInfoComponent);
    remove(prevTripInfoComponent);
  };

  #modelEventHandler = () => {
    this.#renderTripInfo();
  };
}
