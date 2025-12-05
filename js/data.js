const PHOTO_COUNT = 25;
const COMMENT_MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const COMMENT_NAMES = [
  'Артём',
  'Мария',
  'Иван',
  'Анна',
  'Дмитрий',
  'Елена'
];

// Генерация одного комментария
const createComment = (id) => ({
  id,
  avatar: `img/avatar-${Math.floor(Math.random() * 6) + 1}.svg`,
  message: COMMENT_MESSAGES[Math.floor(Math.random() * COMMENT_MESSAGES.length)],
  name: COMMENT_NAMES[Math.floor(Math.random() * COMMENT_NAMES.length)]
});

// Генерация массива комментариев для фотографии
const generateComments = () => {
  const commentCount = Math.floor(Math.random() * 20) + 1;
  return Array.from({ length: commentCount }, (_, index) => createComment(index + 1));
};

// Создание одной фотографии
const createPhoto = (index) => ({
  id: index,
  url: `photos/${index}.jpg`,
  description: `Описание фотографии ${index}`,
  likes: Math.floor(Math.random() * 100) + 15,
  comments: generateComments() // Теперь это массив объектов комментариев
});

// Создаём функцию для генерации фотографий
const generatePhotoDescriptions = () => Array.from({ length: PHOTO_COUNT }, (_, index) => createPhoto(index + 1));

// Экспортируем функцию
export { generatePhotoDescriptions };
