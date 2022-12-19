enum WeekDay {
  일,
  월,
  화,
  수,
  목,
  금,
  토,
}

//요일 구하기
export const getToday = () => {
  const date = new Date();
  const day = WeekDay[date.getDay()];
  return day;
};

//00/00 형식으로 날짜 보내기
export const getTodayDate = () => {
  const date = new Date();
  const month = date.getMonth() + 1;
  const today = date.getDate();
  return `${month}/${today}`;
};
