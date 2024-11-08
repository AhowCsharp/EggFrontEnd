import { MANUFACTURER_ID } from '../hardCode'

const theme = {
  color: {
    siteBg: '#081324',
    background: '#fff',
    orange: '#f4c221',
    highlight: '#d1412f',
    dialogBorder: '#aaa',
    mask: 'rgba(0, 0, 0, 0.8)',
    danmakuMask: 'rgba(0, 0, 0, 0.6)',
    headerMask: 'rgba(0, 0, 0, 0.9)',
    desc: 'rgba(0, 0, 0, 0.72)',
    warning: '#a80502',
    defaultPrizeTag: '#06b9d4',
    gray: '#999',
    topUpSelected: '#d04a26',
    discount: 'rgba(255, 0, 0)',
    drawOutTimeBtn: '#081324',
    red: '#a21a2b',
    headerBottomLine: '#9ca1a7',
    disable: '#c4c4c4',
  },
  tagColor: {
    [MANUFACTURER_ID]: '#FF0062',
    others: '#466CB9',
  },
  borderRadius: {
    content: '30px',
    dialogContainer: '20px',
    memberInfo: '5px',
    danmaku: '10px',
  },
  zIndex: {
    dialog: 3,
    footer: 1,
    mask: 2,
    alertDialog: 6,
    alertMask: 5,
    header: 4,
    danmaku: 7,
  },
  mobile: {
    color: {
      font: '#fff',
      background: '#081324',
      desc: '#aaa',
      descBg: '#212b3a',
      warning: 'rgba(255, 0, 0.3)',
      menuDivider: '#44413d',
      listItemTitleLabel: '#bcbfc4',
      listItemTitleBg: '#050b16',
    },
    borderRadius: {
      list: '10px',
    },
  },
}

export default theme
