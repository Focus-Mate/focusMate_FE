import ReactModal from 'react-modal';
import { useRecoilState, useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { timerStartTimeAtom, timerStatusAtom } from '../timer.atoms';
import { timerApi } from '../api';
import { timerBottomSliderAtom } from './TimerBottomSlideBox';
import { snackBarStatus } from '@/component/common/bar/StatusSnackBar';

const modalStyle = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  content: {
    width: '280px',
    height: '126px',
    top: '50%',
    left: '50%',
    border: 'none',
    borderRadius: '16px',
    backgroundColor: 'white',
    transform: 'translate(-50%, -50%)',
    justifyContent: 'center',
    alignItems: 'flex-end',
    gap: '1rem',
    padding: 0,
  },
};

interface Props {}

export function TimerSavePop(props: Props) {
  const [timerStatus, setTimerStatus] = useRecoilState(timerStatusAtom);
  const setTimerStartTime = useSetRecoilState(timerStartTimeAtom);
  const setTimerSlideBox = useSetRecoilState(timerBottomSliderAtom);
  const setStatusSnackBar = useSetRecoilState(snackBarStatus);

  const onClickResume = () => {
    // 이어하기
    setTimerStatus({
      ...timerStatus,
      playStatus: 'PLAYING',
    });
  };

  const onClickSave = async () => {
    // 저장하기

    const startPoint = timerStatus.id;

    if (startPoint) {
      const response = await timerApi.timerEnd(startPoint);

      if (response) {
        if (response?.data?.getCharacters?.length > 0) {
          setTimerSlideBox(
            response.data.getCharacters.map((item, idx) => ({
              id: idx,
              isActive: true,
              isClose: false,
              icon: item.characterImg,
              mission: item.requirement,
            })),
          );
        } else {
          setTimerSlideBox([]);
          setStatusSnackBar({
            isOpen: true,
            timer: 2500,
            message: '공부시간을 저장했어요',
          });
        }
        setTimerStartTime(null);
        setTimerStatus({
          ...timerStatus,
          playStatus: 'NONE',
        });
      }
    }
  };

  return (
    <ReactModal isOpen={timerStatus.playStatus === 'STOP'} style={modalStyle}>
      <Container>
        <Text>공부시간을 저장할까요?</Text>
        <ButtonGroup>
          <ResetButton onClick={onClickResume}>계속 기록하기</ResetButton>
          <ConfirmButton onClick={onClickSave}>네, 저장할게요</ConfirmButton>
        </ButtonGroup>
      </Container>
    </ReactModal>
  );
}

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  ${({ theme }) => theme.fonts.spoqa.medium};
  background-color: ${({ theme }) => theme.colors.bg.elevated};
  padding: 24px 16px 16px 16px;
`;

const Text = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  color: ${({ theme }) => theme.colors.grey[800]};
  font-size: 16px;
  font-weight: 500;
`;

const ButtonGroup = styled.div`
  flex-shrink: 0;
  display: flex;
  justify-content: space-between;
  gap: 12px;
`;

const Button = styled.button`
  width: 110px;
  height: 42px;
  background-color: transparent;
  border: 0;
  border-radius: 0.75rem;
`;

const ResetButton = styled(Button)`
  background-color: ${({ theme }) => theme.colors.bg.mint20};
  color: ${({ theme }) => theme.colors.primary[900]};
  font-size: 14px;
  font-weight: 500;
`;

const ConfirmButton = styled(Button)`
  width: 130px;
  background-color: ${({ theme }) => theme.colors.primary[800]};
  color: ${({ theme }) => theme.colors.bg.base};
  font-weight: 500;
  font-size: 14px;
`;
