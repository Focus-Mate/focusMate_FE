import styled from 'styled-components';
import { ReactComponent as KakaoLogo } from '../../style/icon/kakaoLogo.svg';

const Login = () => {
  const kakaoURL = process.env.REACT_APP_SOCIAL_URL;
  const setKakaoLogin = () => {
    kakaoURL && window.location.replace(kakaoURL);
  };

  return (
    <LoginContainer>
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
`;

const KakaoLoginBtn = styled.div`
  position: absolute;
  width: 100%;
  bottom: 65px;
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
