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
import { SEO } from '@app/shared/SEO'

const Category = CATEGORY.ICHIBAN

export default function Ichiban() {
  const commodities = useSelector(() => dataStore.commodities)
  const [status, setStatus] = useState(COMMODITY_STATUS.OPENING)
  const [shouldSortDialogOpen, setShouldSortDialogOpen] = useState(false)
  const filterOptions = useSelector(
    () => dataStore.filterOptionsByCategory[Category]
  )

  useEffect(() => {
    const req = {
      category: Category,
      status,
      ...filterOptions,
      ...DEFAULT_COMMODITIES_PAGINATION,
    }
    dataStore.getCommodities(req)
  }, [status, filterOptions])

  if (!commodities) return <Layout />
  return (
    <Layout>
      <SEO type="ichiban" />
      <Products
        data={commodities.data}
        status={status}
        setStatus={setStatus}
        category={Category}
        shouldSortDialogOpen={shouldSortDialogOpen}
        setShouldSortDialogOpen={setShouldSortDialogOpen}
        filterOptions={filterOptions}
        setFilterOptions={(opts) => dataStore.setFilterOptions(Category, opts)}
      />
      <Pagination
        onChange={(pageNumber, pageSize) => {
          const req = {
            category: Category,
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
