import styled from "styled-components";
import Navigation from "./Navigation";
import Router from "./Router";
import { GlobalStyle } from "./style/globalStyle";
import { QueryClient, QueryClientProvider } from "react-query";

import ReactModal from "react-modal";

// 모달 사용을 위한 최상위 컴포넌트 등록
ReactModal.setAppElement("#root");

const queryClient = new QueryClient();
function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<GlobalStyle />
			<Router />
		</QueryClientProvider>
	);
}

export default App;
