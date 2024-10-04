import { MANUFACTURER_ID } from '../hardCode'

const theme = {
  color: {
    background: '#fff',
    orange: '#f4c221',
    highlight: '#d1412f',
    dialogBorder: '#aaa',
    mask: 'rgba(0, 0, 0, 0.8)',
    danmakuMask: 'rgba(0, 0, 0, 0.6)',
    warning: '#a80502',
    defaultPrizeTag: '#06b9d4',
    gray: '#999',
    topUpSelected: '#d04a26',
    discount: 'rgba(255, 0, 0)',
    red: '#a21a2b',
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
    layoutImg: 2,
    mask: 1,
    alertDialog: 5,
    alertMask: 4,
    header: 6,
    danmaku: 7,
  },
}

export default theme
