import Navigation from "./Navigation";
import Router from "./Router";
import { GlobalStyle } from "./style/globalStyle";

function App() {
  return (
    <>
      <GlobalStyle />
      <Router />
      <Navigation />
    </>
  );
}

export default App;
