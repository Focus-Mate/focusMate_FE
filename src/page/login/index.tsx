import styled from 'styled-components';
import { ReactComponent as KakaoLogo } from '../../style/icon/kakaoLogo.svg';
import logoText from '@/style/images/logo_text.png';
import studyAnimation from '@/style/gif/study_animation.gif';

const Login = () => {
  const kakaoURL = process.env.REACT_APP_SOCIAL_URL;
  const setKakaoLogin = () => {
    kakaoURL && window.location.replace(kakaoURL);
  };

  return (
    <LoginContainer>
      <Header>
        <Logo src={logoText} alt="focus mate" />
        <Comment>포메와 함께 스터디를 시작해봐요!</Comment>
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
  min-height: 100vh;
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

const Logo = styled.img`
  width: 230px;
`;

const Comment = styled.div`
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
