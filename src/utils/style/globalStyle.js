import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
  body, html {
    overflow: hidden;
    font-size: 16px;
    font-family: 'Noto Sans', Roboto, Helvetica, Arial, sans-serif;
  }
  * {
    box-sizing: border-box;
  }

  .bold{
    font-weight: bold;
  }
  .between{
    display: flex;
    justify-content: space-between;
  }
  .digital-font{
  font-family: 'DotGothic16', 'Noto Sans', Roboto, Helvetica, Arial, sans-serif ;
  }

  @media (max-width: 768px) {
    body, html {
      font-size: 14px;
    }
  }
`
