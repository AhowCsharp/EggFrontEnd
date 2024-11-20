import { Pagination as BasePagination } from 'antd';
import styled from 'styled-components';
import { DEFAULT_PAGINATION } from '@app/utils/constants';

const Pagination = styled(BasePagination)`
  text-align: ${(p) => (p.alignCenter ? 'center' : 'right')};
`;

export default function Page({
  onChange,
  page,
  totalCount,
  alignCenter = false,
}) {
  return (
    <Pagination
      className="pagination mt10"
      current={page}
      total={totalCount}
      defaultPageSize={DEFAULT_PAGINATION.pageSize}
      showSizeChanger={false}
      onChange={onChange}
      alignCenter={alignCenter}
    />
  );
}
