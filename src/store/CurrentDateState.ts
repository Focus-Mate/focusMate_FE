import { atom } from 'recoil';

interface CurrentDate {
  currentDate: Date;
  isToday: boolean;
}

export const CurrentDateState = atom<CurrentDate>({
  key: 'CurrentDateState',
  default: { currentDate: new Date(), isToday: true },
});
