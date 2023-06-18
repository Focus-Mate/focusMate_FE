import styled from 'styled-components';
import welcomePuppy from '@/style/gif/welcome_puppy.gif';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Welcome = () => {
  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => {
      navigate('/timer');
    }, 2000);
  }, [navigate]);

  return (
    <Container>
      <Title>
        <TitleLine>태정태세비욘세님,</TitleLine>
        <TitleLine>환영합니다!</TitleLine>
      </Title>
      <Comment>가입 축하 선물로 캐릭터를 드려요</Comment>
      <PuppyWrapper>
        <img src={welcomePuppy} alt="welcome puppy" />
      </PuppyWrapper>
      <TipBox>
        <TipIcon>TIP</TipIcon>
        <TipText>공부 관련 미션을 완료하면 캐릭터를 받을 수 있어요.</TipText>
      </TipBox>
    </Container>
  );
};

export default Welcome;

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Title = styled.div`
  font-size: 24px;
  text-align: center;
`;

const TitleLine = styled.div`
  & + & {
    margin-top: 16px;
  }
`;

const Comment = styled.div`
  margin-top: 20px;
`;

const PuppyWrapper = styled.div`
  width: 200px;
  height: 200px;
  margin: 28px 0 36px;

  img {
    width: 100%;
    height: 100%;
  }
`;

const TipBox = styled.div`
  width: 320px;
  background-color: ${({ theme }) => theme.colors.bg.mint10};
  border-radius: 16px;
  padding: 16px;
  box-sizing: border-box;
  display: flex;
`;

const TipIcon = styled.div`
  width: 40px;
  height: 30px;
  background-color: ${({ theme }) => theme.colors.icon.mint10};
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({ theme }) => theme.colors.primary[800]};
`;

const TipText = styled.div`
  width: 175px;
  margin-left: 16px;
  line-height: 20px;
`;
