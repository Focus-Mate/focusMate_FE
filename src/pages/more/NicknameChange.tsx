import instance from '@/instance';
import StackHeader from '@/components/common/StackHeader';
import { useState } from 'react';
import { useMutation } from 'react-query';
import styled from 'styled-components';
import useNavigatePop from '@/hooks/useNavigatePop';

interface changeNicknameResponse {
  data: {
    message: string;
  };
}

const NicknameChange = () => {
  const navigatePop = useNavigatePop();

  const [nickname, setNickname] = useState<string>('');
  const [buttonState, setButtonState] = useState(false);

  const { mutateAsync: changeNickname } = useMutation(
    ['User/ChangeNickname'],
    async (nickname: string) => {
      const response = await instance.put('/api/user/nickname', {
        nickname,
      });

      return response as changeNicknameResponse;
    },
  );

  const onButtonClick = async () => {
    const result = await changeNickname(nickname);
    if (result.data.message === 'success') {
      navigatePop('/more');
    } else {
      alert('닉네임 변경에 실패했습니다.');
    }
  };

  return (
    <Container>
      <StackHeader
        options={{
          line: true,
          before: {
            iconOptions: {
              onClick: () => navigatePop('/more'),
            },
          },
        }}
      >
        닉네임 변경
      </StackHeader>
      <Content>
        <Header2>
          수정하실 닉네임을
          <br />
          입력해주세요
        </Header2>

        <InputBox>
          <Input
            type="text"
            placeholder="8자 이내 한글이나 영어로 입력해주세요."
            value={nickname}
            onChange={e => {
              setNickname(e.target.value);
              if (e.target.value.length > 0) {
                setButtonState(true);
              } else {
                setButtonState(false);
              }
            }}
          />
        </InputBox>

        <ButtonBox>
          <Button onClick={onButtonClick} isActive={buttonState}>
            확인
          </Button>
        </ButtonBox>
      </Content>
    </Container>
  );
};

export default NicknameChange;

const Container = styled.div``;
const Content = styled.div`
  display: flex;
  flex-direction: column;
  padding: 70px 20px 0;
  height: calc(100vh - 50px);
  background-color: ${({ theme }) => theme.colors.bg.base};
`;

const Header2 = styled.h2`
  font-size: 24px;
  font-family: ${({ theme }) => theme.fonts.spoqa.medium};
  line-height: 32px;
  color: ${({ theme }) => theme.colors.grey[900]};
`;

const InputBox = styled.div`
  margin-top: 40px;
`;

const Input = styled.input`
  width: 100%;
  height: 62px;
  border: 0;
  background: ${({ theme }) => theme.colors.bg.grey};
  border-radius: 20px;
  padding: 0 20px;
  outline: none;
  color: ${({ theme }) => theme.colors.grey[500]};
  font-size: 16px;
`;

const ButtonBox = styled.div`
  position: absolute;
  padding: 20px;
  width: 100%;
  bottom: 0;
  left: 0;
`;

const Button = styled.button<{
  isActive: boolean;
}>`
  width: 100%;
  height: 48px;
  flex-shrink: 0;
  border: 0;
  border-radius: 16px;
  font-size: 16px;
  background: ${({ theme, isActive }) =>
    isActive ? theme.colors.primary[800] : theme.colors.bg.line};
  color: ${({ theme, isActive }) =>
    isActive ? theme.colors.bg.base : theme.colors.grey[500]};
`;
