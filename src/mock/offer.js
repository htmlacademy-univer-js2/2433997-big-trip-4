import { Price } from './const.js';
import { getRandomInteger } from './utils.js';

function generateOffer(type) {
  return {
    id: crypto.randomUUID(),
    title: `Offer ${type}`,
    price: getRandomInteger(Price.MIN, Price.Max / 10),
  };
}

export { generateOffer };
