import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { timerAtom, timerDashOffsetAtom } from '../timer.atoms';

interface Props {
  seconds: number;
}

const getTimerText = (seconds: number) => {
  const allSeconds = Math.floor(seconds / 1000);
  const milliSecondsToHour = Math.floor(allSeconds / 3600);
  const milliSecondsToMinute = Math.floor((allSeconds % 3600) / 60);
  const milliSecondsToSecond = Math.floor(allSeconds % 60);
  const hourText = milliSecondsToHour.toString().padStart(2, '0');
  const minuteText = milliSecondsToMinute.toString().padStart(2, '0');
  const secondText = milliSecondsToSecond.toString().padStart(2, '0');

  return `${hourText}:${minuteText}:${secondText}`;
};

export function TimerCircle(props: Props): React.ReactElement {
  const timer = useRecoilValue(timerAtom);
  const timerDashOffset = useRecoilValue(timerDashOffsetAtom);

  return (
    <div
      style={{
        marginTop: '-120px',
      }}
    >
      <svg
        width={timer.circleWidth}
        height={timer.circleWidth}
        viewBox={`0 0 ${timer.circleWidth} ${timer.circleWidth}`}
      >
        <defs>
          <linearGradient
            id="gradient"
            x1="0%"
            y1="50%"
            x2="100%"
            y2="50%"
            gradientUnits="userSpaceOnUse"
            gradientTransform="rotate(0, 90, 90)"
          >
            <stop offset="0%" stopColor="#87E4DA" />
            <stop offset="100%" stopColor="#018A93" />
          </linearGradient>
        </defs>
        <BackgroundCircle
          cx={timer.circleWidth / 2}
          cy={timer.circleWidth / 2}
          strokeWidth="15px"
          r={timer.radius}
        />
        <ProgressCircle
          cx={timer.circleWidth / 2}
          cy={timer.circleWidth / 2}
          strokeWidth="15px"
          r={timer.radius}
          style={{
            strokeDasharray: timer.dashArray,
            strokeDashoffset: timerDashOffset.dashOffset,
            transition: 'stroke-dashoffset 0.3s',
          }}
          transform={`rotate(-90 ${timer.circleWidth / 2} ${
            timer.circleWidth / 2
          })`}
          stroke="url(#gradient)"
        />
      </svg>
      <CircleText>
        <TimeText>공부시간 기록하기</TimeText>
        <Time>{getTimerText(props.seconds * 1000)}</Time>
      </CircleText>
    </div>
  );
}

const BackgroundCircle = styled.circle`
  fill: none;
  stroke: ${({ theme }) => theme.colors.bg.mint10};
`;

const ProgressCircle = styled.circle`
  fill: none;
  stroke-linecap: round;
  stroke-linejoin: round;
`;

const CircleText = styled.div`
  font-family: 'SpoqaMedium';
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  font-size: 1rem;
  font-weight: medium;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: -60px;

  @media (max-width: 330px) {
    font-size: 4.75vw;
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
