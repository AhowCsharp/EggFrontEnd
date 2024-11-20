import { useSelector, dataStore } from '@app/store';
import { useEffect, useState } from 'react';
import { Table } from 'antd';
import { DEFAULT_PAGINATION } from '@app/utils/constants';
import { getDefaultDateRange, formatDate, renderDate } from '@app/utils/date';
import { Content } from './index';
import { Container, RangePicker, MobileList, MobileItem } from './tabStyle';
import Pagination from './mobilePagination';

const { Column } = Table;

export default function ConsumeLog() {
  const consumeLog = useSelector(() => dataStore.consumeLog);
  const dateRange = getDefaultDateRange();
  const [page, setPage] = useState(DEFAULT_PAGINATION.pageNumber);

  const [req, setReq] = useState({
    ...DEFAULT_PAGINATION,
    start: formatDate(dateRange[0]),
    end: formatDate(dateRange[1]),
  });

  useEffect(() => {
    dataStore.getConsumeLog(req);
  }, [req]);

  const data = consumeLog?.data || [];
  return (
    <Content>
      <Container>
        <RangePicker
          showTime={{
            format: 'HH:mm',
          }}
          format="YYYY-MM-DD HH:mm"
          defaultValue={dateRange}
          onOk={(value) => {
            const start = formatDate(value[0]);
            const end = formatDate(value[1]);
            if (start === 'Invalid Date' || end === 'Invalid Date') return;
            setReq({
              ...req,
              start,
              end,
            });
          }}
          mb20={true}
        />
        {renderTable()}
      </Container>
    </Content>
  );
  function renderTable() {
    return (
      <>
        <Table
          className="hide-in-mobile"
          dataSource={data}
          pagination={{
            current: page,
            total: consumeLog?.totalCount || 0,
            defaultPageSize: DEFAULT_PAGINATION.pageSize,
            showSizeChanger: true,
            onChange: (pageNumber, pageSize) => {
              setPage(pageNumber);
              setReq({ ...req, pageNumber, pageSize });
            },
          }}
        >
          <Column title="賞品" dataIndex="commodityName" key="commodityName" />
          <Column title="獎品" dataIndex="prizeName" key="prizeName" />
          <Column title="抽獎價格" dataIndex="costMoney" key="costMoney" />
          <Column
            title="抽獎時間"
            key="drawDate"
            dataIndex="drawDate"
            render={renderDate}
          />
          <Column title="狀態" dataIndex="status" key="status" />
        </Table>
        <MobileList>
          {data.map((item, index) => (
            <MobileItem key={index}>
              <div className="title">
                <span className="label">賞品</span> {item.commodityName}
              </div>
              <div>
                <span className="label">獎品</span> {item.prizeName}
              </div>
              <div>
                <span className="label">抽獎價格</span> {item.costMoney}
              </div>
              <div>
                <span className="label">抽獎時間</span>{' '}
                {renderDate(item.drawDate)}
              </div>
              <div>
                <span className="label">狀態</span> {item.status}
              </div>
            </MobileItem>
          ))}
          <Pagination
            onChange={(pageNumber, pageSize) => {
              setPage(pageNumber);
              setReq({ ...req, pageNumber, pageSize });
            }}
            page={page}
            totalCount={consumeLog?.totalCount || 0}
            alignCenter={true}
          />
        </MobileList>
      </>
    );
  }
}
