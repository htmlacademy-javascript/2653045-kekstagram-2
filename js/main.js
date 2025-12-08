/**
 * Главный модуль приложения
 */

import { loadData } from './api.js';
import { renderThumbnails } from './thumbnails.js';
import { showDataErrorMessage } from './messages.js';
import { initForm } from './form.js';
import { initFilters } from './filters.js';

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
      // Инициализируем фильтры после успешной загрузки
      initFilters(photos);
    })
    .catch(() => {
      // Показываем сообщение об ошибке
      showDataErrorMessage();
    });
};

// Запускаем приложение
initApp();
