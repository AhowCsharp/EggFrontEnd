import lotteryImg from '@app/static/lottery'
import rankListImg from '@app/static/rankList'
import coinImg from '@app/static/topUp'

export const CATEGORY = {
  GACHA: '扭蛋',
  BLIND_BOX: '盲盒',
  LUCKY_BAG: '福袋',
  ICHIBAN: '一番賞',
  OUTSIDE_WALL_WORLD: '牆外世界',
  DIGITAL_WORLD: '數碼世界',
  SPECIAL: '特別賞',
}

export const PROFILE_TAB = {
  MEMBER: 'member',
  CONSUME_LOG: 'consumeLog',
  PENDING_PRIZES: 'pendingPrizes',
  STORED_LOG: 'stordLogs',
  FREE_SHIPPING: 'freeshippingLogs',
  TASK_HISTORY: 'taskHistory',
  RECLAIM_LOG: 'reclaimLog',
  CRATE_LOG: 'crateLog',
  SHIP_LOG: 'shipLog',
  TICKETS: 'tickets',
  TOP_UP: 'topUp',
  TOP_UP_RESULT: 'topUpResult',
}

export const COMMODITY_STATUS = {
  OPENING: 1,
  CLOSED: 2,
  PREPARING: 3,
}

export const DRAW_OUT_STATUS = {
  UNSET: 0,
  CONFIRMING: 1,
  DRAWING: 2,
  SUCCESS: 3,
  FAILED: 4,
  PROTECTING: 5,
}

export const COMMODITY_STATUS_OPTIONS = [
  { value: COMMODITY_STATUS.OPENING, label: '上架中' },
  { value: COMMODITY_STATUS.CLOSED, label: '已完售' },
  { value: COMMODITY_STATUS.PREPARING, label: '準備中' },
]

export const DEFAULT_PAGINATION = {
  pageSize: 10,
  pageNumber: 1,
}

export const DEFAULT_COMMODITIES_PAGINATION = {
  pageSize: 20,
  pageNumber: 1,
}

export const INCLUDE_MEMBER_COLUMNS = ['account']

export const INCLUDE_MEMBER_COLUMNS_ENABLE_COPY = [
  'referralCode',
  'referralCodeUrl'
]

export const SIGN_PRIZE_TYPE = {
  COIN: 0,
  LOTTERY: 1,
}

export const SIGN_PRIZE_TYPE_LOCALE = {
  [SIGN_PRIZE_TYPE.COIN]: '金幣',
  [SIGN_PRIZE_TYPE.LOTTERY]: '抽獎券',
}

export const SHIP_STATUS = {
  FAILED: -1,
  PENDING: 0,
  SUCCESS: 1,
}

export const SHIP_STATUS_LOCALE = {
  [SHIP_STATUS.FAILED]: '有異常',
  [SHIP_STATUS.PENDING]: '待寄出',
  [SHIP_STATUS.SUCCESS]: '已寄出',
}

export const SHIP_STATUS_OPTIONS = [
  { value: SHIP_STATUS.FAILED, label: SHIP_STATUS_LOCALE[SHIP_STATUS.FAILED] },
  {
    value: SHIP_STATUS.PENDING,
    label: SHIP_STATUS_LOCALE[SHIP_STATUS.PENDING],
  },
  {
    value: SHIP_STATUS.SUCCESS,
    label: SHIP_STATUS_LOCALE[SHIP_STATUS.SUCCESS],
  },
]

export const INFO_DIALOG_TYPE = {
  PRIVACY: '隱私權條款',
  TOP_UP: '儲值說明',
  REGISTER: '服務條款',
  DRAWING_PROBABILITY: '抽獎消費說明',
}

export const LAST_PRIZE_LEVEL = 27

export const PRIZE_LEVEL = {
  0: {
    name: 'SP級',
    abbr: 'SP',
    img: lotteryImg.lotterySp,
    rankImg: rankListImg.sp,
  },
  1: {
    name: 'A賞',
    abbr: 'A',
    img: lotteryImg.lotteryA,
    rankImg: rankListImg.a,
  },
  2: {
    name: 'B賞',
    abbr: 'B',
    img: lotteryImg.lotteryB,
    rankImg: rankListImg.b,
  },
  3: {
    name: 'C賞',
    abbr: 'C',
    img: lotteryImg.lotteryC,
    rankImg: rankListImg.c,
  },
  4: {
    name: 'D賞',
    abbr: 'D',
    img: lotteryImg.lotteryD,
    rankImg: rankListImg.d,
  },
  5: {
    name: 'E賞',
    abbr: 'E',
    img: lotteryImg.lotteryE,
    rankImg: rankListImg.e,
  },
  6: {
    name: 'F賞',
    abbr: 'F',
    img: lotteryImg.lotteryF,
  },
  7: {
    name: 'G賞',
    abbr: 'G',
    img: lotteryImg.lotteryG,
  },
  8: {
    name: 'H賞',
    abbr: 'H',
    img: lotteryImg.lotteryH,
  },
  9: {
    name: 'I賞',
    abbr: 'I',
    img: lotteryImg.lotteryI,
  },
  10: {
    name: 'J賞',
    abbr: 'J',
    img: lotteryImg.lotteryJ,
  },
  11: {
    name: 'K賞',
    abbr: 'K',
    img: lotteryImg.lotteryK,
  },
  12: {
    name: 'L賞',
    abbr: 'L',
    img: lotteryImg.lotteryL,
  },
  13: {
    name: 'M賞',
    abbr: 'M',
    img: lotteryImg.lotteryM,
  },
  14: {
    name: 'N賞',
    abbr: 'N',
    img: lotteryImg.lotteryN,
  },
  15: {
    name: 'O賞',
    abbr: 'O',
    img: lotteryImg.lotteryO,
  },
  16: {
    name: 'P賞',
    abbr: 'P',
    img: lotteryImg.lotteryP,
  },
  17: {
    name: 'Q賞',
    abbr: 'Q',
    img: lotteryImg.lotteryQ,
  },
  18: {
    name: 'R賞',
    abbr: 'R',
    img: lotteryImg.lotteryR,
  },
  19: {
    name: 'S賞',
    abbr: 'S',
    img: lotteryImg.lotteryS,
  },
  20: {
    name: 'T賞',
    abbr: 'T',
    img: lotteryImg.lotteryT,
  },
  21: {
    name: 'U賞',
    abbr: 'U',
    img: lotteryImg.lotteryU,
  },
  22: {
    name: 'V賞',
    abbr: 'V',
    img: lotteryImg.lotteryV,
  },
  23: {
    name: 'W賞',
    abbr: 'W',
    img: lotteryImg.lotteryW,
  },
  24: {
    name: 'X賞',
    abbr: 'X',
    img: lotteryImg.lotteryX,
  },
  25: {
    name: 'Y賞',
    abbr: 'Y',
    img: lotteryImg.lotteryY,
  },
  26: {
    name: 'Z賞',
    abbr: 'Z',
    img: lotteryImg.lotteryZ,
  },
  27: {
    name: '最後賞',
  },
}

export const TOP_UP_PRICE_OPTIONS = [
  {
    id: 1,
    name: '150',
    src: coinImg.f,
    value: 150,
  },
  {
    id: 2,
    name: '300',
    src: coinImg.f,
    value: 300,
  },
  {
    id: 3,
    name: '500',
    src: coinImg.e,
    value: 500,
  },
  {
    id: 4,
    name: '1000',
    src: coinImg.e,
    value: 1000,
  },
  {
    id: 5,
    name: '1500',
    src: coinImg.e,
    value: 1500,
  },
  {
    id: 6,
    name: '3000',
    src: coinImg.d,
    value: 3000,
  },
  {
    id: 7,
    name: '5000',
    src: coinImg.d,
    value: 5000,
  },
  {
    id: 8,
    name: '8000',
    src: coinImg.d,
    value: 8000,
  },
  {
    id: 9,
    name: '10000',
    src: coinImg.c,
    value: 10000,
  },
  {
    id: 10,
    name: '15000',
    src: coinImg.c,
    value: 15000,
  },
  {
    id: 11,
    name: '20000',
    src: coinImg.c,
    value: 20000,
  },
  {
    id: 12,
    name: '50000',
    src: coinImg.b,
    value: 50000,
  },
  {
    id: 13,
    name: '80000',
    src: coinImg.b,
    value: 80000,
  },
  {
    id: 14,
    name: '100000',
    src: coinImg.a,
    value: 100000,
  },
  {
    id: 15,
    name: '測試金流用',
    src: coinImg.f,
    value: 1,
  },
]

export const TOP_UP_RESULT = {
  NONE: 0,
  SUCCESS: 1,
  FAILED: 2,
}

export const TOP_UP_RESULT_LOCALE = {
  [TOP_UP_RESULT.NONE]: '未知',
  [TOP_UP_RESULT.SUCCESS]: '金幣儲值成功',
  [TOP_UP_RESULT.FAILED]: '金幣儲值失敗',
}

export const REGISTER_STATUS = {
  LOGIN_BY_LINE_SUCCESS: 1,
  REGISTER_BY_WEB: 0,
  NOT_REGISTERED_YET: -1,
}
