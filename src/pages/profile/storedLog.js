import { useSelector, dataStore } from '@app/store';
import { useEffect, useState } from 'react';
import { Table, Radio } from 'antd';
import styled from 'styled-components';
import { DEFAULT_PAGINATION } from '@app/utils/constants';
import { getDefaultDateRange, formatDate, renderDate } from '@app/utils/date';
import { Content } from './index';
import { Container, RangePicker, MobileList, MobileItem } from './tabStyle';

const { Column } = Table;

// 自訂樣式的 Radio 組件
const StyledRadioGroup = styled(Radio.Group)`
  color: black;

  @media (max-width: 768px) {
    display: flex;
    justify-content: center;
    color: white;
  }
`;

const StyledRadio = styled(Radio)`
  color: inherit;

  .ant-radio-inner {
    width: 20px;
    height: 20px;
    border-width: 2px;
  }

  .ant-radio-inner::after {
    width: 12px;
    height: 12px;
    background-color: #1890ff;
  }

  .ant-radio-checked .ant-radio-inner {
    border-color: #1890ff;
  }

  &:hover .ant-radio-inner {
    border-color: #40a9ff;
  }
`;

export default function StoredLog() {
  const storedLogs = useSelector(() => dataStore.storedLogs);
  const dateRange = getDefaultDateRange();

  const [status, setStatus] = useState(null);

  const [req, setReq] = useState({
    ...DEFAULT_PAGINATION,
    start: formatDate(dateRange[0]),
    end: formatDate(dateRange[1]),
    isSuccessful: null, 
  });

  useEffect(() => {
    dataStore.getStoredLogs(req);
  }, [req]);

  const data = storedLogs?.data || [];
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
        <StyledRadioGroup
          onChange={(e) => {
            const selectedStatus = e.target.value;
            setStatus(selectedStatus);
            setReq({
              ...req,
              isSuccessful: selectedStatus !== null ? selectedStatus : null,
              pageNumber: DEFAULT_PAGINATION.pageNumber, // 重置為第一頁（可選）
            });
          }}
          value={status}
          style={{ marginBottom: '20px' }}
        >
          <StyledRadio value={null}>全部</StyledRadio>
          <StyledRadio value={true}>已成功</StyledRadio>
          <StyledRadio value={false}>未成功</StyledRadio>
        </StyledRadioGroup>
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
            total: storedLogs?.totalCount || 0,
            defaultPageSize: DEFAULT_PAGINATION.pageSize,
            showSizeChanger: true,
            onChange: (pageNumber, pageSize) => {
              setReq({ ...req, pageNumber, pageSize });
            },
          }}
        >
          <Column title="儲值編號" dataIndex="recTradeId" key="recTradeId" />
          <Column title="金額" dataIndex="amount" key="amount" />
          <Column
            title="購買時間"
            key="buyDate"
            dataIndex="buyDate"
            render={renderDate}
          />
          <Column
            title="交易狀態"
            dataIndex="notifyCheckStatus"
            key="notifyCheckStatus"
          />
        </Table>
        <MobileList>
          {data.map((item, index) => (
            <MobileItem key={index}>
              <div className="title">
                <span className="label">儲值編號</span> {item.recTradeId}
              </div>
              <div>
                <span className="label">金額</span> {item.amount}
              </div>
              <div>
                <span className="label">購買時間</span> {item.buyDate}
              </div>
              <div>
                <span className="label">交易狀態</span> {item.notifyCheckStatus}
              </div>
            </MobileItem>
          ))}
        </MobileList>
      </>
    );
  }
}
