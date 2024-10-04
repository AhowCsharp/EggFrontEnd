import gachaHeaderWordingImg from '@app/static/gacha-header.png'
import blindBoxHeaderWordingImg from '@app/static/blind-box-header.png'
import digitalWorldHeaderWordingImg from '@app/static/digital-world-header.png'
import outsideWallWorldHeaderWordingImg from '@app/static/outside-wall-world-header.png'
import specialHeaderWordingImg from '@app/static/special-header.png'
import ichibanHeaderWordingImg from '@app/static/ichiban-header.png'
import luckyBagHeaderWordingImg from '@app/static/lucky-bag-header.png'
import headerBg from '@app/static/header-bg.png'
import styled from 'styled-components'
import { CATEGORY } from '@app/utils/constants'

const Wording = {
  [CATEGORY.GACHA]: gachaHeaderWordingImg,
  [CATEGORY.BLIND_BOX]: blindBoxHeaderWordingImg,
  [CATEGORY.DIGITAL_WORLD]: digitalWorldHeaderWordingImg,
  [CATEGORY.OUTSIDE_WALL_WORLD]: outsideWallWorldHeaderWordingImg,
  [CATEGORY.SPECIAL]: specialHeaderWordingImg,
  [CATEGORY.ICHIBAN]: ichibanHeaderWordingImg,
  [CATEGORY.LUCKY_BAG]: luckyBagHeaderWordingImg,
}
const Setting = {
  [CATEGORY.DIGITAL_WORLD]: { width: '10%', bottom: '20%' },
  [CATEGORY.OUTSIDE_WALL_WORLD]: { width: '10%', bottom: '20%' },
  [CATEGORY.SPECIAL]: { width: '10%' },
  [CATEGORY.ICHIBAN]: { width: '10%' },
}
const Header = styled.div`
  height: auto;
  width: 100%;
  position: relative;
  margin: 20px auto;
  img:first-child {
    position: relative;
    width: 110%;
    left: -5%;
  }
  img:last-child {
    position: absolute;
    left: 50%;
    bottom: ${(p) => p.setting?.bottom || '17%'};
    transform: translate(-50%, 0);
    width: ${(p) => p.setting?.width || '7%'};
  }
`

export default function CategoryHeader({ category }) {
  return (
    <Header setting={Setting[category]}>
      <img src={headerBg} />
      <img src={Wording[category]} />
    </Header>
  )
}
