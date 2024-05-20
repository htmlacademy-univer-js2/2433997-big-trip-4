export default class PointsModel {
  #points = [];

  constructor(service) {
    this.service = service;
    this.#points = this.service.points;
  }

  get points() {
    return this.#points;
  }
}
