import styled from 'styled-components'
import logoImg from '@app/static/logo.png'
import customerserviceQrcode from '@app/static/customerserviceQrcode.jpg' //
import friendQrcode from '@app/static/社群QrCode.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faLine,
  faFacebook,
  faInstagram,
} from '@fortawesome/free-brands-svg-icons'
import { INFO_DIALOG_TYPE } from '@app/utils/constants'
import { dataStore } from '@app/store'

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
  flex-wrap: nowrap;
  align-items: flex-start;
  justify-content: space-between;
  width: calc(100% - 120px);
  margin: 20px auto 0;
  padding: 20px;
  position: relative;
  z-index: ${(p) => p.theme.zIndex.footer};
  font-size: 0.875rem;
  line-height: 21px;
  color: #fff;
  border-radius: 20px;
  background-color: rgba(19, 34, 57, 0.35);
  border: 1px solid rgba(255, 255, 255, 0.35);
  @media (max-width: 768px) {
    margin: 10px auto;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    width: calc(100% - 20px);
    ${LogoContainer} {
      align-self: center;
    }
  }
  /* 移除 <a> 标签的默认样式 */
  a {
    text-decoration: none;
    color: inherit;
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
  color: #fff; /* 确保图标颜色为白色 */
`

const QrCodeLabel = styled.span`
  margin-top: 5px;
  font-size: 10px;
  color: white;
  text-align: center;
`

const OfficialQrCode = styled.img.attrs({
  src: 'https://qr-official.line.me/gs/M_125dyajm_BW.png?oat_content=qr',
  alt: 'lineOA qrcode',
})`
  width: 55px;
`

const CustomerserviceQrcode = styled.img.attrs({
  src: customerserviceQrcode,
  alt: '一番賞 qrcode',
})`
  width: 55px;
`

const FriendQrcode = styled.img.attrs({
  src: friendQrcode,
  alt: '瞇那賞 qrcode',
})`
  width: 55px;
`

const ContactContainer = styled.div`
  display: flex;
  flex-direction: row;
  height: 50px;
  color: #fff;
  @media (max-width: 768px) {
    margin: 5px 0;
    width: 100%;
    justify-content: center;
  }
  /* 为 <a> 元素之间添加间距 */
  a + a {
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

const RightContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex: 1;
  justify-content: center;
  min-height: 210px;
  padding-bottom: 100px;
  > div:first-child {
    justify-content: center;
    flex: 1;
    min-width: 283px;
  }
  > div:last-child {
    flex: 0;
  }
  @media (max-width: 768px) {
    flex: 0;
    justify-content: center;
    min-height: unset;
    padding-bottom: 0;
  }
`

const QrCodeContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 20px;
  position: absolute;
  right: 20px;
  bottom: 10px;
  @media (max-width: 768px) {
    position: relative;
    bottom: 0;
    right: 0;
    width: 100%;
    justify-content: center;
    margin-top: 10px;
  }
`

const QrCodeItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 10px;

  @media (max-width: 768px) {
    margin: 0 5px;
  }
`

const RightWording = styled.div`
  position: absolute;
  bottom: 10px;
  font-size: 0.7rem;
  width: 100%;
  display: flex;
  justify-content: center;
  @media (max-width: 768px) {
    position: relative;
    bottom: 0;
  }
`

export default function Footer() {
  return (
    <FooterContainer>
      <LeftContainer>
        <LogoContainer>
          <Logo />
        </LogoContainer>
        <Content>
          <p>官方LINE：@lucky.egg</p>
          <p>客服LINE：only.egg.club</p>
          <p>客服信箱：onlyeggisreal@gmail.com</p>
          <p>公司名稱：尊嘟假嘟工作室</p>
          <p>統一編號：91214847</p>
          <p>合作邀約、疑難雜症請洽客服LINE💘</p>
          <p>歡迎加入官方LINE好友💯</p>
          <p>第一手掌握訂單、新品、優惠消息☝️</p>
          <p>真的很強的LineBot服務😍沒騙你🈹</p>
        </Content>
      </LeftContainer>
      <RightWording>© 2024 瞇那賞-玩具所 版權所有</RightWording>
      <RightContainer>
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
          <a
            href="https://line.me/your-line-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            <ContactInfo>
              <FontAwesomeIcon icon={faLine} />
            </ContactInfo>
          </a>
          <a
            href="https://www.facebook.com/your-facebook-page"
            target="_blank"
            rel="noopener noreferrer"
          >
            <ContactInfo>
              <FontAwesomeIcon icon={faFacebook} />
            </ContactInfo>
          </a>
          <a
            href="https://www.instagram.com/your-instagram-page"
            target="_blank"
            rel="noopener noreferrer"
          >
            <ContactInfo>
              <FontAwesomeIcon icon={faInstagram} />
            </ContactInfo>
          </a>
        </ContactContainer>
      </RightContainer>

      <QrCodeContainer>
        <QrCodeItem>
          <OfficialQrCode />
          <QrCodeLabel>官方 LINE</QrCodeLabel>
        </QrCodeItem>
        <QrCodeItem>
          <CustomerserviceQrcode />
          <QrCodeLabel>客服 LINE</QrCodeLabel>
        </QrCodeItem>
        <QrCodeItem>
          <FriendQrcode />
          <QrCodeLabel>社群 LINE</QrCodeLabel>
        </QrCodeItem>
      </QrCodeContainer>
    </FooterContainer>
  )

  function openInfoDialog(type) {
    return () => dataStore.setInfoDialogType(type)
  }
}
