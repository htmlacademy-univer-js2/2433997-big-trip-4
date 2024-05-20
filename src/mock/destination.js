import { CITIES, DESCRIPTION } from './const.js';
import { getRandomValue } from '../utils/common.js';

function generateDestination() {
  const city = getRandomValue(CITIES);

  return {
    id: crypto.randomUUID(),
    name: city,
    description: DESCRIPTION,
    pictures: [
      {
        src: `https://loremflickr.com/248/152?random=${crypto.randomUUID()}`,
        description: `${city} description`,
      },
      {
        src: `https://loremflickr.com/248/152?random=${crypto.randomUUID()}`,
        description: `${city} description`,
      },
    ],
  };
}

export { generateDestination };
