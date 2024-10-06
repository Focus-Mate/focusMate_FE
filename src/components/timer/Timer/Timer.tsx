import { motion } from 'framer-motion';
import styled from 'styled-components';
import TimerController from './components/TimerController';
import { TimerCircle } from './components/TimerCircle';
import { useTimer } from './hooks/useTimer';
import { TimerSavePop } from './components/TimerSavePop';
import TimerBottomSlideBox from './components/TimerBottomSlideBox';

export function Timer() {
  const { time } = useTimer();

  return (
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
      <TimerSavePop />

      {/* 타이머 SVG 그리기 */}
      <TimerCircle seconds={time} />
      <TimerController />
    </Container>
  );
}

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

  @media (max-width: 330px) {
    svg {
      width: 100%;
      height: auto;
    }
  }
`;
