import instance from '@/instance';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useMutation } from 'react-query';
import { useSetRecoilState } from 'recoil';
import { timerBottomSlider } from '../TimerBottomSlideBox';
import koalaPng from '@/component/timer/TimerPage/images/koala.png';

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

  // initialized
  // 타이머 시작 시점에 서버에서 시간을 가져와서 stackTime에 저장
  useEffect(() => {
    const getData = async () => {
      const response = await instance.get(`/api/calculate/timer`);

      console.log(response);
      if (!(response.data === '' || !response.data)) {
        setPlayStatus(TimerStatus.PLAYING);
        const resumeTime = new Date(response.data.studyDate).getTime();

        console.log('resumeTime' + resumeTime);
        startTime.current = resumeTime;
        setTimerId(response.data.studyDate);
        // startTime.current = new Date('2023-12-17T15:56:22.293Z').getTime(); // 예시 시간
      }
      function timeout() {
        setTimeout(() => {
          endTime.current = new Date().getTime();
          // 시간 정확도를 위해 setTimeout이 아닌 기기 시간을 사용해 계산
          const time = new Date(
            Number(endTime.current) - Number(startTime.current),
          );

          const hour = time.getHours() * 3600000;
          const minute = time.getMinutes() * 60000;
          const second = time.getSeconds() * 1000;
          const milliSecond = time.getMilliseconds();
          setNowTime(hour + minute + second + milliSecond);
          timeout();
        }, 100);
      }
      timeout();
    };

    getData();
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
      const response = await instance.put<{
        getCharacters?: {
          characterImg: string;
          requirement: string;
        }[];
      }>('/api/calculate/endTime', {
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
    try {
      // 저장 로직
      // const response = requestTimerStop({ startPoint: timerId });
      requestTimerStop({ startPoint: timerId });
    } catch (e) {
      console.log(e);
    }

    const sample = [
      {
        characterImg: koalaPng,
        requirement: '타이머 사용',
      },
      {
        characterImg: koalaPng,
        requirement: '타이머 사용2',
      },
    ];

    setNowTime(0);
    setStackTime(0);
    setResultTime(0);
    setDashOffset(dashArray - (dashArray * 0) / 100);
    setPlayStatus(TimerStatus.NONE);

    setBottomSlideBox(
      sample.map((item, idx) => ({
        id: idx,
        isActive: true,
        isClose: false,
        icon: item.characterImg,
        mission: item.requirement,
      })),
    );
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
