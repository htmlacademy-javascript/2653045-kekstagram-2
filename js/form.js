/**
 * Модуль для работы с формой загрузки и редактирования изображения
 */

import { initScale, resetScale } from './scale.js';
import { initEffects, resetEffects } from './effects.js';

// Константы для валидации
const MAX_HASHTAGS = 5;
const MAX_HASHTAG_LENGTH = 20;
const MIN_HASHTAG_LENGTH = 2;
const MAX_COMMENT_LENGTH = 140;
const HASHTAG_REGEX = /^#[a-zа-яё0-9]{1,19}$/i;

// Получение элементов формы
const uploadForm = document.querySelector('#upload-select-image');
const uploadFileInput = document.querySelector('#upload-file');
const uploadOverlay = document.querySelector('.img-upload__overlay');
const uploadCancel = document.querySelector('#upload-cancel');
const bodyElement = document.querySelector('body');
const hashtagsInput = document.querySelector('.text__hashtags');
const descriptionInput = document.querySelector('.text__description');

/**
 * Нормализует строку хэштегов
 * @param {string} value - Строка с хэштегами
 * @returns {Array<string>} - Массив хэштегов
 */
const parseHashtags = (value) => {
  if (!value.trim()) {
    return [];
  }
  return value.trim().split(/\s+/);
};

/**
 * Валидация количества хэштегов
 * @param {string} value - Строка с хэштегами
 * @returns {boolean}
 */
const validateHashtagsCount = (value) => {
  const hashtags = parseHashtags(value);
  return hashtags.length <= MAX_HASHTAGS;
};

/**
 * Валидация формата хэштегов
 * @param {string} value - Строка с хэштегами
 * @returns {boolean}
 */
const validateHashtagsFormat = (value) => {
  const hashtags = parseHashtags(value);
  if (hashtags.length === 0) {
    return true;
  }
  return hashtags.every((tag) => HASHTAG_REGEX.test(tag));
};

/**
 * Валидация уникальности хэштегов
 * @param {string} value - Строка с хэштегами
 * @returns {boolean}
 */
const validateHashtagsUniqueness = (value) => {
  const hashtags = parseHashtags(value);
  if (hashtags.length === 0) {
    return true;
  }
  const lowerCaseHashtags = hashtags.map((tag) => tag.toLowerCase());
  const uniqueHashtags = new Set(lowerCaseHashtags);
  return hashtags.length === uniqueHashtags.size;
};

/**
 * Валидация длины комментария
 * @param {string} value - Текст комментария
 * @returns {boolean}
 */
const validateCommentLength = (value) => value.length <= MAX_COMMENT_LENGTH;

/**
 * Закрывает форму загрузки изображения
 */
const closeUploadForm = () => {
  uploadOverlay.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);

  uploadForm.reset();

  resetScale();
  resetEffects();

  uploadFileInput.value = '';
};

/**
 * Обработчик нажатия клавиши Escape
 * @param {KeyboardEvent} evt - Событие клавиатуры
 */
function onDocumentKeydown(evt) {
  if (evt.key === 'Escape') {
    const activeElement = document.activeElement;
    const isTextFieldFocused = activeElement === hashtagsInput || activeElement === descriptionInput;

    if (!isTextFieldFocused) {
      evt.preventDefault();
      closeUploadForm();
    }
  }
}

/**
 * Открывает форму загрузки изображения
 */
const openUploadForm = () => {
  console.log('Открытие формы...');

  uploadOverlay.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);

  // Инициализация масштаба и эффектов
  initScale();
  initEffects();

  console.log('Форма открыта');
};

/**
 * Обработчик изменения поля выбора файла
 */
const onFileInputChange = () => {
  console.log('Файл выбран, открываем форму...');
  openUploadForm();
};

/**
 * Обработчик клика по кнопке закрытия формы
 */
const onCancelButtonClick = () => {
  console.log('Закрытие формы...');
  closeUploadForm();
};

/**
 * Обработчик отправки формы
 * @param {Event} evt - Событие отправки формы
 */
const onFormSubmit = (evt) => {
  evt.preventDefault();
  console.log('Форма отправлена (валидация временно отключена)');

  // Простая валидация без Pristine
  const hashtags = parseHashtags(hashtagsInput.value);
  const comment = descriptionInput.value;

  if (!validateHashtagsCount(hashtagsInput.value)) {
    alert(`Максимум ${MAX_HASHTAGS} хэштегов`);
    return;
  }

  if (!validateHashtagsFormat(hashtagsInput.value)) {
    alert(`Хэштег должен начинаться с # и содержать от ${MIN_HASHTAG_LENGTH} до ${MAX_HASHTAG_LENGTH} символов`);
    return;
  }

  if (!validateHashtagsUniqueness(hashtagsInput.value)) {
    alert('Хэштеги не должны повторяться');
    return;
  }

  if (!validateCommentLength(comment)) {
    alert(`Максимум ${MAX_COMMENT_LENGTH} символов в комментарии`);
    return;
  }

  console.log('Валидация пройдена!');
  // uploadForm.submit(); // Раскомментируйте для реальной отправки
};

/**
 * Инициализация модуля формы
 */
const initForm = () => {
  console.log('Инициализация формы...');

  uploadFileInput.addEventListener('change', onFileInputChange);
  uploadCancel.addEventListener('click', onCancelButtonClick);
  uploadForm.addEventListener('submit', onFormSubmit);

  console.log('Форма инициализирована');
};

export { initForm };
