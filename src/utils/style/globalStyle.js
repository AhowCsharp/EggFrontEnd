import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
  body, html {
    overflow: hidden;
    font-size: 16px;
  }
  * {
    font-family: Roboto, Helvetica, Arial, sans-serif;
    box-sizing: border-box;
  }

  .bold{
    font-weight: bold;
  }

  @media (max-width: 768px) {
    body, html {
      font-size: 14px;
    }
  }
`
