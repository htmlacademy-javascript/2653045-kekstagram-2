/**
 * Модуль для работы с формой загрузки и редактирования изображения
 */

import { initScale, resetScale } from './scale.js';
import { initEffects, resetEffects } from './effects.js';
import { sendData } from './api.js';
import { showSuccessMessage, showErrorMessage } from './messages.js';

// Константы для валидации
const MAX_HASHTAGS = 5;
const MAX_HASHTAG_LENGTH = 20;
const MAX_COMMENT_LENGTH = 140;
const HASHTAG_REGEX = /^#[a-zа-яё0-9]{1,19}$/i;

// Получение элементов формы
const uploadForm = document.querySelector('#upload-select-image');
const uploadFileInput = document.querySelector('#upload-file');
const uploadOverlay = document.querySelector('.img-upload__overlay');
const uploadCancel = document.querySelector('#upload-cancel');
const uploadSubmit = document.querySelector('#upload-submit');
const bodyElement = document.querySelector('body');
const hashtagsInput = document.querySelector('.text__hashtags');
const descriptionInput = document.querySelector('.text__description');
const imagePreview = document.querySelector('.img-upload__preview img');

// Инициализация Pristine
const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error',
});

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

// Добавление правил валидации для хэштегов
pristine.addValidator(
  hashtagsInput,
  validateHashtagsCount,
  `Максимум ${MAX_HASHTAGS} хэштегов`
);

pristine.addValidator(
  hashtagsInput,
  validateHashtagsFormat,
  `Хэштег должен начинаться с # и содержать от 2 до ${MAX_HASHTAG_LENGTH} символов (буквы и цифры)`
);

pristine.addValidator(
  hashtagsInput,
  validateHashtagsUniqueness,
  'Хэштеги не должны повторяться (регистр не учитывается)'
);

// Добавление правил валидации для комментария
pristine.addValidator(
  descriptionInput,
  (value) => value.length <= MAX_COMMENT_LENGTH,
  `Максимум ${MAX_COMMENT_LENGTH} символов`
);

/**
 * Блокирует кнопку отправки
 */
const blockSubmitButton = () => {
  uploadSubmit.disabled = true;
  uploadSubmit.textContent = 'Отправляю...';
};

/**
 * Разблокирует кнопку отправки
 */
const unblockSubmitButton = () => {
  uploadSubmit.disabled = false;
  uploadSubmit.textContent = 'Опубликовать';
};
/**
 * Закрывает форму загрузки изображения
 */
const closeUploadForm = () => {
  uploadOverlay.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);

  uploadForm.reset();
  pristine.reset();

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
  uploadOverlay.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);

  // Инициализация масштаба и эффектов
  initScale();
  initEffects();
};

/**
 * Обработчик изменения поля выбора файла
 */
const onFileInputChange = () => {
  const file = uploadFileInput.files[0];

  if (!file) {
    return;
  }

  // Проверка типа файла
  if (!file.type.startsWith('image/')) {
    // eslint-disable-next-line no-alert
    alert('Пожалуйста, выберите изображение');
    uploadFileInput.value = '';
    return;
  }

  // Чтение файла и установка превью
  const reader = new FileReader();

  reader.addEventListener('load', () => {
    imagePreview.src = reader.result;
    openUploadForm();
  });

  reader.addEventListener('error', () => {
    // eslint-disable-next-line no-alert
    alert('Не удалось загрузить изображение');
  });

  reader.readAsDataURL(file);
};

/**
 * Обработчик клика по кнопке закрытия формы
 */
const onCancelButtonClick = () => {
  closeUploadForm();
};

/**
 * Обработчик отправки формы
 * @param {Event} evt - Событие отправки формы
 */
const onFormSubmit = (evt) => {
  evt.preventDefault();

  // Валидация через Pristine
  const isValid = pristine.validate();

  if (!isValid) {
    return;
  }

  // Блокируем кнопку отправки
  blockSubmitButton();

  // Создаем FormData из формы
  const formData = new FormData(uploadForm);

  // Отправляем данные на сервер
  sendData(formData)
    .then(() => {
      // Успешная отправка
      closeUploadForm();
      showSuccessMessage();
    })
    .catch(() => {
      // Ошибка отправки
      showErrorMessage();
    })
    .finally(() => {
      // Разблокируем кнопку в любом случае
      unblockSubmitButton();
    });
};

/**
 * Инициализация модуля формы
 */
const initForm = () => {
  uploadFileInput.addEventListener('change', onFileInputChange);
  uploadCancel.addEventListener('click', onCancelButtonClick);
  uploadForm.addEventListener('submit', onFormSubmit);
};

export { initForm };
