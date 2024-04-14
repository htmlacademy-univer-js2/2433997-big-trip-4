import { createElement } from '../render.js';
import { createEditPointTemplate } from '../template/edit-point-template.js';

const BLANK_POINT = {
  id: '0',
  basePrice: 0,
  dateFrom: '2019-07-10T22:55:56.845Z',
  dateTo: '2019-07-11T11:22:13.375Z',
  type: 'Restaurant',
  isFavorite: false,
  destination: {
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra.',
    title: 'Moscow',
    picture: [
      `https://loremflickr.com/248/152?random=${1}`,
      `https://loremflickr.com/248/152?random=${2}`,
      `https://loremflickr.com/248/152?random=${3}`,
      `https://loremflickr.com/248/152?random=${4}`,
    ],
  },
  offers: [{ title: 'none', type: 'bus', price: 30 }],
};

export default class EditPointView {
  constructor({ point = BLANK_POINT }) {
    this.point = point;
  }

  getTemplate() {
    return createEditPointTemplate(this.point);
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
