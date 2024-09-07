import styled from 'styled-components'
import logoImg from '@app/static/logo.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faLine,
  faFacebook,
  faInstagram,
} from '@fortawesome/free-brands-svg-icons'
import { INFO_DIALOG_TYPE } from '@app/utils/constants'
import { dataStore } from '@app/store'
import { useNavigate } from 'react-router-dom'

const Logo = styled.img.attrs(() => ({
  src: logoImg,
}))`
  max-width: 150px;
  height: auto;
  margin-bottom: 10px;
`

const LogoContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 10px;
  font-size: 0.7rem;
`

const FooterContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: space-between;
  margin: 20px auto 0;
  width: 90%;
  padding: 0 30px 95px;
  position: relative;
  z-index: ${(p) => p.theme.zIndex.layoutImg};
  font-size: 0.875rem;
  line-height: 21px;
  color: #fff;
  width: 100%;
  @media (max-width: 768px) {
    margin: 10px auto 0;
    align-items: center;
    ${LogoContainer} {
      align-self: center;
    }
  }
`

const LeftContainer = styled.div`
  display: flex;
  flex-direction: row;
`

const Content = styled.div`
  p {
    margin: 0;
    line-height: 21px;
    font-size: 0.9rem;
  }
`

const ContactInfo = styled.div`
  background: #f5b900;
  border-radius: 16px;
  height: 50px;
  text-align: center;
  transition: 0.3s;
  width: 50px;
  font-size: 1.875rem;
  display: flex;
  align-items: center;
  justify-content: center;
`

const ContactContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: 20px;
  color: #fff;
  @media (max-width: 768px) {
    margin: 20px 0;
    width: 100%;
    justify-content: center;
  }
  ${ContactInfo} + ${ContactInfo} {
    margin-left: 16px;
  }
  p {
    padding: 0 10px;
    cursor: pointer;
  }
  p + p {
    border-left: 1px solid #fff;
  }
`

export default function Footer() {
  return (
    <FooterContainer>
      <LeftContainer>
        <LogoContainer>
          <Logo />© 2024 剩蛋快樂-扭蛋所 版權所有
        </LogoContainer>
        <Content>
          <p>客服時間『週一至週日』</p>
          <p>09:00～22:00</p>
          <p>客服LINE：887kopkm</p>
          <p>客服信箱：ntzu.toys@gmail.com</p>
          <p>公司名稱：皓恩工作室</p>
          <p>統一編號：94867552</p>
        </Content>
      </LeftContainer>
      <ContactContainer>
        <p onClick={openInfoDialog(INFO_DIALOG_TYPE.PRIVACY)}>
          {INFO_DIALOG_TYPE.PRIVACY}
        </p>
        <p onClick={openInfoDialog(INFO_DIALOG_TYPE.TOP_UP)}>
          {INFO_DIALOG_TYPE.TOP_UP}
        </p>
        <p onClick={openInfoDialog(INFO_DIALOG_TYPE.DRAWING_PROBABILITY)}>
          {INFO_DIALOG_TYPE.DRAWING_PROBABILITY}
        </p>
      </ContactContainer>
      <ContactContainer>
        <ContactInfo>
          <FontAwesomeIcon icon={faLine} />
        </ContactInfo>
        <ContactInfo>
          <FontAwesomeIcon icon={faFacebook} />
        </ContactInfo>
        <ContactInfo>
          <FontAwesomeIcon icon={faInstagram} />
        </ContactInfo>
      </ContactContainer>
    </FooterContainer>
  )
  function openInfoDialog(type) {
    return () => dataStore.setInfoDialogType(type)
  }
}
