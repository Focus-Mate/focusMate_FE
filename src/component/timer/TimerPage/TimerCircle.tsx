import styled from 'styled-components';

interface TimerCircleProps {
  circleWidth: number;
  radius: number;
  dashArray: number;
  dashOffset: number;
  children: React.ReactNode;
}

const TimerCircle: React.FC<TimerCircleProps> = ({
  circleWidth,
  radius,
  dashArray,
  dashOffset,
  children,
}): React.ReactElement => {
  return (
    <div>
      <svg
        width={circleWidth}
        height={circleWidth}
        viewBox={`0 0 ${circleWidth} ${circleWidth}`}
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
          cx={circleWidth / 2}
          cy={circleWidth / 2}
          strokeWidth="15px"
          r={radius}
        />
        <ProgressCircle
          cx={circleWidth / 2}
          cy={circleWidth / 2}
          strokeWidth="15px"
          r={radius}
          style={{
            strokeDasharray: dashArray,
            strokeDashoffset: dashOffset,
            transition: 'stroke-dashoffset 0.3s',
          }}
          transform={`rotate(-90 ${circleWidth / 2} ${circleWidth / 2})`}
          stroke="url(#gradient)"
        />
        {/* <CircleText x="50%" y="50%" dy="0.3em" textAnchor="middle">
  					1
  				</CircleText> */}
      </svg>
      <CircleText>{children}</CircleText>
    </div>
  );
};

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

export default TimerCircle;
