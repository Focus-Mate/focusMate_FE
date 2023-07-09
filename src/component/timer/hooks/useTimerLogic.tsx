import instance from '@/instance';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useMutation } from 'react-query';
import { useSetRecoilState } from 'recoil';
import { timerBottomSlider } from '../TimerBottomSlideBox';
import koalaPng from '@/component/timer/images/koala.png';

const TimerStatus = {
  NONE: 0,
  PLAYING: 1,
  PAUSE: 2,
  STOP: 3,
};

const radius = 135;

const useTimerLogic = () => {
  const setBottomSlideBox = useSetRecoilState(timerBottomSlider);

  // 타이머 식별자
  const [timerId, setTimerId] = useState('');

  const [playStatus, setPlayStatus] = useState(TimerStatus.NONE);

  // 시간을 멈추면 stackTime에 저장
  const [nowTime, setNowTime] = useState(0);
  const [stackTime, setStackTime] = useState(0);

  const dashArray = radius * Math.PI * 2;
  const [dashOffset, setDashOffset] = useState(0);

  // 최종 결과 시간
  const [resultTime, setResultTime] = useState(0);

  // 타이머 데이터가 추가 되었는지 확인하기 위한 코드
  useEffect(() => {
    const api = async () => {
      const response = await instance.get('/api/calculate/dayrecord', {
        params: {
          theDay: '2023-04-30',
        },
      });
      console.log(response);
    };
    api();
  }, []);

  // stackTime에 저장된 시간과 nowTime을 합하여 resultTime에 저장
  useEffect(() => {
    if (playStatus === TimerStatus.PLAYING) setResultTime(stackTime + nowTime);
    if (playStatus === TimerStatus.STOP) {
      // 멈춘경우 로직
      setStackTime(resultTime);
      setResultTime(resultTime);
      setNowTime(0);
      startTime.current = Date.now();
    }
  }, [playStatus, stackTime, nowTime, resultTime]);

  useEffect(() => {
    if (playStatus === TimerStatus.PLAYING) {
      const timerPercentage =
        (100 / 60) * Math.floor((resultTime % 60000) / 1000);
      setDashOffset(dashArray - (dashArray * timerPercentage) / 100); // 중간의 100이 퍼센테이지
    }
  }, [resultTime, dashArray, playStatus]);

  // 타이머 시작 API
  const { mutateAsync: requestTimerStart } = useMutation(
    'timer/start',
    async () => {
      const response = await instance.post('/api/calculate/startTime');

      return response.data;
    },
  );

  // 타이머 끝 API
  const { mutateAsync: requestTimerStop } = useMutation(
    'timer/stop',
    async ({ startPoint }: { startPoint: string }) => {
      const response = await instance.put('/api/calculate/endTime', {
        startPoint,
      });

      return response.data;
    },
  );

  const startTime = useRef(0);
  const endTime = useRef(0);

  const timerStart = useCallback(() => {
    startTime.current = Date.now();

    function timeout() {
      setTimeout(() => {
        endTime.current = Date.now();
        // 시간 정확도를 위해 setTimeout이 아닌 기기 시간을 사용해 계산
        const time = new Date(endTime.current - startTime.current);

        const hour = time.getUTCHours() * 3600000;
        const minute = time.getUTCMinutes() * 60000;
        const second = time.getUTCSeconds() * 1000;
        const milliSecond = time.getUTCMilliseconds();

        setNowTime(hour + minute + second + milliSecond);

        timeout();
      }, 100);
    }

    timeout();
  }, []);

  // 타이머 재생 버튼 클릭
  const onClickPlay = async () => {
    setPlayStatus(TimerStatus.PLAYING);
    timerStart();
    const result = await requestTimerStart();

    setTimerId(result.startPoint);
  };

  // 타이머 멈춤 버튼 클릭
  const onClickStop = async () => {
    setPlayStatus(TimerStatus.STOP);
  };

  // 타이머 다시 재생
  const onClickTimerReset = async () => {
    setPlayStatus(TimerStatus.PLAYING);
  };

  // 타이머 저장
  const onClickTimerSave = async () => {
    // 저장 로직
    console.log(timerId);
    await requestTimerStop({ startPoint: timerId });
    setNowTime(0);
    setStackTime(0);
    setResultTime(0);
    setDashOffset(dashArray - (dashArray * 0) / 100);
    setPlayStatus(TimerStatus.NONE);

    setBottomSlideBox({
      isActive: true,
      icon: koalaPng,
      mission: '타이머 사용',
    });
  };

  return {
    requestTimerStart,
    requestTimerStop,
    playStatus,
    setPlayStatus,
    onClickPlay,
    onClickStop,
    onClickTimerReset,
    onClickTimerSave,
    dashArray,
    dashOffset,
    radius,
    resultTime,
  };
};

export default useTimerLogic;
