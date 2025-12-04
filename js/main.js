import { generatePhotoDescriptions } from './data.js';
import { initForm } from './form.js';
import './thumbnails.js'; // Импорт модуля для отрисовки миниатюр и обработчиков кликов

const photoDescriptions = generatePhotoDescriptions();
// eslint-disable-next-line no-console
console.log(photoDescriptions);

// Инициализация формы загрузки
initForm();
