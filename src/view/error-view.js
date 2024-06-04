import AbstractView from '../framework/view/abstract-view';
import { createErrorTemplate } from '../template/error-template.js';

export default class ErrorView extends AbstractView {
  get template() {
    return createErrorTemplate();
  }
}
