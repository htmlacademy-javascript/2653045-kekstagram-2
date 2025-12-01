const PHOTO_COUNT = 25;
const MAX_COMMENTS = 10;
const MIN_LIKES = 15;
const MAX_LIKES = 100;

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const NAMES = [
  'Артем',
  'Мария',
  'Иван',
  'Ксения',
  'Петр',
  'Ольга',
];

const getRandomArrayElement = (elements) => elements[Math.floor(Math.random() * elements.length)];

const createComment = (id) => ({
  id,
  avatar: `img/avatar-${Math.floor(Math.random() * 6) + 1}.svg`,
  message: getRandomArrayElement(MESSAGES),
  name: getRandomArrayElement(NAMES),
});

const createComments = () => {
  const commentsCount = Math.floor(Math.random() * MAX_COMMENTS);
  return Array.from({ length: commentsCount }, (_, index) => createComment(index + 1));
};

const createPhoto = (index) => ({
  id: index,
  url: `photos/${index}.jpg`,
  description: `Описание фотографии ${index}`,
  likes: Math.floor(Math.random() * (MAX_LIKES - MIN_LIKES + 1)) + MIN_LIKES,
  comments: createComments(),
});

const photos = Array.from({ length: PHOTO_COUNT }, (_, index) => createPhoto(index + 1));

export { photos };
