const bigPictureElement = document.querySelector('.big-picture');
const bigPictureCancel = bigPictureElement.querySelector('.big-picture__cancel');
const bodyElement = document.querySelector('body');

const socialCommentCount = bigPictureElement.querySelector('.social__comment-count');
const commentsLoader = bigPictureElement.querySelector('.social__comments-loader');
const socialComments = bigPictureElement.querySelector('.social__comments');
const commentTemplate = socialComments.querySelector('.social__comment');
const shownCommentCountElement = bigPictureElement.querySelector('.social__comment-shown-count');

const COMMENTS_PER_LOAD = 5;
let commentsShown = 0;
let currentComments = [];

/**
 * Создает DOM-элемент комментария на основе данных.
 * @param {object} comment - Объект с данными комментария.
 * @returns {Node} - DOM-элемент комментария.
 */
const createCommentElement = (comment) => {
  const commentElement = commentTemplate.cloneNode(true);
  commentElement.querySelector('.social__picture').src = comment.avatar;
  commentElement.querySelector('.social__picture').alt = comment.name;
  commentElement.querySelector('.social__text').textContent = comment.message;
  return commentElement;
};

/**
 * Отрисовывает порцию комментариев, добавляя их к существующим.
 * @param {Array<object>} comments - Массив объектов комментариев для добавления.
 */
const renderCommentBatch = (comments) => {
  const fragment = document.createDocumentFragment();

  comments.forEach((comment) => {
    fragment.appendChild(createCommentElement(comment));
  });

  socialComments.appendChild(fragment);
};

/**
 * Обновляет секцию комментариев: загружает следующую порцию,
 * обновляет счетчик и управляет видимостью кнопки "Загрузить ещё".
 */
const updateCommentSection = () => {
  const commentsToRender = currentComments.slice(commentsShown, commentsShown + COMMENTS_PER_LOAD);

  renderCommentBatch(commentsToRender);

  commentsShown += commentsToRender.length;

  shownCommentCountElement.textContent = commentsShown;

  if (commentsShown >= currentComments.length) {
    commentsLoader.classList.add('hidden');
  } else {
    commentsLoader.classList.remove('hidden');
  }
};

/**
 * Закрывает полноразмерное окно.
 */
const closeBigPicture = () => {
  bigPictureElement.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);

  // Сброс состояния при закрытии
  commentsShown = 0;
  currentComments = [];
  socialComments.innerHTML = '';
  commentsLoader.removeEventListener('click', updateCommentSection);
};

/**
 * Обработчик нажатия клавиши Esc.
 * @param {Event} evt - Объект события.
 */
function onDocumentKeydown (evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closeBigPicture();
  }
}

/**
 * Заполняет и открывает полноразмерное окно.
 * @param {object} photo - Объект с данными фотографии.
 */
const openBigPicture = (photo) => {
  // 1. Заполнение данных
  bigPictureElement.querySelector('.big-picture__img img').src = photo.url;
  bigPictureElement.querySelector('.likes-count').textContent = photo.likes;
  bigPictureElement.querySelector('.social__caption').textContent = photo.description;

  // 2. Инициализация комментариев
  currentComments = photo.comments;
  commentsShown = 0;
  socialComments.innerHTML = ''; // Очищаем контейнер перед первой загрузкой

  const totalCommentsCount = currentComments.length;
  bigPictureElement.querySelector('.social__comment-total-count').textContent = totalCommentsCount;

  // 3. Загрузка первой порции комментариев
  updateCommentSection();

  // 4. Настройка видимости блоков
  socialCommentCount.classList.remove('hidden'); // Теперь счетчик нужен
  // commentsLoader.classList.remove('hidden'); // Видимость управляется в updateCommentSection

  // 5. Обработчик для кнопки "Загрузить ещё"
  commentsLoader.addEventListener('click', updateCommentSection);

  // 6. Открытие окна
  bigPictureElement.classList.remove('hidden');
  bodyElement.classList.add('modal-open');

  // 7. Обработчики закрытия
  document.addEventListener('keydown', onDocumentKeydown);
};

// Обработчик клика по кнопке закрытия
bigPictureCancel.addEventListener('click', () => {
  closeBigPicture();
});
export { openBigPicture };
