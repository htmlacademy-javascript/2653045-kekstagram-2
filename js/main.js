import { generatePhotoDescriptions } from './data.js';
import { initForm } from './form.js';

const photoDescriptions = generatePhotoDescriptions();
// eslint-disable-next-line no-console
console.log(photoDescriptions);

// Инициализация формы загрузки
initForm();
