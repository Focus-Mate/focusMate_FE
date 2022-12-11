import styled from "styled-components";
import Navigation from "./Navigation";
import Router from "./Router";
import { GlobalStyle } from "./style/globalStyle";

function App() {
  return (
    <>
      <GlobalStyle />
      <LayOutContainer>
        <Router />
      </LayOutContainer>
      <Navigation />
    </>
  );
}

export default App;

const LayOutContainer = styled.div`
  width: 100%;
  height: 100%;
  padding: 10px;
`;
