import PointView from '../view/point-view.js';
import PointsListView from '../view/points-list-view.js';
import EditPointView from '../view/edit-point-view.js';
import SortView from '../view/sort-view.js';
import { render } from '../render.js';

export default class TripPresenter {
  pointsListComponent = new PointsListView();

  constructor({ tripContainer, pointsModel }) {
    this.tripContainer = tripContainer;
    this.pointsModel = pointsModel;
  }

  init() {
    this.tripPoints = [...this.pointsModel.getPoints()];

    render(new SortView(), this.tripContainer);
    render(this.pointsListComponent, this.tripContainer);
    render(
      new EditPointView({ point: this.tripPoints[0] }),
      this.pointsListComponent.getElement()
    );

    for (let i = 1; i < this.tripPoints.length; i++) {
      render(
        new PointView({ point: this.tripPoints[i] }),
        this.pointsListComponent.getElement()
      );
    }
  }
}
