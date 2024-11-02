import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
  :root {
    --safePaddingLeft: calc(env(safe-area-inset-left));
    --safePaddingRight: calc(env(safe-area-inset-right));
    --safePaddingTop: calc(env(safe-area-inset-top));
    --safePaddingBottom: calc(env(safe-area-inset-bottom));
  }
  #root {
    position: relative;
    width: 100vw;
    height: var(--100vh);
    overflow: hidden;
    margin-top: var(--safePaddingTop);
    margin-bottom: var(--safePaddingBottom);
    padding-left: var(--safePaddingLeft);
    padding-right: var(--safePaddingRight);
    transform: translateZ(0);
  }
  body, html {
    font-size: 16px;
    font-family: 'Noto Sans', Roboto, Helvetica, Arial, sans-serif;
  }
  * {
    box-sizing: border-box;
    -webkit-overflow-scrolling: touch;
    overscroll-behavior: none;
    &::-webkit-scrollbar { width: 0; height: 0; }
  }
  a {
    color:#000;
  text-decoration: none;
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
    .ant-form-item .ant-form-item-label > label, .ant-descriptions-title, .ant-descriptions-row span {
      color:${(p) => p.theme.mobile.color.font} !important;
    }
    .dialog, .dark-font-in-mobile {
      color: #000 !important;
      .ant-form-item .ant-form-item-label > label, .ant-descriptions-title, .ant-descriptions-row span {
          color: #000 !important;
      }
    }
    a {
      color:${(p) => p.theme.mobile.color.font};
    }
    .hide-in-mobile {
      display: none !important;
    }
    .hide-in-pc {
      display: block !important;
      &.flex {
        display: flex !important;
      }
      
    }
    li {
      &.ant-pagination-item {
        background-color: ${(p) => p.theme.mobile.color.background} !important;
        color: ${(p) => p.theme.mobile.color.font} !important;
        a {
          color: ${(p) => p.theme.mobile.color.font} !important;
        }
      }
      &.ant-pagination-item-active {
        border-color: ${(p) => p.theme.mobile.color.font} !important;
        a {
          color: ${(p) => p.theme.mobile.color.font} !important;
        }
      }
    }
    .ant-pagination-prev,
    .ant-pagination-next {
      button {
        color: ${(p) => p.theme.mobile.color.font} !important;
      }
      &.ant-pagination-disabled button {
        color: rgba(255, 255, 255, 0.25) !important;
      }
    }
    .ant-picker-range-separator span, .ant-picker .ant-picker-clear , .ant-picker .ant-picker-suffix {
      color: ${(p) => p.theme.mobile.color.font} !important;
    }
    .ant-picker {
      color: ${(p) => p.theme.mobile.color.font} !important;
      background-color: ${(p) => p.theme.mobile.color.background} !important;
    }
    .dark-in-mobile .ant-checkbox .ant-checkbox-inner {
      border-color: ${(p) => p.theme.mobile.color.font} !important;
      color: ${(p) => p.theme.mobile.color.font} !important;
      background-color: ${(p) => p.theme.mobile.color.background} !important;

    }
  }
`
