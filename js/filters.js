/**
 * Модуль для фильтрации фотографий
 */

import { renderThumbnails } from './thumbnails.js';
import { debounce } from './utils.js';

// Константы
const RANDOM_PHOTOS_COUNT = 10;
const DEBOUNCE_DELAY = 500;

// Типы фильтров
const FilterType = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed'
};

// DOM элементы
const filtersContainer = document.querySelector('.img-filters');
const filtersForm = document.querySelector('.img-filters__form');
const filterButtons = filtersForm.querySelectorAll('.img-filters__button');

// Переменная для хранения исходных данных
let photosData = [];

/**
 * Показывает блок с фильтрами (удаляет класс img-filters--inactive)
 */
const showFilters = () => {
  filtersContainer.classList.remove('img-filters--inactive');
};

/**
 * Фильтр "По умолчанию" - возвращает исходный массив
 * @param {Array<object>} photos - Массив фотографий
 * @returns {Array<object>} - Исходный массив
 */
const filterDefault = (photos) => photos.slice();

/**
 * Фильтр "Случайные" - возвращает 10 случайных неповторяющихся фотографий
 * @param {Array<object>} photos - Массив фотографий
 * @returns {Array<object>} - Массив из 10 случайных фотографий
 */
const filterRandom = (photos) => {
  // Создаем копию массива и перемешиваем его
  const shuffled = photos.slice().sort(() => Math.random() - 0.5);
  // Возвращаем первые 10 элементов
  return shuffled.slice(0, RANDOM_PHOTOS_COUNT);
};

/**
 * Фильтр "Обсуждаемые" - сортирует по убыванию количества комментариев
 * @param {Array<object>} photos - Массив фотографий
 * @returns {Array<object>} - Отсортированный массив
 */
const filterDiscussed = (photos) => photos.slice().sort((a, b) => b.comments.length - a.comments.length);

/**
 * Применяет фильтр к фотографиям
 * @param {string} filterType - Тип фильтра
 */
const applyFilter = (filterType) => {
  let filteredPhotos = [];

  switch (filterType) {
    case FilterType.RANDOM:
      filteredPhotos = filterRandom(photosData);
      break;
    case FilterType.DISCUSSED:
      filteredPhotos = filterDiscussed(photosData);
      break;
    case FilterType.DEFAULT:
    default:
      filteredPhotos = filterDefault(photosData);
      break;
  }

  // Перерисовываем миниатюры с отфильтрованными данными
  renderThumbnails(filteredPhotos);
};

/**
 * Применяет фильтр с debounce
 */
const applyFilterDebounced = debounce(applyFilter, DEBOUNCE_DELAY);

/**
 * Обновляет активную кнопку фильтра
 * @param {HTMLElement} activeButton - Активная кнопка
 */
const updateActiveButton = (activeButton) => {
  filterButtons.forEach((button) => {
    button.classList.remove('img-filters__button--active');
  });
  activeButton.classList.add('img-filters__button--active');
};

/**
 * Обработчик клика по кнопкам фильтров
 * @param {Event} evt - Событие клика
 */
const onFilterClick = (evt) => {
  const button = evt.target;

  // Проверяем, что клик был по кнопке фильтра
  if (!button.classList.contains('img-filters__button')) {
    return;
  }

  // Если кнопка уже активна, ничего не делаем
  if (button.classList.contains('img-filters__button--active')) {
    return;
  }

  // Обновляем активную кнопку
  updateActiveButton(button);

  // Применяем фильтр с debounce
  applyFilterDebounced(button.id);
};

/**
 * Инициализирует фильтры
 * @param {Array<object>} photos - Массив фотографий с сервера
 */
const initFilters = (photos) => {
  // Сохраняем исходные данные
  photosData = photos.slice();

  // Показываем блок с фильтрами
  showFilters();

  // Добавляем обработчик клика на форму с фильтрами (делегирование событий)
  filtersForm.addEventListener('click', onFilterClick);
};

export { initFilters };
