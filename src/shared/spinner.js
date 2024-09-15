import styled from 'styled-components'
import animation from '@app/static/lottery/gacha-hover.gif'

const Mask = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: ${(p) => p.theme.color.mask};
  border-radius: ${(p) => p.theme.borderRadius.content};
  z-index: ${(p) => p.theme.zIndex.alertMask};
`

const Layout = styled.div`
  position: absolute;
  opacity: 1;
  top: 25vh;
  width: 50%;
  left: 25%;
  z-index: ${(p) => p.theme.zIndex.alertDialog};
  display: flex;
  text-align: center;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  color: #fff;
`

const ImgContainer = styled.div`
  width: 30%;
  display: flex;
  z-index: ${(p) => p.theme.zIndex.dialog};
  justify-content: center;
  align-items: center;
  img {
    width: 100%;
    height: auto;
    margin-bottom: 10px;
  }
`

const Spinner = () => {
  return (
    <>
      <Mask />
      <Layout>
        <ImgContainer>
          <img className="loading" src={animation} />
        </ImgContainer>
        出發異世界取資料中 請稍候...
      </Layout>
    </>
  )
}

export default Spinner
