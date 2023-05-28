import { useEffect } from 'react';
import {
  Outlet,
  useMatch,
  useNavigate,
  useSearchParams,
} from 'react-router-dom';
import styled from 'styled-components';

const LandingGuide = () => {
  const navigate = useNavigate();
  const isFirstEnter = useMatch('/');
  const token = localStorage.getItem('token');
  const [params] = useSearchParams();
  const kakaoAcsToken = params.get('accessToken');
  const kakaoRfsToken = params.get('refreshToken');
  const screenMode = params.get('screenMode');

  //NOTE 추후에 login user / guest 분기점으로 사용
  useEffect(() => {
    console.log(screenMode);
    if (!token) {
      if (
        kakaoAcsToken !== null &&
        kakaoAcsToken !== undefined &&
        kakaoRfsToken !== null &&
        kakaoRfsToken !== undefined &&
        screenMode !== null &&
        screenMode !== undefined
      ) {
        localStorage.setItem('token', kakaoAcsToken);
        localStorage.setItem('refreshToken', kakaoRfsToken);
        localStorage.setItem('screenMode', screenMode);
        navigate('/timer');
      } else {
        navigate('/login');
      }
    } else if (token && isFirstEnter !== null) {
      navigate('/timer');
    }
  }, []);

  return (
    <LayoutContainer>
      <Outlet />
    </LayoutContainer>
  );
};

export default LandingGuide;

const LayoutContainer = styled.div`
  position: relative;
`;
