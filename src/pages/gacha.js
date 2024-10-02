import Layout from '@app/shared/layout'
import { useSelector, dataStore } from '@app/store'
import Products from '@app/shared/products'
import Pagination from '@app/shared/products/pagination'
import {
	CATEGORY,
	DEFAULT_COMMODITIES_PAGINATION,
	COMMODITY_STATUS,
} from '@app/utils/constants'
import { useEffect, useState } from 'react'

export default function Gacha() {
	const commodities = useSelector(() => dataStore.commodities)
	const [status, setStatus] = useState(COMMODITY_STATUS.OPENING)
	useEffect(() => {
		const req = {
			category: CATEGORY.GACHA,
			status,
			...DEFAULT_COMMODITIES_PAGINATION,
		}
		dataStore.getCommodities(req)
	}, [status])

	if (!commodities) return <Layout />
	return (
		<Layout>
			<Products
				data={commodities.data}
				status={status}
				setStatus={setStatus}
				category={CATEGORY.GACHA}
			/>
			<Pagination
				onChange={(pageNumber, pageSize) => {
					const req = {
						category: CATEGORY.GACHA,
						pageNumber,
						pageSize,
					}
					dataStore.getCommodities(req)
				}}
				totalCount={commodities.totalCount}
			/>
		</Layout>
	)
}
