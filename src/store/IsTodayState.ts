import { atom } from 'recoil';

export const IsTodayState = atom({
  key: 'IsTodayState',
  default: { isToday: true },
});
