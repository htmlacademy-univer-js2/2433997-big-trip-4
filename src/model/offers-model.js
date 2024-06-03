import Observable from '../framework/observable.js';

export default class OffersModel extends Observable {
  #service = null;
  #offers = null;

  constructor(service) {
    super();

    this.#service = service;
  }

  async init() {
    this.#offers = await this.#service.getOffers();
    return this.#offers;
  }

  getOffers() {
    return this.#offers;
  }

  getByType(type) {
    return this.#offers.find((offer) => offer.type === type).offers;
  }
}
