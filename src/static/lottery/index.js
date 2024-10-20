import blindBox from './blind-box.png'
import blindBoxDone from './blind-box-done.png'
import blindBoxHover from './blind-box-hover.gif'
import gacha from './gacha.png'
import gachaDone from './gacha-done.png'
import gachaHover from './gacha-hover.gif'
import luckyBag from './lucky-bag.png'
import luckyBagDone from './lucky-bag-done.png'
import luckyBagHover from './lucky-bag-hover.gif'
import ichibanDoneSp from './ichiban-done-sp.png'
import ichibanDoneA from './ichiban-done-a.png'
import ichibanDoneB from './ichiban-done-b.png'
import ichibanDoneC from './ichiban-done-c.png'
import ichibanDoneD from './ichiban-done-d.png'
import ichibanDoneE from './ichiban-done-e.png'
import ichibanDoneF from './ichiban-done-f.png'
import ichibanDoneG from './ichiban-done-g.png'
import ichibanDoneH from './ichiban-done-h.png'
import ichibanDoneI from './ichiban-done-i.png'
import ichibanDoneJ from './ichiban-done-j.png'
import ichibanDoneK from './ichiban-done-k.png'
import ichibanDoneL from './ichiban-done-l.png'
import ichibanDoneM from './ichiban-done-m.png'
import ichibanDoneN from './ichiban-done-n.png'
import ichibanDoneO from './ichiban-done-o.png'
import ichibanDoneP from './ichiban-done-p.png'
import ichibanDoneQ from './ichiban-done-q.png'
import ichibanDoneR from './ichiban-done-r.png'
import ichibanDoneS from './ichiban-done-s.png'
import ichibanDoneT from './ichiban-done-t.png'
import ichibanDoneU from './ichiban-done-u.png'
import ichibanDoneV from './ichiban-done-v.png'
import ichibanDoneW from './ichiban-done-w.png'
import ichibanDoneX from './ichiban-done-x.png'
import ichibanDoneY from './ichiban-done-y.png'
import ichibanDoneZ from './ichiban-done-z.png'
import ichibanHover from './ichiban-hover.gif'
import ichiban from './ichiban.png'
import outsideWallWorld from './outside-wall-world.png'
import outsideWallWorldDone from './outside-wall-world-done.png'
import outsideWallWorldHover from './outside-wall-world-hover.gif'
import special from './special.png'
import specialHover from './special-hover.gif'
import specialDoneA from './special-done-a.png'
import specialDoneB from './special-done-b.png'
import specialDoneC from './special-done-c.png'
import specialDoneD from './special-done-d.png'
import specialDoneE from './special-done-e.png'
import specialDoneF from './special-done-f.png'
import specialDoneG from './special-done-g.png'
import specialDoneH from './special-done-h.png'
import specialDoneI from './special-done-i.png'
import specialDoneJ from './special-done-j.png'
import specialDoneK from './special-done-k.png'
import specialDoneL from './special-done-l.png'
import specialDoneM from './special-done-m.png'
import specialDoneN from './special-done-n.png'
import specialDoneO from './special-done-o.png'
import specialDoneP from './special-done-p.png'
import specialDoneQ from './special-done-q.png'
import specialDoneR from './special-done-r.png'
import specialDoneS from './special-done-s.png'
import specialDoneT from './special-done-t.png'
import specialDoneU from './special-done-u.png'
import specialDoneV from './special-done-v.png'
import specialDoneW from './special-done-w.png'
import specialDoneX from './special-done-x.png'
import specialDoneY from './special-done-y.png'
import specialDoneZ from './special-done-z.png'
import specialDoneSP from './special-done-sp.png'

const CATEGORY = {
  GACHA: '扭蛋',
  BLIND_BOX: '盲盒',
  LUCKY_BAG: '福袋',
  ICHIBAN: '一番賞',
  OUTSIDE_WALL_WORLD: '牆外世界',
  DIGITAL_WORLD: '數碼世界',
  SPECIAL: '特別賞',
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
  [CATEGORY.ICHIBAN]: {
    img: ichiban,
    done: {
      0: ichibanDoneSp,
      1: ichibanDoneA,
      2: ichibanDoneB,
      3: ichibanDoneC,
      4: ichibanDoneD,
      5: ichibanDoneE,
      6: ichibanDoneF,
      7: ichibanDoneG,
      8: ichibanDoneH,
      9: ichibanDoneI,
      10: ichibanDoneJ,
      11: ichibanDoneK,
      12: ichibanDoneL,
      13: ichibanDoneM,
      14: ichibanDoneN,
      15: ichibanDoneO,
      16: ichibanDoneP,
      17: ichibanDoneQ,
      18: ichibanDoneR,
      19: ichibanDoneS,
      20: ichibanDoneT,
      21: ichibanDoneU,
      22: ichibanDoneV,
      23: ichibanDoneW,
      24: ichibanDoneX,
      25: ichibanDoneY,
      26: ichibanDoneZ,
    },
    hover: ichibanHover,
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
  [CATEGORY.OUTSIDE_WALL_WORLD]: {
    img: outsideWallWorld,
    done: outsideWallWorldDone,
    hover: outsideWallWorldHover,
  },
  [CATEGORY.SPECIAL]: {
    img: special,
    done: {
      0: specialDoneSP,
      1: specialDoneA,
      2: specialDoneB,
      3: specialDoneC,
      4: specialDoneD,
      5: specialDoneE,
      6: specialDoneF,
      7: specialDoneG,
      8: specialDoneH,
      9: specialDoneI,
      10: specialDoneJ,
      11: specialDoneK,
      12: specialDoneL,
      13: specialDoneM,
      14: specialDoneN,
      15: specialDoneO,
      16: specialDoneP,
      17: specialDoneQ,
      18: specialDoneR,
      19: specialDoneS,
      20: specialDoneT,
      21: specialDoneU,
      22: specialDoneV,
      23: specialDoneW,
      24: specialDoneX,
      25: specialDoneY,
      26: specialDoneZ,
    },
    hover: specialHover,
  },
}
