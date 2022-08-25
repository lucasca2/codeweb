import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  html {
    background-color: ${(p) => p.theme.colors.background};
    color: ${(p) => p.theme.colors.textLight};
    font-family: "Inter", serif;
    letter-spacing: .3px;
  }
  
  input {
    font-family: "Inter", serif;
    letter-spacing: .3px;
  }
`;
