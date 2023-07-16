import { useEffect } from 'react';
import { useQuery } from 'react-query';
import { useNavigate, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import instance from '../../instance';
import welcomePuppy from '@/style/gif/welcome_puppy.gif';

export default function Complete() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  console.log('Complete 실행됨');

  useEffect(() => {
    let timer: null | ReturnType<typeof setTimeout> = null;
    timer = setTimeout(() => {
      navigate(
        `/timer?accessToken=${searchParams.get(
          'accessToken',
        )}&refreshToken=${searchParams.get(
          'refreshToken',
        )}&screenMode=${searchParams.get('screenMode')}`,
      );
    }, 2500);

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [navigate, searchParams]);

  const getNickname = async () => {
    const response = await instance.get('api/user/me', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${searchParams.get('accessToken')}`,
      },
    });

    return response.data.nickname;
  };

  const { data: userInfo, isLoading: isUserInfoLoading } = useQuery(
    'userInfo',
    getNickname,
  );

  if (isUserInfoLoading) return null;

  return (
    <Container>
      <Title>
        <TitleLine>{userInfo}님,</TitleLine>
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
}

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
