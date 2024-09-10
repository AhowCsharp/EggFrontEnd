import styled from 'styled-components'
import ticket2000Img from '@app/static/ticket-2000.png'
import coinImg from '@app/static/coin.png'
import { CATEGORY } from '@app/utils/constants'

const Image = styled.img.attrs((p) => ({ src: p.src }))`
  width: auto;
  height: ${(p) => (p.size ? `${p.size}rem` : '2rem')};
  margin-left: 3px;
`

export default function DollarSign({ category, size }) {
  return (
    <Image
      src={category === CATEGORY.LUCKY_BAG ? ticket2000Img : coinImg}
      size={size}
    />
  )
}
