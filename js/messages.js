const DATA_ERROR_SHOW_TIME = 5000;

const bodyElement = document.querySelector('body');
const dataErrorTemplate = document.querySelector('#data-error').content.querySelector('.data-error');
const successTemplate = document.querySelector('#success').content.querySelector('.success');
const errorTemplate = document.querySelector('#error').content.querySelector('.error');

const onDocumentKeydown = (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    const message = document.querySelector('.success') || document.querySelector('.error');
    if (message) {
      // eslint-disable-next-line no-use-before-define
      closeMessage(message);
    }
  }
};

const onBodyClick = (evt) => {
  if (evt.target.closest('.success__inner') || evt.target.closest('.error__inner')) {
    return;
  }
  const message = document.querySelector('.success') || document.querySelector('.error');
  if (message) {
    // eslint-disable-next-line no-use-before-define
    closeMessage(message);
  }
};

const closeMessage = (element) => {
  element.remove();
  document.removeEventListener('keydown', onDocumentKeydown);
  bodyElement.removeEventListener('click', onBodyClick);
};

const showDataErrorMessage = () => {
  const dataError = dataErrorTemplate.cloneNode(true);
  bodyElement.appendChild(dataError);

  setTimeout(() => {
    dataError.remove();
  }, DATA_ERROR_SHOW_TIME);
};

const showSuccessMessage = () => {
  const success = successTemplate.cloneNode(true);
  bodyElement.appendChild(success);

  const successButton = success.querySelector('.success__button');
  successButton.addEventListener('click', () => {
    closeMessage(success);
  });

  document.addEventListener('keydown', onDocumentKeydown);
  bodyElement.addEventListener('click', onBodyClick);
};

const showErrorMessage = () => {
  const error = errorTemplate.cloneNode(true);
  bodyElement.appendChild(error);

  const errorButton = error.querySelector('.error__button');
  errorButton.addEventListener('click', () => {
    closeMessage(error);
  });

  document.addEventListener('keydown', onDocumentKeydown);
  bodyElement.addEventListener('click', onBodyClick);
};

export { showDataErrorMessage, showSuccessMessage, showErrorMessage };
