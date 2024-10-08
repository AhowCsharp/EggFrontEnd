import styled from 'styled-components'
import Layout from '@app/shared/layout'
import useAuth from '@app/utils/hooks/useAuth'
import paths from '@app/utils/paths'
import { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { PROFILE_TAB } from '@app/utils/constants'
import profileIcon from '@app/static/profile'
import Tickets from './tickets'
import ShipLog from './shipLog'
import ReclaimLog from './reclaimLog'
import PendingPrizes from './pendingPrizes'
import ConsumeLog from './consumeLog'
import Member from './member'
import TopUp from './topUp'
import TopUpResult from './topUpResult'
import FreeshippingTicketLog from './freeshippingTicketLog'
import StoredLog from './storedLog'

const Nav = styled.div`
  width: 180px;
  display: flex;
  padding: 30px 0;
  background: #f5f5f5;
  margin-right: 20px;
  border-radius: 20px;
  flex-direction: column;
  overflow-x: scroll;
  @media (max-width: 768px) {
    flex-direction: row;
    width: 100%;
    margin-right: 0;
    margin-bottom: 20px;
    padding: 0;
    border-radius: ${(p) => p.theme.borderRadius.memberInfo};
    justify-content: space-around;
  }
`

const NavItem = styled.div`
  padding: 10px;
  cursor: pointer;
  font-weight: 700;
  display: flex;
  align-items: center;
  text-align: center;
  img {
    width: 25px;
    height: 25px;
    margin-right: 10px;
  }
  &:hover {
    background: #f3e7d5;
  }
  ${(p) => p.active && `background: #f3e7d5;`}
  @media (max-width: 768px) {
    flex-direction: column;
    padding: 5px;
    border-radius: ${(p) => p.theme.borderRadius.memberInfo};
    img {
      margin-right: 0;
      margin-bottom: 10px;
    }
  }
`

const Container = styled.div`
  display: flex;
  flex-direction: row;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`

export const Content = styled.div`
  display: flex;
  flex: 1;
  overflow-y: auto;
  th,
  td {
    padding: 8px !important;
    min-width: 50px;
  }
`

const navList = [
  { title: '會員管理', src: profileIcon.member, type: PROFILE_TAB.MEMBER },
  { title: '金幣儲值', src: profileIcon.topUp, type: PROFILE_TAB.TOP_UP },
  {
    title: '儲值紀錄',
    src: profileIcon.consumeLog,
    type: PROFILE_TAB.STORED_LOG,
  },
  {
    title: '消費紀錄',
    src: profileIcon.consumeLog,
    type: PROFILE_TAB.CONSUME_LOG,
  },
  {
    title: '待處理獎品列表',
    src: profileIcon.pendingPrizes,
    type: PROFILE_TAB.PENDING_PRIZES,
  },
  {
    title: '回收紀錄',
    src: profileIcon.reclaimLog,
    type: PROFILE_TAB.RECLAIM_LOG,
  },
  { title: '配送紀錄', src: profileIcon.shipLog, type: PROFILE_TAB.SHIP_LOG },
  {
    title: '免運券紀錄',
    src: profileIcon.reclaimLog,
    type: PROFILE_TAB.FREE_SHIPPING,
  },
  { title: '抽獎券查詢', src: profileIcon.tickets, type: PROFILE_TAB.TICKETS },
]

export default function Profile() {
  useAuth()
  const goto = useNavigate()
  const [searchParams] = useSearchParams()
  const type = searchParams.get('type')
  const result = searchParams.get('result')
  const [activeType, setActiveType] = useState(type || 'member')

  useEffect(() => {
    setActiveType(type)
  }, [type])

  return (
    <Layout>
      <Container>
        <Nav>
          {navList.map((n, index) => (
            <NavItem
              key={index}
              active={activeType === n.type}
              onClick={onNavClick(n.type)}
            >
              <img src={n.src} />
              {n.title}
            </NavItem>
          ))}
        </Nav>
        {renderContent()}
      </Container>
    </Layout>
  )

  function onNavClick(type) {
    return () => goto(`${paths.profile}?type=${type}`)
  }

  function renderContent() {
    switch (activeType) {
      case PROFILE_TAB.MEMBER:
        return <Member />
      case PROFILE_TAB.CONSUME_LOG:
        return <ConsumeLog />
      case PROFILE_TAB.PENDING_PRIZES:
        return <PendingPrizes />
      case PROFILE_TAB.RECLAIM_LOG:
        return <ReclaimLog />
      case PROFILE_TAB.STORED_LOG:
        return <StoredLog />
      case PROFILE_TAB.SHIP_LOG:
        return <ShipLog />
      case PROFILE_TAB.TICKETS:
        return <Tickets />
      case PROFILE_TAB.TOP_UP:
        return <TopUp />
      case PROFILE_TAB.FREE_SHIPPING:
        return <FreeshippingTicketLog />
      case PROFILE_TAB.TOP_UP_RESULT:
        return (
          <TopUpResult
            goBack={onNavClick(PROFILE_TAB.MEMBER)}
            result={result}
          />
        )
      default:
        return <Member />
    }
  }
}
