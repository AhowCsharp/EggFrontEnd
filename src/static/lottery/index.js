import blindBox from './blind-box.png'
import blindBoxDone from './blind-box-done.png'
import blindBoxHover from './blind-box-hover.gif'
import gacha from './gacha.png'
import gachaDone from './gacha-done.png'
import gachaHover from './gacha-hover.gif'
import luckyBag from './lucky-bag.png'
import luckyBagDone from './lucky-bag-done.png'
import luckyBagHover from './lucky-bag-hover.gif'

const CATEGORY = {
  GACHA: '扭蛋',
  BLIND_BOX: '盲盒',
  LUCKY_BAG: '福袋',
  ICHIBAN: '一番賞',
  OUTSIDE_WALL_WORLD: '牆外世界',
  DIGITAL_WORLD: '數碼世界',
}

export default {
  default: {
    img: gacha,
    done: gachaDone,
    hover: gachaHover,
  },
  [CATEGORY.GACHA]: {
    img: gacha,
    done: gachaDone,
    hover: gachaHover,
  },
  [CATEGORY.BLIND_BOX]: {
    img: blindBox,
    done: blindBoxDone,
    hover: blindBoxHover,
  },
  [CATEGORY.LUCKY_BAG]: {
    img: luckyBag,
    done: luckyBagDone,
    hover: luckyBagHover,
  },
}
