import styled from "styled-components";
import Navigation from "./Navigation";
import Router from "./Router";
import { GlobalStyle } from "./style/globalStyle";
import { QueryClient, QueryClientProvider } from "react-query";

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
