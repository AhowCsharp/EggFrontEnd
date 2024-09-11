import styled from 'styled-components'
import { Descriptions } from 'antd'
import { useSelector, dataStore } from '@app/store'
import { useEffect, useState } from 'react'
import { INCLUDE_MEMBER_COLUMNS } from '@app/utils/constants'
import coinImg from '@app/static/coin.png'
import ticket2000Img from '@app/static/ticket-2000.png'
import ticketPlatformImg from '@app/static/ticket-platform.png'
import coinWelfareImg from '@app/static/coin-welfare.png'
import { Content } from '../index'
import EditPassword from './editPassword'
import EditMember from './editMember'

const labelDisplay = {
  account: '帳號',
  name: '收貨姓名',
  nickName: '暱稱',
  phoneNum: '手機',
  email: 'E-mail',
  city: '居住城市',
  districtNo: '郵遞區號',
  districtName: '居住地區',
  address: '詳細地址',
}

function handleMemberInfo(member) {
  return Object.keys(member)
    .map((key) => {
      if (INCLUDE_MEMBER_COLUMNS.includes(key))
        return { key, label: labelDisplay[key], children: member[key] }
    })
    .filter(Boolean)
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
`

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

export default function Member() {
  const member = useSelector(() => dataStore.member)
  const [memberDisplayInfos, setMemberDisplayInfos] = useState(null)

  useEffect(() => {
    if (member) {
      const memberDisplayInfos = handleMemberInfo(member)
      setMemberDisplayInfos(memberDisplayInfos)
      return
    }
  }, [member])

  if (!member) return null

  return (
    <Content>
      <Container>
        <InfoContainer>
          <InfoItem>
            <img src={coinImg} alt="金幣" />
            <span>{member.moneyAmount}</span>
            <span>金幣</span>
          </InfoItem>
          <InfoItem>
            <img src={coinWelfareImg} alt="御守" />
            <span>{member.welfareAmount}</span>
            <span>御守</span>
          </InfoItem>
          <InfoItem>
            <img src={ticketPlatformImg} alt="平台抽獎券" />
            <span>{member.ticketEverydayAmount}</span>
            <span>平台抽獎券</span>
          </InfoItem>
          <InfoItem>
            <img src={ticket2000Img} alt="廠商抽獎券" />
            <span>{member.ticketAmount}</span>
            <span>廠商抽獎券</span>
          </InfoItem>
        </InfoContainer>
        <Descriptions
          title="修改會員資料"
          layout="vertical"
          items={memberDisplayInfos}
          column={1}
        />
        <EditMember member={member} />
        <EditPassword />
      </Container>
    </Content>
  )
}
