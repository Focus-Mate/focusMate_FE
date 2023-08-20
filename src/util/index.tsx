export enum WeekDay {
  일,
  월,
  화,
  수,
  목,
  금,
  토,
}

export const week = ['월', '화', '수', '목', '금', '토', '일'];

export function msToSec(milliseconds: number): number {
  const seconds: number = milliseconds / 1000;
  return seconds;
}

export function formatSeconds(seconds: number): string {
  seconds = Math.floor(seconds);

  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  const hoursString = hours.toString().padStart(2, '0');
  const minutesString = minutes.toString().padStart(2, '0');
  const secondsString = remainingSeconds.toString().padStart(2, '0');

  return `${hoursString}:${minutesString}:${secondsString}`;
}

export function formatSecondsToHHMM(seconds: number): string {
  seconds = Math.floor(seconds);

  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);

  const hoursString = hours.toString().padStart(2, '0');
  let minutesString = minutes.toString().padStart(2, '0');

  if (seconds === 0) {
    return '';
  } else {
    if (seconds > 0 && seconds < 60) {
      minutesString = '01';
    }
    return `${hoursString}:${minutesString}`;
  }
}

//요일 구하기
export const getToday = (date: Date) => {
  const day = WeekDay[date.getDay()];
  return day;
};

export function getMondayAndSundayDates(date: Date): {
  monday: Date;
  sunday: Date;
} {
  // todo: getDay()의 0이 일요일이어서 일요일에는 다음주 월요일부터 보임

  const monday = new Date(
    date.getTime() + (1 - date.getDay()) * 24 * 60 * 60 * 1000,
  );
  const sunday = new Date(
    date.getTime() + (7 - date.getDay()) * 24 * 60 * 60 * 1000,
  );
  return { monday, sunday };
}

export const setDateFormat = (data: number) => {
  if (data < 10) return '0' + data;
  else return data;
};

//00/00 형식으로 날짜 보내기
export const getTodayDate = () => {
  const date = new Date();
  const month = date.getMonth() + 1;
  const today = date.getDate();
  return `${setDateFormat(month)}/${setDateFormat(today)}`;
};

export const getDate = (dateData: Date) => {
  const date = new Date(dateData);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;

  const today = date.getDate();
  return `${year}-${setDateFormat(month)}-${setDateFormat(today)}`;
};

export const isFuture = (dateString: string): boolean => {
  const today = new Date().setHours(0, 0, 0, 0);
  const date = new Date(dateString).setHours(0, 0, 0, 0);
  return date > today;
};

export function findMinMax(numbers: number[]): { min: number; max: number } {
  const min = Math.min(...numbers);
  const max = Math.max(...numbers);

  return { min, max };
}
