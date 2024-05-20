import { filter } from '../utils/filter.js';

const generateFilters = (points) =>
  Object.entries(filter).map(([filterType, filterPoints]) => ({
    type: filterType,
    hasPoints: filterPoints(points).length > 0,
  }));

export { generateFilters };
