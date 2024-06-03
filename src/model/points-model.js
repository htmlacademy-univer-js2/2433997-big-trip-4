import Observable from '../framework/observable.js';
import { UPDATE_TYPES } from '../const.js';
import { updateItem, adaptToClient, adaptToServer } from './utils.js';

export default class PointsModel extends Observable {
  #points = [];
  #service = null;
  #destinationsModel = null;
  #offersModel = null;

  constructor({ service, destinationsModel, offersModel }) {
    super();

    this.#service = service;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
  }

  async init() {
    try {
      await Promise.all([this.#destinationsModel.init(), this.#offersModel.init()]);
      const points = await this.#service.getPoints();
      this.#points = points.map(adaptToClient);
      this._notify(UPDATE_TYPES.INIT, { isError: false });
    } catch {
      this.#points = [];
      this._notify(UPDATE_TYPES.INIT, { isError: true });
    }
  }

  getPoints() {
    return this.#points;
  }

  getById(id) {
    return this.#points.find((point) => point.id === id);
  }

  async update(updateType, point) {
    try {
      const updatedPoint = await this.#service.updatePoint(adaptToServer(point));
      const adaptedPoint = adaptToClient(updatedPoint);
      this.#points = updateItem(this.#points, adaptedPoint);
      this._notify(updateType, adaptedPoint);
    } catch {
      throw new Error('Can not update point');
    }
  }

  async add(updateType, point) {
    try {
      const addedPoint = await this.#service.addPoint(adaptToServer(point));
      const adaptedPoint = adaptToClient(addedPoint);
      this.#points.push(adaptedPoint);
      this._notify(updateType, adaptedPoint);
    } catch {
      throw new Error('Can not add point');
    }
  }

  async delete(updateType, point) {
    try {
      await this.#service.deletePoint(point);
      this.#points = this.#points.filter((pointItem) => pointItem.id !== point.id);
      this._notify(updateType);
    } catch {
      throw new Error('Can not delete point');
    }
  }
}
