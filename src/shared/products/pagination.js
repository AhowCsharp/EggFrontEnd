import { Pagination as BasePagination } from 'antd'
import styled from 'styled-components'
import { DEFAULT_COMMODITIES_PAGINATION } from '@app/utils/constants'

const Pagination = styled(BasePagination)`
  text-align: ${(p) => (p.alignCenter ? 'center' : 'right')};
  @media (max-width: 768px) {
    li {
      background-color: ${(p) => p.theme.mobile.color.background} !important;
      color: ${(p) => p.theme.mobile.color.font} !important;

      &.ant-pagination-item-active {
        border-color: ${(p) => p.theme.mobile.color.font} !important;
        a {
          color: ${(p) => p.theme.mobile.color.font} !important;
        }
      }
    }
    .ant-pagination-prev,
    .ant-pagination-next {
      button {
        color: ${(p) => p.theme.mobile.color.font} !important;
      }
      &.ant-pagination-disabled button {
        color: rgba(255, 255, 255, 0.25) !important;
      }
    }
  }
`

export default function Page({ onChange, totalCount, alignCenter = false }) {
  return (
    <Pagination
      className="pagination"
      defaultCurrent={DEFAULT_COMMODITIES_PAGINATION.pageNumber}
      total={totalCount}
      defaultPageSize={DEFAULT_COMMODITIES_PAGINATION.pageSize}
      showSizeChanger={false}
      onChange={onChange}
      alignCenter={alignCenter}
    />
  )
}
