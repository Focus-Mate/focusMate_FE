import styled from 'styled-components';

import TimerSavePop from '@/component/timer/TimerPage/TimerSavePop';
import TimerCircle from '@/component/timer/TimerPage/TimerCircle';
import TimerBottomSlideBox from '@/component/timer/TimerPage/TimerBottomSlideBox';
import useTimerLogic from '@/component/timer/TimerPage/hooks/useTimerLogic';
import TimerController from '@/component/timer/TimerPage/TimerController';
import { AnimatePresence, motion } from 'framer-motion';
import useNavigationComp from '@/component/Navigation.hooks';

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

  const { onExitComplete, getCompareSameTarget } = useNavigationComp();

  return (
    <AnimatePresence onExitComplete={onExitComplete}>
      {getCompareSameTarget('/timer') && (
        <Container
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
            transition: {
              duration: 0.3,
            },
          }}
          exit={{
            opacity: 0,
            transition: {
              duration: 0.3,
            },
          }}
        >
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
          <TimerController
            playStatus={playStatus}
            onClickPlay={onClickPlay}
            onClickStop={onClickStop}
          />
        </Container>
      )}
    </AnimatePresence>
  );
}

export default Timer;

const Container = styled(motion.div)`
  position: absolute;
  width: 100%;
  height: 100%;
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
