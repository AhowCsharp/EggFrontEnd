import styled from 'styled-components'
import Commodity from './commodity'
import headerImg from '@app/static/header.png'
import { url } from '@app/utils/paths'
import { useNavigate } from 'react-router-dom'

export const Header = styled.div`
	border-bottom: 1px solid ${p => p.theme.color.red};
	color: #160d00;
	font-size: 1.5rem;
	font-family: 'DotGothic16', 'Noto Sans', Roboto, Helvetica, Arial, sans-serif;
	padding-bottom: 8px;
	display: flex;
	align-items: center;
	img {
		width: 40px;
		height: 40px;
		margin-right: 20px;
	}
`

const Container = styled.div`
	display: flex;
	justify-content: ${p => (p.center ? 'center' : 'flex-start')};
	align-items: center;
	padding: 10px 0;
	margin: 1rem 0;
	flex-wrap: wrap;
	margin-top: -20px;
	min-height: 150px;
	.item + .item {
		margin-left: 15px;
	}
	@media (max-width: 768px) {
		margin: 1rem 0;
	}
`

export default function HotCommodityBlock({ data }) {
	const goto = useNavigate()

	return (
		<>
			<Header>
				<img src={headerImg} />
				熱銷商品
			</Header>
			{data && data.length ? (
				<Container>
					{data.map((p, index) => (
						<Commodity key={index} data={p} handleClick={handleClick} />
					))}
				</Container>
			) : null}
		</>
	)
	function handleClick(data) {
		return () => {
			goto(url.commodity({ commodityId: data.id }))
		}
	}
}
