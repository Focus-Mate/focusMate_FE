import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { atom, useRecoilValue, useSetRecoilState } from 'recoil';
import styled, { css } from 'styled-components';

import checkSvg from './svg/check.svg';
import rightSvg from './svg/right.svg';

export const snackBarStatus = atom({
  key: 'snackBarStatus',
  default: {
    isOpen: false,
    timer: 0,
    message: '공부시간을 저장했어요',
  },
});

const StatusSnackBar = () => {
  const { isOpen, timer, message } = useRecoilValue(snackBarStatus);
  const setSnackBarStatus = useSetRecoilState(snackBarStatus);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen && timer > 0) {
      setTimeout(() => {
        setSnackBarStatus(current => ({ ...current, isOpen: false, timer: 0 }));
      }, timer);
    }
  }, [isOpen, timer, setSnackBarStatus]);

  return (
    <Box isOpen={isOpen}>
      <Picture>
        <img src={checkSvg} alt="check" />
      </Picture>
      <Text>{message}</Text>
      <RightBox
        onClick={() => {
          navigate('/chart');
          setSnackBarStatus(current => ({
            ...current,
            isOpen: false,
            timer: 0,
          }));
        }}
      >
        <img src={rightSvg} alt="check" />
      </RightBox>
    </Box>
  );
};

export default StatusSnackBar;

const Box = styled.div<{
  isOpen: boolean;
}>`
  position: fixed;
  width: 320px;
  height: 54px;
  z-index: 99;
  background-color: ${({ theme }) => theme.colors.grey[600]};
  left: 50%;
  transform: translateX(-50%);
  border-radius: 1rem;
  padding: 0 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  bottom: -100px;
  transition: bottom 0.3s ease-in-out;

  ${({ isOpen }) =>
    isOpen &&
    css`
      bottom: 100px;
    `};
`;

const Picture = styled.div`
  width: 24px;
  height: 24px;
  background-color: ${({ theme }) => theme.colors.primary[700]};
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
`;

const Text = styled.div`
  width: 100%;
  margin: 0 8px;
  color: ${({ theme }) => theme.colors.icon.white};
`;

const RightBox = styled.div``;
