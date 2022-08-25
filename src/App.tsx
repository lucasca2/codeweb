import { ThemeProvider } from "styled-components";
import { BrowserRouter } from "react-router-dom";
import { defaultTheme } from "./styles/themes/default";
import { GlobalStyle } from "./styles/global";
import { Router } from "./Router";
import { DialogProvider } from "./hooks/useDialog";

function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyle />
      <DialogProvider>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </DialogProvider>
    </ThemeProvider>
  );
}

export default App;
