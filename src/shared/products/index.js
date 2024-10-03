import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { url } from '@app/utils/paths'
import {
	COMMODITY_STATUS_OPTIONS,
	COMMODITY_STATUS,
} from '@app/utils/constants'
import { Radio as AntdRadio } from 'antd'
import Header from '@app/shared/categoryHeader'
import filterIcon from '@app/static/filter.png'
import orderIcon from '@app/static/order.png'
import Product from './product'

const { Group: BaseRadio } = AntdRadio

const ProductContainer = styled.div`
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

const Radio = styled(BaseRadio)`
	.ant-radio-button-wrapper {
		border: none;
		background-color: #fff;
		border-radius: 32px;
		color: #101a29;
		padding: 6px 20px;
		line-height: 20px;
		margin: 0 4px;
		&.ant-radio-button-wrapper-checked,
		&:hover {
			background-color: #f2f3f9;
			color: #3a64ce;
		}
		&::before {
			content: none;
		}
	}
	.ant-wave {
		left: unset !important;
		top: unset !important;
		display: none !important;
		color: inherit !important;
	}
`

const Button = styled.div`
	background-color: ${p => p.theme.color.red};
	padding: 8px 16px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	color: #fff;
	img {
		width: 1.2rem;
		height: 1.2rem;
		margin-right: 8px;
	}
`

const ButtonContainer = styled.div`
	display: flex;
	justify-content: space-between;
	border-radius: 4px;
	${Button} + ${Button} {
		margin-left: 8px;
	}
`

export default function Products({
	data,
	category,
	isBase = false,
	status = false,
	setStatus,
}) {
	const goto = useNavigate()
	const isSoldOut = status === COMMODITY_STATUS.CLOSED

	return (
		<>
			<ButtonContainer>
				{status && (
					<Radio
						onChange={e => setStatus(e.target.value)}
						value={status}
						optionType="button"
						options={COMMODITY_STATUS_OPTIONS}
					/>
				)}
				{!!category && (
					<ButtonContainer>
						<Button>
							<img src={filterIcon} />
							篩選
						</Button>
						<Button>
							<img src={orderIcon} />
							排序
						</Button>
					</ButtonContainer>
				)}
			</ButtonContainer>
			{!!category && <Header category={category} />}
			{data && data.length ? (
				<ProductContainer>
					{data.map((p, index) => (
						<Product
							key={index}
							data={p}
							handleClick={handleClick}
							isBase={isBase}
							isSoldOut={isSoldOut}
						/>
					))}
				</ProductContainer>
			) : (
				<ProductContainer center={true}>無結果</ProductContainer>
			)}
		</>
	)
	function handleClick(data) {
		return () => {
			goto(url.commodity({ commodityId: data.id }))
		}
	}
}
