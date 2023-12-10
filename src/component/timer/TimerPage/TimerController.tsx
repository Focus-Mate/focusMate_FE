import styled from 'styled-components';
import playIcon from '@/style/icon/timer/play.png';
import stopIcon from '@/style/icon/timer/stop.png';

interface Props {
  onClickPlay: () => void;
  onClickStop: () => void;
  playStatus: number;
}

const TimerStatus = {
  NONE: 0,
  PLAYING: 1,
  PAUSE: 2,
  STOP: 3,
};

export default function TimerController({
  onClickPlay,
  onClickStop,
  playStatus,
}: Props) {
  return (
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
  );
}

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
