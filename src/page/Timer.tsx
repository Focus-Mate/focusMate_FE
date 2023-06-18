import { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import playIcon from '../style/icon/timer/play.png';
import stopIcon from '@/style/icon/timer/stop.png';
import TimerSavePop from '@/component/timer/TimerSavePop';
import TimerCircle from '@/component/timer/TimerCircle';
import TimerBottomSlideBox from '@/component/timer/TimerBottomSlideBox';
import useTimerLogic from '@/component/timer/hooks/useTimerLogic';

const TimerStatus = {
  NONE: 0,
  PLAYING: 1,
  PAUSE: 2,
  STOP: 3,
};

const circleWidth = 300;

const getTimerText = (seconds: number) => {
  // 출력할 시간 텍스트 생성
  const allSeconds = Math.floor(seconds / 1000);
  const milliSecondsToHour = Math.floor(allSeconds / 3600);
  const milliSecondsToMinute = Math.floor((allSeconds % 3600) / 60);
  const milliSecondsToSecond = Math.floor(allSeconds % 60);
  const hourText = milliSecondsToHour.toString().padStart(2, '0');
  const minuteText = milliSecondsToMinute.toString().padStart(2, '0');
  const secondText = milliSecondsToSecond.toString().padStart(2, '0');

  return `${hourText}:${minuteText}:${secondText}`;
};

function Timer() {
  const {
    playStatus,
    onClickPlay,
    onClickStop,
    onClickTimerReset,
    onClickTimerSave,
    dashArray,
    dashOffset,
    radius,
    resultTime,
  } = useTimerLogic();

  return (
    <Container>
      <TimerBottomSlideBox />
      {/* 타이머 저장 / 취소 팝업 */}
      <TimerSavePop
        playStatus={playStatus}
        onResetClick={onClickTimerReset}
        onConfirmClick={onClickTimerSave}
      />

      {/* 타이머 SVG 그리기 */}
      <TimerCircle
        circleWidth={circleWidth}
        radius={radius}
        dashArray={dashArray}
        dashOffset={dashOffset}
      >
        <TimeText>공부시간 기록하기</TimeText>
        <Time>{getTimerText(resultTime)}</Time>
      </TimerCircle>
      <Controller>
        <ButtonWrap>
          {/* 상태에 따른 버튼 출현 & 로직 분기 */}
          {playStatus === TimerStatus.NONE && (
            <Button onClick={onClickPlay}>
              <img src={playIcon} alt="play" />
            </Button>
          )}
          {(playStatus === TimerStatus.PLAYING ||
            playStatus === TimerStatus.STOP) && (
            <Button onClick={onClickStop}>
              <img src={stopIcon} alt="stop" />
            </Button>
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
  background-color: ${({ theme }) => theme.colors.bg.base};

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
  color: ${({ theme }) => theme.colors.primary[700]};
`;

const Time = styled.div`
  font-size: 2.25rem;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.primary[900]};
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
`;

const Button = styled.button`
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
`;
