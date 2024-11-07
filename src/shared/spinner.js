import styled from 'styled-components'
import animation from '@app/static/loading.gif'

const Mask = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: ${(p) => p.theme.color.mask};
  z-index: ${(p) => p.theme.zIndex.alertMask};
`

const Layout = styled.div`
  position: fixed;
  top: 50vh;
  transform: translateY(-50%);
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
  width: 50%;
  display: flex;
  z-index: ${(p) => p.theme.zIndex.dialog};
  justify-content: center;
  align-items: center;
  @media (max-width: 768px) {
    width: 80%;
  }
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
      </Layout>
    </>
  )
}

export default Spinner
