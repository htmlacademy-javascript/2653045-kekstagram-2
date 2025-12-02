/**
 * Модуль для управления масштабом изображения
 */

const SCALE_STEP = 25;
const MIN_SCALE = 25;
const MAX_SCALE = 100;
const DEFAULT_SCALE = 100;

let scaleControlSmaller = null;
let scaleControlBigger = null;
let scaleControlValue = null;
let imagePreview = null;
let currentScale = DEFAULT_SCALE;

/**
 * Обновляет значение масштаба в поле и применяет transform к изображению
 * @param {number} value - Значение масштаба (25-100)
 */
const updateScale = (value) => {
  currentScale = value;
  scaleControlValue.value = `${value}%`;
  imagePreview.style.transform = `scale(${value / 100})`;
};

/**
 * Обработчик уменьшения масштаба
 */
const onSmallerButtonClick = () => {
  if (currentScale > MIN_SCALE) {
    updateScale(currentScale - SCALE_STEP);
  }
};

/**
 * Обработчик увеличения масштаба
 */
const onBiggerButtonClick = () => {
  if (currentScale < MAX_SCALE) {
    updateScale(currentScale + SCALE_STEP);
  }
};

/**
 * Сбрасывает масштаб к значению по умолчанию
 */
const resetScale = () => {
  updateScale(DEFAULT_SCALE);
};

/**
 * Инициализация модуля масштабирования
 */
const initScale = () => {
  // Получаем элементы DOM при инициализации
  scaleControlSmaller = document.querySelector('.scale__control--smaller');
  scaleControlBigger = document.querySelector('.scale__control--bigger');
  scaleControlValue = document.querySelector('.scale__control--value');
  imagePreview = document.querySelector('.img-upload__preview img');

  // Добавляем обработчики только один раз
  if (scaleControlSmaller && scaleControlBigger) {
    scaleControlSmaller.removeEventListener('click', onSmallerButtonClick);
    scaleControlBigger.removeEventListener('click', onBiggerButtonClick);
    scaleControlSmaller.addEventListener('click', onSmallerButtonClick);
    scaleControlBigger.addEventListener('click', onBiggerButtonClick);
  }

  resetScale();
};

export { initScale, resetScale };
