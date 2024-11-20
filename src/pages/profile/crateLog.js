import { useSelector, dataStore } from '@app/store';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Table, Modal, Select, InputNumber, message, Carousel } from 'antd';
import { DEFAULT_PAGINATION } from '@app/utils/constants';
import { getDefaultDateRange, formatDate, renderDate } from '@app/utils/date';
import { Content } from './index';
import {
  Container,
  RangePicker,
  ButtonContainer,
  MobileList,
  MobileItem,
} from './tabStyle';
import img from '@app/static/crateLog';
import { Button } from '../commodity/index';
import Pagination from './mobilePagination';
const { Column } = Table;
const { Option } = Select;

const InfoContainer = styled.div`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  padding: 20px;
  background: #f7f7f7;
  border-radius: ${(p) => p.theme.borderRadius.memberInfo};
  ${(p) => p.mb20 && `margin-bottom: 20px;`}
  @media (max-width: 768px) {
    background: ${(p) => p.theme.mobile.color.descBg};
  }
`;

const InfoItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  font-size: 1.25rem;
  font-weight: 700;
  img {
    width: 50px;
    height: 50px;
  }
  span {
    font-size: 0.8rem;
  }
  * + * {
    margin-top: 2px;
  }
`;

const CrateModal = styled(Modal)`
  .ant-modal-content {
    border-radius: 20px;
  }
  .ant-modal-title {
    font-size: 20px;
    line-height: 28px;
    font-weight: 600;
    text-align: center;
  }
  .ant-modal-close {
    display: none;
  }
`;

export default function CrateLog() {
  const currentCrateLogs = useSelector(() => dataStore.currentCrateLogs);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isOpenCrateModalVisible, setIsOpenCrateModalVisible] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [crateAmount, setCrateAmount] = useState(1);
  const [openSuccessMessage, setOpenSuccessMessage] = useState(null);
  const [openSuccessMessage2, setOpenSuccessMessage2] = useState(null);
  const crateLogs = useSelector(() => dataStore.crateLogs);
  const dateRange = getDefaultDateRange();
  const [page, setPage] = useState(DEFAULT_PAGINATION.pageNumber);

  const closeOpenCrateModal = () => {
    setIsOpenCrateModalVisible(false);
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedLevel(null);
    setCrateAmount(1);
  };

  const [req, setReq] = useState({
    ...DEFAULT_PAGINATION,
    start: formatDate(dateRange[0]),
    end: formatDate(dateRange[1]),
  });

  // 等级与整数的映射
  const levelToInt = {
    Level1: 1,
    Level2: 2,
    Level3: 3,
    Level4: 4,
    Level5: 5,
    Level6: 6,
  };

  const onOpenCrate = async () => {
    if (!selectedLevel) {
      message.error('請選擇寶箱等級');
      return;
    }
    if (!crateAmount || crateAmount <= 0 || crateAmount > 15) {
      message.error('請輸入有效的寶箱數量（1-15）');
      return;
    }

    const body = {
      crate: {
        [levelToInt[selectedLevel]]: crateAmount,
      },
    };

    await dataStore.openCrate(body);
    setIsModalVisible(false);
    await dataStore.getCrateLogs(req);
  };

  useEffect(() => {
    dataStore.getCrateLogs(req);
  }, [req]);

  const data = crateLogs?.data || {};
  const awards = currentCrateLogs?.data || {};

  const moreAwards = ({ awards }) => {
    return (
      <div>
        <div
          style={{
            backgroundColor: '#F2F2F2',
            padding: '20px',
            paddingLeft: '24px',
            borderRadius: '10px',
            marginTop: '24px',
          }}
        >
          <div
            style={{
              fontSize: '20px',
              fontWeight: '700',
              color: '#333333',
              marginBottom: '16px',
            }}
          >
            開箱獎勵明細
          </div>
          {awards.map((award, index) => (
            <div key={index}>
              ・開啟{award.crateName}寶箱，獲得 {award.getAmount} 獎勵
            </div>
          ))}
          <div
            style={{ fontSize: '16px', color: '#000000', marginTop: '16px' }}
          >
            總計獲得：{awards.reduce((acc, curr) => acc + curr.getAmount, 0)}{' '}
            獎勵
          </div>
        </div>
      </div>
    );
  };

  useEffect(() => {
    if (awards?.length) {
      setIsOpenCrateModalVisible(true);
      const rewardNums = awards.reduce((acc, curr) => acc + curr.getAmount, 0);
      const message = (
        <div style={{ textAlign: 'center' }}>
          恭喜！
          <br />
          您已成功開啟「{awards[0].crateName}寶箱*{awards.length}」，獲得 
          <span style={{ fontSize: '20px', lineHeight: '28px' }}>
            {rewardNums}
          </span>{' '}
          個獎勵！
          <br />
          記得常來開箱，累積更多獎勵！
        </div>
      );
      setOpenSuccessMessage(message);

      if (awards?.length) {
        setOpenSuccessMessage2(moreAwards({ awards }));
      }
    }
  }, [awards]);

  const levels = ['Level1', 'Level2', 'Level3', 'Level4', 'Level5', 'Level6'];
  const levelLabels = {
    Level1: '塑膠',
    Level2: '黃銅',
    Level3: '白銀',
    Level4: '白金',
    Level5: '黃金',
    Level6: '神秘',
  };

  return (
    <Content>
      <Container>
        <InfoContainer mb20={true}>
          {levels.map((level, i) => (
            <InfoItem key={level}>
              <img src={img.keys[i + 1]} alt={levelLabels[level]} />
              <span>{data.keyCount?.[level] || 0}</span>
              <span>{levelLabels[level]}</span>
            </InfoItem>
          ))}
        </InfoContainer>
        <InfoContainer>
          {levels.map((level, i) => (
            <InfoItem key={level}>
              <img src={img.crates[i + 1]} alt={levelLabels[level]} />
              <span>{data.crateCount?.[level] || 0}</span>
              <span>{levelLabels[level]}</span>
            </InfoItem>
          ))}
        </InfoContainer>
        <CrateModal
          bodyStyle={{ borderRadius: '20px' }}
          style={{ borderRadius: '20px' }}
          title="開啟寶箱結果"
          visible={isOpenCrateModalVisible}
          onOk={closeOpenCrateModal}
          onCancel={closeOpenCrateModal}
          okText="關閉"
          footer={
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <div style={{ width: '120px', textAlign: 'center' }}>
                <Button
                  width="120px"
                  textAlign="center"
                  type="primary"
                  onClick={closeOpenCrateModal}
                >
                  關閉
                </Button>
              </div>
            </div>
          }
        >
          <div style={{ marginBottom: '16px' }}>
            {openSuccessMessage}
            {openSuccessMessage2}
          </div>
        </CrateModal>
        <ButtonContainer>
          <Button onClick={showModal}>開啟寶箱</Button>
        </ButtonContainer>
        <Modal
          title="開啟寶箱"
          visible={isModalVisible}
          onOk={onOpenCrate}
          onCancel={handleCancel}
          okText="確認"
          cancelText="取消"
        >
          <div style={{ marginBottom: '16px' }}>
            <span>選擇寶箱等級：</span>
            <Select
              style={{ width: '100%' }}
              placeholder="請選擇寶箱等級"
              value={selectedLevel}
              onChange={(value) => setSelectedLevel(value)}
            >
              {levels.map((level, index) => (
                <Option key={index} value={level}>
                  {levelLabels[level]}
                </Option>
              ))}
            </Select>
          </div>
          <div>
            <span>輸入開啟數量：</span>
            <InputNumber
              min={1}
              max={15}
              value={crateAmount}
              onChange={(value) => setCrateAmount(value)}
              style={{ width: '100%' }}
            />
          </div>
        </Modal>
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
          dataSource={data.crates}
          pagination={{
            current: page,
            total: crateLogs?.totalCount || 0,
            defaultPageSize: DEFAULT_PAGINATION.pageSize,
            showSizeChanger: true,
            onChange: (pageNumber, pageSize) => {
              setPage(pageNumber);
              setReq({ ...req, pageNumber, pageSize });
            },
          }}
          rowKey="id"
        >
          <Column title="寶箱等級" dataIndex="crateName" key="crateName" />
          <Column title="獲得獎勵" dataIndex="getAmount" key="getAmount" />
          <Column
            title="獲得時間"
            key="createDate"
            dataIndex="createDate"
            render={renderDate}
          />
          <Column
            title="開箱時間"
            key="usedDate"
            dataIndex="usedDate"
            render={renderDate}
          />
        </Table>
        <MobileList>
          {data.crates?.map((item, index) => (
            <MobileItem key={index}>
              <div className="title">
                <span className="label">寶箱等級</span> {item.crateName}
              </div>
              <div>
                <span className="label">獲得獎勵</span> {item.getAmount}
              </div>
              <div>
                <span className="label">獲得時間</span>{' '}
                {renderDate(item.createDate)}
              </div>
              <div>
                <span className="label">開箱時間</span>{' '}
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
            totalCount={crateLogs?.totalCount || 0}
            alignCenter={true}
          />
        </MobileList>
      </>
    );
  }
}
