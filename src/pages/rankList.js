import styled from 'styled-components'
import Layout from '@app/shared/layout'
import { useEffect } from 'react'
import { useSelector, dataStore } from '@app/store'
import { Table } from 'antd'
import othersImg from '@app/static/rankList/e.png'
import { PRIZE_LEVEL } from '@app/utils/constants'
import dayjs from 'dayjs'
import { useNavigate, generatePath } from 'react-router-dom'
import paths from '@app/utils/paths'

const { Column } = Table

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
  span + span {
    margin-left: 5px;
  }
`

export default function rankingList() {
  const rankingList = useSelector(() => dataStore.rankingList)
  const goto = useNavigate()

  useEffect(() => {
    dataStore.getRankingList()
  }, [])

  return (
    <Layout>
      <Content>
        {!!rankingList && (
          <Table dataSource={rankingList} pagination={false}>
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
    </Layout>
  )
  function renderPrize({ prizeName, prizeLevelView }) {
    return (
      <PrizeName>
        獲得 <span>{prizeLevelView}</span>
        <span>{prizeName}</span>
      </PrizeName>
    )
  }
  function renderNickname({ prizeLevel, customerName, commodityId }) {
    const src = PRIZE_LEVEL[prizeLevel]?.rankImg || othersImg
    const path = generatePath(paths.commodity, { commodityId })
    return (
      <Customer>
        <img src={src} onClick={() => goto(path)} />
        <div>{customerName}</div>
      </Customer>
    )
  }
}
