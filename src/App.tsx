import { ThemeProvider } from "styled-components";
import Navigation from "./Navigation";
import Router from "./Router";
import { GlobalStyle } from "./style/globalStyle";
import { theme } from "./style/theme";

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Router />
        <Navigation />
      </ThemeProvider>
    </>
  );
}

export default App;
