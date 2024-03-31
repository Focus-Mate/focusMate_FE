import dayjs from 'dayjs';
import { MutableRefObject } from 'react';
import { atom } from 'recoil';

export const timerAtom = atom({
  key: 'timerAtom',
  default: {
    circleWidth: 300, // static value
    radius: 135, // static value
    dashArray: 135 * Math.PI * 2, // radius * Math.PI * 2
  },
});

export const timerDashOffsetAtom = atom({
  key: 'timerDashOffsetAtom',
  default: {
    dashOffset: 135 * Math.PI * 2,
  },
});

export type timerStatusType = 'NONE' | 'PLAYING' | 'PAUSE' | 'STOP';

export const timerStatusAtom = atom<{
  id: string | null;
  playStatus: timerStatusType;
  startTime: MutableRefObject<number> | null;
  endTime: MutableRefObject<number> | null;
}>({
  key: 'timerStatusAtom',
  default: {
    id: null,
    playStatus: 'NONE',
    startTime: null,
    endTime: null,
  },
});

type timerTimeType = dayjs.Dayjs | null;

export const timerStartTimeAtom = atom<timerTimeType>({
  key: 'timerStartTime',
  default: null,
});

export const timerEndTimeAtom = atom<timerTimeType>({
  key: 'timerEndTime',
  default: null,
});
