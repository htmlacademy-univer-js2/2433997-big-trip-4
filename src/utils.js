function getRandomArrayElement(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function getRandomNumber() {
  return Math.floor(Math.random() * 10);
}

export { getRandomArrayElement, getRandomNumber };
