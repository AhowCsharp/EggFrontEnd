import { useSelector, dataStore } from '@app/store'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Table, Modal, Select, InputNumber, message } from 'antd'
import { DEFAULT_PAGINATION } from '@app/utils/constants'
import { getDefaultDateRange, formatDate, renderDate } from '@app/utils/date'
import { Content } from './index'
import { Container, RangePicker } from './tabStyle'
import img from '@app/static/crateLog'
import { Button } from '../commodity/index'
const { Column } = Table

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

export default function CrateLog() {

  const openCrateSuccess = useSelector(() => dataStore.openCrateSuccess)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [isOpenCrateModalVisible, setIsOpenCrateModalVisible] = useState(false)
  const [selectedLevel, setSelectedLevel] = useState(null)
  const [crateAmount, setCrateAmount] = useState(1)
  const [openSuccessMessage, setOpenSuccessMessage] = useState(null)
  const crateLogs = useSelector(() => dataStore.crateLogs)
  const dateRange = getDefaultDateRange()

  const closeOpenCrateModal = () => {
    setIsOpenCrateModalVisible(false)
  }

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

  const onOpenCrate = async () => {
    if (!selectedLevel) {
      message.error('請選擇寶箱等級')
      return
    }
    if (!crateAmount || crateAmount <= 0) {
      message.error('請輸入有效的寶箱數量')
      return
    }

    const body = {
      crate: {
        [selectedLevel]: crateAmount,
      },
    }
    await dataStore.openCrate(body)
    setIsModalVisible(false)
    await dataStore.getCrateLogs(req)
  }

  useEffect(() => {
    dataStore.getCrateLogs(req)
  }, [req])

  const data = crateLogs?.data || {}


  useEffect(() => {
    if (openCrateSuccess && Object.keys(data).length !== 0) {
      setIsOpenCrateModalVisible(true)
      const message = `恭喜！您已成功開啟「白銀寶箱*1」，獲得 24 個獎勵！記得常來開箱，累積更多獎勵！`
      setOpenSuccessMessage(message)
    }
  }, [openCrateSuccess])

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
          <CrateButton onClick={showModal}>
            開啟寶箱
          </CrateButton>
        </div>
        <Modal
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
            
          </div>
        </Modal>
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
                <Option key={index} value={index + 1}>
                  {levelLabels[level]}
                </Option>
              ))}
            </Select>
          </div>
          <div>
            <span>輸入開啟數量：</span>
            <InputNumber
              min={1}
              max={data.crateCount?.[selectedLevel] || 1}
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
