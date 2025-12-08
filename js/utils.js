const getRandomInteger = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

let commentIdCounter = 1;
const getUniqueCommentId = () => commentIdCounter++;
const resetCommentIdCounter = () => {
  commentIdCounter = 1;
};

/**
 * Функция устранения дребезга (debounce)
 * Откладывает выполнение функции до тех пор, пока не пройдет указанное время после последнего вызова
 * @param {Function} callback - Функция, которую нужно вызвать с задержкой
 * @param {number} timeoutDelay - Задержка в миллисекундах
 * @returns {Function} - Функция с debounce
 */
const debounce = (callback, timeoutDelay) => {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export {
  getRandomInteger,
  getRandomArrayElement,
  getUniqueCommentId,
  resetCommentIdCounter,
  debounce
};
