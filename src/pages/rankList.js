import styled from 'styled-components';
import Layout from '@app/shared/layout';
import { useEffect, useState } from 'react';
import { useSelector, dataStore } from '@app/store';
import { Table, Tabs,Avatar  } from 'antd';
import othersImg from '@app/static/rankList/e.png';
import { PRIZE_LEVEL } from '@app/utils/constants';
import dayjs from 'dayjs';
import { useNavigate, generatePath } from 'react-router-dom';
import paths from '@app/utils/paths';

const { Column } = Table;
const { TabPane } = Tabs;

const Content = styled.div`
  overflow-y: auto;
  .ant-table-wrapper {
    min-width: 500px;
  }
`;

const Customer = styled.div`
  font-size: 1.25rem;
  display: flex;
  flex-direction: row;
  img {
    width: 3.215rem;
    height: 3.215rem;
    max-width: 50px;
    margin-right: 15px;
    cursor: pointer;
  }
  div {
    display: flex;
    align-items: center;
  }
`;

const PrizeName = styled.div`
  display: flex;
  align-items: center;
  
  span + span {
    margin-left: 5px;
  }
`;

const PrizeIcon = styled.img`
  width: 48px;
  height: 48px;
  margin-right: 8px;
  object-fit: cover;
  border-radius: 4px;
`;

export default function RankingList() {
  const [currentView, setCurrentView] = useState('ranking');
  const rankingList = useSelector(() => dataStore.rankingList);
  const taskList = useSelector(() => dataStore.taskList);
  const goto = useNavigate();

  useEffect(() => {
    if (currentView === 'ranking') {
      dataStore.getRankingList();
    } else if (currentView === 'task') {
      dataStore.getTaskList();
    }
  }, [currentView]);

  return (
    <Layout>
      <Tabs defaultActiveKey="ranking" onChange={handleTabChange}>
        <TabPane tab="排名列表" key="ranking">
          {renderRankingTable()}
        </TabPane>
        <TabPane tab="任務列表" key="task">
          {renderTaskTable()}
        </TabPane>
      </Tabs>
    </Layout>
  );

  function handleTabChange(key) {
    setCurrentView(key);
  }

  function renderRankingTable() {
    return (
      <Content>
        {!!rankingList && (
          <Table dataSource={rankingList} pagination={false} rowKey="id">
            <Column title="暱稱" key="nickname" render={renderNickname} />
            <Column
              title="時間"
              dataIndex="drawDate"
              key="drawDate"
              render={(d) => dayjs(d).format('YYYY/MM/DD HH:mm')}
            />
            <Column title="獲得賞品" key="prizeName" render={renderPrize} />
          </Table>
        )}
      </Content>
    );
  }

  function renderAvatar({ customerName, headshotUrl }) {
    const firstChar = customerName ? customerName.charAt(0) : '';
    return (
      <Avatar
        src={headshotUrl}
        alt={customerName}
        style={{ backgroundColor: '#87d068' }} // 可以根據需求調整背景色
      >
        {!headshotUrl && firstChar}
      </Avatar>
    );
  }

  function renderTaskTable() {
    return (
      <Content>
        {!!taskList && (
          <Table dataSource={taskList} pagination={false} rowKey="id">
            <Column
              title="頭像"
              key="avatar"
              render={(text, record) => renderAvatar(record)}
              width={60} // 設置列寬，根據需求調整
            />
            <Column title="暱稱" dataIndex="customerName" key="customerName" />
            <Column
              title="完成時間"
              dataIndex="completingTime"
              key="completingTime"
              render={(d) => dayjs(d).format('YYYY/MM/DD HH:mm')}
            />
            <Column title="任務名稱" dataIndex="taskTitle" key="taskTitle" />
            <Column title="獎勵" dataIndex="award" key="award" />
          </Table>
        )}
      </Content>
    );
  }

  function renderPrize({ prizeName, prizeLevelView, imgUrl }) {
    return (
      <PrizeName>
        <PrizeIcon src={imgUrl} alt="Prize Icon" />
        獲得 <span>{prizeLevelView}</span>
        <span>{prizeName}</span>
      </PrizeName>
    );
  }

  function renderNickname({ prizeLevel, customerName, commodityId }) {
    const src = PRIZE_LEVEL[prizeLevel]?.rankImg || othersImg;
    const path = generatePath(paths.commodity, { commodityId });
    return (
      <Customer>
        <img src={src} onClick={() => goto(path)} alt="Prize Level" />
        <div>{customerName}</div>
      </Customer>
    );
  }
}
