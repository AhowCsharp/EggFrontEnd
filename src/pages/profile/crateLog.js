import { useSelector, dataStore } from '@app/store'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Table, Modal, Select, InputNumber, message, Carousel } from 'antd'
import { DEFAULT_PAGINATION } from '@app/utils/constants'
import { getDefaultDateRange, formatDate, renderDate } from '@app/utils/date'
import { Content } from './index'
import { Container, RangePicker } from './tabStyle'
import img from '@app/static/crateLog'
import coinImageSrc from '@app/static/coin-welfare.svg' // 引入金币图标

const { Column } = Table
const { Option } = Select

const InfoContainer = styled.div`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  padding: 20px;
  background: #f7f7f7;
  border-radius: ${(p) => p.theme.borderRadius.memberInfo};
  margin: 0 0 20px;
`

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
`

// 定义 CrateButton，设置黑色背景
const CrateButton = styled.div`
  background-color: #000; /* 黑色背景 */
  color: #fff; /* 白色文字 */
  padding: 10px 20px; /* 内边距 */
  border-radius: 5px; /* 圆角 */
  text-align: center; /* 文字居中 */
  cursor: pointer; /* 鼠标指针 */
  font-weight: bold; /* 粗体字 */
  display: inline-block; /* 让按钮可以设置宽高 */
  transition: background-color 0.3s, transform 0.2s; /* 平滑过渡效果 */

  &:hover {
    background-color: #333; /* 悬停时变深 */
  }

  &:active {
    background-color: #555; /* 点击时更深 */
    transform: scale(0.98); /* 点击时稍微缩小 */
  }
`

export default function CrateLog() {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [selectedLevel, setSelectedLevel] = useState(null)
  const [crateAmount, setCrateAmount] = useState(1)
  const [getAwards, setGetAwards] = useState([])
  const [isRewardModalVisible, setIsRewardModalVisible] = useState(false) // 控制奖励弹窗显示
  const crateLogs = useSelector(() => dataStore.crateLogs)
  const currentCrateLogs = useSelector(() => dataStore.currentCrateLogs)
  const dateRange = getDefaultDateRange()

  const showModal = () => {
    setIsModalVisible(true)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
    setSelectedLevel(null)
    setCrateAmount(1)
  }

  const [req, setReq] = useState({
    ...DEFAULT_PAGINATION,
    start: formatDate(dateRange[0]),
    end: formatDate(dateRange[1]),
  })

  // 等级与整数的映射
  const levelToInt = {
    Level1: 1,
    Level2: 2,
    Level3: 3,
    Level4: 4,
    Level5: 5,
    Level6: 6,
  }

  const onOpenCrate = async () => {
    if (!selectedLevel) {
      message.error('請選擇寶箱等級')
      return
    }
    if (!crateAmount || crateAmount <= 0 || crateAmount > 15) {
      message.error('請輸入有效的寶箱數量（1-15）')
      return
    }

    const body = {
      crate: {
        [levelToInt[selectedLevel]]: crateAmount,
      },
    }

    await dataStore.openCrate(body)
    

      setGetAwards(currentCrateLogs) 
      setIsRewardModalVisible(true) 
    
    await dataStore.getCrateLogs(req)
  }

  useEffect(() => {
    dataStore.getCrateLogs(req)
  }, [req])

  const data = crateLogs?.data || {}
  const awards = currentCrateLogs?.data || {}

  const levels = ['Level1', 'Level2', 'Level3', 'Level4', 'Level5', 'Level6']
  const levelLabels = {
    Level1: '塑膠',
    Level2: '黃銅',
    Level3: '白銀',
    Level4: '白金',
    Level5: '黃金',
    Level6: '神秘',
  }

  return (
    <Content>
      <Container>
        <InfoContainer>
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
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <CrateButton onClick={showModal}>開啟寶箱</CrateButton>
        </div>
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
        {/* 奖励弹窗 */}
        <Modal
          title="開箱獎勵"
          visible={isRewardModalVisible}
          footer={null}
          onCancel={() => setIsRewardModalVisible(false)}
          centered
        >
          <Carousel autoplay>
            {getAwards.map((award, index) => (
              <div key={index} style={{ textAlign: 'center' }}>
                <img
                  src={coinImageSrc}
                  alt="金幣"
                  style={{ width: '100px', height: '100px' }}
                />
                <h2>{award.GetAmount}</h2>
              </div>
            ))}
          </Carousel>
        </Modal>
        <RangePicker
          showTime={{
            format: 'HH:mm',
          }}
          format="YYYY-MM-DD HH:mm"
          defaultValue={dateRange}
          onOk={(value) => {
            setReq({
              ...req,
              start: formatDate(value[0]),
              end: formatDate(value[1]),
            })
          }}
        />
        <Table
          dataSource={data.crates}
          pagination={{
            total: crateLogs?.totalCount || 0,
            defaultPageSize: DEFAULT_PAGINATION.pageSize,
            showSizeChanger: true,
            onChange: (pageNumber, pageSize) => {
              setReq({ ...req, pageNumber, pageSize })
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
      </Container>
    </Content>
  )
}
