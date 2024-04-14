import { CITIES, DESCRIPTION } from './const.js';
import { getRandomValue } from './utils.js';

function generateDestination() {
  const city = getRandomValue(CITIES);

  return {
    id: crypto.randomUUID(),
    name: city,
    description: DESCRIPTION,
    picture: [
      {
        src: `https://loremflickr.com/248/152?random=${crypto.randomUUID()}`,
        description: `${city} description`,
      },
    ],
  };
}

export { generateDestination };
