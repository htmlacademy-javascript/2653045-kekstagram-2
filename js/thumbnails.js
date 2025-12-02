// Импортируем массив фотографий, который экспортируется по умолчанию из data.js
import photos from './data.js';

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

  // Заполнение данных
  thumbnail.querySelector('.picture__likes').textContent = photo.likes;
  thumbnail.querySelector('.picture__comments').textContent = photo.comments;

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

const photos = generatePhotoDescriptions();
renderThumbnails(photos);

export { renderThumbnails };
