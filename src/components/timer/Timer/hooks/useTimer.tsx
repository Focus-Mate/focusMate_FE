import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import {
  timerDashOffsetAtom,
  timerStartTimeAtom,
  timerStatusAtom,
} from '../timer.atoms';
import dayjs from 'dayjs';

export function useTimer() {
  const [timerStatus] = useRecoilState(timerStatusAtom);
  const timerStartTime = useRecoilValue(timerStartTimeAtom);
  const setTimerDashOffset = useSetRecoilState(timerDashOffsetAtom);
  const [time, setTime] = useState(0);

  useEffect(() => {
    // 500ms 마다 시간 업데이트
    const interval = setInterval(() => {
      // 끝시간 - 시작시간 = 경과시간 (resultSeconds)

      if (timerStatus.playStatus === 'PLAYING') {
        const resultSeconds = dayjs().diff(timerStartTime, 'second');
        const resultDivide = resultSeconds % 60;

        setTime(resultSeconds);
        setTimerDashOffset({
          dashOffset: 135 * Math.PI * (2 - resultDivide / 30),
        });
      } else if (timerStatus.playStatus === 'NONE') {
        // 플레이 상태가 아니라면 초기화
        setTimerDashOffset({
          dashOffset: 135 * Math.PI * 2,
        });
        setTime(0);
        clearInterval(interval);
      }
    }, 500);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timerStatus.playStatus]);

  return { time };
}
