import FilterView from './view/filter-view.js';
import TripPresenter from './presenter/trip-presenter.js';
import { render } from './render.js';

const sitePageHeader = document.querySelector('.page-header');
const siteFilterControl = sitePageHeader.querySelector(
  '.trip-controls__filters'
);

const siteMainElement = document.querySelector('.page-main');
const siteTripEvents = siteMainElement.querySelector('.trip-events');
const tripPresenter = new TripPresenter({
  tripContainer: siteTripEvents,
});

render(new FilterView(), siteFilterControl);
tripPresenter.init();
