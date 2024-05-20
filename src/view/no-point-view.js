import AbstractView from '../framework/view/abstract-view.js';
import { createNoPointTemplate } from '../template/no-point-template.js';

export default class NoPointView extends AbstractView {
  get template() {
    return createNoPointTemplate();
  }
}
