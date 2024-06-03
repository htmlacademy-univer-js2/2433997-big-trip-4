const createNotificationTemplate = ({ message }) =>
  `<section class="trip-events">
            <h2 class="visually-hidden">Trip events</h2>
            <p class="trip-events__msg">${message}</p>
        </section>`;

export { createNotificationTemplate };
