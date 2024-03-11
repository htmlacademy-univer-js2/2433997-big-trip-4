import { createElement } from '../render.js';
import { createEventPointTemplate } from '../template/event-point-template.js';

export default class RoutePoint {
  getTemplate() {
    return createEventPointTemplate();
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
