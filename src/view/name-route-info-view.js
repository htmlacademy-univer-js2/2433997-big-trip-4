import { createNameRouteInfoTemplate } from '../template/name-route-info-template';
import { createElement } from '../render.js';

export default class NameRouteInfoView {
  getTemplate() {
    return createNameRouteInfoTemplate();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
