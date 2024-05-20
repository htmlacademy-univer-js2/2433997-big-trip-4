import { createNameRouteInfoTemplate } from '../template/name-route-info-template';
import AbstractView from '../framework/view/abstract-view.js';

export default class NameRouteInfoView extends AbstractView {
  get template() {
    return createNameRouteInfoTemplate();
  }
}
