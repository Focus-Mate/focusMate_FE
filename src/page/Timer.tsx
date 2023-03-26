import { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import playIcon from '../style/icon/timer/play.png';
import pauseIcon from '../style/icon/timer/pause.png';
import stopIcon from '@/style/icon/timer/stop.png';
import TimerSavePop from '@/component/timer/TimerSavePop';
import TimerCircle from '@/component/timer/TimerCircle';
import { useMutation } from 'react-query';
import instance from '@/axios';

const TimerStatus = {
  NONE: 0,
  PLAYING: 1,
  PAUSE: 2,
  STOP: 3,
};

const circleWidth = 300;
const radius = 135;

function Timer() {
  const [serverId, setServerId] = useState('');

  useEffect(() => {
    const api = async () => {
      const response = await instance.get('/api/calculate/dayrecord', {
        params: {
          theDay: '2023-03-26',
        },
      });
      console.log(response);
    };
    api();
  });

  // React Query
  const { mutateAsync: requestTimerStart } = useMutation(
    'timer/start',
    async () => {
      const response = await instance.post('/api/calculate/startTime');

      console.log(response.data);

      return response.data;
    },
  );

  const { mutateAsync: requestTimerStop } = useMutation(
    'timer/stop',
    async (time: number) => {
      console.log(serverId);
      const response = await instance.put('/api/calculate/endTime', {
        startTime: serverId,
      });
      return response.data;
    },
  );

  const dashArray = radius * Math.PI * 2;
  const [dashOffset, setDashOffset] = useState(0);

  const [playStatus, setPlayStatus] = useState(TimerStatus.NONE);

  // 시간을 멈추면 stackTime에 저장
  const [nowTime, setNowTime] = useState(0);
  const [stackTime, setStackTime] = useState(0);

  // 최종 결과 시간
  const [resultTime, setResultTime] = useState(0);

  // 현재 기록중인 시간
  const [milliSeconds, setMilliSeconds] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [hours, setHours] = useState(0);

  const startTime = useRef(0);
  const endTime = useRef(0);

  const startTimer = useCallback(() => {
    startTime.current = Date.now();

    function timeout() {
      setTimeout(() => {
        endTime.current = Date.now();
        // 시간 정확도를 위해 setTimeout이 아닌 기기 시간을 사용해 계산
        const time = new Date(endTime.current - startTime.current);

        setHours(time.getUTCHours());
        setMinutes(time.getUTCMinutes());
        setSeconds(time.getUTCSeconds());
        setMilliSeconds(time.getUTCMilliseconds());

        timeout();
      }, 100);
    }

    timeout();
  }, []);

  console.log();

  // 전부 milliseconds로 변환하여 사용하기 위해 nowTime에 변환하여 저장
  useEffect(() => {
    const hourToMilliSeconds = hours * 3600000;
    const minuteToMilliSeconds = minutes * 60000;
    const secondToMilliSeconds = seconds * 1000;
    setNowTime(
      hourToMilliSeconds +
        minuteToMilliSeconds +
        secondToMilliSeconds +
        milliSeconds,
    );
  }, [hours, minutes, seconds, milliSeconds]);

  // stackTime에 저장된 시간과 nowTime을 합하여 resultTime에 저장
  useEffect(() => {
    if (playStatus === TimerStatus.PLAYING) setResultTime(stackTime + nowTime);
    if (playStatus === TimerStatus.PAUSE) {
      setStackTime(resultTime);
      setResultTime(resultTime);
      setNowTime(0);
      startTime.current = Date.now();
    }
    if (playStatus === TimerStatus.STOP) {
      // 멈춘경우 로직
    }
  }, [playStatus, stackTime, nowTime, resultTime]);

  useEffect(() => {
    if (playStatus === TimerStatus.PLAYING) {
      const timerPercentage =
        (100 / 60) * Math.floor((resultTime % 60000) / 1000);
      setDashOffset(dashArray - (dashArray * timerPercentage) / 100); // 중간의 100이 퍼센테이지
    }
  }, [resultTime, dashArray, playStatus]);

  // 출력할 텍스트 생성
  const allSeconds = Math.floor(resultTime / 1000);
  const milliSecondsToHour = Math.floor(allSeconds / 3600);
  const milliSecondsToMinute = Math.floor((allSeconds % 3600) / 60);
  const milliSecondsToSecond = Math.floor(allSeconds % 60);
  const hourText = milliSecondsToHour.toString().padStart(2, '0');
  const minuteText = milliSecondsToMinute.toString().padStart(2, '0');
  const secondText = milliSecondsToSecond.toString().padStart(2, '0');

  return (
    <Container>
      <TimerSavePop
        playStatus={playStatus}
        onResetClick={() => {
          // setNowTime(0);
          // setStackTime(0);
          // setResultTime(0);
          // setDashOffset(dashArray - (dashArray * 0) / 100);
          setPlayStatus(TimerStatus.PAUSE);
        }}
        onConfirmClick={async () => {
          // 저장 로직
          const result = await requestTimerStop(Math.floor(resultTime / 1000));
          setNowTime(0);
          setStackTime(0);
          setResultTime(0);
          setDashOffset(dashArray - (dashArray * 0) / 100);
          setPlayStatus(TimerStatus.NONE);
          console.log(result);
        }}
      />
      <TimerCircle
        circleWidth={circleWidth}
        radius={radius}
        dashArray={dashArray}
        dashOffset={dashOffset}
      >
        <TimeText>공부시간 기록하기</TimeText>
        <Time>
          {hourText}:{minuteText}:{secondText}
        </Time>
      </TimerCircle>
      <Controller>
        <ButtonWrap>
          {playStatus === TimerStatus.NONE && (
            <button
              onClick={async () => {
                setPlayStatus(TimerStatus.PLAYING);
                startTimer();
                const result = await requestTimerStart();

                setServerId(result.startTime);
              }}
            >
              <img src={playIcon} alt="play" />
            </button>
          )}
          {playStatus === TimerStatus.PLAYING && (
            <button
              onClick={() => {
                setPlayStatus(TimerStatus.PAUSE);
              }}
            >
              <img src={pauseIcon} alt="pause" />
            </button>
          )}
          {playStatus === TimerStatus.PAUSE && (
            <>
              <button
                onClick={() => {
                  setPlayStatus(TimerStatus.PLAYING);
                }}
              >
                <img src={playIcon} alt="play" />
              </button>
              <button
                onClick={async () => {
                  setPlayStatus(TimerStatus.STOP);
                }}
              >
                <img src={stopIcon} alt="stop" />
              </button>
            </>
          )}
        </ButtonWrap>
      </Controller>
    </Container>
  );
}

export default Timer;

const Container = styled.div`
  position: absolute;
  width: 100%;
  height: 100vh;
  padding: 0 1rem;
  left: 0;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  svg {
    margin-top: -120px;
  }

  @media (max-width: 330px) {
    svg {
      width: 100%;
      height: auto;
    }
  }
`;

const TimeText = styled.div`
  margin-bottom: 6px;
  color: #2fc4bb;
`;

const Time = styled.div`
  font-size: 2.25rem;
  font-weight: bold;
  color: #018a93;
  @media (max-width: 330px) {
    font-size: 11vw;
  }
`;

const Controller = styled.div`
  position: relative;
  width: 100%;
`;

const ButtonWrap = styled.div`
  position: absolute;
  top: 2rem;
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 1rem;

  button {
    width: 70px;
    height: 70px;
    background-color: #2fc4bb;
    border: 0;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
      background-color: #3c9b95;
    }
  }
`;
