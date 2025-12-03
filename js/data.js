const PHOTO_COUNT = 25;

const createPhoto = (index) => ({
  id: index,
  url: `photos/${index}.jpg`,
  description: `Описание фотографии ${index}`,
  likes: Math.floor(Math.random() * 100) + 15,
  comments: Math.floor(Math.random() * 20) + 1,
});

// Создаём функцию для генерации фотографий
const generatePhotoDescriptions = () => Array.from({ length: PHOTO_COUNT }, (_, index) => createPhoto(index + 1));

// Экспортируем функцию
export { generatePhotoDescriptions };
