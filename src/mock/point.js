import { getRandomInteger, getDate } from '../utils.js';
import { Price } from './const.js';

function generatePoint(type, destinationId, offerIds) {
  return {
    id: crypto.randomUUID(),
    basePrice: getRandomInteger(Price.MIN, Price.Max),
    dateFrom: getDate({ next: false }),
    dateTo: getDate({ next: true }),
    isFavorite: !!getRandomInteger(0, 1),
    destination: destinationId,
    offers: offerIds,
    type,
  };
}

export { generatePoint };