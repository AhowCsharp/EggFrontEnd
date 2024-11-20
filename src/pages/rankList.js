import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Layout from '@app/shared/layout'
import { useSelector, dataStore } from '@app/store'
import { Table, Tabs, Avatar } from 'antd'
// import othersImg from '@app/static/rankList/e.png';
import { PRIZE_LEVEL } from '@app/utils/constants'
import dayjs from 'dayjs'
import { useNavigate, generatePath } from 'react-router-dom'
import paths from '@app/utils/paths'
import { MobileItem, MobileList } from '@app/pages/profile/tabStyle'

const { Column } = Table

// 創建自定義的 StyledTabs 組件
const StyledTabs = styled(Tabs)`
  /* 桌面版：標籤文字為黑色 */
  .ant-tabs-nav .ant-tabs-tab {
    color: black;
  }

  /* 桌面版：活動標籤文字顏色 */
  .ant-tabs-nav .ant-tabs-tab-active .ant-tabs-tab-btn {
    color: black;
  }

  /* 桌面版：標籤下方的活動線條顏色 */
  .ant-tabs-nav .ant-tabs-tab-active::before {
    background-color: black;
  }

  /* 移動設備：標籤文字為白色 */
  @media (max-width: 768px) {
    .ant-tabs-nav .ant-tabs-tab {
      color: white;
    }

    /* 移動設備：活動標籤文字顏色 */
    .ant-tabs-nav .ant-tabs-tab-active .ant-tabs-tab-btn {
      color: white;
    }

    /* 移動設備：標籤下方的活動線條顏色 */
    .ant-tabs-nav .ant-tabs-tab-active::before {
      background-color: white;
    }
  }

  /* 可選：調整標籤的字體大小或其他樣式 */
  .ant-tabs-nav .ant-tabs-tab .ant-tabs-tab-btn {
    font-size: 1rem;
  }

  /* 可選：調整活動標籤的下劃線寬度 */
  .ant-tabs-nav .ant-tabs-tab-active::before {
    height: 2px;
  }
`

// 其他樣式組件
const Content = styled.div`
  overflow-y: auto;
  .ant-table-wrapper {
    min-width: 500px;
  }
`

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
`

const PrizeName = styled.div`
  display: flex;
  align-items: center;

  span + span {
    margin-left: 5px;
  }

  /* 添加懸停效果 */
  &:hover {
    background-color: rgba(255, 255, 255, 0.1); /* 半透明白色背景 */
    border-radius: 4px; /* 圓角 */
  }

  /* 保持可點擊性 */
  cursor: pointer;
`

const PrizeIcon = styled.img`
  width: 48px;
  height: 48px;
  margin-right: 20px;
  object-fit: cover;
  border-radius: 4px;
  cursor: pointer; /* 添加指針光標 */

  /* 可選：添加懸停效果 */
  &:hover {
    transform: scale(1.1);
    transition: transform 0.2s;
  }
`

export default function RankingList() {
  const [currentView, setCurrentView] = useState('ranking')
  const rankingList = useSelector(() => dataStore.rankingList)
  const taskList = useSelector(() => dataStore.taskList)
  const navigate = useNavigate()

  useEffect(() => {
    if (currentView === 'ranking') {
      dataStore.getRankingList()
    } else if (currentView === 'task') {
      dataStore.getTaskList()
    }
  }, [currentView])

  // 定義 Tabs 的 items
  const tabItems = [
    {
      label: '排名列表',
      key: 'ranking',
      children: renderRankingTable(),
    },
    {
      label: '任務列表',
      key: 'task',
      children: renderTaskTable(),
    },
  ]

  return (
    <Layout>
      {/* 使用 StyledTabs 並傳遞 items 屬性 */}
      <StyledTabs
        activeKey={currentView}
        onChange={handleTabChange}
        items={tabItems}
      />
    </Layout>
  )

  function handleTabChange(key) {
    setCurrentView(key)
  }

  function renderRankingTable() {
    return (
      <Content>
        {!!rankingList && (
          <>
            <Table
              className="hide-in-mobile"
              dataSource={rankingList}
              pagination={false}
              rowKey="id"
            >
              <Column title="暱稱" key="nickname" render={renderNickname} />
              <Column
                title="時間"
                dataIndex="drawDate"
                key="drawDate"
                render={(d) => dayjs(d).format('YYYY/MM/DD HH:mm')}
              />
              <Column title="獲得賞品" key="prizeName" render={renderPrize} />
            </Table>
            <MobileList>
              {rankingList.map((rank) => (
                <MobileItem key={rank.id}>
                  <div className="title vertical">
                    <div>{renderNickname(rank)}</div>
                  </div>
                  <div>
                    <span className="label">時間</span>
                    {dayjs(rank.drawDate).format('YYYY/MM/DD HH:mm')}
                  </div>
                  <div className="prize">
                    <span className="label">獲得賞品</span>
                    <span className="content">{renderPrize(rank.prizeName, rank)}</span>
                  </div>
                </MobileItem>
              ))}
            </MobileList>
          </>
        )}
      </Content>
    )
  }

  function renderTaskTable() {
    return (
      <Content>
        {!!taskList && (
          <>
            <Table
              className="hide-in-mobile"
              dataSource={taskList}
              pagination={false}
              rowKey="id"
            >
              <Column
                title="頭像"
                key="avatar"
                render={(text, record) => renderAvatar(record)}
                width={60} // 設置列寬，根據需求調整
              />
              <Column
                title="暱稱"
                dataIndex="customerName"
                key="customerName"
              />
              <Column
                title="完成時間"
                dataIndex="completingTime"
                key="completingTime"
                render={(d) => dayjs(d).format('YYYY/MM/DD HH:mm')}
              />
              <Column title="任務名稱" dataIndex="taskTitle" key="taskTitle" />
              <Column title="獎勵" dataIndex="award" key="award" />
            </Table>
            <MobileList>
              {taskList.map((record) => (
                <MobileItem key={record.id}>
                  <div className="title">
                    <div>
                      <span className="mr10">{renderAvatar(record)}</span>
                      <span>{record.customerName}</span>
                    </div>
                  </div>
                  <div>
                    <span className="label">完成時間</span>
                    {dayjs(record.completingTime).format('YYYY/MM/DD HH:mm')}
                  </div>
                  <div>
                    <span className="label">任務名稱</span> {record.taskTitle}
                  </div>
                  <div>
                    <span className="label">獎勵</span> {record.award}
                  </div>
                </MobileItem>
              ))}
            </MobileList>
          </>
        )}
      </Content>
    )
  }

  function renderAvatar({ customerName, headshotUrl }) {
    const firstChar = customerName ? customerName.charAt(0) : ''
    return (
      <Avatar
        src={headshotUrl}
        alt={customerName}
        style={{ backgroundColor: '#87d068' }} // 可以根據需求調整背景色
      >
        {!headshotUrl && firstChar}
      </Avatar>
    )
  }

  function renderPrize(text, record) {
    const handleClick = (e) => {
      e.stopPropagation() // 防止事件冒泡到行的 onClick 事件
      const commodityId = record.commodityId // 假設 record 中有 commodityId
      if (commodityId) {
        const path = generatePath(paths.commodity, { commodityId })
        navigate(path)
      } else {
        console.log('Commodity ID is missing in the record:', record)
      }
    }

    return (
      <PrizeName onClick={handleClick}>
        <PrizeIcon src={record.imgUrl} alt="Prize Icon" />
        獲得 <span>{record.prizeLevelView}</span>
        <span>{record.prizeName}</span>
      </PrizeName>
    )
  }

  function renderNickname({ prizeLevel, customerName, commodityId }) {
    const src = PRIZE_LEVEL[prizeLevel]?.rankImg
    return (
      <Customer>
        <img
          src={src}
          alt="Prize Level"
          onClick={() => {
            if (commodityId) {
              const path = generatePath(paths.commodity, { commodityId })
              navigate(path)
            } else {
              console.log('Commodity ID is missing in the record:', {
                prizeLevel,
                customerName,
                commodityId,
              })
            }
          }}
        />
        <div>{customerName}</div>
      </Customer>
    )
  }
}
