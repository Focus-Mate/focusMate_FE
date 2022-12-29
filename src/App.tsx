import styled from "styled-components";
import Navigation from "./Navigation";
import Router from "./Router";
import { GlobalStyle } from "./style/globalStyle";

function App() {
  return (
    <>
      <GlobalStyle />
      <Router />
    </>
  );
}

export default App;
