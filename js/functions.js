// eslint-disable-next-line no-unused-vars
const checkStringLength = (string, maxLength) => string.length <= maxLength;

// eslint-disable-next-line no-unused-vars
const isPalindrome = (string) => {
  const normalizedString = string.toLowerCase().replace(/\s/g, '');
  const reversedString = normalizedString.split('').reverse().join('');

  return normalizedString === reversedString;
};

