import ApiService from '../framework/api-service.js';
import { METHODS } from './const.js';

export default class TripApiService extends ApiService {
  getDestinations() {
    return this._load({ url: 'destinations' }).then(ApiService.parseResponse);
  }

  getOffers() {
    return this._load({ url: 'offers' }).then(ApiService.parseResponse);
  }

  getPoints() {
    return this._load({ url: 'points' }).then(ApiService.parseResponse);
  }

  async updatePoint(update) {
    const response = await this._load({
      url: `points/${update.id}`,
      method: METHODS.PUT,
      body: JSON.stringify(update),
      headers: new Headers({ 'Content-Type': 'application/json' }),
    });

    const parsedResponse = await ApiService.parseResponse(response);
    return parsedResponse;
  }

  async addPoint(point) {
    const response = await this._load({
      url: 'points',
      method: METHODS.POST,
      body: JSON.stringify(point),
      headers: new Headers({ 'Content-Type': 'application/json' }),
    });

    const parsedResponse = await ApiService.parseResponse(response);
    return parsedResponse;
  }

  async deletePoint(point) {
    await this._load({
      url: `points/${point.id}`,
      method: METHODS.DELETE,
    });
  }
}
