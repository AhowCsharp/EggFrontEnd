import { useSelector, dataStore } from '@app/store';
import { useEffect, useState } from 'react';
import { Table } from 'antd';
import { DEFAULT_PAGINATION } from '@app/utils/constants';
import { getDefaultDateRange, formatDate, renderDate } from '@app/utils/date';
import { Button } from '@app/pages/commodity';
import Tag from '@app/shared/tag';
import CopyToClipboard from '@app/shared/copyToClipboard';
import { Content } from './index';
import {
  Container,
  RangePicker,
  Search,
  Select,
  MobileItem,
  MobileList,
} from './tabStyle';
import Pagination from './mobilePagination';

const { Column } = Table;

const STATUS_OPTIONS = [
  { value: null, label: '全部' },
  {
    value: false,
    label: '未使用',
  },
  {
    value: true,
    label: '已使用',
  },
];

export default function freeshippingTicketLog() {
  const freeshippingTicketLogs = useSelector(
    () => dataStore.freeshippingTicketLogs
  );
  const dateRange = getDefaultDateRange();
  const [page, setPage] = useState(DEFAULT_PAGINATION.pageNumber);
  const [req, setReq] = useState({
    ...DEFAULT_PAGINATION,
    status: null,
    start: formatDate(dateRange[0]),
    end: formatDate(dateRange[1]),
  });

  useEffect(() => {
    dataStore.getFreeshippingticketLogs(req);
  }, [req]);

  const data = freeshippingTicketLogs?.data || [];
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
        <Select
          className="dark-in-mobile"
          value={req.status}
          options={STATUS_OPTIONS}
          onChange={(value) => setReq({ ...req, status: value })}
        />
        <Search
          placeholder="請輸入廠商完整名稱"
          enterButton={<Button>送出</Button>}
          size="small"
          onSearch={(value) => {
            setReq({ ...req, manufacturerName: value });
          }}
          mb20={true}
        />
        {renderTable()}
      </Container>
    </Content>
  );
  function renderManufacturerName({ manufacturerName, manufacturerId }) {
    return <Tag name={manufacturerName} id={manufacturerId} />;
  }
  function renderTable() {
    return (
      <>
        <Table
          className="hide-in-mobile"
          dataSource={data}
          pagination={{
            current: page,
            total: freeshippingTicketLogs?.totalCount || 0,
            defaultPageSize: DEFAULT_PAGINATION.pageSize,
            showSizeChanger: true,
            onChange: (pageNumber, pageSize) => {
              setPage(pageNumber);
              setReq({ ...req, pageNumber, pageSize });
            },
          }}
        >
          <Column
            title="廠商名稱"
            render={renderManufacturerName}
            key="manufacturerName"
          />
          <Column title="消費門檻" dataIndex="threshold" key="threshold" />
          <Column
            title="免運序號"
            dataIndex="freeShippingNo"
            render={(no) => <CopyToClipboard>{no}</CopyToClipboard>}
            key="freeShippingNo"
          />
          <Column title="訂單編號" dataIndex="orderId" key="orderId" />
          <Column
            title="免運金額"
            dataIndex="shippingCost"
            key="shippingCost"
          />
          <Column
            title="取得時間"
            key="createDate"
            dataIndex="createDate"
            render={renderDate}
          />
          <Column
            title="使用時間"
            key="usedDate"
            dataIndex="usedDate"
            render={renderDate}
          />
        </Table>
        <MobileList>
          {data.map((item, index) => (
            <MobileItem key={index}>
              <div className="title">
                <span className="label">廠商名稱</span>
                <div>{renderManufacturerName(item)}</div>
              </div>
              <div>
                <span className="label">消費門檻</span> {item.threshold}
              </div>
              <div>
                <span className="label">免運序號</span>{' '}
                <CopyToClipboard>{item.freeShippingNo}</CopyToClipboard>
              </div>
              <div>
                <span className="label">訂單編號</span> {item.orderId}
              </div>
              <div>
                <span className="label">免運金額</span> {item.shippingCost}
              </div>
              <div>
                <span className="label">取得時間</span>{' '}
                {renderDate(item.createDate)}
              </div>
              <div>
                <span className="label">使用時間</span>{' '}
                {renderDate(item.usedDate)}
              </div>
            </MobileItem>
          ))}
          <Pagination
            onChange={(pageNumber, pageSize) => {
              setPage(pageNumber);
              setReq({ ...req, pageNumber, pageSize });
            }}
            page={page}
            totalCount={freeshippingTicketLogs?.totalCount || 0}
            alignCenter={true}
          />
        </MobileList>
      </>
    );
  }
}
