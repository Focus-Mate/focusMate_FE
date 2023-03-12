import Router from "./Router";
import { GlobalStyle } from "./style/globalStyle";
import { QueryClient, QueryClientProvider } from "react-query";

import ReactModal from "react-modal";
import { ThemeProvider } from "styled-components";
import lightTheme from "./style/lightTheme";
import darkTheme from "./style/darkTheme";
import { atom, useRecoilValue } from "recoil";

export const isThemeDark = atom({
	key: "isThemeDark",
	default: false,
});

// 모달 사용을 위한 최상위 컴포넌트 등록
ReactModal.setAppElement("#root");

const queryClient = new QueryClient();
function App() {
	const isDark = useRecoilValue(isThemeDark);

	return (
		<ThemeProvider theme={isDark ? darkTheme : lightTheme}>
			<QueryClientProvider client={queryClient}>
				<GlobalStyle />
				<Router />
			</QueryClientProvider>
		</ThemeProvider>
	);
}

export default App;
