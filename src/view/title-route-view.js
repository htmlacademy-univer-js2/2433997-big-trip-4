import AbstractView from '../framework/view/abstract-view.js';
import { createTitleRouteTemplate } from '../template/title-route-template.js';
import { getTitleRoute, getRouteDuration, getRoutePrice } from '../utils/title-route.js';

export default class TitleRouteView extends AbstractView {
  #destinations = null;
  #offers = null;
  #points = 0;

  constructor({ destinations, offers, points }) {
    super();

    this.#destinations = destinations;
    this.#offers = offers;
    this.#points = points;
  }

  get template() {
    return createTitleRouteTemplate({
      title: getTitleRoute(this.#points, this.#destinations),
      duration: getRouteDuration(this.#points),
      cost: getRoutePrice(this.#points, this.#offers),
      isEmpty: this.#points.length === 0,
    });
  }
}
