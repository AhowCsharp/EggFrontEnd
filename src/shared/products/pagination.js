import { Pagination as BasePagination } from 'antd'
import styled from 'styled-components'
import { DEFAULT_COMMODITIES_PAGINATION } from '@app/utils/constants'

const Pagination = styled(BasePagination)`
  text-align: right;
`

export default function Page({ onChange, totalCount }) {
  return (
    <Pagination
      defaultCurrent={DEFAULT_COMMODITIES_PAGINATION.pageNumber}
      total={totalCount}
      defaultPageSize={DEFAULT_COMMODITIES_PAGINATION.pageSize}
      showSizeChanger={false}
      onChange={onChange}
    />
  )
}
