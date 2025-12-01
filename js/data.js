const PHOTO_COUNT = 25;

const createPhoto = (index) => ({
  id: index,
  url: `photos/${index}.jpg`,
  description: `Описание фотографии ${index}`,
  likes: Math.floor(Math.random() * 100) + 15,
  comments: Math.floor(Math.random() * 20) + 1,
});

// Экспортируем массив напрямую, без промежуточной переменной 'photos'
export default Array.from({ length: PHOTO_COUNT }, (_, index) => createPhoto(index + 1));
