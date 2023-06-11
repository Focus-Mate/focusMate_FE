import { atom } from 'recoil';

interface CurrentDate {
  currentDate: Date;
}

export const CurrentDateState = atom<CurrentDate>({
  key: 'CurrentDateState',
  default: { currentDate: new Date() },
});
