import { isEscapeKey } from './utils.js';

const COMMENTS_PER_PORTION = 5;

const bigPictureElement = document.querySelector('.big-picture');
const bodyElement = document.querySelector('body');
const commentCountElement = bigPictureElement.querySelector('.social__comment-count');
const commentShownCountElement = bigPictureElement.querySelector('.social__comment-shown-count');
const commentTotalCountElement = bigPictureElement.querySelector('.social__comment-total-count');
const commentsLoaderElement = bigPictureElement.querySelector('.comments-loader');
const commentListElement = bigPictureElement.querySelector('.social__comments');
const cancelButtonElement = bigPictureElement.querySelector('.big-picture__cancel');
const commentElement = bigPictureElement.querySelector('.social__comment');

let currentComments = [];
let shownCommentsCount = 0;

const createComment = ({ avatar, name, message }) => {
  const newComment = commentElement.cloneNode(true);

  newComment.querySelector('.social__picture').src = avatar;
  newComment.querySelector('.social__picture').alt = name;
  newComment.querySelector('.social__text').textContent = message;

  return newComment;
};

const updateCommentCount = () => {
  commentShownCountElement.textContent = shownCommentsCount;
  commentTotalCountElement.textContent = currentComments.length;
};

const updateLoaderButton = () => {
  if (shownCommentsCount >= currentComments.length) {
    commentsLoaderElement.classList.add('hidden');
  } else {
    commentsLoaderElement.classList.remove('hidden');
  }
};

const renderComments = () => {
  const commentListFragment = document.createDocumentFragment();
  const commentsToShow = currentComments.slice(shownCommentsCount, shownCommentsCount + COMMENTS_PER_PORTION);

  commentsToShow.forEach((comment) => {
    const commentItem = createComment(comment);
    commentListFragment.append(commentItem);
  });

  commentListElement.append(commentListFragment);
  shownCommentsCount += commentsToShow.length;

  updateCommentCount();
  updateLoaderButton();
};

const onCommentsLoaderClick = () => {
  renderComments();
};

const renderPictureDetails = ({ url, likes, description }) => {
  bigPictureElement.querySelector('.big-picture__img img').src = url;
  bigPictureElement.querySelector('.big-picture__img img').alt = description;
  bigPictureElement.querySelector('.likes-count').textContent = likes;
  bigPictureElement.querySelector('.social__caption').textContent = description;
};

function closeBigPicture() {
  bigPictureElement.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  cancelButtonElement.removeEventListener('click', onCancelButtonClick);
  document.removeEventListener('keydown', onDocumentKeydown);
  commentsLoaderElement.removeEventListener('click', onCommentsLoaderClick);

  currentComments = [];
  shownCommentsCount = 0;
  commentListElement.innerHTML = '';
}

function onDocumentKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
}

function onCancelButtonClick() {
  closeBigPicture();
}

const showBigPicture = (pictureData) => {
  bigPictureElement.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
  commentCountElement.classList.remove('hidden');

  document.addEventListener('keydown', onDocumentKeydown);
  cancelButtonElement.addEventListener('click', onCancelButtonClick);
  commentsLoaderElement.addEventListener('click', onCommentsLoaderClick);

  renderPictureDetails(pictureData);

  currentComments = pictureData.comments;
  shownCommentsCount = 0;
  commentListElement.innerHTML = '';

  renderComments();
};

export { showBigPicture };
