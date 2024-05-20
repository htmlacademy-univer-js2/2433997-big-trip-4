import { createPointListTemplate } from '../template/points-list-template.js';
import AbstractView from '../framework/view/abstract-view.js';

export default class PointListView extends AbstractView {
  get template() {
    return createPointListTemplate();
  }
}
