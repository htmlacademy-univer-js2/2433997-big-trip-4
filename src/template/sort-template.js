function createSortItemsTemplate({ items }) {
  const sortItems = items
    .map(
      (sortItem) => `<div class="trip-sort__item  trip-sort__item--${sortItem.type}">
          <input
            id="sort-${sortItem.type}"
            class="trip-sort__input  visually-hidden"
            type="radio"
            name="trip-sort"
            value="sort-${sortItem.type}"
            data-sort-type="${sortItem.type}"
            ${sortItem.isChecked ? 'checked' : ''}
            ${sortItem.isDisabled ? 'disabled' : ''}
          >
          <label
            class="trip-sort__btn"
            for="sort-${sortItem.type}">${sortItem.type}</label>
        </div>`
    )
    .join('');

  return sortItems;
}

const createSortTemplate = ({
  items,
}) => `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">${createSortItemsTemplate(
  { items }
)}
      </form>`;

export { createSortTemplate };
