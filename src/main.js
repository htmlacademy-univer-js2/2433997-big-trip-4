import FilterView from './view/filter-view.js';
import NameRouteInfoView from './view/name-route-info-view.js';
import TripPresenter from './presenter/trip-presenter.js';
import PointsModel from './model/points-model.js';
import { RenderPosition, render } from './render.js';

const siteTripMain = document.querySelector('.trip-main');
const siteFilterControl = siteTripMain.querySelector('.trip-controls__filters');

const siteMainElement = document.querySelector('.page-main');
const siteTripEvents = siteMainElement.querySelector('.trip-events');

const pointsModel = new PointsModel();
const tripPresenter = new TripPresenter({
  tripContainer: siteTripEvents,
  pointsModel,
});

render(new NameRouteInfoView(), siteTripMain, RenderPosition.AFTERBEGIN);
render(new FilterView(), siteFilterControl);
tripPresenter.init();
