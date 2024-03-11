import SortView from '../view/sort-view.js';
import EditPoint from '../view/edit-point-view.js';
import EventList from '../view/event-list-view.js';
import EventPoint from '../view/event-point-view.js';
import { render } from '../render.js';
import { POINT_COUNT } from '../const.js';

export default class TripPresenter {
  eventListComponent = new EventList();

  constructor({ tripContainer }) {
    this.tripContainer = tripContainer;
  }

  init() {
    render(new SortView(), this.tripContainer);
    render(this.eventListComponent, this.tripContainer);
    render(new EditPoint(), this.eventListComponent.getElement());

    for (let i = 0; i < POINT_COUNT; i++) {
      render(new EventPoint(), this.eventListComponent.getElement());
    }
  }
}
