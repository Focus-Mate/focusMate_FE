import instance from '@/instance';
import { useCallback, useEffect, useState } from 'react';
import ReactModal from 'react-modal';
import { useQueryClient } from 'react-query';
import { atom, useRecoilState } from 'recoil';
import styled, { css, keyframes } from 'styled-components';

export const bottomSlider = atom({
  key: 'bottomSlider',
  default: {
    codeNum: 0,
    isRepresentative: false,
    isActive: false,
    icon: '',
    title: '',
    description: '',
    tips: '',
    hasCharacter: true,
  },
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

const BottomSlideBox: React.FC<BottomSlideBoxProps> = () => {
  const [slider, setSlider] = useRecoilState(bottomSlider);
  const [isClose, setClose] = useState(false);
  const queryClient = useQueryClient();

  const onChangeMainCharacter = useCallback(
    async (num: number) => {
      const response = await instance.put('/api/user/changemaincharacter', {
        codeNum: num,
      });

      if (response.data.message === 'success') {
        queryClient.invalidateQueries('Characters/GetCharacters');
        queryClient.invalidateQueries('Characters/GetMainCharacter');
        onClose();
      }
    },
    [queryClient],
  );

  const onClose = () => {
    setClose(true);
  };

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (isClose) {
      timeout = setTimeout(() => {
        setSlider(current => ({ ...current, isActive: false }));
        setClose(false);
      }, 300);
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [slider, isClose, setSlider]);

  return (
    <ReactModal
      isOpen={slider.isActive}
      style={{ overlay: modalStyle.overlay, content: modalStyle.content }}
    >
      <Background onClick={onClose} isClose={isClose}></Background>
      <Slider isClose={isClose}>
        <SliderWrapper>
          <Picture>
            <img src={slider.icon} alt="icon" />
          </Picture>
          <Title>{slider.title}</Title>
          {/* 대표 이미지일 경우 */}
          {slider.isRepresentative && (
            <Representative>현재 나의 대표 프로필이에요.</Representative>
          )}
          {/* 대표 이미지가 아닐 경우 */}
          {!slider.isRepresentative && slider.hasCharacter && (
            <Button onClick={() => onChangeMainCharacter(slider.codeNum)}>
              내 대표 프로필로 설정하기
            </Button>
          )}
          {/* 캐릭터를 가지고 있지 않을 경우 정보 출력 */}
          {!slider.hasCharacter && (
            <>
              <Description>{slider.description}</Description>
              <Tips>{slider.tips}</Tips>
            </>
          )}
        </SliderWrapper>
      </Slider>
    </ReactModal>
  );
};

export default BottomSlideBox;

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
		bottom: -280px;
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
		bottom: -280px;
	}
`;

const Slider = styled.div<{
  isClose: boolean;
}>`
  width: 100%;
  height: 300px;
  background-color: ${({ theme }) => theme.colors.bg.elevated};
  position: absolute;
  z-index: 10;
  bottom: -280px;
  animation: ${SliderSlideIn} 0.3s ease-in-out forwards;
  border-radius: 20px 20px 0px 0px;

  ${({ isClose }) => {
    return (
      isClose &&
      css`
        animation: ${SliderSlideOut} 0.3s ease-in-out forwards;
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

const Representative = styled.div`
  font-size: 16px;
  color: ${({ theme }) => theme.colors.grey[500]};
  margin-top: 12px;
`;

const Picture = styled.div`
  img {
    width: 136px;
    height: 136px;
  }
`;
const Title = styled.div`
  margin-top: 20px;
  font-size: 20px;
  font-family: ${({ theme }) => theme.fonts.spoqa.bold};
`;
const Button = styled.button`
  width: 320px;
  height: 48px;
  background-color: ${({ theme }) => theme.colors.primary[700]};
  border: 0;
  border-radius: 16px;
  font-size: 16px;
  color: ${({ theme }) => theme.colors.bg.base};
  font-family: ${({ theme }) => theme.fonts.spoqa.bold};
  margin-top: 28px;
  flex-shrink: 0;
`;

const Description = styled.div`
  margin-top: 12px;
  color: ${({ theme }) => theme.colors.primary[900]};
  font-size: 16px;
`;
const Tips = styled.div`
  font-size: 16px;
  margin-top: 20px;
  color: ${({ theme }) => theme.colors.grey[500]};
`;
