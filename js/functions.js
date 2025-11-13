const timeToMinutes = (timeString) => {
  const [hours, minutes] = timeString.split(':').map(Number);
  return hours * 60 + minutes;
};

/**
 * Проверяет, укладывается ли встреча в рамки рабочего дня.
 * @param {string} workStart - Время начала рабочего дня ('ЧЧ:ММ').
 * @param {string} workEnd - Время конца рабочего дня ('ЧЧ:ММ').
 * @param {string} meetingStart - Время начала встречи ('ЧЧ:ММ').
 * @param {number} meetingDuration - Продолжительность встречи в минутах.
 * @returns {boolean} true, если встреча в рамках рабочего дня, иначе false.
 */
const isMeetingWithinWorkHours = (workStart, workEnd, meetingStart, meetingDuration) => {
  const workStartMinutes = timeToMinutes(workStart);
  const workEndMinutes = timeToMinutes(workEnd);
  const meetingStartMinutes = timeToMinutes(meetingStart);

  const meetingEndMinutes = meetingStartMinutes + meetingDuration;

  const isStartValid = meetingStartMinutes >= workStartMinutes;
  const isEndValid = meetingEndMinutes <= workEndMinutes;

  return isStartValid && isEndValid;

};
// eslint-disable-next-line no-console
console.log(isMeetingWithinWorkHours('08:00', '17:30', '14:00', 90));

