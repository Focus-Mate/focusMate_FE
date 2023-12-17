import { useEffect, useState } from 'react';
import ReactModal from 'react-modal';
import { atom, useRecoilState, useSetRecoilState } from 'recoil';
import styled, { css, keyframes } from 'styled-components';
import { snackBarStatus } from '../../common/bar/StatusSnackBar';

export const timerBottomSlider = atom<
  {
    id: number;
    isActive: boolean;
    isClose: boolean;
    icon: string;
    mission: string;
  }[]
>({
  key: 'timerBottomSlider',
  default: [],
});

interface BottomSlideBoxProps {}

const modalStyle = {
  overlay: {
    backgroundColor: 'transparent',
    zIndex: 10,
    overflow: 'hidden',
  },
  content: {
    backgroundColor: 'transparent',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    width: '100%',
    height: '100%',
    borderRadius: 0,
    border: 0,
    padding: 0,
    overflow: 'hidden',
    // borderRadius: "20px 20px 0px 0px",
  },
};

const TimerBottomSlideBox: React.FC<BottomSlideBoxProps> = () => {
  const [slider, setSlider] = useRecoilState(timerBottomSlider);
  const setStatusSnackBar = useSetRecoilState(snackBarStatus);

  const onClose = (idx: number) => {
    setSlider(current => {
      const newSlider = [...current];
      newSlider[idx] = { ...newSlider[idx], isClose: true };
      return newSlider;
    });

    setTimeout(() => {
      setSlider(current => {
        const newSlider = [...current];
        newSlider[idx] = { ...newSlider[idx], isActive: false };
        return newSlider;
      });
    }, 150);
  };

  useEffect(() => {
    if (slider.length === 0) {
      return;
    }

    for (let i = 0; i < slider.length; i++) {
      if (slider[i].isActive) {
        return;
      }
    }

    setSlider([]);
    setStatusSnackBar({
      isOpen: true,
      timer: 2500,
      message: '공부시간을 저장했어요',
    });
  }, [slider, setSlider, setStatusSnackBar]);

  return slider.length === 0 ? null : (
    <>
      {slider.map((item, index) => {
        return (
          item.isActive && (
            <ReactModal
              key={item.id}
              isOpen={item.isActive}
              style={{
                overlay: modalStyle.overlay,
                content: modalStyle.content,
              }}
            >
              <Background
                onClick={() => onClose(index)}
                isClose={item.isClose}
              ></Background>
              <Slider isClose={item.isClose}>
                <SliderWrapper>
                  <Title>{'짠, 미션을 완료하여 캐릭터가 등장했어요!'}</Title>
                  <Mission>
                    <MissionBox>달성한 미션</MissionBox>
                    {item.mission}
                  </Mission>
                  <Picture>
                    <img src={item.icon} alt="icon" />
                  </Picture>
                  <Button onClick={() => onClose(index)}>획득하기</Button>
                </SliderWrapper>
              </Slider>
            </ReactModal>
          )
        );
      })}
    </>
  );
};

export default TimerBottomSlideBox;

const BackgroundFadeIn = keyframes`
	0% {
		background: rgba(0, 0, 0, 0);
	}
	100% {
		background: rgba(0, 0, 0, 0.5);
	}
`;

const BackgroundFadeOut = keyframes`
	0% {
		background: rgba(0, 0, 0, 0.5);
	}
	100% {
		background: rgba(0, 0, 0, 0);
	}
`;

const Background = styled.div<{ isClose: boolean }>`
  width: 100%;
  height: 100%;
  position: absolute;
  background: rgba(0, 0, 0, 0);
  animation: ${BackgroundFadeIn} 0.3s ease-in-out forwards;

  ${({ isClose }) => {
    return (
      isClose &&
      css`
        animation: ${BackgroundFadeOut} 0.3s ease-in-out forwards;
      `
    );
  }}
`;

const SliderSlideIn = keyframes`
	0% {
		bottom: -360px;
	}
	100% {
		bottom: 0px;
	}
`;

const SliderSlideOut = keyframes`
	0% {
		bottom: 0px;
	}
	100% {
		bottom: -360px;
	}
`;

const Slider = styled.div<{
  isClose: boolean;
}>`
  width: 100%;
  height: 360px;
  background-color: ${({ theme }) => theme.colors.bg.elevated};
  position: absolute;
  z-index: 10;
  bottom: -360px;
  animation: ${SliderSlideIn} 150ms ease-in-out forwards;
  border-radius: 20px 20px 0px 0px;

  ${({ isClose }) => {
    return (
      isClose &&
      css`
        animation: ${SliderSlideOut} 150ms ease-in-out forwards;
      `
    );
  }}
`;

const SliderWrapper = styled.div`
  padding: 40px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

const Picture = styled.div``;
const Title = styled.div`
  margin-bottom: 20px;
  font-size: 20px;
  line-height: 28px;
  width: 180px;
  text-align: center;
  font-family: ${({ theme }) => theme.fonts.spoqa.regular};
  color: ${({ theme }) => theme.colors.grey[800]};
`;

const Mission = styled.div`
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.colors.grey[800]};
  margin-bottom: 12px;
`;

const MissionBox = styled.div`
  background-color: ${({ theme }) => theme.colors.bg.grey};
  padding: 5px;
  border-radius: 8px;
  font-size: 14px;
  margin-right: 8px;
  color: ${({ theme }) => theme.colors.grey[600]};
`;

const Button = styled.button`
  width: 320px;
  height: 48px;
  background-color: ${({ theme }) => theme.colors.primary[700]};
  color: ${({ theme }) => theme.colors.bg.base};
  border: 0;
  border-radius: 16px;
  margin-top: 28px;
`;
