import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
  body, html {
    overflow: hidden;
    font-size: 16px;
    font-family: 'Noto Sans', Roboto, Helvetica, Arial, sans-serif;
  }
  a {
    color:#000;
  text-decoration: none;
  }
  * {
    box-sizing: border-box;
  }

  .bold {
    font-weight: bold;
  }
  .between {
    display: flex;
    justify-content: space-between;
  }
  .digital-font {
  font-family: 'DotGothic16', 'Noto Sans', Roboto, Helvetica, Arial, sans-serif ;
  }
   .hide-in-pc {
      display: none !important;
    }

  @media (max-width: 768px) {
    body, html {
      font-size: 14px;
      color:${(p) => p.theme.mobile.color.font};
    }
    .dialog{
      color: #000;
    }
    .ant-form-item .ant-form-item-label > label {
      color:${(p) => p.theme.mobile.color.font} !important;
    }
    a {
      color:${(p) => p.theme.mobile.color.font};
    }
    .hide-in-mobile {
      display: none !important;
    }
    .hide-in-pc {
      display: block !important;
    }
  }
`
