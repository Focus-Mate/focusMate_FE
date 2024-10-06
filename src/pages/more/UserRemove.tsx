import StackHeader from '@/components/common/StackHeader';
import styled from 'styled-components';

import icoWarning from './svg/ico_warning.svg';
import { useMutation } from 'react-query';
import instance from '@/instance';
import useNavigatePop from '@/hooks/useNavigatePop';

const UserRemove = () => {
  const navigatePop = useNavigatePop();

  const { mutateAsync: removeUser } = useMutation(async () => {
    const response = await instance.delete(`/api/user/signout`);

    return response;
  });

  const onClickConfirmRemoveUser = () => {
    removeUser().then(response => {
      localStorage.removeItem('token');
      navigatePop('/login');
    });
  };

  return (
    <Container>
      <StackHeader></StackHeader>
      <HeadText>탈퇴하기</HeadText>
      <Comment>focusmate를 떠나신다니 아쉬워요</Comment>
      <BoxWrapper>
        <Notice>
          <NoticeHeader>
            <img src={icoWarning} alt="warning" />
            <span>아래 내용을 꼭 확인하세요.</span>
          </NoticeHeader>
          <NoticeContent>
            탈퇴 시 계정 정보와 공부 기록을 포함한 모든 정보가 삭제되며, 탈퇴
            이후 해당 정보는 복구할 수 없습니다.
          </NoticeContent>
        </Notice>
        <ButtonGroup>
          <OutButton onClick={onClickConfirmRemoveUser}>탈퇴하기</OutButton>
          <CancelButton
            onClick={() => {
              navigatePop('/more');
            }}
          >
            취소하기
          </CancelButton>
        </ButtonGroup>
      </BoxWrapper>
    </Container>
  );
};

export default UserRemove;

const Container = styled.div`
  background-color: ${({ theme }) => theme.colors.bg.base};
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

const HeadText = styled.h2`
  font-size: 24px;
  padding: 20px 20px;
  font-family: ${({ theme }) => theme.fonts.spoqa.regular};
  color: ${({ theme }) => theme.colors.grey[900]};
  flex-shrink: 0;
`;

const Comment = styled.div`
  padding: 0 20px;
  color: ${({ theme }) => theme.colors.grey[600]};
  flex-shrink: 0;
`;

const BoxWrapper = styled.div`
  padding: 0 20px;
  height: 100%;
  margin-top: 28px;
  position: relative;
`;

const Notice = styled.div`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.bg.mint10};
`;

const NoticeHeader = styled.div`
  color: ${({ theme }) => theme.colors.primary[900]};
  padding: 20px;
  display: flex;
  align-items: center;

  span {
    margin-left: 10px;
  }
`;

const NoticeContent = styled.div`
  color: ${({ theme }) => theme.colors.grey[700]};
  padding: 0 20px 20px;
  line-height: 28px;
`;

const ButtonGroup = styled.div`
  position: absolute;
  bottom: 70px;
  width: 100%;
  box-sizing: border-box;
  left: 0;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
`;
const OutButton = styled.button`
  width: 40%;
  height: 50px;
  border-radius: 12px;
  border: 0;
  background-color: ${({ theme }) => theme.colors.bg.mint20};
  color: ${({ theme }) => theme.colors.primary[900]};
`;
const CancelButton = styled.button`
  width: 57%;
  height: 50px;
  border-radius: 12px;
  border: 0;
  background-color: ${({ theme }) => theme.colors.primary[800]};
  color: ${({ theme }) => theme.colors.bg.base};
`;
