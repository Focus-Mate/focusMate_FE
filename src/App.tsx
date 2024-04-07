import Router from './routes/Router';
import { GlobalStyle } from './style/globalStyle';
import { QueryClient, QueryClientProvider } from 'react-query';

import ReactModal from 'react-modal';
import { ThemeProvider } from 'styled-components';
import lightTheme from './style/lightTheme';
import darkTheme from './style/darkTheme';
import { atom, useRecoilState } from 'recoil';
import StatusSnackBar from './component/common/bar/StatusSnackBar';
import { useEffect } from 'react';
import mixpanel from 'mixpanel-browser';

export const isThemeDark = atom({
  key: 'isThemeDark',
  default: false,
});

// 모달 사용을 위한 최상위 컴포넌트 등록
ReactModal.setAppElement('#root');

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

mixpanel.init(process.env.REACT_APP_MIX_PANEL_TOKEN!, {
  debug: true,
  track_pageview: true,
  persistence: 'localStorage',
});

function App() {
  const [isDark, setIsDark] = useRecoilState(isThemeDark);

  function setScreenSize() {
    let vh = window.innerHeight * 0.01;
    //주소창을 제외한 영역을 "--vh"라는 속성으로 정의
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  }

  useEffect(() => {
    setScreenSize();
  });

  window.addEventListener('resize', () => setScreenSize());

  useEffect(() => {
    const screenMode = localStorage.getItem('screenMode');
    if (screenMode === '1') {
      setIsDark(true);
    } else {
      setIsDark(false);
    }
  }, [setIsDark]);

  return (
    <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
      <QueryClientProvider client={queryClient}>
        <GlobalStyle />
        <Router />
        <StatusSnackBar />
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
