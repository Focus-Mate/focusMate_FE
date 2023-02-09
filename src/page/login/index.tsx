import styled from "styled-components";
import { ReactComponent as KakaoLogo } from "../../style/icon/kakaoLogo.svg";

const Login = () => {
  const kakaoURL = process.env.REACT_APP_SOCIAL_URL;

  const setKakaoLogin = () => {
    kakaoURL && window.location.replace(kakaoURL);
  };

  return (
    <KakaoLoginBtn onClick={setKakaoLogin}>
      <KakaoLogo width={16} />
      <div> 카카오로 시작하기</div>
    </KakaoLoginBtn>
  );
};
export default Login;

const KakaoLoginBtn = styled.div`
  width: 100%;
  display: flex;
  bottom: 65px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 10px;
  background-color: #fde500;
  padding: 16px;
  color: #421c1e;
  font-family: SpoqaBold;
  border-radius: 16px;
`;
