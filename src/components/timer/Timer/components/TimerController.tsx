import styled from 'styled-components';
import { timerStartTimeAtom, timerStatusAtom } from '../timer.atoms';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { useEffect } from 'react';
import dayjs from 'dayjs';
import { timerApi } from '../api';
import { produce } from 'immer';
import { SvgTimerPlay } from '@/components/timer/Timer/components/SvgTimerPlay';
import { SvgTimerStop } from '@/components/timer/Timer/components/SvgTimerStop';

interface Props {}

export default function TimerController(props: Props) {
  const [timerStatus, setTimerStatus] = useRecoilState(timerStatusAtom);
  const setTimerStartTime = useSetRecoilState(timerStartTimeAtom);

  // 이어서 하기 위해 시작 시간 조회
  useEffect(() => {
    const func = async () => {
      const response = await timerApi.getStartTime();

      if (response) {
        if (response?.data?.studyDate) {
          setTimerStatus(
            produce(draft => {
              draft.id = response.data.studyDate;
              draft.playStatus = 'PLAYING';
            }),
          );

          // 시간 오차 9시간 만큼 차감
          setTimerStartTime(dayjs(response.data.studyDate));
        }
      }
    };

    func();
  }, [setTimerStatus, setTimerStartTime]);

  // 재생 버튼 클릭시
  const onClickPlay = async () => {
    const response = await timerApi.timerStart();

    setTimerStatus(current => ({
      ...current,
      id: response.data.startPoint,
      playStatus: 'PLAYING',
    }));

    // StartTime에서는 시간 오차 없이 들어와서 차감 없이 처리
    setTimerStartTime(dayjs(response.data.studyDate));
  };

  // 멈춤 버튼 클릭시
  const onClickStop = async () => {
    const startPoint = timerStatus.id;

    if (startPoint) {
      if (timerStatus.playStatus === 'PLAYING') {
        setTimerStatus(
          produce(draft => {
            draft.playStatus = 'STOP';
          }),
        );
      }
    }
  };

  return (
    <Controller>
      <ButtonWrap>
        {/* 상태에 따른 버튼 출현 & 로직 분기 */}
        {timerStatus.playStatus === 'NONE' && (
          <Button onClick={onClickPlay}>
            <SvgTimerPlay />
          </Button>
        )}
        {(timerStatus.playStatus === 'PLAYING' ||
          timerStatus.playStatus === 'STOP') && (
          <Button onClick={onClickStop}>
            <SvgTimerStop />
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
