import styled from 'styled-components';
import { ReactComponent as KakaoLogo } from '@/assets/icon/kakaoLogo.svg';
import appleIcon from '@/assets/icon/apple_icon.png';
import logoText from '@/assets/images/logo_text.png';
import studyAnimation from '@/assets/gif/study_animation.gif';
import { motion } from 'framer-motion';
import { useState } from 'react';

const Login = () => {
  const kakaoURL = process.env.REACT_APP_SOCIAL_URL;
  const appleURL = process.env.REACT_APP_SOCIAL_APPLE_URL;
  const setKakaoLogin = () => {
    kakaoURL && window.location.replace(kakaoURL);
  };

  const setAppleLogin = () => {
    appleURL && window.location.replace(appleURL);
  };

  const [touchedKakao, setTouchedKakao] = useState(false);

  return (
    <LoginContainer>
      <Header>
        <Logo
          initial={{
            opacity: 0,
            transform: 'scale(0.5)',
          }}
          animate={{
            opacity: 1,
            transform: 'scale(1)',
            transition: {
              // delay: 0.3,
              duration: 0.3,
            },
          }}
          src={logoText}
          alt="focus mate"
        />
        <Comment
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
            transition: {
              // delay: 0.4,
              duration: 0.3,
            },
          }}
        >
          포메와 함께 스터디를 시작해봐요!
        </Comment>
        <TitleImage src={studyAnimation} alt="study animation" />
      </Header>
      <KakaoLoginBtn
        onClick={() => setKakaoLogin()}
        onTouchStart={() => {
          setTouchedKakao(true);
        }}
        onTouchEnd={() => {
          setTouchedKakao(false);
        }}
        animate={{
          backgroundColor: touchedKakao ? '#ddc400' : '#fde500',
        }}
      >
        <KakaoLogo width={16} />
        <div>카카오로 시작하기</div>
      </KakaoLoginBtn>
      <AppleLoginBtn onClick={() => setAppleLogin()}>
        <img src={appleIcon} width={26} height={26} alt="apple" />
        <div>Apple로 시작하기</div>
      </AppleLoginBtn>
    </LoginContainer>
  );
};
export default Login;

const LoginContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  height: 100dvh;
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TitleImage = styled.img`
  width: 210px;
  margin: 32px 0;
`;

const Logo = styled(motion.img)`
  width: 230px;
`;

const Comment = styled(motion.div)`
  font-size: 16px;
  margin-top: 20px;
`;

const KakaoLoginBtn = styled(motion.div)`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 10px;
  background-color: #fde500;
  height: 48px;
  color: #421c1e;
  border-radius: 16px;
  cursor: pointer;
  font-weight: 700;
`;

const AppleLoginBtn = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 10px;
  background-color: #000000;
  color: #ffffff;
  border-radius: 16px;
  cursor: pointer;
  height: 48px;
  font-weight: 700;
  margin-top: 12px;
`;
