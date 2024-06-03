import AbstractView from '../framework/view/abstract-view.js';
import { createPreloaderTemplate } from '../template/preloader-template.js';

export default class PreloaderView extends AbstractView {
  get template() {
    return createPreloaderTemplate();
  }
}
