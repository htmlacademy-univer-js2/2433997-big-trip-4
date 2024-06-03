import AbstractView from '../framework/view/abstract-view.js';
import { createNotificationTemplate } from '../template/notification-template.js';
import { FILTER_NOTIFICATIONS } from '../const.js';

export default class NotificationView extends AbstractView {
  #filterType;

  constructor({ filterType }) {
    super();

    this.#filterType = filterType;
  }

  get template() {
    const message = FILTER_NOTIFICATIONS[this.#filterType];
    return createNotificationTemplate({ message });
  }
}
