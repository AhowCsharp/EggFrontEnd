import gachaHeaderWordingImg from '@app/static/gacha-header.png'
import blindBoxHeaderWordingImg from '@app/static/blind-box-header.png'
import digitalWorldHeaderWordingImg from '@app/static/digital-world-header.png'
import outsideWallWorldHeaderWordingImg from '@app/static/outside-wall-world-header.png'
import specialHeaderWordingImg from '@app/static/special-header.png'
import ichibanHeaderWordingImg from '@app/static/ichiban-header.png'
import luckyBagHeaderWordingImg from '@app/static/lucky-bag-header.png'
import headerBg from '@app/static/header-bg.png'
import headerMobileBg from '@app/static/header-bg_m.png'
import styled from 'styled-components'
import { CATEGORY } from '@app/utils/constants'
import { useEffect, useState } from 'react'

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
const MobileSetting = {
  [CATEGORY.DIGITAL_WORLD]: { width: '15%', bottom: '22%' },
  [CATEGORY.OUTSIDE_WALL_WORLD]: { width: '15%', bottom: '22%' },
  [CATEGORY.SPECIAL]: { width: '15%' },
  [CATEGORY.ICHIBAN]: { width: '15%' },
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
  @media (max-width: 768px) {
    img:last-child {
      bottom: ${(p) => p.setting?.bottom || '17%'};
      width: ${(p) => p.setting?.width || '11%'};
    }
  }
`

export default function CategoryHeader({ category }) {
  const mobileQuery = window.matchMedia('(max-width: 768px)')
  const [isMobile, setIsMobile] = useState(mobileQuery.matches)
  useEffect(() => {
    const handleChange = (event) => {
      setIsMobile(event.matches)
    }
    mobileQuery.addEventListener('change', handleChange)
    return () => {
      mobileQuery.removeEventListener('change', handleChange)
    }
  }, [])
  return (
    <Header setting={isMobile ? MobileSetting[category] : Setting[category]}>
      <img src={isMobile ? headerMobileBg : headerBg} />
      <img src={Wording[category]} />
    </Header>
  )
}
