import styled from 'styled-components'
import ticket2000Img from '@app/static/ticket-2000.png'
import coinImg from '@app/static/coin.png'
import { CATEGORY } from '@app/utils/constants'

const Image = styled.img.attrs(p => ({ src: p.src }))`
	width: auto;
	height: ${p => (p.size ? `${p.size}rem` : '1.8rem')};
	${p => (p.mr8 ? `margin-right: 8px;` : ' margin-right: 5px')}
`

export default function DollarSign({ category, size, ...p }) {
	return (
		<Image
			src={category === CATEGORY.LUCKY_BAG ? ticket2000Img : coinImg}
			size={size}
			{...p}
		/>
	)
}
