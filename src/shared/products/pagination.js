import { Pagination as BasePagination } from 'antd'
import styled from 'styled-components'
import { DEFAULT_COMMODITIES_PAGINATION } from '@app/utils/constants'

const Pagination = styled(BasePagination)`
  text-align: ${(p) => (p.alignCenter ? 'center' : 'right')};
`

export default function Page({
  onChange,
  totalCount,
  pageNumber,
  alignCenter = false,
}) {
  return (
    <Pagination
      className="pagination"
      defaultCurrent={pageNumber}
      total={totalCount}
      defaultPageSize={DEFAULT_COMMODITIES_PAGINATION.pageSize}
      showSizeChanger={false}
      onChange={onChange}
      alignCenter={alignCenter}
    />
  )
}
