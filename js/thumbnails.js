import { photos } from './data.js';
import { openBigPicture } from './full-ph.js';

const picturesContainer = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

/**
 * Создает DOM-элемент миниатюры на основе данных фотографии.
 * @param {object} photo - Объект с данными фотографии.
 * @returns {Node} - DOM-элемент миниатюры.
 */
const createThumbnail = (photo) => {
  const thumbnail = pictureTemplate.cloneNode(true);

  const imageElement = thumbnail.querySelector('.picture__img');
  imageElement.src = photo.url;
  imageElement.alt = photo.description;

  thumbnail.querySelector('.picture__likes').textContent = photo.likes;
  thumbnail.querySelector('.picture__comments').textContent = photo.comments.length; // Используем длину массива комментариев

  // Добавляем обработчик клика для открытия полноразмерного окна
  thumbnail.addEventListener('click', (evt) => {
    evt.preventDefault();
    openBigPicture(photo);
  });

  return thumbnail;
};

/**
 * Отрисовывает миниатюры фотографий в контейнере.
 * @param {Array<object>} photosData - Массив объектов с данными фотографий.
 */
const renderThumbnails = (photosData) => {
  const fragment = document.createDocumentFragment();

  photosData.forEach((photo) => {
    const thumbnail = createThumbnail(photo);
    fragment.appendChild(thumbnail);
  });

  picturesContainer.appendChild(fragment);
};

// Вызываем функцию отрисовки с импортированными данными
renderThumbnails(photos);

// Экспорт функции для возможности использования в других модулях, если потребуется
export { renderThumbnails };
