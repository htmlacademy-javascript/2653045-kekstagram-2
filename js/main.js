/**
 * Главный модуль приложения
 */

import { loadData } from './api.js';
import { renderThumbnails } from './thumbnails.js';
import { showDataErrorMessage } from './messages.js';
import { initForm } from './form.js';
import './filters.js';

/**
 * Инициализация приложения
 */
const initApp = () => {
  // Инициализируем форму загрузки
  initForm();

  // Загружаем данные с сервера
  loadData()
    .then((photos) => {
      // Отрисовываем миниатюры
      renderThumbnails(photos);
    })
    .catch(() => {
      // Показываем сообщение об ошибке
      showDataErrorMessage();
    });
};

// Запускаем приложение
initApp();

