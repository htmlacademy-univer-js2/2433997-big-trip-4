import dayjs from 'dayjs';
import { SORT_TYPES } from '../const.js';
import { NUMBER_TITLE_ROUTES } from './const.js';
import { sortedTypes } from './sort.js';

function getTitleRoute(points = [], destinations = []) {
  const destinationNames = sortedTypes[SORT_TYPES.DAY]([...points]).map(
    (point) => destinations.find((destination) => destination.id === point.destination).name
  );

  return destinationNames.length <= NUMBER_TITLE_ROUTES
    ? destinationNames.join('&nbsp;&mdash;&nbsp;')
    : `${destinationNames.at(0)}&nbsp;&mdash;&nbsp;...&nbsp;&mdash;&nbsp;${destinationNames.at(
      -1
    )}`;
}

function getRouteDuration(points = []) {
  const sortedPoints = sortedTypes[SORT_TYPES.DAY]([...points]);

  return sortedPoints.length > 0
    ? `${dayjs(sortedPoints.at(0).dateFrom).format('DD MMM')}&nbsp;&mdash;&nbsp;${dayjs(
      sortedPoints.at(-1).dateTo
    ).format('DD MMM')}`
    : '';
}

function getOffersPrice(offerIds = [], offers = []) {
  return offerIds.reduce(
    (result, id) => result + (offers.find((offer) => offer.id === id)?.price ?? 0),
    0
  );
}

function getRoutePrice(points = [], offers = []) {
  return points.reduce(
    (result, point) =>
      result +
      point.basePrice +
      getOffersPrice(point.offers, offers.find((offer) => point.type === offer.type)?.offers),
    0
  );
}

export { getTitleRoute, getRouteDuration, getRoutePrice };
