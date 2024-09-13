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
  [CATEGORY.ICHIBAN]: {
    img: ichiban,
    done: {
      sp: ichibanDoneSp,
      a: ichibanDoneA,
      b: ichibanDoneB,
      c: ichibanDoneC,
      d: ichibanDoneD,
      e: ichibanDoneE,
      f: ichibanDoneF,
      g: ichibanDoneG,
      h: ichibanDoneH,
      i: ichibanDoneI,
      j: ichibanDoneJ,
      k: ichibanDoneK,
      l: ichibanDoneL,
      m: ichibanDoneM,
      n: ichibanDoneN,
      o: ichibanDoneO,
      p: ichibanDoneP,
      q: ichibanDoneQ,
      r: ichibanDoneR,
      s: ichibanDoneS,
      t: ichibanDoneT,
      u: ichibanDoneU,
      v: ichibanDoneV,
      w: ichibanDoneW,
      x: ichibanDoneX,
      y: ichibanDoneY,
      z: ichibanDoneZ,
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
}
