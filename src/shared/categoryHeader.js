import gachaHeaderWordingImg from '@app/static/gacha-header.png'
import blindBoxHeaderWordingImg from '@app/static/blind-box-header.png'
// todo
import headerBg from '@app/static/header-bg.png'
import styled from 'styled-components'
import { CATEGORY } from '@app/utils/constants'

const Wording = {
  [CATEGORY.GACHA]: gachaHeaderWordingImg,
  [CATEGORY.BLIND_BOX]: blindBoxHeaderWordingImg,
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
    bottom: 17%;
    transform: translate(-50%, 0);
    width: 7%;
  }
`

export default function CategoryHeader({ category }) {
  return (
    <Header>
      <img src={headerBg} />
      <img src={Wording[category]} />
    </Header>
  )
}
