const DESCRIPTIONS = [
  'Прекрасный день для прогулки!', 'Захватывающий вид с вершины горы.', 'Мой любимый завтрак.',
  'Ночной город в огнях.', 'Просто красивый закат.', 'Новые приключения ждут!',
  'Тихий вечер у камина.', 'Встреча с друзьями.', 'Уютное место для чтения.',
  'Поймал момент.', 'Архитектурный шедевр.', 'Вдохновение повсюду.',
  'Свежий воздух и природа.', 'Идеальный кадр.', 'Воспоминания о лете.',
  'Зимняя сказка.', 'Море и солнце.', 'Вкусный ужин.',
  'Спортивные достижения.', 'Прогулка по старому городу.', 'Мой пушистый друг.',
  'Цветы в саду.', 'Яркие краски осени.', 'Наконец-то отпуск!',
  'Счастливые моменты.',
];
const MESSAGES = [
  'Всё отлично!', 'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];
const NAMES = [
  'Иван', 'Мария', 'Алексей', 'Елена', 'Дмитрий',
  'Ольга', 'Сергей', 'Анна', 'Андрей', 'Наталья',
];
const getRandomInteger = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];
let commentIdCounter = 1;
const getUniqueCommentId = () => commentIdCounter++;

const createComment = () => {
  const messageCount = getRandomInteger(1, 2);
  let message = getRandomArrayElement(MESSAGES);

  if (messageCount === 2) {
    let secondMessage = getRandomArrayElement(MESSAGES);
    while (secondMessage === message) {
      secondMessage = getRandomArrayElement(MESSAGES);
    }
    // ИСПРАВЛЕНО: Добавлены обратные кавычки (бэктики)
    message = `${message} ${secondMessage}`;
  }

  return {
    id: getUniqueCommentId(),
    avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
    message: message,
    name: getRandomArrayElement(NAMES),
  };
};

const createPhotoDescription = (index) => {
  const photoId = index + 1;
  const commentsCount = getRandomInteger(0, 30);
  const comments = Array.from({ length: commentsCount }, createComment);

  return {
    id: photoId,
    url: `photos/${photoId}.jpg`,
    description: DESCRIPTIONS[index % DESCRIPTIONS.length],
    likes: getRandomInteger(15, 200),
    comments: comments,
  };
};

const generatePhotoDescriptions = () => {
  commentIdCounter = 1;
  return Array.from({ length: 25 }, (_, index) => createPhotoDescription(index));
};
const photoDescriptions = generatePhotoDescriptions();
// eslint-disable-next-line no-console
console.log(photoDescriptions);

