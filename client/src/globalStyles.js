import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  :root {
    /* Colors */
    --primary: #eff7f9;
    --black:#000000;
    --purple:#603F83;
    --grey:#C7D3D4;
    --white:#fff;
    --nav:#35353f;
    --nav2:#3f3d56;
    --google:#4285F3;
    
    /* constants */
    --navbar-height: 80px;

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    color: black;
  }

  body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
      monospace;
  }
`
