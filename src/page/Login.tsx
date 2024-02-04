import styled from 'styled-components';
import { ReactComponent as KakaoLogo } from '@/style/icon/kakaoLogo.svg';
import logoText from '@/style/images/logo_text.png';
import studyAnimation from '@/style/gif/study_animation.gif';
import { motion } from 'framer-motion';

const Login = () => {
  const kakaoURL = process.env.REACT_APP_SOCIAL_URL;
  const setKakaoLogin = () => {
    kakaoURL && window.location.replace(kakaoURL);
  };

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
              delay: 0.3,
              duration: 0.6,
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
              delay: 0.4,
              duration: 0.6,
            },
          }}
        >
          포메와 함께 스터디를 시작해봐요!
        </Comment>
        <TitleImage src={studyAnimation} alt="study animation" />
      </Header>
      <KakaoLoginBtn onClick={() => setKakaoLogin()}>
        <KakaoLogo width={16} />
        <div> 카카오로 시작하기</div>
      </KakaoLoginBtn>
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

const KakaoLoginBtn = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 10px;
  background-color: #fde500;
  padding: 16px;
  color: #421c1e;
  font-family: SpoqaBold;
  border-radius: 16px;
  cursor: pointer;
`;
