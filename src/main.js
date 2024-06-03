import PointsModel from './model/points-model.js';
import DestinationsModel from './model/destinations-model.js';
import OffersModel from './model/offers-model.js';
import FilterModel from './model/filter-model.js';

import TripPresenter from './presenter/trip-presenter.js';
import TitleRoutePresenter from './presenter/title-route-presenter.js';
import NewEventPresenter from './presenter/new-event-presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';

import TripApiService from './service/trip-api-service.js';
import { AUTHORIZATION_HEADER, SERVER_ADRESS } from './service/const.js';

const tripBodyElement = document.querySelector('body');
const tripPageHeaderElement = tripBodyElement.querySelector('.page-header');
const tripMainElement = tripPageHeaderElement.querySelector('.trip-main');
const tripPageMainElement = tripBodyElement.querySelector('.page-main');
const tripEventsElement = tripPageMainElement.querySelector('.trip-events');
const tripFiltersElement = tripMainElement.querySelector('.trip-controls__filters');

const tripApiService = new TripApiService(SERVER_ADRESS, AUTHORIZATION_HEADER);

const filterModel = new FilterModel();
const destinationsModel = new DestinationsModel(tripApiService);
const offersModel = new OffersModel(tripApiService);
const pointsModel = new PointsModel({
  service: tripApiService,
  destinationsModel,
  offersModel,
});

const titleRoutePresenter = new TitleRoutePresenter({
  container: tripMainElement,
  pointsModel,
  destinationsModel,
  offersModel,
});

const newEventPresenter = new NewEventPresenter({
  container: tripMainElement,
});

const filterPresenter = new FilterPresenter({
  container: tripFiltersElement,
  pointsModel,
  filterModel,
});

const tripPresenter = new TripPresenter({
  tripContainer: tripEventsElement,
  destinationsModel,
  offersModel,
  pointsModel,
  filterModel,
  newEventPresenter: newEventPresenter,
});

titleRoutePresenter.init();
newEventPresenter.init({
  onButtonClick: tripPresenter.newPointButtonClickHandler,
});
filterPresenter.init();
tripPresenter.init();
pointsModel.init();
