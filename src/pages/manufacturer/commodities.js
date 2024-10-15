import Layout from '@app/shared/layout'
import { useSelector, dataStore } from '@app/store'
import Products from '@app/shared/products'
import Pagination from '@app/shared/products/pagination'
import {
  DEFAULT_COMMODITIES_PAGINATION,
  COMMODITY_STATUS,
} from '@app/utils/constants'
import { useEffect, useState } from 'react'

export default function Commodities({ manufacturerName }) {
  const commodities = useSelector(() => dataStore.commodities)
  const [status, setStatus] = useState(COMMODITY_STATUS.OPENING)
  const [shouldSortDialogOpen, setShouldSortDialogOpen] = useState(false)

  useEffect(() => {
    const req = {
      manufacturerName,
      status,
      ...DEFAULT_COMMODITIES_PAGINATION,
    }
    dataStore.getCommodities(req)
  }, [status, manufacturerName])

  if (!commodities) return <Layout />
  return (
    <Layout>
      <Products
        data={commodities.data}
        status={status}
        setStatus={setStatus}
        shouldSortDialogOpen={shouldSortDialogOpen}
        setShouldSortDialogOpen={setShouldSortDialogOpen}
      />
      <Pagination
        onChange={(pageNumber, pageSize) => {
          const req = {
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
