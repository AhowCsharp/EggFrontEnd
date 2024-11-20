import { useSelector, dataStore } from '@app/store';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Table } from 'antd';
import {
  DEFAULT_PAGINATION,
  SHIP_STATUS_LOCALE,
  SHIP_STATUS_OPTIONS,
  SHIP_STATUS,
} from '@app/utils/constants';
import { getDefaultDateRange, formatDate, renderDate } from '@app/utils/date';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Content } from './index';
import {
  Container,
  RangePicker,
  Select,
  MobileItem,
  MobileList,
} from './tabStyle';
import Pagination from './mobilePagination';

const { Column } = Table;

// 新增一个 HeaderSection 组件，用于包含 Info 和过滤器
const HeaderSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

// 修改 Info 组件，使其内容居中并美化
const Info = styled.div`
  text-align: center;
  margin: 20px auto;
  max-width: 600px;
  font-size: 16px;
  color: #333;

  div {
    line-height: 1.5;
    margin-bottom: 5px;
  }
  @media (max-width: 768px) {
    color: ${(p) => p.theme.mobile.color.font};
  }
`;

const CollapseIcon = styled.div`
  cursor: pointer;
  width: 24px;
  height: 24px;
  border-radius: 8px;
  border: 1px solid ${(p) => p.theme.mobile.color.font};
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function ShipLog() {
  const shipLog = useSelector(() => dataStore.shipLog);
  const dateRange = getDefaultDateRange();
  const [collapseByIndex, setCollapseByIndex] = useState({});
  const [page, setPage] = useState(DEFAULT_PAGINATION.pageNumber);
  const [req, setReq] = useState({
    ...DEFAULT_PAGINATION,
    start: formatDate(dateRange[0]),
    end: formatDate(dateRange[1]),
    status: SHIP_STATUS.PENDING,
  });

  useEffect(() => {
    dataStore.getShipLog(req);
  }, [req]);

  const data = shipLog?.data || [];
  return (
    <Content>
      <Container>
        <Info>
          <div>可以追蹤我們官方 LINE</div>
          <div>當配送狀態有異動時，會第一時間通知您！</div>
          <div>還有許多潮潮功能，歡迎體驗～</div>
        </Info>
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
          options={SHIP_STATUS_OPTIONS}
          onChange={(value) => setReq({ ...req, status: value })}
        />
        {renderTable()}
      </Container>
    </Content>
  );
  function onCollapse(index) {
    return () =>
      setCollapseByIndex({
        ...collapseByIndex,
        [index]: !collapseByIndex[index],
      });
  }
  function renderTable() {
    return (
      <>
        <Table
          className="hide-in-mobile"
          dataSource={data}
          pagination={{
            current: page,
            total: shipLog?.totalCount || 0,
            defaultPageSize: DEFAULT_PAGINATION.pageSize,
            showSizeChanger: true,
            onChange: (pageNumber, pageSize) => {
              setPage(pageNumber);
              setReq({ ...req, pageNumber, pageSize });
            },
          }}
          expandable={{
            expandedRowRender: ({ shippingDetails }) => (
              <DetailTable detail={shippingDetails} />
            ),
          }}
        >
          <Column title="訂單編號" dataIndex="orderNo" key="orderNo" />
          <Column
            title="配送申請日期"
            dataIndex="orderDate"
            key="orderDate"
            render={renderDate}
          />
          <Column title="運費" dataIndex="orderShipFee" key="orderShipFee" />
          <Column
            title="物流編號"
            dataIndex="logistiscsNO"
            key="logistiscsNO"
          />
          <Column
            title="配送日期"
            key="shipDate"
            dataIndex="shipDate"
            render={renderDate}
          />
          <Column
            title="廠商備註"
            dataIndex="manufacturerMemo"
            key="manufacturerMemo"
          />
          <Column
            title="訂單狀態"
            dataIndex="status"
            key="status"
            render={(d) => SHIP_STATUS_LOCALE[d]}
          />
        </Table>
        <MobileList>
          {data.map((item, index) => (
            <MobileItem key={index}>
              <div className="title">
                <span className="label">訂單編號</span> {item.orderNo}
              </div>
              <div>
                <span className="label">配送申請日期</span>
                {renderDate(item.orderDate)}
              </div>
              <div>
                <span className="label">運費</span> {item.orderShipFee}
              </div>
              <div>
                <span className="label">物流編號</span> {item.logistiscsNO}
              </div>
              <div>
                <span className="label">配送日期</span>
                {renderDate(item.shipDate)}
              </div>
              <div>
                <span className="label">廠商備註</span> {item.manufacturerMemo}
              </div>
              <div>
                <span className="label">訂單狀態</span>
                {SHIP_STATUS_LOCALE[item.status]}
              </div>
              {!!collapseByIndex[index] && (
                <MobileList>
                  {item.shippingDetails.map((detail, i) => (
                    <MobileItem key={i}>
                      <div className="title">
                        <span className="label">獎品</span>
                        {detail.prizeName}
                      </div>
                      <div>
                        <span className="label">數量</span>
                        {detail.amount}
                      </div>
                    </MobileItem>
                  ))}
                </MobileList>
              )}
              <div>
                <div></div>
                <CollapseIcon onClick={onCollapse(index)}>
                  <FontAwesomeIcon
                    icon={collapseByIndex[index] ? faMinus : faPlus}
                  />
                </CollapseIcon>
              </div>
            </MobileItem>
          ))}
          <Pagination
            onChange={(pageNumber, pageSize) => {
              setPage(pageNumber);
              setReq({ ...req, pageNumber, pageSize });
            }}
            page={page}
            totalCount={shipLog?.totalCount || 0}
            alignCenter={true}
          />
        </MobileList>
      </>
    );
  }
}

function DetailTable({ detail }) {
  return (
    <Table dataSource={detail} pagination={false} size="small">
      <Column title="獎品" dataIndex="prizeName" key="prizeName" />
      <Column title="數量" dataIndex="amount" key="amount" />
    </Table>
  );
}
